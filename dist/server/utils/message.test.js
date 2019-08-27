"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = __importDefault(require("expect"));
const message_1 = __importDefault(require("./message"));
describe('generateMessage', () => {
    it('should generate correct message object', (done) => {
        const from = 'Jen';
        const text = 'Some message';
        const message = message_1.default(from, text);
        expect_1.default(typeof message.createdAt).toBe('number');
        expect_1.default(message).toMatchObject({ from, text });
        done();
    });
});
//# sourceMappingURL=message.test.js.map