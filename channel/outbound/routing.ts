export type ReceiveIdType = 'chat_id' | 'open_id' | 'user_id' | 'union_id' | 'email';

/**
 * Infer Feishu's `receive_id_type` from the prefix of a target id.
 *
 *   oc_*          → chat_id
 *   ou_*          → open_id
 *   on_*          → union_id
 *   contains '@'  → email
 *   fallback      → user_id
 */
export function detectReceiveIdType(to: string): ReceiveIdType {
    if (!to) throw new Error('empty receive_id');
    if (to.startsWith('oc_')) return 'chat_id';
    if (to.startsWith('ou_')) return 'open_id';
    if (to.startsWith('on_')) return 'union_id';
    if (to.includes('@')) return 'email';
    return 'user_id';
}
