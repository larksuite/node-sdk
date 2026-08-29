export const fillApiPath = (
    apiPath: string,
    pathSupplement: Record<string, string> = {}
) =>
    apiPath.replace(/(^|\/):([^/]+)/g, (_, pathPrefix, pathKey) => {
        if (pathSupplement[pathKey] !== undefined) {
            return `${pathPrefix}${pathSupplement[pathKey]}`;
        }

        throw new Error(`request miss ${pathKey} path argument`);
    });
