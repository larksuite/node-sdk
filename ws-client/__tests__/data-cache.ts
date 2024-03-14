import { DataCache } from '../data-cache';

describe('DataCache', () => {
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
    jest.useFakeTimers();
  
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
    jest.useFakeTimers();
  
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

})
