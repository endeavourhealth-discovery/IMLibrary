"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
const vscode = require("vscode-languageserver");
function register(languageService, getTextDocument) {
    return (uri, positions) => {
        const document = getTextDocument(uri);
        if (!document)
            return [];
        const result = [];
        for (const position of positions) {
            const fileName = shared.uriToFsPath(document.uri);
            const offset = document.offsetAt(position);
            let range;
            try {
                range = languageService.getSmartSelectionRange(fileName, offset);
            }
            catch { }
            if (!range)
                continue;
            result.push(transformSelectionRange(range, document));
        }
        return result;
    };
}
exports.register = register;
function transformSelectionRange(range, document) {
    return {
        range: vscode.Range.create(document.positionAt(range.textSpan.start), document.positionAt(range.textSpan.start + range.textSpan.length)),
        parent: range.parent ? transformSelectionRange(range.parent, document) : undefined,
    };
}
//# sourceMappingURL=selectionRanges.js.map