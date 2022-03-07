"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const vscode = require("vscode-languageserver");
const shared = require("@volar/shared");
function register(languageService, getTextDocument, ts) {
    return (uri, position) => {
        const document = getTextDocument(uri);
        if (!document)
            return [];
        const fileName = shared.uriToFsPath(document.uri);
        const offset = document.offsetAt(position);
        let highlights;
        try {
            highlights = languageService.getDocumentHighlights(fileName, offset, [fileName]);
        }
        catch { }
        if (!highlights)
            return [];
        const results = [];
        for (const highlight of highlights) {
            for (const span of highlight.highlightSpans) {
                results.push({
                    kind: span.kind === ts.HighlightSpanKind.writtenReference ? vscode.DocumentHighlightKind.Write : vscode.DocumentHighlightKind.Read,
                    range: {
                        start: document.positionAt(span.textSpan.start),
                        end: document.positionAt(span.textSpan.start + span.textSpan.length),
                    },
                });
            }
        }
        return results;
    };
}
exports.register = register;
//# sourceMappingURL=documentHighlight.js.map