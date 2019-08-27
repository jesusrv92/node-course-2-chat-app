import expect from 'expect';
import generateMessage from './message'
describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        const from = 'Jen';
        const text = 'Some message';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
        done();
    })
});