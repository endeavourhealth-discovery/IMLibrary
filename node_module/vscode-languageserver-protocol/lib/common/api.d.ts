import type { integer } from 'vscode-languageserver-types';
export * from 'vscode-jsonrpc';
export * from 'vscode-languageserver-types';
export * from './messages';
export * from './protocol';
export { ProtocolConnection, createProtocolConnection } from './connection';
export declare namespace LSPErrorCodes {
    /**
    * This is the start range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */
    const lspReservedErrorRangeStart: integer;
    /**
     * A request failed but it was syntactically correct, e.g the
     * method name was known and the parameters were valid. The error
     * message should contain human readable information about why
     * the request failed.
     *
     * @since 3.17.0
     */
    const RequestFailed: integer;
    /**
     * The server cancelled the request. This error code should
     * only be used for requests that explicitly support being
     * server cancellable.
     *
     * @since 3.17.0
     */
    const ServerCancelled: integer;
    /**
     * The server detected that the content of a document got
     * modified outside normal conditions. A server should
     * NOT send this error code if it detects a content change
     * in it unprocessed messages. The result even computed
     * on an older state might still be useful for the client.
     *
     * If a client decides that a result is not of any use anymore
     * the client should cancel the request.
     */
    const ContentModified: integer;
    /**
     * The client has canceled a request and a server as detected
     * the cancel.
     */
    const RequestCancelled: integer;
    /**
    * This is the end range of LSP reserved error codes.
    * It doesn't denote a real error code.
    *
    * @since 3.16.0
    */
    const lspReservedErrorRangeEnd: integer;
}
import * as diag from './proposed.diagnostic';
import * as typeh from './proposed.typeHierarchy';
import * as iv from './proposed.inlineValue';
import * as nb from './proposed.notebooks';
export declare namespace Proposed {
    type DiagnosticClientCapabilities = diag.DiagnosticClientCapabilities;
    type $DiagnosticClientCapabilities = diag.$DiagnosticClientCapabilities;
    type DiagnosticOptions = diag.DiagnosticOptions;
    type DiagnosticRegistrationOptions = diag.DiagnosticRegistrationOptions;
    type $DiagnosticServerCapabilities = diag.$DiagnosticServerCapabilities;
    type DocumentDiagnosticParams = diag.DocumentDiagnosticParams;
    type DiagnosticServerCancellationData = diag.DiagnosticServerCancellationData;
    const DiagnosticServerCancellationData: typeof diag.DiagnosticServerCancellationData;
    type DocumentDiagnosticReportKind = diag.DocumentDiagnosticReportKind;
    const DocumentDiagnosticReportKind: typeof diag.DocumentDiagnosticReportKind;
    type FullDocumentDiagnosticReport = diag.FullDocumentDiagnosticReport;
    type RelatedFullDocumentDiagnosticReport = diag.RelatedFullDocumentDiagnosticReport;
    type UnchangedDocumentDiagnosticReport = diag.UnchangedDocumentDiagnosticReport;
    type RelatedUnchangedDocumentDiagnosticReport = diag.RelatedUnchangedDocumentDiagnosticReport;
    type DocumentDiagnosticReport = diag.DocumentDiagnosticReport;
    type DocumentDiagnosticReportPartialResult = diag.DocumentDiagnosticReportPartialResult;
    const DocumentDiagnosticRequest: typeof diag.DocumentDiagnosticRequest;
    type PreviousResultId = diag.PreviousResultId;
    type WorkspaceDiagnosticParams = diag.WorkspaceDiagnosticParams;
    type WorkspaceFullDocumentDiagnosticReport = diag.WorkspaceFullDocumentDiagnosticReport;
    type WorkspaceUnchangedDocumentDiagnosticReport = diag.WorkspaceUnchangedDocumentDiagnosticReport;
    type WorkspaceDocumentDiagnosticReport = diag.WorkspaceDocumentDiagnosticReport;
    type WorkspaceDiagnosticReport = diag.WorkspaceDiagnosticReport;
    type WorkspaceDiagnosticReportPartialResult = diag.WorkspaceDiagnosticReportPartialResult;
    const WorkspaceDiagnosticRequest: typeof diag.WorkspaceDiagnosticRequest;
    const DiagnosticRefreshRequest: typeof diag.DiagnosticRefreshRequest;
    type TypeHierarchyClientCapabilities = typeh.TypeHierarchyClientCapabilities;
    type TypeHierarchyOptions = typeh.TypeHierarchyOptions;
    type TypeHierarchyRegistrationOptions = typeh.TypeHierarchyRegistrationOptions;
    type TypeHierarchyPrepareParams = typeh.TypeHierarchyPrepareParams;
    type TypeHierarchySupertypesParams = typeh.TypeHierarchySupertypesParams;
    type TypeHierarchySubtypesParams = typeh.TypeHierarchySubtypesParams;
    const TypeHierarchyPrepareRequest: typeof typeh.TypeHierarchyPrepareRequest;
    const TypeHierarchySupertypesRequest: typeof typeh.TypeHierarchySupertypesRequest;
    const TypeHierarchySubtypesRequest: typeof typeh.TypeHierarchySubtypesRequest;
    type InlineValuesClientCapabilities = iv.InlineValuesClientCapabilities;
    type InlineValuesOptions = iv.InlineValuesOptions;
    type InlineValuesRegistrationOptions = iv.InlineValuesRegistrationOptions;
    type InlineValuesParams = iv.InlineValuesParams;
    const InlineValuesRequest: typeof iv.InlineValuesRequest;
    const InlineValuesRefreshRequest: typeof iv.InlineValuesRefreshRequest;
    type $NotebookDocumentClientCapabilities = nb.$NotebookDocumentClientCapabilities;
    type NotebookDocumentSyncClientCapabilities = nb.NotebookDocumentSyncClientCapabilities;
    type $NotebookDocumentSyncServerCapabilities = nb.$NotebookDocumentSyncServerCapabilities;
    type NotebookCellKind = nb.NotebookCellKind;
    const NotebookCellKind: typeof nb.NotebookCellKind;
    type NotebookCell = nb.NotebookCell;
    const NotebookCell: typeof nb.NotebookCell;
    type NotebookCellArrayChange = nb.NotebookCellArrayChange;
    type NotebookDocument = nb.NotebookDocument;
    const NotebookDocument: typeof nb.NotebookDocument;
    type NotebookDocumentChangeEvent = nb.NotebookDocumentChangeEvent;
    type NotebookDocumentIdentifier = nb.NotebookDocumentIdentifier;
    type VersionedNotebookDocumentIdentifier = nb.VersionedNotebookDocumentIdentifier;
    type NotebookDocumentSyncOptions = nb.NotebookDocumentSyncOptions;
    type NotebookDocumentSyncRegistrationOptions = nb.NotebookDocumentSyncRegistrationOptions;
    const NotebookDocumentSyncRegistrationType: typeof nb.NotebookDocumentSyncRegistrationType;
    type DidOpenNotebookDocumentParams = nb.DidOpenNotebookDocumentParams;
    const DidOpenNotebookDocumentNotification: typeof nb.DidOpenNotebookDocumentNotification;
    type DidChangeNotebookDocumentParams = nb.DidChangeNotebookDocumentParams;
    const DidChangeNotebookDocumentNotification: typeof nb.DidChangeNotebookDocumentNotification;
    type DidSaveNotebookDocumentParams = nb.DidSaveNotebookDocumentParams;
    const DidSaveNotebookDocumentNotification: typeof nb.DidSaveNotebookDocumentNotification;
    type DidCloseNotebookDocumentParams = nb.DidCloseNotebookDocumentParams;
    const DidCloseNotebookDocumentNotification: typeof nb.DidCloseNotebookDocumentNotification;
    type NotebookController = nb.NotebookController;
    const NotebookController: typeof nb.NotebookController;
    type DidSelectNotebookControllerParams = nb.DidSelectNotebookControllerParams;
    const DidSelectNotebookControllerNotification: typeof nb.DidSelectNotebookControllerNotification;
}
