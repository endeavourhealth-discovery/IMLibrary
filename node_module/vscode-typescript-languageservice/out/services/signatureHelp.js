"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const vscode = require("vscode-languageserver");
const shared = require("@volar/shared");
function register(languageService, getTextDocument, ts) {
    return (uri, position, context) => {
        const document = getTextDocument(uri);
        if (!document)
            return;
        const options = {};
        if ((context === null || context === void 0 ? void 0 : context.triggerKind) === vscode.SignatureHelpTriggerKind.Invoked) {
            options.triggerReason = {
                kind: 'invoked'
            };
        }
        else if ((context === null || context === void 0 ? void 0 : context.triggerKind) === vscode.SignatureHelpTriggerKind.TriggerCharacter) {
            options.triggerReason = {
                kind: 'characterTyped',
                triggerCharacter: context.triggerCharacter,
            };
        }
        else if ((context === null || context === void 0 ? void 0 : context.triggerKind) === vscode.SignatureHelpTriggerKind.ContentChange) {
            options.triggerReason = {
                kind: 'retrigger',
                triggerCharacter: context.triggerCharacter,
            };
        }
        const fileName = shared.uriToFsPath(document.uri);
        const offset = document.offsetAt(position);
        let helpItems;
        try {
            helpItems = languageService.getSignatureHelpItems(fileName, offset, options);
        }
        catch { }
        if (!helpItems)
            return;
        return {
            activeSignature: helpItems.selectedItemIndex,
            activeParameter: helpItems.argumentIndex,
            signatures: helpItems.items.map(item => {
                const signature = {
                    label: '',
                    documentation: undefined,
                    parameters: []
                };
                signature.label += ts.displayPartsToString(item.prefixDisplayParts);
                item.parameters.forEach((p, i, a) => {
                    const label = ts.displayPartsToString(p.displayParts);
                    const parameter = {
                        label,
                        documentation: ts.displayPartsToString(p.documentation)
                    };
                    signature.label += label;
                    signature.parameters.push(parameter);
                    if (i < a.length - 1) {
                        signature.label += ts.displayPartsToString(item.separatorDisplayParts);
                    }
                });
                signature.label += ts.displayPartsToString(item.suffixDisplayParts);
                return signature;
            }),
        };
    };
}
exports.register = register;
//# sourceMappingURL=signatureHelp.js.map