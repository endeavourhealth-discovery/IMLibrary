"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.renameInfoOptions = void 0;
const vscode = require("vscode-languageserver");
const shared = require("@volar/shared");
/* typescript-language-features is hardcode true */
exports.renameInfoOptions = { allowRenameOfImportPath: true };
function register(languageService, getTextDocument) {
    return (uri, position) => {
        const document = getTextDocument(uri);
        if (!document)
            return;
        const fileName = shared.uriToFsPath(document.uri);
        const offset = document.offsetAt(position);
        let renameInfo;
        try {
            renameInfo = languageService.getRenameInfo(fileName, offset, exports.renameInfoOptions);
        }
        catch { }
        if (!renameInfo)
            return;
        if (!renameInfo.canRename) {
            return new vscode.ResponseError(0, renameInfo.localizedErrorMessage);
        }
        return {
            start: document.positionAt(renameInfo.triggerSpan.start),
            end: document.positionAt(renameInfo.triggerSpan.start + renameInfo.triggerSpan.length),
        };
    };
}
exports.register = register;
//# sourceMappingURL=prepareRename.js.map