import { DataCache } from '../data-cache';

describe('DataCache', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('mergeData is right when sum = 1', () => {
    const dataCache = new DataCache({});
    const text = '{"data":"hello,world"}';

    const mockData = {
      message_id: 'message_id',
      sum: 1,
      seq: 0,
      trace_id: 'trace_id',
      data: new TextEncoder().encode(text)
    }

    const combined = dataCache.mergeData(mockData);
    const { data } = combined!;
    expect(data).toEqual("hello,world");
    expect(dataCache.cache.get('message_id')).toBeUndefined();
  });

  test('mergeData is right when sum > 2', () => {
    const dataCache = new DataCache({});
    const text1 = '{"data":"hello,';
    const text2 =  'world"}';

    const mockData1 = {
      message_id: 'message_id',
      sum: 2,
      seq: 0,
      trace_id: 'trace_id',
      data: new TextEncoder().encode(text1)
    }

    const combined1 = dataCache.mergeData(mockData1);
    expect(combined1).toBe(null);

    const mockData2 = {
      message_id: 'message_id',
      sum: 2,
      seq: 1,
      trace_id: 'trace_id',
      data: new TextEncoder().encode(text2)
    }

    const combined2 = dataCache.mergeData(mockData2);
    const { data } = combined2!;
    expect(data).toEqual("hello,world");
  });

  test('data is expired', () => {
    // doNotFake performance: @sinonjs/fake-timers cannot hijack the read-only
    // global `performance` on newer Node, which otherwise throws on install.
    jest.useFakeTimers({ doNotFake: ['performance'] });

    const dataCache = new DataCache({});
    const text = '{"data":"hello,world"}';

    const mockData = {
      message_id: 'message_id',
      sum: 2,
      seq: 0,
      trace_id: 'trace_id',
      data: new TextEncoder().encode(text)
    }

    dataCache.mergeData(mockData);

    jest.advanceTimersByTime(10000 * 2 + 100); 
    
    expect(dataCache.cache.get('message_id')).toBeUndefined();
  });

  test('data is lived', () => {
    // doNotFake performance: @sinonjs/fake-timers cannot hijack the read-only
    // global `performance` on newer Node, which otherwise throws on install.
    jest.useFakeTimers({ doNotFake: ['performance'] });

    const dataCache = new DataCache({});
    const text = '{"data":"hello,world"}';

    const mockData = {
      message_id: 'message_id',
      sum: 2,
      seq: 0,
      trace_id: 'trace_id',
      data: new TextEncoder().encode(text)
    }

    dataCache.mergeData(mockData);

    jest.advanceTimersByTime(1000 * 5);

    expect(dataCache.cache.get('message_id')).not.toBeUndefined();
  });

  // The sweep timer must not, on its own, keep the Node process alive — this is
  // the issue #193 regression: a non-unref'd setInterval blocked process exit.
  // Stub setInterval to a handle whose unref is observable, so the assertion
  // genuinely fails if the production code stops calling unref().
  test('sweep timer is unref-ed so it does not block process exit', () => {
    const unref = jest.fn();
    const setIntervalSpy = jest
      .spyOn(global, 'setInterval')
      .mockReturnValue({ unref } as unknown as ReturnType<typeof setInterval>);

    new DataCache({});

    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(unref).toHaveBeenCalledTimes(1);

    setIntervalSpy.mockRestore();
  });

  // destroy() stops the sweep and frees cached fragments, so WSClient.close()
  // can release its event-loop handle.
  test('destroy stops the sweep and clears the cache', () => {
    jest.useFakeTimers({ doNotFake: ['performance'] });

    const dataCache = new DataCache({});
    dataCache.mergeData({
      message_id: 'message_id',
      sum: 2,
      seq: 0,
      trace_id: 'trace_id',
      data: new TextEncoder().encode('{"data":"hello,')
    });

    dataCache.destroy();
    expect(dataCache.cache.size).toBe(0);

    // Re-populate, then advance past the expiry window: a stopped sweep must
    // not delete it, proving the interval is truly cleared.
    dataCache.cache.set('lingering', {
      buffer: [],
      trace_id: 'trace_id',
      message_id: 'lingering',
      create_time: Date.now()
    });
    jest.advanceTimersByTime(10000 * 2 + 100);
    expect(dataCache.cache.get('lingering')).not.toBeUndefined();
  });

  // clearAtInterval() is idempotent (constructor already armed it) and can
  // re-arm after destroy(), so close()->start() reuse keeps expiry working.
  test('clearAtInterval is idempotent and re-arms after destroy', () => {
    jest.useFakeTimers({ doNotFake: ['performance'] });
    const setIntervalSpy = jest.spyOn(global, 'setInterval');

    const dataCache = new DataCache({});
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);

    // Already running: a second call must not create a second timer.
    dataCache.clearAtInterval();
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);

    // After destroy() it must be possible to re-arm.
    dataCache.destroy();
    dataCache.clearAtInterval();
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);
  });

})
