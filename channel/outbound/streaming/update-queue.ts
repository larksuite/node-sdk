/**
 * A per-stream FIFO queue that serializes async updates, so that concurrent
 * calls to `append()` / `update()` always result in PATCH operations
 * happening in submission order.
 */
export class UpdateQueue {
    private tail: Promise<void> = Promise.resolve();

    enqueue<T>(task: () => Promise<T>): Promise<T> {
        const next = this.tail.then(task, task);
        this.tail = next.then(
            () => undefined,
            () => undefined
        );
        return next;
    }

    drain(): Promise<void> {
        return this.tail;
    }
}
