"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
function register(languageService, getTextDocument, host) {
    return async (uri, options, range) => {
        var _a, _b;
        const document = getTextDocument(uri);
        if (!document)
            return [];
        const fileName = shared.uriToFsPath(document.uri);
        const tsOptions = (_b = await ((_a = host.getFormatOptions) === null || _a === void 0 ? void 0 : _a.call(host, document, options))) !== null && _b !== void 0 ? _b : options;
        let scriptEdits;
        try {
            scriptEdits = range
                ? languageService.getFormattingEditsForRange(fileName, document.offsetAt(range.start), document.offsetAt(range.end), tsOptions)
                : languageService.getFormattingEditsForDocument(fileName, tsOptions);
        }
        catch { }
        if (!scriptEdits)
            return [];
        const result = [];
        for (const textEdit of scriptEdits) {
            result.push({
                range: {
                    start: document.positionAt(textEdit.span.start),
                    end: document.positionAt(textEdit.span.start + textEdit.span.length),
                },
                newText: textEdit.newText,
            });
        }
        return result;
    };
}
exports.register = register;
//# sourceMappingURL=formatting.js.map