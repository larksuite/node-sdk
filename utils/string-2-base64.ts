export const string2Base64 = (content: string) =>
    Buffer.from(content).toString('base64');