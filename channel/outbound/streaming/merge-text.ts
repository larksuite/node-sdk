/**
 * Merge a streaming text chunk into an accumulator, handling both "delta"
 * and "accumulated" producers transparently.
 *
 * Rules:
 * - If `next` starts with `prev`, it's an accumulated stream → use `next`
 * - If `prev` starts with `next`, the stream rewound or overlapped → keep `prev`
 * - Otherwise, find the longest overlap between `prev`'s tail and `next`'s
 *   head, and concatenate
 */
export function mergeStreamingText(prev: string, next: string): string {
    if (!prev) return next;
    if (!next) return prev;
    if (next.startsWith(prev)) return next;
    if (prev.startsWith(next)) return prev;

    const maxOverlap = Math.min(prev.length, next.length);
    for (let len = maxOverlap; len > 0; len--) {
        if (prev.endsWith(next.substring(0, len))) {
            return prev + next.substring(len);
        }
    }
    return prev + next;
}
