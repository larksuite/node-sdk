export const fillApiPath = (
    apiPath: string,
    pathSupplement: Record<string, string> = {}
) =>
    // Only treat `:name` as a path parameter when it starts a path segment
    // (string start or right after `/`). Colons inside the URL authority,
    // e.g. `http://localhost:3000` or `user:pw@host`, must be left untouched.
    // The separator is captured and re-emitted instead of using a lookbehind
    // because the compile target (es6) has no lookbehind support.
    apiPath.replace(/(^|\/):([^/]+)/g, (_, pathPrefix, pathKey) => {
        if (pathSupplement[pathKey] !== undefined) {
            return `${pathPrefix}${pathSupplement[pathKey]}`;
        }

        throw new Error(`request miss ${pathKey} path argument`);
    });
