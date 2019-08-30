import expect from 'expect';
import { isRealString } from './validation';

describe('isRealString', () => {
    it('should reject non-string values', (done) => {
        var res = isRealString(98);
        expect(res).toBe(false);
        done();
    });
    it('should reject strings with only spaces', (done) => {
        var res = isRealString('           ');
        expect(res).toBe(false);
        done();
    });
    it('should allow strings with non-space characters', (done) => {
        var res = isRealString('     Andrew      ');
        expect(res).toBe(true);
        done();
    });
});