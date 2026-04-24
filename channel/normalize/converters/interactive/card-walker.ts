/**
 * Recursive walker that extracts human-readable text from a Feishu
 * interactive card JSON tree. Covers header titles, plain_text / lark_md
 * elements, button labels, form fields, notes, and commonly used nested
 * element types.
 */
export function walkCard(node: unknown): string[] {
    const out: string[] = [];
    visit(node, out);
    // de-duplicate adjacent empties and collapse
    return out.filter((s) => s && s.trim().length > 0);
}

function visit(node: unknown, out: string[]): void {
    if (node == null) return;
    if (typeof node === 'string' || typeof node === 'number' || typeof node === 'boolean') return;
    if (Array.isArray(node)) {
        for (const child of node) visit(child, out);
        return;
    }
    if (typeof node !== 'object') return;

    const obj = node as Record<string, unknown>;

    // tag: plain_text / lark_md / markdown → push content
    const tag = obj.tag;
    if (typeof tag === 'string' && (tag === 'plain_text' || tag === 'lark_md' || tag === 'markdown')) {
        if (typeof obj.content === 'string') out.push(obj.content);
        return;
    }

    // header.title
    if (obj.header && typeof obj.header === 'object') {
        const header = obj.header as Record<string, unknown>;
        if (header.title) visit(header.title, out);
    }

    // text / content on common elements (div, button, note, etc.)
    if (obj.text) visit(obj.text, out);

    // button / select option label (typed as button)
    if (typeof tag === 'string' && tag === 'button') {
        const text = (obj as { text?: unknown }).text;
        if (text) visit(text, out);
    }

    // form fields: label, placeholder, options
    if (obj.label) visit(obj.label, out);
    if (obj.placeholder) visit(obj.placeholder, out);
    if (Array.isArray(obj.options)) {
        for (const opt of obj.options) {
            const o = opt as Record<string, unknown>;
            if (o?.text) visit(o.text, out);
        }
    }

    // column / row containers
    if (Array.isArray(obj.elements)) for (const el of obj.elements) visit(el, out);
    if (Array.isArray(obj.fields)) for (const f of obj.fields) visit(f, out);
    if (Array.isArray(obj.actions)) for (const a of obj.actions) visit(a, out);
    if (Array.isArray(obj.columns)) for (const c of obj.columns) visit(c, out);

    // common nested shapes for v2 card body
    if (obj.body) visit(obj.body, out);
}
