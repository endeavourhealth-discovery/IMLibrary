"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const vscode = require("vscode-languageserver");
const previewer = require("../utils/previewer");
const shared = require("@volar/shared");
function register(languageService, getTextDocument, getTextDocument2, ts) {
    return (uri, position, documentOnly = false) => {
        var _a;
        const document = getTextDocument(uri);
        if (!document)
            return;
        const fileName = shared.uriToFsPath(document.uri);
        const offset = document.offsetAt(position);
        let info;
        try {
            info = languageService.getQuickInfoAtPosition(fileName, offset);
        }
        catch { }
        if (!info)
            return;
        const parts = [];
        const displayString = ts.displayPartsToString(info.displayParts);
        const documentation = previewer.markdownDocumentation((_a = info.documentation) !== null && _a !== void 0 ? _a : [], info.tags, { toResource: shared.fsPathToUri }, getTextDocument2);
        if (displayString && !documentOnly) {
            parts.push(['```typescript', displayString, '```'].join('\n'));
        }
        if (documentation) {
            parts.push(documentation);
        }
        const markdown = {
            kind: vscode.MarkupKind.Markdown,
            value: parts.join('\n\n'),
        };
        return {
            contents: markdown,
            range: vscode.Range.create(document.positionAt(info.textSpan.start), document.positionAt(info.textSpan.start + info.textSpan.length)),
        };
    };
}
exports.register = register;
//# sourceMappingURL=hover.js.map