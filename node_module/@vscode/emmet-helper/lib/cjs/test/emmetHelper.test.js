"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const vscode_languageserver_types_1 = require("vscode-languageserver-types");
const emmetHelper_1 = require("../emmetHelper");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const mocha_1 = require("mocha");
const assert_1 = __importDefault(require("assert"));
const path = __importStar(require("path"));
const util = __importStar(require("util"));
const fs = __importStar(require("fs"));
const fileService_1 = require("../fileService");
const vscode_uri_1 = require("vscode-uri");
const extensionsPath = [path.join(path.normalize(path.join(__dirname, '../../..')), 'testData', 'custom-snippets-profile')];
const bemFilterExample = 'ul.search-form._wide>li.-querystring+li.-btn_large';
const expectedBemFilterOutput = `<ul class="search-form search-form_wide">
	<li class="search-form__querystring">\${1}</li>
	<li class="search-form__btn search-form__btn_large">\${0}</li>
</ul>`;
const expectedBemFilterOutputDocs = expectedBemFilterOutput.replace(/\$\{\d+\}/g, '|');
const commentFilterExample = 'ul.nav>li#item';
const expectedCommentFilterOutput = `<ul class="nav">
	<li id="item">\${0}</li>
	<!-- /#item -->
</ul>
<!-- /.nav -->`;
const expectedCommentFilterOutputDocs = expectedCommentFilterOutput.replace(/\$\{\d+\}/g, '|');
const bemCommentFilterExample = bemFilterExample;
const expectedBemCommentFilterOutput = `<ul class="search-form search-form_wide">
	<li class="search-form__querystring">\${1}</li>
	<!-- /.search-form__querystring -->
	<li class="search-form__btn search-form__btn_large">\${0}</li>
	<!-- /.search-form__btn search-form__btn_large -->
</ul>
<!-- /.search-form search-form_wide -->`;
const expectedBemCommentFilterOutputDocs = expectedBemCommentFilterOutput.replace(/\$\{\d+\}/g, '|');
const fileService = {
    readFile(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            if (uri.scheme === 'file') {
                return yield util.promisify(fs.readFile)(uri.fsPath);
            }
            throw new Error(`schema ${uri.scheme} not supported`);
        });
    },
    stat(uri) {
        if (uri.scheme === 'file') {
            return new Promise((c, e) => {
                fs.stat(uri.fsPath, (err, stats) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            return c({ type: fileService_1.FileType.Unknown, ctime: -1, mtime: -1, size: -1 });
                        }
                        else {
                            return e(err);
                        }
                    }
                    let type = fileService_1.FileType.Unknown;
                    if (stats.isFile()) {
                        type = fileService_1.FileType.File;
                    }
                    else if (stats.isDirectory()) {
                        type = fileService_1.FileType.Directory;
                    }
                    else if (stats.isSymbolicLink()) {
                        type = fileService_1.FileType.SymbolicLink;
                    }
                    c({
                        type,
                        ctime: stats.ctime.getTime(),
                        mtime: stats.mtime.getTime(),
                        size: stats.size
                    });
                });
            });
        }
        throw new Error(`schema ${uri.scheme} not supported`);
    }
};
function updateExtensionsPath(extPath) {
    return (0, emmetHelper_1.updateExtensionsPath)(extPath, fileService, [vscode_uri_1.URI.file('/home/projects/test')]);
}
(0, mocha_1.describe)('Validate Abbreviations', () => {
    (0, mocha_1.it)('should return true for valid abbreviations', () => {
        const htmlAbbreviations = [
            'ul>li',
            'ul',
            'h1',
            'ul>li*3',
            '(ul>li)+div',
            '.hello',
            '!',
            '#hello',
            '.item[id=ok]',
            '.',
            '.foo',
            'div{ foo (bar) baz }',
            'div{ foo ((( abc }',
            'div{()}',
            'div{ a (b) c}',
            'div{ a (b) c}+div{ a (( }'
        ];
        const cssAbbreviations = ['#123', '#abc', 'bd1#s'];
        htmlAbbreviations.forEach(abbr => {
            (0, assert_1.default)((0, emmetHelper_1.isAbbreviationValid)('html', abbr), `${abbr} should be treated as valid abbreviation`);
        });
        htmlAbbreviations.forEach(abbr => {
            (0, assert_1.default)((0, emmetHelper_1.isAbbreviationValid)('haml', abbr), `${abbr} should be treated as valid abbreviation`);
        });
        cssAbbreviations.forEach(abbr => {
            (0, assert_1.default)((0, emmetHelper_1.isAbbreviationValid)('css', abbr), `${abbr} should be treated as valid abbreviation`);
        });
        cssAbbreviations.forEach(abbr => {
            (0, assert_1.default)((0, emmetHelper_1.isAbbreviationValid)('scss', abbr), `${abbr} should be treated as valid abbreviation`);
        });
    });
    (0, mocha_1.it)('should return false for invalid abbreviations', () => {
        const htmlAbbreviations = [
            '!ul!',
            '(hello)',
            'super(hello)',
            'console.log(hello)',
            'console.log(._hello)',
            '()',
            '[]',
            '(my.data[0].element)',
            'if(!ok)',
            'while(!ok)',
            '(!ok)',
            'div{ foo }(bar){ baz }',
            'div{ foo ((}( abc }',
            'div{ a}(b) c}',
            'div{ a (b){c}',
            'div{ a}(b){c}',
            'div{ a ((  dsf} d (( sf )) }'
        ];
        const cssAbbreviations = ['123', '#xyz'];
        htmlAbbreviations.forEach(abbr => {
            (0, assert_1.default)(!(0, emmetHelper_1.isAbbreviationValid)('html', abbr), `${abbr} should be treated as invalid abbreviation in html`);
        });
        htmlAbbreviations.forEach(abbr => {
            (0, assert_1.default)(!(0, emmetHelper_1.isAbbreviationValid)('haml', abbr), `${abbr} should be treated as invalid abbreviation in haml`);
        });
        cssAbbreviations.forEach(abbr => {
            (0, assert_1.default)(!(0, emmetHelper_1.isAbbreviationValid)('css', abbr), `${abbr} should be treated as invalid abbreviation in css`);
        });
        cssAbbreviations.forEach(abbr => {
            (0, assert_1.default)(!(0, emmetHelper_1.isAbbreviationValid)('scss', abbr), `${abbr} should be treated as invalid abbreviation in scss`);
        });
    });
});
(0, mocha_1.describe)('Extract Abbreviations', () => {
    (0, mocha_1.it)('should extract abbreviations from document html', () => {
        const testCases = [
            ['<div>ul>li*3</div>', 0, 7, 'ul', 0, 5, 0, 7, undefined],
            ['<div>ul>li*3</div>', 0, 10, 'ul>li', 0, 5, 0, 10, undefined],
            ['<div>ul>li*3</div>', 0, 12, 'ul>li*3', 0, 5, 0, 12, undefined],
            ['ul>li', 0, 5, 'ul>li', 0, 0, 0, 5, undefined],
            ['ul>li|bem', 0, 9, 'ul>li', 0, 0, 0, 9, 'bem'],
            ['ul>li|c|bem', 0, 11, 'ul>li', 0, 0, 0, 11, 'c,bem'],
            ['ul>li|bem|c', 0, 11, 'ul>li', 0, 0, 0, 11, 'bem,c'],
            ['ul>li|t|bem|c', 0, 13, 'ul>li', 0, 0, 0, 13, 't,bem,c'],
            ['div[a="b" c="d"]>md-button', 0, 26, 'div[a="b" c="d"]>md-button', 0, 0, 0, 26, undefined],
            ['div[a=b c="d"]>md-button', 0, 24, 'div[a=b c="d"]>md-button', 0, 0, 0, 24, undefined],
            ['div[a=b c=d]>md-button', 0, 22, 'div[a=b c=d]>md-button', 0, 0, 0, 22, undefined]
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedAbbr, expectedRangeStartLine, expectedRangeStartChar, expectedRangeEndLine, expectedRangeEndChar, expectedFilter]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const result = (0, emmetHelper_1.extractAbbreviation)(document, position);
            assert_1.default.ok(result);
            const { abbreviationRange, abbreviation, filter } = result;
            assert_1.default.strictEqual(expectedAbbr, abbreviation);
            assert_1.default.strictEqual(expectedRangeStartLine, abbreviationRange.start.line);
            assert_1.default.strictEqual(expectedRangeStartChar, abbreviationRange.start.character);
            assert_1.default.strictEqual(expectedRangeEndLine, abbreviationRange.end.line);
            assert_1.default.strictEqual(expectedRangeEndChar, abbreviationRange.end.character);
            assert_1.default.strictEqual(filter, expectedFilter);
        });
    });
    (0, mocha_1.it)('should extract abbreviations from document css', () => {
        const testCases = [
            ['<div style="dn"></div>', 0, 14, 'dn', 0, 12, 0, 14, undefined],
            ['<div style="trf:rx"></div>', 0, 18, 'trf:rx', 0, 12, 0, 18, undefined],
            ['<div style="-mwo-trf:rx"></div>', 0, 23, '-mwo-trf:rx', 0, 12, 0, 23, undefined],
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedAbbr, expectedRangeStartLine, expectedRangeStartChar, expectedRangeEndLine, expectedRangeEndChar, expectedFilter]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const extractOptions = { type: 'stylesheet', lookAhead: false };
            const result = (0, emmetHelper_1.extractAbbreviation)(document, position, extractOptions);
            assert_1.default.ok(result);
            const { abbreviationRange, abbreviation, filter } = result;
            assert_1.default.strictEqual(expectedAbbr, abbreviation);
            assert_1.default.strictEqual(expectedRangeStartLine, abbreviationRange.start.line);
            assert_1.default.strictEqual(expectedRangeStartChar, abbreviationRange.start.character);
            assert_1.default.strictEqual(expectedRangeEndLine, abbreviationRange.end.line);
            assert_1.default.strictEqual(expectedRangeEndChar, abbreviationRange.end.character);
            assert_1.default.strictEqual(filter, expectedFilter);
        });
    });
    (0, mocha_1.it)('should extract abbreviations from text', () => {
        const testCases = [
            ['ul', 'ul', undefined],
            ['ul>li', 'ul>li', undefined],
            ['ul>li*3', 'ul>li*3', undefined],
            ['ul>li|bem', 'ul>li', 'bem'],
            ['ul>li|t', 'ul>li', 't'],
            ['ul>li|bem|c', 'ul>li', 'bem,c'],
            ['ul>li|c|bem', 'ul>li', 'c,bem'],
            ['ul>li|c|bem|t', 'ul>li', 'c,bem,t'],
        ];
        testCases.forEach(([content, expectedAbbr, expectedFilter]) => {
            const result = (0, emmetHelper_1.extractAbbreviationFromText)(content, 'html');
            assert_1.default.ok(result);
            const { abbreviation, filter } = result;
            assert_1.default.strictEqual(expectedAbbr, abbreviation);
            assert_1.default.strictEqual(filter, expectedFilter);
        });
    });
});
(0, mocha_1.describe)('Test Basic Expand Options', () => {
    (0, mocha_1.it)('should check for basic expand options', () => {
        const syntax = 'anythingreally';
        const expandOptions = (0, emmetHelper_1.getExpandOptions)(syntax);
        assert_1.default.strictEqual(expandOptions.options['output.field'], emmetHelper_1.emmetSnippetField);
        assert_1.default.strictEqual(expandOptions.syntax, syntax);
    });
});
(0, mocha_1.describe)('Test addons in Expand Options', () => {
    (0, mocha_1.it)('should add jsx as addon for jsx syntax', () => {
        const syntax = 'jsx';
        const expandOptions = (0, emmetHelper_1.getExpandOptions)(syntax);
        assert_1.default.strictEqual(expandOptions.options['jsx.enabled'], true);
    });
    (0, mocha_1.it)('should add bem as addon when bem filter is provided', () => {
        const syntax = 'anythingreally';
        const expandOptions = (0, emmetHelper_1.getExpandOptions)(syntax, {}, 'bem');
        assert_1.default.strictEqual(expandOptions.options['bem.element'], '__');
    });
    (0, mocha_1.it)('should add bem before jsx as addon when bem filter is provided', () => {
        const syntax = 'jsx';
        const expandOptions = (0, emmetHelper_1.getExpandOptions)(syntax, {}, 'bem');
        assert_1.default.strictEqual(expandOptions.options['bem.element'], '__');
        assert_1.default.strictEqual(expandOptions.options['jsx.enabled'], true);
    });
});
(0, mocha_1.describe)('Test output profile settings', () => {
    (0, mocha_1.it)('should convert output profile from old format to new', () => {
        const profile = {
            tag_case: 'lower',
            attr_case: 'lower',
            attr_quotes: 'single',
            tag_nl: true,
            inline_break: 2,
            self_closing_tag: 'xhtml'
        };
        const expandOptions = (0, emmetHelper_1.getExpandOptions)('html', { syntaxProfiles: { html: profile } });
        assert_1.default.strictEqual(profile['tag_case'], expandOptions.options['output.tagCase']);
        assert_1.default.strictEqual(profile['attr_case'], expandOptions.options['output.attributeCase']);
        assert_1.default.strictEqual(profile['attr_quotes'], expandOptions.options['output.attributeQuotes']);
        assert_1.default.strictEqual(profile['tag_nl'], expandOptions.options['output.format']);
        assert_1.default.strictEqual(profile['inline_break'], expandOptions.options['output.inlineBreak']);
        assert_1.default.strictEqual(profile['self_closing_tag'], expandOptions.options['output.selfClosingStyle']);
    });
    (0, mocha_1.it)('should convert self_closing_style', () => {
        const testCases = [true, false, 'xhtml'];
        const expectedValue = ['xml', 'html', 'xhtml'];
        for (let i = 0; i < testCases.length; i++) {
            const expandOptions = (0, emmetHelper_1.getExpandOptions)('html', { syntaxProfiles: { html: { self_closing_tag: testCases[i] } } });
            assert_1.default.strictEqual(expandOptions.options['output.selfClosingStyle'], expectedValue[i]);
        }
    });
    (0, mocha_1.it)('should convert tag_nl', () => {
        const testCases = [true, false, 'decide'];
        const expectedValue = [true, false, true];
        for (let i = 0; i < testCases.length; i++) {
            const expandOptions = (0, emmetHelper_1.getExpandOptions)('html', { syntaxProfiles: { html: { tag_nl: testCases[i] } } });
            assert_1.default.strictEqual(expandOptions.options['output.format'], expectedValue[i]);
        }
    });
    (0, mocha_1.it)('should use output profile in new format as is', () => {
        const profile = {
            tagCase: 'lower',
            attributeCase: 'lower',
            attributeQuotes: 'single',
            format: true,
            inlineBreak: 2,
            selfClosingStyle: 'xhtml'
        };
        const expandOptions = (0, emmetHelper_1.getExpandOptions)('html', { syntaxProfiles: { html: profile } });
        Object.keys(profile).forEach(key => {
            assert_1.default.strictEqual(expandOptions.options[`output.${key}`], profile[key]);
        });
    });
    (0, mocha_1.it)('should use profile from settings that overrides the ones from extensionsPath', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const profile = {
            tag_case: 'lower',
            attr_case: 'lower',
            attr_quotes: 'single',
            tag_nl: true,
            inline_break: 2,
            self_closing_tag: 'xhtml'
        };
        const expandOptions = (0, emmetHelper_1.getExpandOptions)('html', { syntaxProfiles: { html: profile } });
        assert_1.default.strictEqual(expandOptions.options['output.tagCase'], 'lower');
        assert_1.default.strictEqual(profile['tag_case'], 'lower');
    }));
});
(0, mocha_1.describe)('Test variables settings', () => {
    (0, mocha_1.it)('should take in variables as is', () => {
        const variables = {
            lang: 'de',
            charset: 'UTF-8'
        };
        const expandOptions = (0, emmetHelper_1.getExpandOptions)('html', { variables });
        Object.keys(variables).forEach(key => {
            assert_1.default.strictEqual(expandOptions.variables[key], variables[key]);
        });
    });
    (0, mocha_1.it)('should use variables from the extensionsPath', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const expandOptions = (0, emmetHelper_1.getExpandOptions)('html', {});
        assert_1.default.strictEqual(expandOptions.variables['lang'], 'fr');
    }));
    (0, mocha_1.it)('should use given variables that override ones from extensionsPath', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const variables = {
            lang: 'en',
            charset: 'UTF-8'
        };
        const expandOptions = (0, emmetHelper_1.getExpandOptions)('html', { variables });
        assert_1.default.strictEqual(expandOptions.variables['lang'], variables['lang']);
    }));
});
(0, mocha_1.describe)('Test custom snippets', () => {
    (0, mocha_1.it)('should use custom snippets for given syntax from extensionsPath', () => __awaiter(void 0, void 0, void 0, function* () {
        const customSnippetKey = 'ch';
        yield updateExtensionsPath([]);
        const expandOptionsWithoutCustomSnippets = (0, emmetHelper_1.getExpandOptions)('css');
        (0, assert_1.default)(!expandOptionsWithoutCustomSnippets.snippets);
        // Use custom snippets from extensionsPath
        yield updateExtensionsPath(extensionsPath);
        const expandOptionsWithCustomSnippets = (0, emmetHelper_1.getExpandOptions)('css');
        assert_1.default.ok(expandOptionsWithCustomSnippets.snippets);
        assert_1.default.strictEqual(Object.keys(expandOptionsWithCustomSnippets.snippets).some(key => key === customSnippetKey), true);
    }));
    (0, mocha_1.it)('should use custom snippets inherited from base syntax from extensionsPath', () => __awaiter(void 0, void 0, void 0, function* () {
        const customSnippetKey = 'ch';
        yield updateExtensionsPath([]);
        const expandOptionsWithoutCustomSnippets = (0, emmetHelper_1.getExpandOptions)('scss');
        (0, assert_1.default)(!expandOptionsWithoutCustomSnippets.snippets);
        // Use custom snippets from extensionsPath
        yield updateExtensionsPath(extensionsPath);
        const expandOptionsWithCustomSnippets = (0, emmetHelper_1.getExpandOptions)('css');
        const expandOptionsWithCustomSnippetsInheritedSyntax = (0, emmetHelper_1.getExpandOptions)('scss');
        assert_1.default.ok(expandOptionsWithCustomSnippets.snippets);
        assert_1.default.ok(expandOptionsWithCustomSnippetsInheritedSyntax.snippets);
        assert_1.default.strictEqual(Object.keys(expandOptionsWithCustomSnippets.snippets).some(key => key === customSnippetKey), true);
        assert_1.default.strictEqual(Object.keys(expandOptionsWithCustomSnippetsInheritedSyntax.snippets).some(key => key === customSnippetKey), true);
    }));
    (0, mocha_1.it)('should use custom snippets for given syntax in the absence of base syntax from extensionsPath', () => __awaiter(void 0, void 0, void 0, function* () {
        const customSnippetKey = 'ch';
        yield updateExtensionsPath([]);
        const expandOptionsWithoutCustomSnippets = (0, emmetHelper_1.getExpandOptions)('scss');
        (0, assert_1.default)(!expandOptionsWithoutCustomSnippets.snippets);
        // Use custom snippets from extensionsPath
        yield updateExtensionsPath([path.join(path.normalize(path.join(__dirname, '../../..')), 'testData', 'custom-snippets-without-inheritance')]);
        const expandOptionsWithCustomSnippets = (0, emmetHelper_1.getExpandOptions)('scss');
        assert_1.default.ok(expandOptionsWithCustomSnippets.snippets);
        assert_1.default.strictEqual(Object.keys(expandOptionsWithCustomSnippets.snippets).some(key => key === customSnippetKey), true);
    }));
    (0, mocha_1.it)('should throw error when snippets file from extensionsPath has invalid json', () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidJsonPath = path.join(path.normalize(path.join(__dirname, '../../..')), 'testData', 'custom-snippets-invalid-json');
        try {
            yield updateExtensionsPath([invalidJsonPath]);
            return Promise.reject('There should be an error as snippets file contained invalid json');
        }
        catch (e) {
            assert_1.default.ok(e);
        }
    }));
    (0, mocha_1.it)('should reset custom snippets when no extensionsPath is given', () => __awaiter(void 0, void 0, void 0, function* () {
        const customSnippetKey = 'ch';
        yield updateExtensionsPath(extensionsPath);
        assert_1.default.strictEqual(Object.keys((0, emmetHelper_1.getExpandOptions)('scss').snippets).some(key => key === customSnippetKey), true);
        yield updateExtensionsPath([]);
        assert_1.default.ok(!(0, emmetHelper_1.getExpandOptions)('scss').snippets, 'There should be no custom snippets as extensionPath was not given');
    }));
    (0, mocha_1.it)('should do nothing when non-existent extensionsPath is given', () => __awaiter(void 0, void 0, void 0, function* () {
        const customSnippetKey = 'ch';
        yield updateExtensionsPath(extensionsPath);
        assert_1.default.strictEqual(Object.keys((0, emmetHelper_1.getExpandOptions)('scss').snippets).some(key => key === customSnippetKey), true);
        try {
            yield updateExtensionsPath(["./this/is/not/valid"]);
            assert_1.default.ok(!(0, emmetHelper_1.getExpandOptions)('scss').snippets, 'There should be no custom snippets as extensionPath was faulty');
        }
        catch (e) {
            throw new Error('There should not be an error');
        }
    }));
    (0, mocha_1.it)('should do nothing when directory with no snippets is given', () => __awaiter(void 0, void 0, void 0, function* () {
        const customSnippetKey = 'ch';
        yield updateExtensionsPath(extensionsPath);
        const foundCustomSnippet = Object.keys((0, emmetHelper_1.getExpandOptions)('scss').snippets)
            .some(key => key === customSnippetKey);
        assert_1.default.strictEqual(foundCustomSnippet, true);
        const extensionsPathParent = path.join(path.normalize(path.join(__dirname, '../../..')), 'testData');
        try {
            yield updateExtensionsPath([extensionsPathParent]);
            assert_1.default.ok(!(0, emmetHelper_1.getExpandOptions)('scss').snippets, 'There should be no custom snippets as extensionPath was faulty');
        }
        catch (e) {
            throw new Error('There should not be an error');
        }
    }));
    // https://github.com/microsoft/vscode/issues/116741
    (0, mocha_1.it)('should use the first valid custom snippets from an array of extensions path', () => __awaiter(void 0, void 0, void 0, function* () {
        const customSnippetKey = 'ch';
        yield updateExtensionsPath([]);
        const expandOptionsWithoutCustomSnippets = (0, emmetHelper_1.getExpandOptions)('css');
        (0, assert_1.default)(!expandOptionsWithoutCustomSnippets.snippets);
        // Use custom snippets from extensionsPathArray
        const extensionsPathArray = ["./this/is/not/valid"].concat(extensionsPath);
        yield updateExtensionsPath(extensionsPathArray);
        const expandOptionsWithCustomSnippets = (0, emmetHelper_1.getExpandOptions)('css');
        assert_1.default.ok(expandOptionsWithCustomSnippets.snippets);
        assert_1.default.strictEqual(Object.keys(expandOptionsWithCustomSnippets.snippets).some(key => key === customSnippetKey), true);
    }));
    // https://github.com/microsoft/vscode/issues/117515
    (0, mocha_1.it)('should override earlier snippets with later snippets', () => __awaiter(void 0, void 0, void 0, function* () {
        const extensionsPathArray = [
            path.join(path.normalize(path.join(__dirname, '../../..')), 'testData', 'custom-snippets-profile'),
            path.join(path.normalize(path.join(__dirname, '../../..')), 'testData', 'custom-snippets-without-inheritance')
        ];
        try {
            yield updateExtensionsPath(extensionsPathArray);
            const expandOptions = (0, emmetHelper_1.getExpandOptions)('css');
            assert_1.default.ok(expandOptions);
            assert_1.default.ok(expandOptions.snippets);
            assert_1.default.strictEqual(expandOptions.snippets['hello'], 'margin: 100px;');
        }
        catch (e) {
            throw new Error('There should not be an error');
        }
    }));
    // https://github.com/microsoft/vscode/issues/120435
    (0, mocha_1.it)('should do nothing when all extensionsPath in the array are invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const extensionsPathArray = ["./this/is/not/valid", "./this/is/also/not/valid"];
        try {
            yield updateExtensionsPath(extensionsPathArray);
        }
        catch (e) {
            throw new Error('There should not be an error');
        }
    }));
    // https://github.com/microsoft/vscode/issues/130868
    (0, mocha_1.it)('should still suggest link:css snippet', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, 'lin');
        const position = vscode_languageserver_types_1.Position.create(0, 3);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: true,
            syntaxProfiles: {},
            variables: {}
        });
        assert_1.default.ok(completionList);
        assert_1.default.ok(completionList.items.some(y => y.label === 'link'), 'No link suggestion given.');
        assert_1.default.ok(completionList.items.some(y => y.label === 'link:css'), 'No link:css suggestion given.');
    }));
});
(0, mocha_1.describe)('Test emmet preferences', () => {
    (0, mocha_1.it)('should use stylesheet preferences', () => {
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('m10', (0, emmetHelper_1.getExpandOptions)('css', { preferences: { 'css.propertyEnd': ';;' } })), 'margin: 10px;;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('m10', (0, emmetHelper_1.getExpandOptions)('scss', { preferences: { 'scss.valueSeparator': '::' } })), 'margin::10px;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('m10', (0, emmetHelper_1.getExpandOptions)('less', { preferences: { 'css.intUnit': 'pt' } })), 'margin: 10pt;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('m10.2', (0, emmetHelper_1.getExpandOptions)('css', { preferences: { 'css.floatUnit': 'ex' } })), 'margin: 10.2ex;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('m10r', (0, emmetHelper_1.getExpandOptions)('css', { preferences: { 'css.unitAliases': 'e:em, p:%,r: /rem' } })), 'margin: 10 /rem;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('m10p', (0, emmetHelper_1.getExpandOptions)('css', { preferences: { 'css.unitAliases': 'e:em, p:%,r: /rem' } })), 'margin: 10%;');
    });
});
(0, mocha_1.describe)('Test filters (bem and comment)', () => {
    (0, mocha_1.it)('should expand haml', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('ul[data="class"]', (0, emmetHelper_1.getExpandOptions)('haml', {})), '%ul(data="class") ${0}');
    }));
    (0, mocha_1.it)('should expand attributes with []', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('div[[a]="b"]', (0, emmetHelper_1.getExpandOptions)('html', {})), '<div [a]="b">${0}</div>');
    }));
    (0, mocha_1.it)('should expand abbreviations that are nodes with no name', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('c', (0, emmetHelper_1.getExpandOptions)('html', {})), '<!-- ${0} -->');
    }));
    (0, mocha_1.it)('should use filters from expandOptions', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)(bemFilterExample, (0, emmetHelper_1.getExpandOptions)('html', {}, 'bem')), expectedBemFilterOutput);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)(commentFilterExample, (0, emmetHelper_1.getExpandOptions)('html', {}, 'c')), expectedCommentFilterOutput);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)(bemCommentFilterExample, (0, emmetHelper_1.getExpandOptions)('html', {}, 'bem,c')), expectedBemCommentFilterOutput);
    }));
    (0, mocha_1.it)('should use filters from syntaxProfiles', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)(bemFilterExample, (0, emmetHelper_1.getExpandOptions)('html', {
            syntaxProfiles: {
                html: {
                    filters: 'html, bem'
                }
            }
        })), expectedBemFilterOutput);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)(commentFilterExample, (0, emmetHelper_1.getExpandOptions)('html', {
            syntaxProfiles: {
                html: {
                    filters: 'html, c'
                }
            }
        })), expectedCommentFilterOutput);
    }));
});
(0, mocha_1.describe)('Test completions', () => {
    (0, mocha_1.it)('should provide multiple common tags completions in html', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, 'd');
        const position = vscode_languageserver_types_1.Position.create(0, 1);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: true,
            syntaxProfiles: {},
            variables: {}
        });
        const expectedItems = ['dl', 'dt', 'dd', 'div'];
        assert_1.default.ok(completionList);
        assert_1.default.ok(expectedItems.every(x => completionList.items.some(y => y.label === x)), 'All common tags starting with d not found');
    }));
    (0, mocha_1.it)('should provide multiple snippet suggestions in html', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, 'a:');
        const position = vscode_languageserver_types_1.Position.create(0, 2);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: true,
            syntaxProfiles: {},
            variables: {}
        });
        const expectedItems = ['a:link', 'a:mail', 'a:tel'];
        assert_1.default.ok(completionList);
        assert_1.default.ok(expectedItems.every(x => completionList.items.some(y => y.label === x)), 'All snippet suggestions for a: not found');
    }));
    (0, mocha_1.it)('should not provide any suggestions in html for class names or id', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = ['div.col', 'div#col'];
        testCases.forEach(abbr => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, abbr);
            const position = vscode_languageserver_types_1.Position.create(0, abbr.length);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: true,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.ok(completionList.items.every(x => x.label !== 'colg'), `colg is not a valid suggestion for ${abbr}`);
        });
    }));
    (0, mocha_1.it)('should provide multiple snippet suggestions in html for nested abbreviations', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = ['ul>a:', 'ul+a:'];
        testCases.forEach(abbr => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, abbr);
            const position = vscode_languageserver_types_1.Position.create(0, abbr.length);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: true,
                syntaxProfiles: {},
                variables: {}
            });
            const expectedItems = ['a:link', 'a:mail', 'a:tel'];
            assert_1.default.ok(completionList);
            assert_1.default.ok(expectedItems.every(x => completionList.items.some(y => y.label === x)), 'All snippet suggestions for a: not found');
        });
    }));
    (0, mocha_1.it)('should not provide link:m as a suggestion', () => __awaiter(void 0, void 0, void 0, function* () {
        // https://github.com/microsoft/vscode/issues/66680
        yield updateExtensionsPath([]);
        const abbr = 'link:m';
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, abbr);
        const position = vscode_languageserver_types_1.Position.create(0, abbr.length);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: true,
            syntaxProfiles: {},
            variables: {}
        });
        assert_1.default.ok(completionList);
        assert_1.default.strictEqual(completionList.items.every(x => x.label !== 'link:m'), true);
    }));
    (0, mocha_1.it)('should not provide marginright as a suggestion SCSS', () => __awaiter(void 0, void 0, void 0, function* () {
        // https://github.com/microsoft/vscode-emmet-helper/issues/42
        yield updateExtensionsPath([]);
        const abbr = 'marginright';
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.scss', 'scss', 0, abbr);
        const position = vscode_languageserver_types_1.Position.create(0, abbr.length);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'scss', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: true,
            syntaxProfiles: {},
            variables: {}
        });
        assert_1.default.strictEqual(completionList, undefined);
    }));
    (0, mocha_1.it)('should provide completions html', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const bemFilterExampleWithInlineFilter = bemFilterExample + '|bem';
        const commentFilterExampleWithInlineFilter = commentFilterExample + '|c';
        const bemCommentFilterExampleWithInlineFilter = bemCommentFilterExample + '|bem|c';
        const commentBemFilterExampleWithInlineFilter = bemCommentFilterExample + '|c|bem';
        const testCases = [
            ['<div>ul>li*3</div>', 0, 7, 'ul', '<ul>|</ul>', '<ul>\${0}</ul>'],
            ['<div>UL</div>', 0, 7, 'UL', '<UL>|</UL>', '<UL>\${0}</UL>'],
            ['<div>ul>li*3</div>', 0, 10, 'ul>li', '<ul>\n\t<li>|</li>\n</ul>', '<ul>\n\t<li>\${0}</li>\n</ul>'],
            ['<div>(ul>li)*3</div>', 0, 14, '(ul>li)*3', '<ul>\n\t<li>|</li>\n</ul>\n<ul>\n\t<li>|</li>\n</ul>\n<ul>\n\t<li>|</li>\n</ul>', '<ul>\n\t<li>\${1}</li>\n</ul>\n<ul>\n\t<li>\${2}</li>\n</ul>\n<ul>\n\t<li>\${0}</li>\n</ul>'],
            ['<div>custom-tag</div>', 0, 15, 'custom-tag', '<custom-tag>|</custom-tag>', '<custom-tag>\${0}</custom-tag>'],
            ['<div>custom:tag</div>', 0, 15, 'custom:tag', '<custom:tag>|</custom:tag>', '<custom:tag>\${0}</custom:tag>'],
            ['<div>sp</div>', 0, 7, 'span', '<span>|</span>', '<span>\${0}</span>'],
            ['<div>SP</div>', 0, 7, 'SPan', '<SPan>|</SPan>', '<SPan>\${0}</SPan>'],
            ['<div>u-l-z</div>', 0, 10, 'u-l-z', '<u-l-z>|</u-l-z>', '<u-l-z>\${0}</u-l-z>'],
            ['<div>div.foo_</div>', 0, 13, 'div.foo_', '<div class="foo_">|</div>', '<div class="foo_">\${0}</div>'],
            [bemFilterExampleWithInlineFilter, 0, bemFilterExampleWithInlineFilter.length, bemFilterExampleWithInlineFilter, expectedBemFilterOutputDocs, expectedBemFilterOutput],
            [commentFilterExampleWithInlineFilter, 0, commentFilterExampleWithInlineFilter.length, commentFilterExampleWithInlineFilter, expectedCommentFilterOutputDocs, expectedCommentFilterOutput],
            [bemCommentFilterExampleWithInlineFilter, 0, bemCommentFilterExampleWithInlineFilter.length, bemCommentFilterExampleWithInlineFilter, expectedBemCommentFilterOutputDocs, expectedBemCommentFilterOutput],
            [commentBemFilterExampleWithInlineFilter, 0, commentBemFilterExampleWithInlineFilter.length, commentBemFilterExampleWithInlineFilter, expectedBemCommentFilterOutputDocs, expectedBemCommentFilterOutput],
            ['li*2+link:css', 0, 13, 'li*2+link:css', '<li>|</li>\n<li>|</li>\n<link rel="stylesheet" href="style.css">', '<li>\${1}</li>\n<li>\${2}</li>\n<link rel="stylesheet" href="\${4:style}.css">'],
            ['li*10', 0, 5, 'li*10', '<li>|</li>\n<li>|</li>\n<li>|</li>\n<li>|</li>\n<li>|</li>\n<li>|</li>\n<li>|</li>\n<li>|</li>\n<li>|</li>\n<li>|</li>',
                '<li>\${1}</li>\n<li>\${2}</li>\n<li>\${3}</li>\n<li>\${4}</li>\n<li>\${5}</li>\n<li>\${6}</li>\n<li>\${7}</li>\n<li>\${8}</li>\n<li>\${9}</li>\n<li>\${0}</li>'],
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedAbbr, expectedExpansionDocs, expectedExpansion]) => {
            var _a;
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items[0].label, expectedAbbr);
            assert_1.default.strictEqual(completionList.items[0].documentation, expectedExpansionDocs);
            assert_1.default.strictEqual((_a = completionList.items[0].textEdit) === null || _a === void 0 ? void 0 : _a.newText, expectedExpansion);
        });
    }));
    (0, mocha_1.it)('should provide completions css', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['trf', 'transform: ;'],
            ['trf:rx', 'transform: rotateX(angle);'],
            ['trfrx', 'transform: rotateX(angle);'],
            ['m10+p10', 'margin: 10px;\npadding: 10px;'],
            ['brs', 'border-radius: ;'],
            ['brs5', 'border-radius: 5px;'],
            ['brs10px', 'border-radius: 10px;'],
            ['p', 'padding: ;']
        ];
        const positionLine = 0;
        testCases.forEach(([abbreviation, expected]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, abbreviation);
            const position = vscode_languageserver_types_1.Position.create(positionLine, abbreviation.length);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'css', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items[0].label, expected);
            assert_1.default.strictEqual(completionList.items[0].filterText, abbreviation);
        });
    }));
    (0, mocha_1.it)('should not provide html completions for xml', () => __awaiter(void 0, void 0, void 0, function* () {
        // https://github.com/microsoft/vscode/issues/97632
        yield updateExtensionsPath([]);
        const testCases = ['a', 'bo', 'body'];
        const positionLine = 0;
        testCases.forEach(abbreviation => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.xml', 'xml', 0, abbreviation);
            const position = vscode_languageserver_types_1.Position.create(positionLine, abbreviation.length);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'xml', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: true,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.strictEqual(completionList, undefined);
        });
    }));
    (0, mocha_1.it)('should provide hex color completions css', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['#1', '#111'],
            ['#ab', '#ababab'],
            ['#abc', '#abc'],
            ['c:#1', 'color: #111;'],
            ['c:#1a', 'color: #1a1a1a;'],
            ['bgc:1', 'background-color: 1px;'],
            ['c:#0.1', 'color: rgba(0, 0, 0, 0.1);']
        ];
        const positionLine = 0;
        testCases.forEach(([abbreviation, expected]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, abbreviation);
            const position = vscode_languageserver_types_1.Position.create(positionLine, abbreviation.length);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'css', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items[0].label, expected);
            assert_1.default.strictEqual(completionList.items[0].filterText, abbreviation);
        });
    }));
    mocha_1.it.skip('should provide empty incomplete completion list for abbreviations that just have the vendor prefix', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['-', 0, 1],
            ['-m-', 0, 3],
            ['-s-', 0, 3],
            ['-o-', 0, 3],
            ['-w-', 0, 3],
            ['-ow-', 0, 4],
            ['-mw-', 0, 4],
            ['-mo', 0, 3],
        ];
        testCases.forEach(([abbreviation, positionLine, positionChar]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, abbreviation);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'css', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items.length, 0, completionList.items.length ? completionList.items[0].label : 'all good');
            assert_1.default.strictEqual(completionList.isIncomplete, true);
        });
    }));
    (0, mocha_1.it)('should provide completions for text that are prefix for snippets, ensure $ doesnt get escaped', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['<div> l </div>', 0, 7]
        ];
        testCases.forEach(([content, positionLine, positionChar]) => {
            var _a, _b;
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: true,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items.find(x => x.label === 'link').documentation, '<link rel="stylesheet" href="|">');
            assert_1.default.strictEqual((_a = completionList.items.find(x => x.label === 'link').textEdit) === null || _a === void 0 ? void 0 : _a.newText, '<link rel="stylesheet" href="${0}">');
            assert_1.default.strictEqual(completionList.items.find(x => x.label === 'link:css').documentation, '<link rel="stylesheet" href="style.css">');
            assert_1.default.strictEqual((_b = completionList.items.find(x => x.label === 'link:css').textEdit) === null || _b === void 0 ? void 0 : _b.newText, '<link rel="stylesheet" href="${2:style}.css">');
        });
    }));
    (0, mocha_1.it)('should provide completions for scss', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['m:a', 0, 3]
        ];
        testCases.forEach(([content, positionLine, positionChar]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.scss', 'scss', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'scss', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items.find(x => x.label === 'margin: auto;').documentation, 'margin: auto;');
        });
    }));
    (0, mocha_1.it)('should provide completions with escaped $ in scss', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['bgi$hello', 0, 9]
        ];
        testCases.forEach(([content, positionLine, positionChar]) => {
            var _a;
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.scss', 'scss', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'scss', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items.find(x => x.label === 'background-image: $hello;').documentation, 'background-image: $hello;');
            assert_1.default.strictEqual((_a = completionList.items.find(x => x.label === 'background-image: $hello;').textEdit) === null || _a === void 0 ? void 0 : _a.newText, 'background-image: \\$hello;');
        });
    }));
    (0, mocha_1.it)('should provide completions with escaped $ in html', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['span{\\$5}', 0, 9, '<span>$5</span>', '<span>\\$5</span>'],
            ['span{\\$hello}', 0, 13, '<span>$hello</span>', '<span>\\$hello</span>']
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedDoc, expectedSnippetText]) => {
            var _a;
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items.find(x => x.label === content).documentation, expectedDoc);
            assert_1.default.strictEqual((_a = completionList.items.find(x => x.label === content).textEdit) === null || _a === void 0 ? void 0 : _a.newText, expectedSnippetText);
        });
    }));
    (0, mocha_1.it)('should provide completions using custom snippets html', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const testCases = [
            ['<div>hey</div>', 0, 8, 'hey', '<ul>\n\t<li><span class="hello">|</span></li>\n\t<li><span class="hello">|</span></li>\n</ul>']
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedAbbr, expectedExpansion]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {
                    'html': {
                        'tag_case': 'lower'
                    }
                },
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items[0].label, expectedAbbr);
            assert_1.default.strictEqual(completionList.items[0].documentation, expectedExpansion);
        });
    }));
    (0, mocha_1.it)('should provide completions using custom snippets css and unit aliases', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const testCases = [
            ['hel', 0, 3, 'hello', 'margin: 10px;', undefined],
            ['hello', 0, 5, 'hello', 'margin: 10px;', undefined],
            ['m10p', 0, 4, 'margin: 10%;', 'margin: 10%;', 'm10p'],
            ['m10e', 0, 4, 'margin: 10hi;', 'margin: 10hi;', 'm10e'],
            ['m10h', 0, 4, 'margin: 10hello;', 'margin: 10hello;', 'm10h'],
            ['p10-20', 0, 6, 'padding: 10px 20px;', 'padding: 10px 20px;', 'p10-20'] // The - in the number range will result in filtering this item out, so filter text should match abbreviation
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedAbbr, expectedExpansion, expectedFilterText]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'css', {
                preferences: {
                    'css.unitAliases': 'e:hi,h:hello'
                },
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items[0].label, expectedAbbr);
            assert_1.default.strictEqual(completionList.items[0].documentation, expectedExpansion);
            assert_1.default.strictEqual(completionList.items[0].filterText, expectedFilterText);
        });
    }));
    (0, mocha_1.it)('should provide both custom and default snippet completion when partial match with custom snippet', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const expandOptions = {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: false,
            syntaxProfiles: {},
            variables: {}
        };
        const completionList1 = (0, emmetHelper_1.doComplete)(vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, 'm'), vscode_languageserver_types_1.Position.create(0, 1), 'css', expandOptions);
        const completionList2 = (0, emmetHelper_1.doComplete)(vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, 'mr'), vscode_languageserver_types_1.Position.create(0, 2), 'css', expandOptions);
        assert_1.default.ok(completionList1);
        assert_1.default.strictEqual(completionList1.items.some(x => x.label === 'margin: ;'), true);
        assert_1.default.strictEqual(completionList1.items.some(x => x.label === 'mrgstart'), true);
        assert_1.default.ok(completionList2);
        assert_1.default.strictEqual(completionList2.items.some(x => x.label === 'margin-right: ;'), true);
        assert_1.default.strictEqual(completionList2.items.some(x => x.label === 'mrgstart'), true);
    }));
    (0, mocha_1.it)('should not provide completions as they would noise when typing (html)', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['<div>abc</div>', 0, 8],
            ['<div>Abc</div>', 0, 8],
            ['<div>abc12</div>', 0, 10],
            ['<div>abc.</div>', 0, 9],
            ['<div>(div)</div>', 0, 10],
            ['<div>($db)</div>', 0, 10],
            ['<div>($db.)</div>', 0, 11],
            ['<div>ul::l</div>', 0, 10],
            ['<div', 0, 4],
            ['<div>ul:</div>', 0, 8] // https://github.com/Microsoft/vscode/issues/49376
        ];
        testCases.forEach(([content, positionLine, positionChar]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.strictEqual(!completionList, true, (completionList && completionList.items.length > 0) ? completionList.items[0].label + ' should not show up' : 'All good');
        });
    }));
    (0, mocha_1.it)('should provide completions for pascal-case tags when typing (jsx)', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['<div>Router</div>', 0, 11, 'Router', '<Router>|</Router>',],
            ['<div>MyAwesomeComponent</div>', 0, 23, 'MyAwesomeComponent', '<MyAwesomeComponent>|</MyAwesomeComponent>'],
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedAbbr, expectedExpansion]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.jsx', 'jsx', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'jsx', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items[0].label, expectedAbbr);
            assert_1.default.strictEqual(completionList.items[0].documentation, expectedExpansion);
        });
    }));
    (0, mocha_1.it)('should not provide completions as they would noise when typing (css)', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const testCases = [
            ['background', 0, 10],
            ['font-family', 0, 11],
            ['width', 0, 5],
            ['background:u', 0, 12],
            ['text-overflo', 0, 12] // Partial match with property name
        ];
        testCases.forEach(([content, positionLine, positionChar]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'css', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.strictEqual(!completionList || !completionList.items || !completionList.items.length, true, (completionList && completionList.items.length > 0) ? completionList.items[0].label + ' should not show up' : 'All good');
        });
    }));
    (0, mocha_1.it)('should provide completions for loremn with n words', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, '.item>lorem10');
        const position = vscode_languageserver_types_1.Position.create(0, 13);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: false,
            syntaxProfiles: {},
            variables: {}
        });
        assert_1.default.ok(completionList);
        const expandedText = completionList.items[0].documentation;
        if (typeof expandedText !== 'string') {
            return;
        }
        const matches = expandedText.match(/<div class="item">(.*)<\/div>/);
        assert_1.default.strictEqual(completionList.items[0].label, '.item>lorem10');
        assert_1.default.ok(matches);
        assert_1.default.strictEqual(matches[1].split(' ').length, 10);
        assert_1.default.strictEqual(matches[1].startsWith('Lorem'), true);
    }));
    (0, mocha_1.it)('should provide completions for lorem*n with n lines', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, 'lorem*3');
        const position = vscode_languageserver_types_1.Position.create(0, 12);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: false,
            syntaxProfiles: {},
            variables: {}
        });
        assert_1.default.ok(completionList);
        const expandedText = completionList.items[0].documentation;
        if (typeof expandedText !== 'string') {
            return;
        }
        assert_1.default.strictEqual(completionList.items[0].label, 'lorem*3');
        assert_1.default.strictEqual(expandedText.split('\n').length, 3);
        assert_1.default.strictEqual(expandedText.startsWith('Lorem'), true);
    }));
    (0, mocha_1.it)('should provide completions for lorem*2 with 2 lines', () => __awaiter(void 0, void 0, void 0, function* () {
        // https://github.com/microsoft/vscode/issues/52345
        yield updateExtensionsPath([]);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, 'lorem*2');
        const position = vscode_languageserver_types_1.Position.create(0, 12);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: false,
            syntaxProfiles: {},
            variables: {}
        });
        assert_1.default.ok(completionList);
        const expandedText = completionList.items[0].documentation;
        if (typeof expandedText !== 'string') {
            return;
        }
        assert_1.default.strictEqual(completionList.items[0].label, 'lorem*2');
        assert_1.default.strictEqual(expandedText.split('\n').length, 2);
        assert_1.default.strictEqual(expandedText.startsWith('Lorem'), true);
    }));
    mocha_1.it.skip('should provide completions using vendor prefixes', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const testCases = [
            ['brs', 0, 3, 'border-radius: ;', 'border-radius: |;', 'brs'],
            ['brs5', 0, 4, 'border-radius: 5px;', 'border-radius: 5px;', 'brs5'],
            ['-brs', 0, 4, 'border-radius: ;', '-webkit-border-radius: |;\n-moz-border-radius: |;\nborder-radius: |;', '-brs'],
            ['-mo-brs', 0, 7, 'border-radius: ;', '-moz-border-radius: |;\n-o-border-radius: |;\nborder-radius: |;', '-mo-brs'],
            ['-om-brs', 0, 7, 'border-radius: ;', '-o-border-radius: |;\n-moz-border-radius: |;\nborder-radius: |;', '-om-brs'],
            ['-brs10', 0, 6, 'border-radius: 10px;', '-webkit-border-radius: 10px;\n-moz-border-radius: 10px;\nborder-radius: 10px;', '-brs10'],
            ['-bdts', 0, 5, 'border-top-style: ;', '-webkit-border-top-style: |;\n-moz-border-top-style: |;\n-ms-border-top-style: |;\n-o-border-top-style: |;\nborder-top-style: |;', '-bdts'],
            ['-p', 0, 2, 'padding: ;', '-webkit-padding: |;\n-moz-padding: |;\n-ms-padding: |;\n-o-padding: |;\npadding: |;', '-p'],
            ['-p10-20p', 0, 8, 'padding: 10px 20%;', '-webkit-padding: 10px 20%;\n-moz-padding: 10px 20%;\n-ms-padding: 10px 20%;\n-o-padding: 10px 20%;\npadding: 10px 20%;', '-p10-20p'],
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedLabel, expectedExpansion, expectedFilterText]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'css', {
                preferences: {},
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items[0].label, expectedLabel);
            assert_1.default.strictEqual(completionList.items[0].documentation, expectedExpansion);
            assert_1.default.strictEqual(completionList.items[0].filterText, expectedFilterText);
        });
    }));
    mocha_1.it.skip('should provide completions using vendor prefixes with custom preferences', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath(extensionsPath);
        const testCases = [
            ['brs', 0, 3, 'border-radius: ;', 'border-radius: |;', 'brs'],
            ['brs5', 0, 4, 'border-radius: 5px;', 'border-radius: 5px;', 'brs5'],
            ['-brs', 0, 4, 'border-radius: ;', '-webkit-border-radius: |;\nborder-radius: |;', '-brs'],
            ['-mo-brs', 0, 7, 'border-radius: ;', '-moz-border-radius: |;\n-o-border-radius: |;\nborder-radius: |;', '-mo-brs'],
            ['-bdts', 0, 5, 'border-top-style: ;', '-o-border-top-style: |;\nborder-top-style: |;', '-bdts'],
            ['-bdi', 0, 4, 'border-image: url();', '-webkit-border-image: url(|);\n-moz-border-image: url(|);\n-ms-border-image: url(|);\n-o-border-image: url(|);\nborder-image: url(|);', '-bdi']
        ];
        testCases.forEach(([content, positionLine, positionChar, expectedLabel, expectedExpansion, expectedFilterText]) => {
            const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.css', 'css', 0, content);
            const position = vscode_languageserver_types_1.Position.create(positionLine, positionChar);
            const completionList = (0, emmetHelper_1.doComplete)(document, position, 'css', {
                preferences: {
                    'css.webkitProperties': 'foo, bar,padding , border-radius',
                    'css.mozProperties': '',
                    'css.oProperties': 'border-top-style',
                },
                showExpandedAbbreviation: 'always',
                showAbbreviationSuggestions: false,
                syntaxProfiles: {},
                variables: {}
            });
            assert_1.default.ok(completionList);
            assert_1.default.strictEqual(completionList.items[0].label, expectedLabel);
            assert_1.default.strictEqual(completionList.items[0].documentation, expectedExpansion);
            assert_1.default.strictEqual(completionList.items[0].filterText, expectedFilterText);
        });
    }));
    mocha_1.it.skip('should expand with multiple vendor prefixes', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('brs', (0, emmetHelper_1.getExpandOptions)('css', {})), 'border-radius: ${0};');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('brs5', (0, emmetHelper_1.getExpandOptions)('css', {})), 'border-radius: 5px;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('brs10px', (0, emmetHelper_1.getExpandOptions)('css', {})), 'border-radius: 10px;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-brs', (0, emmetHelper_1.getExpandOptions)('css', {})), '-webkit-border-radius: ${0};\n-moz-border-radius: ${0};\nborder-radius: ${0};');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-brs10', (0, emmetHelper_1.getExpandOptions)('css', {})), '-webkit-border-radius: 10px;\n-moz-border-radius: 10px;\nborder-radius: 10px;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-bdts', (0, emmetHelper_1.getExpandOptions)('css', {})), '-webkit-border-top-style: ${0};\n-moz-border-top-style: ${0};\n-ms-border-top-style: ${0};\n-o-border-top-style: ${0};\nborder-top-style: ${0};');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-bdts2px', (0, emmetHelper_1.getExpandOptions)('css', {})), '-webkit-border-top-style: 2px;\n-moz-border-top-style: 2px;\n-ms-border-top-style: 2px;\n-o-border-top-style: 2px;\nborder-top-style: 2px;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-p10-20', (0, emmetHelper_1.getExpandOptions)('css', {})), '-webkit-padding: 10px 20px;\n-moz-padding: 10px 20px;\n-ms-padding: 10px 20px;\n-o-padding: 10px 20px;\npadding: 10px 20px;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-p10p20', (0, emmetHelper_1.getExpandOptions)('css', {})), '-webkit-padding: 10% 20px;\n-moz-padding: 10% 20px;\n-ms-padding: 10% 20px;\n-o-padding: 10% 20px;\npadding: 10% 20px;');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-mo-brs', (0, emmetHelper_1.getExpandOptions)('css', {})), '-moz-border-radius: ${0};\n-o-border-radius: ${0};\nborder-radius: ${0};');
    }));
    mocha_1.it.skip('should expand with default vendor prefixes in properties', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-p', (0, emmetHelper_1.getExpandOptions)('css', { preferences: { 'css.webkitProperties': 'foo, bar, padding' } })), '-webkit-padding: ${0};\npadding: ${0};');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-p', (0, emmetHelper_1.getExpandOptions)('css', { preferences: { 'css.oProperties': 'padding', 'css.webkitProperties': 'padding' } })), '-webkit-padding: ${0};\n-o-padding: ${0};\npadding: ${0};');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-brs', (0, emmetHelper_1.getExpandOptions)('css', { preferences: { 'css.oProperties': 'padding', 'css.webkitProperties': 'padding', 'css.mozProperties': '', 'css.msProperties': '' } })), '-webkit-border-radius: ${0};\n-moz-border-radius: ${0};\n-ms-border-radius: ${0};\n-o-border-radius: ${0};\nborder-radius: ${0};');
        assert_1.default.strictEqual((0, emmetHelper_1.expandAbbreviation)('-o-p', (0, emmetHelper_1.getExpandOptions)('css', { preferences: { 'css.oProperties': 'padding', 'css.webkitProperties': 'padding' } })), '-o-padding: ${0};\npadding: ${0};');
    }));
    (0, mocha_1.it)('should not provide completions for excludedLanguages', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, 'ul>li');
        const position = vscode_languageserver_types_1.Position.create(0, 5);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: false,
            syntaxProfiles: {},
            variables: {},
            excludeLanguages: ['html']
        });
        assert_1.default.strictEqual(!completionList, true);
    }));
    (0, mocha_1.it)('should provide completions with kind snippet when showSuggestionsAsSnippets is enabled', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, 'ul>li');
        const position = vscode_languageserver_types_1.Position.create(0, 5);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: false,
            syntaxProfiles: {},
            variables: {},
            showSuggestionsAsSnippets: true
        });
        assert_1.default.ok(completionList);
        assert_1.default.strictEqual(completionList.items[0].kind, vscode_languageserver_types_1.CompletionItemKind.Snippet);
    }));
    (0, mocha_1.it)('should not provide double completions for commonly used tags that are also snippets', () => __awaiter(void 0, void 0, void 0, function* () {
        yield updateExtensionsPath([]);
        const document = vscode_languageserver_textdocument_1.TextDocument.create('test://test/test.html', 'html', 0, 'abb');
        const position = vscode_languageserver_types_1.Position.create(0, 3);
        const completionList = (0, emmetHelper_1.doComplete)(document, position, 'html', {
            preferences: {},
            showExpandedAbbreviation: 'always',
            showAbbreviationSuggestions: true,
            syntaxProfiles: {},
            variables: {},
            excludeLanguages: []
        });
        assert_1.default.ok(completionList);
        assert_1.default.strictEqual(completionList.items.length, 1);
        assert_1.default.strictEqual(completionList.items[0].label, 'abbr');
    }));
});
//# sourceMappingURL=emmetHelper.test.js.map