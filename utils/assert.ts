export const assert = async (
    predication: boolean | (() => boolean),
    callback: () => any | Promise<any>
) => {
    const isInvoke =
        typeof predication === 'function' ? predication() : predication;

    if (isInvoke) {
        await callback();
    }
};
