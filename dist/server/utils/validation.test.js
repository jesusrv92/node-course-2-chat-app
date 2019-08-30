"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const expect_1 = __importDefault(require("expect"));
const validation_1 = require("./validation");
describe('isRealString', () => {
    it('should reject non-string values', (done) => {
        var res = validation_1.isRealString(98);
        expect_1.default(res).toBe(false);
        done();
    });
    it('should reject strings with only spaces', (done) => {
        var res = validation_1.isRealString('           ');
        expect_1.default(res).toBe(false);
        done();
    });
    it('should allow strings with non-space characters', (done) => {
        var res = validation_1.isRealString('     Andrew      ');
        expect_1.default(res).toBe(true);
        done();
    });
});
//# sourceMappingURL=validation.test.js.map