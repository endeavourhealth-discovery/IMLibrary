"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const mocha_1 = require("mocha");
const fileService_1 = require("../fileService");
(0, mocha_1.describe)('Check if a path is an absolute path', () => {
    function testIsAbsolutePath(path, expected) {
        (0, mocha_1.it)(`should ensure ${path} is${expected ? ' ' : ' not '}an absolute path`, () => __awaiter(this, void 0, void 0, function* () {
            assert_1.default.strictEqual((0, fileService_1.isAbsolutePath)(path), expected);
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