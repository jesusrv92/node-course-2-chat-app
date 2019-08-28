import expect from 'expect';
import { generateMessage, generateLocationMessage } from './message'
describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        const from = 'Jen';
        const text = 'Some message';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, text });
        done();
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', (done) => {
        const from = 'Deb';
        const latitude = 15;
        const longitude = 19;
        const url = 'https://www.google.com/maps/@15,19z';
        const message = generateLocationMessage(from, latitude, longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({ from, url });
        done();
    });
});