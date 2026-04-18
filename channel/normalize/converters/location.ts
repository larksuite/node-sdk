import type { ContentConverterFn } from '../context';
import { escapeAttr, safeParse } from '../utils';

export const convertLocation: ContentConverterFn = async (raw, _ctx) => {
    const parsed = safeParse(raw) as
        | { name?: string; latitude?: string; longitude?: string }
        | undefined;
    const name = parsed?.name;
    const lat = parsed?.latitude;
    const lng = parsed?.longitude;

    const nameAttr = name ? ` name="${escapeAttr(name)}"` : '';
    const coordsAttr = lat && lng ? ` coords="lat:${lat},lng:${lng}"` : '';
    return { content: `<location${nameAttr}${coordsAttr}/>`, resources: [] };
};
