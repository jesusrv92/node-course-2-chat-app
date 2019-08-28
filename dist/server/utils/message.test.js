"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = __importDefault(require("expect"));
const message_1 = require("./message");
describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        const from = 'Jen';
        const text = 'Some message';
        const message = message_1.generateMessage(from, text);
        expect_1.default(typeof message.createdAt).toBe('number');
        expect_1.default(message).toMatchObject({ from, text });
        done();
    });
});
describe('generateLocationMessage', () => {
    it('should generate correct location object', (done) => {
        const from = 'Deb';
        const latitude = 15;
        const longitude = 19;
        const url = 'https://www.google.com/maps/search/?api=1&query=15,19';
        const message = message_1.generateLocationMessage(from, latitude, longitude);
        expect_1.default(typeof message.createdAt).toBe('number');
        expect_1.default(message).toMatchObject({ from, url });
        done();
    });
});
//# sourceMappingURL=message.test.js.map