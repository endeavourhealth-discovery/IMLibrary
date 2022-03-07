"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const shared = require("@volar/shared");
const vscode = require("vscode-languageserver");
const path = require("path");
const PConst = require("../protocol.const");
const modifiers_1 = require("../utils/modifiers");
const typeConverters = require("../utils/typeConverters");
const upath = require("upath");
function register(languageService, getTextDocument) {
    function doPrepare(uri, position) {
        const document = getTextDocument(uri);
        if (!document)
            return [];
        const fileName = shared.uriToFsPath(document.uri);
        const offset = document.offsetAt(position);
        let calls;
        try {
            calls = languageService.prepareCallHierarchy(fileName, offset);
        }
        catch { }
        if (!calls)
            return [];
        const items = Array.isArray(calls) ? calls : [calls];
        return items.map(item => fromProtocolCallHierarchyItem(item));
    }
    function getIncomingCalls(item) {
        const document = getTextDocument(item.uri);
        if (!document)
            return [];
        const fileName = shared.uriToFsPath(item.uri);
        const offset = document.offsetAt(item.selectionRange.start);
        let calls;
        try {
            calls = languageService.provideCallHierarchyIncomingCalls(fileName, offset);
        }
        catch { }
        if (!calls)
            return [];
        const items = Array.isArray(calls) ? calls : [calls];
        return items.map(item => fromProtocolCallHierchyIncomingCall(item));
    }
    function getOutgoingCalls(item) {
        const document = getTextDocument(item.uri);
        if (!document)
            return [];
        const fileName = shared.uriToFsPath(item.uri);
        const offset = document.offsetAt(item.selectionRange.start);
        let calls;
        try {
            calls = languageService.provideCallHierarchyOutgoingCalls(fileName, offset);
        }
        catch { }
        if (!calls)
            return [];
        const items = Array.isArray(calls) ? calls : [calls];
        return items.map(item => fromProtocolCallHierchyOutgoingCall(item, document));
    }
    return {
        doPrepare,
        getIncomingCalls,
        getOutgoingCalls,
    };
    function isSourceFileItem(item) {
        return item.kind === PConst.Kind.script || item.kind === PConst.Kind.module && item.selectionSpan.start === 0;
    }
    function fromProtocolCallHierarchyItem(item) {
        var _a, _b, _c;
        const rootPath = (_b = (_a = languageService.getProgram()) === null || _a === void 0 ? void 0 : _a.getCompilerOptions().rootDir) !== null && _b !== void 0 ? _b : '';
        const document = getTextDocument(shared.fsPathToUri(item.file)); // TODO
        const useFileName = isSourceFileItem(item);
        const name = useFileName ? path.basename(item.file) : item.name;
        const detail = useFileName ? upath.relative(rootPath, path.dirname(item.file)) : (_c = item.containerName) !== null && _c !== void 0 ? _c : '';
        const result = {
            kind: typeConverters.SymbolKind.fromProtocolScriptElementKind(item.kind),
            name,
            detail,
            uri: shared.fsPathToUri(item.file),
            range: {
                start: document.positionAt(item.span.start),
                end: document.positionAt(item.span.start + item.span.length),
            },
            selectionRange: {
                start: document.positionAt(item.selectionSpan.start),
                end: document.positionAt(item.selectionSpan.start + item.selectionSpan.length),
            },
        };
        const kindModifiers = item.kindModifiers ? (0, modifiers_1.parseKindModifier)(item.kindModifiers) : undefined;
        if (kindModifiers === null || kindModifiers === void 0 ? void 0 : kindModifiers.has(PConst.KindModifiers.deprecated)) {
            result.tags = [vscode.SymbolTag.Deprecated];
        }
        return result;
    }
    function fromProtocolCallHierchyIncomingCall(item) {
        const document = getTextDocument(shared.fsPathToUri(item.from.file));
        return {
            from: fromProtocolCallHierarchyItem(item.from),
            fromRanges: item.fromSpans.map(fromSpan => ({
                start: document.positionAt(fromSpan.start),
                end: document.positionAt(fromSpan.start + fromSpan.length),
            })),
        };
    }
    function fromProtocolCallHierchyOutgoingCall(item, document) {
        return {
            to: fromProtocolCallHierarchyItem(item.to),
            fromRanges: item.fromSpans.map(fromSpan => ({
                start: document.positionAt(fromSpan.start),
                end: document.positionAt(fromSpan.start + fromSpan.length),
            })),
        };
    }
}
exports.register = register;
;
//# sourceMappingURL=callHierarchy.js.map