export const pickRequestData = (req) =>
    new Promise((resolve) => {
        let chunks = '';
        req.on('data', (chunk) => {
            chunks += chunk;
        });

        req.on('end', () => {
            try {
                const data = JSON.parse(chunks);
                resolve(data);
            } catch (e) {
                resolve('');
            }
        });
    });
