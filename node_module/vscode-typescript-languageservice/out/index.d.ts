import * as vscode from 'vscode-languageserver';
import { TextDocument } from 'vscode-languageserver-textdocument';
import type * as ts from 'typescript/lib/tsserverlibrary';
export declare type LanguageService = ReturnType<typeof createLanguageService>;
export { getSemanticTokenLegend } from './services/semanticTokens';
export { getTriggerCharacters } from './services/completion';
export declare type LanguageServiceHost = ts.LanguageServiceHost & {
    getFormatOptions?(document: TextDocument, options?: vscode.FormattingOptions): Promise<ts.FormatCodeSettings>;
    getPreferences?(document: TextDocument): Promise<ts.UserPreferences>;
};
export declare function createLanguageService(ts: typeof import('typescript/lib/tsserverlibrary'), host: LanguageServiceHost, languageService: ts.LanguageService): {
    findDefinition: (uri: string, position: vscode.Position) => vscode.LocationLink[];
    findTypeDefinition: (uri: string, position: vscode.Position) => vscode.LocationLink[];
    findReferences: (uri: string, position: vscode.Position) => vscode.Location[];
    prepareRename: (uri: string, position: vscode.Position) => vscode.Range | vscode.ResponseError<void> | undefined;
    doRename: (uri: string, position: vscode.Position, newName: string) => Promise<vscode.WorkspaceEdit | undefined>;
    getEditsForFileRename: (oldUri: string, newUri: string) => Promise<vscode.WorkspaceEdit | undefined>;
    getCodeActions: (uri: string, range: vscode.Range, context: vscode.CodeActionContext) => Promise<vscode.CodeAction[] | undefined>;
    doCodeActionResolve: (codeAction: vscode.CodeAction) => Promise<vscode.CodeAction>;
    findDocumentHighlights: (uri: string, position: vscode.Position) => vscode.DocumentHighlight[];
    findDocumentSymbols: (uri: string) => vscode.SymbolInformation[];
    findWorkspaceSymbols: (query: string) => vscode.SymbolInformation[];
    doComplete: (uri: string, position: vscode.Position, options?: ts.GetCompletionsAtPositionOptions | undefined) => Promise<vscode.CompletionList | undefined>;
    doCompletionResolve: (item: vscode.CompletionItem, newPosition?: vscode.Position | undefined) => Promise<vscode.CompletionItem>;
    doHover: (uri: string, position: vscode.Position, documentOnly?: boolean) => vscode.Hover | undefined;
    doFormatting: (uri: string, options: vscode.FormattingOptions, range?: vscode.Range | undefined) => Promise<vscode.TextEdit[]>;
    getSignatureHelp: (uri: string, position: vscode.Position, context?: vscode.SignatureHelpContext | undefined) => vscode.SignatureHelp | undefined;
    getSelectionRanges: (uri: string, positions: vscode.Position[]) => vscode.SelectionRange[];
    doValidation: (uri: string, options: {
        semantic?: boolean | undefined;
        syntactic?: boolean | undefined;
        suggestion?: boolean | undefined;
        declaration?: boolean | undefined;
    }, cancellationToken?: ts.CancellationToken | undefined) => vscode.Diagnostic[];
    getFoldingRanges: (uri: string) => vscode.FoldingRange[];
    getDocumentSemanticTokens: (uri: string, range?: vscode.Range | undefined, cancle?: vscode.CancellationToken | undefined) => [number, number, number, number, number][] | undefined;
    callHierarchy: {
        doPrepare: (uri: string, position: vscode.Position) => vscode.CallHierarchyItem[];
        getIncomingCalls: (item: vscode.CallHierarchyItem) => vscode.CallHierarchyIncomingCall[];
        getOutgoingCalls: (item: vscode.CallHierarchyItem) => vscode.CallHierarchyOutgoingCall[];
    };
    dispose: () => void;
    __internal__: {
        host: LanguageServiceHost;
        raw: ts.LanguageService;
        getTextDocument: (uri: string) => TextDocument | undefined;
        getValidTextDocument: (uri: string) => TextDocument | undefined;
        doCompleteSync: (uri: string, position: vscode.Position, options?: ts.GetCompletionsAtPositionOptions | undefined) => vscode.CompletionList | undefined;
    };
};
