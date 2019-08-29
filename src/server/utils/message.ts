import moment from 'moment';

export function generateMessage(from: string, text: string) {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};
export function generateLocationMessage(from: string, lat: number, lon: number) {
    return {
        from,
        url: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
        createdAt: moment().valueOf()
    };
};