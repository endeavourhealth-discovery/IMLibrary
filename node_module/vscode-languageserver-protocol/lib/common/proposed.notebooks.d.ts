import { URI, integer, DocumentUri, uinteger, LSPObject, TextDocumentItem, TextDocumentIdentifier, VersionedTextDocumentIdentifier } from 'vscode-languageserver-types';
import { ProtocolNotificationType, RegistrationType } from './messages';
import { StaticRegistrationOptions, NotebookDocumentFilter, TextDocumentContentChangeEvent } from './protocol';
/**
 * Notebook specific client capabilities.
 *
 * @since 3.17.0 - proposed state
 */
export interface NotebookDocumentSyncClientCapabilities {
    /**
     * Whether implementation supports dynamic registration. If this is
     * set to `true` the client supports the new
     * `(TextDocumentRegistrationOptions & StaticRegistrationOptions)`
     * return value for the corresponding server capability as well.
     */
    dynamicRegistration?: boolean;
    /**
     * The client supports sending execution summary data per cell.
     */
    executionSummarySupport?: boolean;
}
export interface $NotebookDocumentClientCapabilities {
    notebookDocument?: {
        synchronization: NotebookDocumentSyncClientCapabilities;
    };
}
/**
 * A notebook cell kind.
 *
 * @since 3.17.0 - proposed state
 */
export declare namespace NotebookCellKind {
    /**
     * A markup-cell is formatted source that is used for display.
     */
    const Markup: 1;
    /**
     * A code-cell is source code.
     */
    const Code: 2;
    function is(value: any): value is NotebookCellKind;
}
export declare type NotebookCellKind = 1 | 2;
export declare type ExecutionSummary = {
    /**
     * A strict monotonically increasing value
     * indicating the execution order of a cell
     * inside a notebook.
     */
    executionOrder: uinteger;
    /**
     * Whether the execution was successful or
     * not if known by the client.
     */
    success?: boolean;
};
export declare namespace ExecutionSummary {
    function create(executionOrder: number, success?: boolean): ExecutionSummary;
    function is(value: any): value is ExecutionSummary;
    function equals(one: ExecutionSummary | undefined, other: ExecutionSummary | undefined): boolean;
}
/**
 * A notebook cell.
 *
 * A cell's document URI must be unique across ALL notebook
 * cells and can therefore be used to uniquely identify a
 * notebook cell or the cell's text document.
 *
 * @since 3.17.0 - proposed state
 */
export interface NotebookCell {
    /**
     * The cell's kind
     */
    kind: NotebookCellKind;
    /**
     * The URI of the cell's text document
     * content.
     */
    document: DocumentUri;
    /**
     * Additional metadata stored with the cell.
     */
    metadata?: LSPObject;
    /**
     * Additional execution summary information
     * if supported by the client.
     */
    executionSummary?: ExecutionSummary;
}
export declare namespace NotebookCell {
    function create(kind: NotebookCellKind, document: DocumentUri): NotebookCell;
    function is(value: any): value is NotebookCell;
    function equals(one: NotebookCell, other: NotebookCell, compareMetaData?: boolean): boolean;
    function diff(one: NotebookCell, two: NotebookCell): Set<keyof NotebookCell>;
}
/**
 * A notebook document.
 *
 * @since 3.17.0 - proposed state
 */
export interface NotebookDocument {
    /**
     * The notebook document's uri.
     */
    uri: URI;
    /**
     * The type of the notebook.
     */
    notebookType: string;
    /**
     * The version number of this document (it will increase after each
     * change, including undo/redo).
     */
    version: integer;
    /**
     * Additional metadata stored with the notebook
     * document.
     */
    metadata?: LSPObject;
    /**
     * The cells of a notebook.
     */
    cells: NotebookCell[];
}
export declare namespace NotebookDocument {
    function create(uri: URI, notebookType: string, version: integer, cells: NotebookCell[]): NotebookDocument;
    function is(value: any): value is NotebookDocument;
}
/**
 * A literal to identify a notebook document in the client.
 *
 * @since 3.17.0 - proposed state
 */
export interface NotebookDocumentIdentifier {
    /**
     * The notebook document's uri.
     */
    uri: URI;
}
/**
 * A versioned notebook document identifier.
 *
 * @since 3.17.0 - proposed state
 */
export interface VersionedNotebookDocumentIdentifier {
    /**
     * The version number of this notebook document.
     */
    version: integer;
    /**
     * The notebook document's uri.
     */
    uri: URI;
}
/**
 * Options specific to a notebook plus its cells
 * to be synced to the server.
 *
 * If a selector provide a notebook document
 * filter but no cell selector all cells of a
 * matching notebook document will be synced.
 *
 * If a selector provides no notebook document
 * filter but only a cell selector all notebook
 * document that contain at least one matching
 * cell will be synced.
 *
 * @since 3.17.0 - proposed state
 */
export declare type NotebookDocumentSyncOptions = {
    /**
     * The notebook document to be synced
     */
    notebookDocumentSelector: ({
        /** The notebook documents to be synced */
        notebookDocumentFilter: NotebookDocumentFilter;
        /** The cells of the matching notebook to be synced */
        cellSelector?: {
            language: string;
        }[];
    } | {
        /** The notebook documents to be synced */
        notebookDocumentFilter?: NotebookDocumentFilter;
        /** The cells of the matching notebook to be synced */
        cellSelector: {
            language: string;
        }[];
    })[];
    /**
     * Determines how the notebook is synchronized.
     *
     * If set to 'notebook' the notebook document,
     * its meta data, cell structure and the cell's
     * text documents are synchronized.
     *
     * If set to 'cellContent' only the cell content
     * is synchronized using the available
     * `textDocument/did*` notifications.
     */
    mode: 'notebook' | 'cellContent';
    /**
     * Whether save notification should be forwarded to
     * the server. Will only be honored if mode === `notebook`.
     */
    save?: boolean;
};
/**
 * Registration options specific to a notebook.
 *
 * @since 3.17.0 - proposed state
 */
export declare type NotebookDocumentSyncRegistrationOptions = NotebookDocumentSyncOptions & StaticRegistrationOptions;
export interface $NotebookDocumentSyncServerCapabilities {
    notebookDocumentSync?: NotebookDocumentSyncOptions | NotebookDocumentSyncRegistrationOptions;
}
export declare namespace NotebookDocumentSyncRegistrationType {
    const method: 'notebookDocument/sync';
    const type: RegistrationType<NotebookDocumentSyncRegistrationOptions>;
}
/**
 * The params sent in a open notebook document notification.
 *
 * @since 3.17.0 - proposed state
 */
export interface DidOpenNotebookDocumentParams {
    /**
     * The notebook document that got opened.
     */
    notebookDocument: NotebookDocument;
    /**
     * The text documents that represent the content
     * of a notebook cell.
     */
    cellTextDocuments: TextDocumentItem[];
}
/**
 * A notification sent when a notebook opens.
 *
 * @since 3.17.0 - proposed state
 */
export declare namespace DidOpenNotebookDocumentNotification {
    const method: 'notebookDocument/didOpen';
    const type: ProtocolNotificationType<DidOpenNotebookDocumentParams, void>;
}
/**
 * A change describing how to move a `NotebookCell`
 * array from state S to S'.
 *
 * @since 3.17.0 - proposed state
 */
export interface NotebookCellArrayChange {
    /**
     * The start oftest of the cell that changed.
     */
    start: uinteger;
    /**
     * The deleted cells
     */
    deleteCount: uinteger;
    /**
     * The new cells, if any
     */
    cells?: NotebookCell[];
}
export declare namespace NotebookCellArrayChange {
    function is(value: any): value is NotebookCellArrayChange;
    function create(start: uinteger, deleteCount: uinteger, cells?: NotebookCell[]): NotebookCellArrayChange;
}
/**
 * A change event for a notebook document.
 *
 * @since 3.17.0 - proposed state
 */
export interface NotebookDocumentChangeEvent {
    /**
     * The changed meta data if any.
     */
    metadata?: LSPObject;
    /**
     * Changes to cells
     */
    cells?: {
        /**
         * Changes to the cell structure to add or
         * remove cells.
         */
        structure?: {
            /**
             * The change to the cell array.
             */
            array: NotebookCellArrayChange;
            /**
             * Additional opened cell text documents.
             */
            didOpen?: TextDocumentItem[];
            /**
             * Additional closed cell text documents.
             */
            didClose?: TextDocumentIdentifier[];
        };
        /**
         * Changes to notebook cells properties like its
         * kind, execution summary or metadata.
         */
        data?: NotebookCell[];
        /**
         * Changes to the text content of notebook cells.
         */
        textContent?: {
            document: VersionedTextDocumentIdentifier;
            changes: TextDocumentContentChangeEvent[];
        }[];
    };
}
/**
 * The params sent in a change notebook document notification.
 *
 * @since 3.17.0 - proposed state
 */
export interface DidChangeNotebookDocumentParams {
    /**
     * The notebook document that did change. The version number points
     * to the version after all provided changes have been applied. If
     * only the text document content of a cell changes the notebook version
     * doesn't necessarily have to change.
     */
    notebookDocument: VersionedNotebookDocumentIdentifier;
    /**
     * The actual changes to the notebook document.
     *
     * The changes describe single state changes to the notebook document.
     * So if there are two changes c1 (at array index 0) and c2 (at array
     * index 1) for a notebook in state S then c1 moves the notebook from
     * S to S' and c2 from S' to S''. So c1 is computed on the state S and
     * c2 is computed on the state S'.
     *
     * To mirror the content of a notebook using change events use the following approach:
     * - start with the same initial content
     * - apply the 'notebookDocument/didChange' notifications in the order you receive them.
     * - apply the `NotebookChangeEvent`s in a single notification in the order
     *   you receive them.
     */
    change: NotebookDocumentChangeEvent;
}
export declare namespace DidChangeNotebookDocumentNotification {
    const method: 'notebookDocument/didChange';
    const type: ProtocolNotificationType<DidChangeNotebookDocumentParams, void>;
}
/**
 * The params sent in a save notebook document notification.
 *
 * @since 3.17.0 - proposed state
 */
export interface DidSaveNotebookDocumentParams {
    /**
     * The notebook document that got saved.
     */
    notebookDocument: NotebookDocumentIdentifier;
}
/**
 * A notification sent when a notebook document is saved.
 *
 * @since 3.17.0 - proposed state
 */
export declare namespace DidSaveNotebookDocumentNotification {
    const method: 'notebookDocument/didSave';
    const type: ProtocolNotificationType<DidSaveNotebookDocumentParams, void>;
}
/**
 * The params sent in a close notebook document notification.
 *
 * @since 3.17.0 - proposed state
 */
export interface DidCloseNotebookDocumentParams {
    /**
     * The notebook document that got closed.
     */
    notebookDocument: NotebookDocumentIdentifier;
    /**
     * The text documents that represent the content
     * of a notebook cell that got closed.
     */
    cellTextDocuments: TextDocumentIdentifier[];
}
/**
 * A notification sent when a notebook closes.
 *
 * @since 3.17.0 - proposed state
 */
export declare namespace DidCloseNotebookDocumentNotification {
    const method: 'notebookDocument/didClose';
    const type: ProtocolNotificationType<DidCloseNotebookDocumentParams, void>;
}
/**
 * A notebook controller represents an entity that can execute
 * notebook cells. This is often referred to as a kernel.
 *
 * There can be multiple controllers and the editor will let
 * users choose which controller to use for a certain notebook.
 */
export interface NotebookController {
    /**
     * The identifier of this notebook controller.
     *
     * _Note_ that controllers are usually remembered
     * by their identifier and that clients should use
     * stable identifiers.
     */
    id: string;
    /**
     * Additional metadata associated with
     * this controller.
     */
    metadata?: LSPObject;
}
export declare namespace NotebookController {
    function create(id: string, metadata?: LSPObject): NotebookController;
    function is(value: any): value is NotebookController;
}
export interface DidSelectNotebookControllerParams {
    /**
     * The notebook document
     */
    notebookDocument: NotebookDocumentIdentifier;
    /**
     * The selected controller
     */
    controller: NotebookController;
    /**
     * Whether the controller has been selected
     * or unselected.
     */
    selected: boolean;
}
/**
 * A notification send when a controller got selected
 * for a specific notebook.
 */
export declare namespace DidSelectNotebookControllerNotification {
    const method: 'notebookDocument/didSelectNotebookController';
    const type: ProtocolNotificationType<DidSelectNotebookControllerParams, void>;
}
