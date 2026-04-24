/**
 * Dual-threshold throttle: fires `flush` either when `ms` have elapsed
 * since the last fire OR when `chars` characters have accumulated.
 *
 * Usage inside a stream controller:
 *   const t = new Throttle({ ms: 100, chars: 50 }, () => doPatch(buffer));
 *   await t.note(deltaLen);       // may or may not fire, schedule the rest
 *   await t.flushNow();           // end-of-stream force flush
 */
export class Throttle {
    private pendingChars = 0;
    private timer?: NodeJS.Timeout;
    /** Tracks the in-flight fire as a Promise so `flushNow` can await it. */
    private inFlight?: Promise<void>;
    private lastFireAt = 0;

    constructor(
        private opts: { ms: number; chars: number },
        private fire: () => Promise<void>
    ) {}

    /**
     * Accumulate bytes and decide whether to fire now, schedule a timer,
     * or do nothing (a fire is already scheduled).
     */
    note(deltaChars: number): void {
        this.pendingChars += deltaChars;
        if (this.pendingChars >= this.opts.chars) {
            this.fireSoon(0);
            return;
        }
        if (!this.timer) {
            const elapsed = Date.now() - this.lastFireAt;
            const wait = Math.max(0, this.opts.ms - elapsed);
            this.fireSoon(wait);
        }
    }

    private fireSoon(delay: number): void {
        if (this.timer) clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.timer = undefined;
            void this.doFire();
        }, delay);
    }

    /**
     * Force-flush everything accumulated so far, including any content that
     * arrived during an in-flight fire. Waits for the in-flight fire to
     * complete, then fires once more to capture the final state — without
     * this second fire, the last chunk of appended content would be missed
     * (the in-flight fire captured a snapshot BEFORE those chunks arrived).
     */
    async flushNow(): Promise<void> {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
        if (this.inFlight) {
            await this.inFlight;
        }
        await this.doFire();
    }

    private async doFire(): Promise<void> {
        if (this.inFlight) {
            // Someone else is firing; schedule a follow-up so the latest
            // accumulated chars get captured after the in-flight fire ends.
            this.fireSoon(this.opts.ms);
            return;
        }
        const p = (async () => {
            this.pendingChars = 0;
            this.lastFireAt = Date.now();
            await this.fire();
        })();
        this.inFlight = p;
        try {
            await p;
        } finally {
            this.inFlight = undefined;
        }
    }

    dispose(): void {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
    }
}
