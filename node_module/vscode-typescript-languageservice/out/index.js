"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLanguageService = exports.getTriggerCharacters = exports.getSemanticTokenLegend = void 0;
const completions = require("./services/completion");
const completions2 = require("./services/completion2");
const completionResolve = require("./services/completionResolve");
const definitions = require("./services/definition");
const typeDefinitions = require("./services/typeDefinition");
const references = require("./services/references");
const prepareRename = require("./services/prepareRename");
const rename = require("./services/rename");
const fileRename = require("./services/fileRename");
const codeActions = require("./services/codeAction");
const codeActionResolve = require("./services/codeActionResolve");
const hover = require("./services/hover");
const signatureHelp = require("./services/signatureHelp");
const selectionRanges = require("./services/selectionRanges");
const diagnostics = require("./services/diagnostics");
const documentHighlight = require("./services/documentHighlight");
const documentSymbol = require("./services/documentSymbol");
const workspaceSymbols = require("./services/workspaceSymbol");
const formatting = require("./services/formatting");
const semanticTokens = require("./services/semanticTokens");
const foldingRanges = require("./services/foldingRanges");
const callHierarchy = require("./services/callHierarchy");
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
const shared = require("@volar/shared");
var semanticTokens_1 = require("./services/semanticTokens");
Object.defineProperty(exports, "getSemanticTokenLegend", { enumerable: true, get: function () { return semanticTokens_1.getSemanticTokenLegend; } });
var completion_1 = require("./services/completion");
Object.defineProperty(exports, "getTriggerCharacters", { enumerable: true, get: function () { return completion_1.getTriggerCharacters; } });
const path = require("path");
function createLanguageService(ts, host, languageService) {
    const documents = shared.createPathMap();
    return {
        findDefinition: definitions.register(languageService, getValidTextDocument, getTextDocument),
        findTypeDefinition: typeDefinitions.register(languageService, getValidTextDocument, getTextDocument),
        findReferences: references.register(languageService, getValidTextDocument, getTextDocument),
        prepareRename: prepareRename.register(languageService, getValidTextDocument),
        doRename: rename.register(languageService, getValidTextDocument, host),
        getEditsForFileRename: fileRename.register(languageService, getValidTextDocument, host),
        getCodeActions: codeActions.register(languageService, getValidTextDocument, host),
        doCodeActionResolve: codeActionResolve.register(languageService, getValidTextDocument, host),
        findDocumentHighlights: documentHighlight.register(languageService, getValidTextDocument, ts),
        findDocumentSymbols: documentSymbol.register(languageService, getValidTextDocument),
        findWorkspaceSymbols: workspaceSymbols.register(languageService, getTextDocument),
        doComplete: completions2.register(languageService, getValidTextDocument, host, ts),
        doCompletionResolve: completionResolve.register(languageService, getValidTextDocument, getTextDocument, host),
        doHover: hover.register(languageService, getValidTextDocument, getTextDocument, ts),
        doFormatting: formatting.register(languageService, getValidTextDocument, host),
        getSignatureHelp: signatureHelp.register(languageService, getValidTextDocument, ts),
        getSelectionRanges: selectionRanges.register(languageService, getValidTextDocument),
        doValidation: diagnostics.register(languageService, getValidTextDocument, ts),
        getFoldingRanges: foldingRanges.register(languageService, getValidTextDocument, ts),
        getDocumentSemanticTokens: semanticTokens.register(languageService, getValidTextDocument, ts),
        callHierarchy: callHierarchy.register(languageService, getValidTextDocument),
        dispose,
        __internal__: {
            host,
            raw: languageService,
            getTextDocument,
            getValidTextDocument,
            doCompleteSync: completions.register(languageService, getValidTextDocument, ts),
        },
    };
    function getValidTextDocument(uri) {
        var _a;
        const fileName = shared.uriToFsPath(uri);
        if (!((_a = languageService.getProgram()) === null || _a === void 0 ? void 0 : _a.getSourceFile(fileName))) {
            return;
        }
        return getTextDocument(uri);
    }
    function getTextDocument(uri) {
        var _a;
        const fileName = shared.uriToFsPath(uri);
        const version = host.getScriptVersion(fileName);
        const oldDoc = documents.uriGet(uri);
        if (!oldDoc || oldDoc[0] !== version) {
            const scriptSnapshot = host.getScriptSnapshot(fileName);
            if (scriptSnapshot) {
                const scriptText = scriptSnapshot.getText(0, scriptSnapshot.getLength());
                const document = vscode_languageserver_textdocument_1.TextDocument.create(uri, shared.syntaxToLanguageId(path.extname(uri).substr(1)), oldDoc ? oldDoc[1].version + 1 : 0, scriptText);
                documents.uriSet(uri, [version, document]);
            }
        }
        return (_a = documents.uriGet(uri)) === null || _a === void 0 ? void 0 : _a[1];
    }
    function dispose() {
        languageService.dispose();
    }
}
exports.createLanguageService = createLanguageService;
//# sourceMappingURL=index.js.map