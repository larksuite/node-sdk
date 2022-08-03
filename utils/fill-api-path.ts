export const fillApiPath = (
    apiPath: string,
    pathSupplement: Record<string, string> = {}
) =>
    apiPath.replace(/:([^/]+)/g, (_, $1) => {
        if (pathSupplement[$1] !== undefined) {
            return pathSupplement[$1];
        }

        throw new Error(`request miss ${$1} path argument`);
    });
