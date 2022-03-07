var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import assert from 'assert';
import { describe, it } from 'mocha';
import { isAbsolutePath } from '../fileService';
describe('Check if a path is an absolute path', () => {
    function testIsAbsolutePath(path, expected) {
        it(`should ensure ${path} is${expected ? ' ' : ' not '}an absolute path`, () => __awaiter(this, void 0, void 0, function* () {
            assert.strictEqual(isAbsolutePath(path), expected);
        }));
    }
    testIsAbsolutePath('/home/test', true);
    testIsAbsolutePath('C:/home/test', true);
    testIsAbsolutePath('c:/home/test', true);
    testIsAbsolutePath('/c:/home/test', true);
    testIsAbsolutePath('C:\\home\\test', true);
    testIsAbsolutePath('\\\\home\\test', true);
    testIsAbsolutePath('//home\\test', true);
    testIsAbsolutePath('~/home/test', false);
    testIsAbsolutePath('./home/test', false);
    testIsAbsolutePath('../home/test', false);
    testIsAbsolutePath('home/test', false);
});
//# sourceMappingURL=fileService.test.js.map