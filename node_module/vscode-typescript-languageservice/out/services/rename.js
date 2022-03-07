"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileTextChangesToWorkspaceEdit = exports.register = void 0;
const vscode = require("vscode-languageserver");
const shared = require("@volar/shared");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const path = require("upath");
const prepareRename_1 = require("./prepareRename");
function register(languageService, getTextDocument, host) {
    return async (uri, position, newName) => {
        var _a, _b, _c, _d, _e, _f;
        const document = getTextDocument(uri);
        if (!document)
            return;
        const fileName = shared.uriToFsPath(document.uri);
        const offset = document.offsetAt(position);
        let renameInfo;
        try {
            renameInfo = languageService.getRenameInfo(fileName, offset, prepareRename_1.renameInfoOptions);
        }
        catch { }
        if (!(renameInfo === null || renameInfo === void 0 ? void 0 : renameInfo.canRename))
            return;
        if (renameInfo.fileToRename) {
            const [formatOptions, preferences] = await Promise.all([
                (_b = (_a = host.getFormatOptions) === null || _a === void 0 ? void 0 : _a.call(host, document)) !== null && _b !== void 0 ? _b : {},
                (_d = (_c = host.getPreferences) === null || _c === void 0 ? void 0 : _c.call(host, document)) !== null && _d !== void 0 ? _d : {},
            ]);
            return renameFile(renameInfo.fileToRename, newName, formatOptions, preferences);
        }
        const { providePrefixAndSuffixTextForRename } = (_f = await ((_e = host.getPreferences) === null || _e === void 0 ? void 0 : _e.call(host, document))) !== null && _f !== void 0 ? _f : { providePrefixAndSuffixTextForRename: true };
        const entries = languageService.findRenameLocations(fileName, offset, false, false, providePrefixAndSuffixTextForRename);
        if (!entries)
            return;
        const locations = locationsToWorkspaceEdit(newName, entries, getTextDocument);
        return locations;
    };
    function renameFile(fileToRename, newName, formatOptions, preferences) {
        // Make sure we preserve file extension if none provided
        if (!path.extname(newName)) {
            newName += path.extname(fileToRename);
        }
        const dirname = path.dirname(fileToRename);
        const newFilePath = path.join(dirname, newName);
        const response = languageService.getEditsForFileRename(fileToRename, newFilePath, formatOptions, preferences);
        const edits = fileTextChangesToWorkspaceEdit(response, getTextDocument);
        if (!edits.documentChanges) {
            edits.documentChanges = [];
        }
        edits.documentChanges.push(vscode.RenameFile.create(shared.fsPathToUri(fileToRename), shared.fsPathToUri(newFilePath)));
        return edits;
    }
}
exports.register = register;
function fileTextChangesToWorkspaceEdit(changes, getTextDocument) {
    const workspaceEdit = {};
    for (const change of changes) {
        if (!workspaceEdit.documentChanges) {
            workspaceEdit.documentChanges = [];
        }
        const uri = shared.fsPathToUri(change.fileName);
        let doc = getTextDocument(uri);
        if (change.isNewFile) {
            workspaceEdit.documentChanges.push(vscode.CreateFile.create(uri));
            doc = vscode_languageserver_textdocument_1.TextDocument.create(uri, 'typescript', 0, '');
        }
        if (!doc)
            continue;
        const docEdit = vscode.TextDocumentEdit.create({ uri: uri, version: doc.version }, []);
        for (const textChange of change.textChanges) {
            docEdit.edits.push({
                newText: textChange.newText,
                range: {
                    start: doc.positionAt(textChange.span.start),
                    end: doc.positionAt(textChange.span.start + textChange.span.length),
                },
            });
        }
        workspaceEdit.documentChanges.push(docEdit);
    }
    return workspaceEdit;
}
exports.fileTextChangesToWorkspaceEdit = fileTextChangesToWorkspaceEdit;
function locationsToWorkspaceEdit(newText, locations, getTextDocument) {
    const workspaceEdit = {};
    for (const location of locations) {
        if (!workspaceEdit.changes) {
            workspaceEdit.changes = {};
        }
        const uri = shared.fsPathToUri(location.fileName);
        const doc = getTextDocument(uri);
        if (!doc)
            continue;
        if (!workspaceEdit.changes[uri]) {
            workspaceEdit.changes[uri] = [];
        }
        let _newText = newText;
        if (location.prefixText)
            _newText = location.prefixText + _newText;
        if (location.suffixText)
            _newText = _newText + location.suffixText;
        workspaceEdit.changes[uri].push({
            newText: _newText,
            range: {
                start: doc.positionAt(location.textSpan.start),
                end: doc.positionAt(location.textSpan.start + location.textSpan.length),
            },
        });
    }
    return workspaceEdit;
}
//# sourceMappingURL=rename.js.map