export function generateMessage(from: string, text: string) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};
export function generateLocationMessage(from: string, lat: number, lon: number) {
    return {
        from,
        url: `https://www.google.com/maps/@${lat},${lon}z`,
        createdAt: new Date().getTime()
    };
};