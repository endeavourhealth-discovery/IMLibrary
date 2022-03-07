"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
const rename_1 = require("./rename");
function register(languageService, getTextDocument, host) {
    return async (oldUri, newUri) => {
        var _a, _b, _c, _d;
        const document = getTextDocument(oldUri);
        const [formatOptions, preferences] = document ? await Promise.all([
            (_b = (_a = host.getFormatOptions) === null || _a === void 0 ? void 0 : _a.call(host, document)) !== null && _b !== void 0 ? _b : {},
            (_d = (_c = host.getPreferences) === null || _c === void 0 ? void 0 : _c.call(host, document)) !== null && _d !== void 0 ? _d : {},
        ]) : [{}, {}];
        const fileToRename = shared.uriToFsPath(oldUri);
        const newFilePath = shared.uriToFsPath(newUri);
        let response;
        try {
            response = languageService.getEditsForFileRename(fileToRename, newFilePath, formatOptions, preferences);
        }
        catch { }
        if (!(response === null || response === void 0 ? void 0 : response.length))
            return;
        const edits = (0, rename_1.fileTextChangesToWorkspaceEdit)(response, getTextDocument);
        return edits;
    };
}
exports.register = register;
//# sourceMappingURL=fileRename.js.map