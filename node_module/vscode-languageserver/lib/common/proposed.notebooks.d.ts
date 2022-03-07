import { Proposed, NotificationHandler1, Event, LSPObject, DocumentUri, URI } from 'vscode-languageserver-protocol';
import type { Feature, _Notebooks, _Connection, _ } from './server';
import { TextDocuments, TextDocumentsConfiguration } from './textDocuments';
/**
 * Shape of the notebooks feature
 *
 * @since 3.17.0 - proposed state
 */
export interface NotebooksFeatureShape {
    synchronization: {
        onDidOpenNotebookDocument(handler: NotificationHandler1<Proposed.DidOpenNotebookDocumentParams>): void;
        onDidChangeNotebookDocument(handler: NotificationHandler1<Proposed.DidChangeNotebookDocumentParams>): void;
        onDidSaveNotebookDocument(handler: NotificationHandler1<Proposed.DidSaveNotebookDocumentParams>): void;
        onDidCloseNotebookDocument(handler: NotificationHandler1<Proposed.DidCloseNotebookDocumentParams>): void;
        onDidSelectNotebookController(handler: NotificationHandler1<Proposed.DidSelectNotebookControllerParams>): void;
    };
}
export declare const NotebooksFeature: Feature<_Notebooks, NotebooksFeatureShape>;
export declare type NotebookDocumentChangeEvent = {
    /**
     * The notebook document that changed.
     */
    notebookDocument: Proposed.NotebookDocument;
    /**
     * The meta data change if any.
     */
    metadata?: {
        old: LSPObject | undefined;
        new: LSPObject | undefined;
    };
    /**
     * The cell changes if any.
     */
    cells?: {
        /**
         * The cells that got added.
         */
        added: Proposed.NotebookCell[];
        /**
         * The cells that got removed.
         */
        removed: Proposed.NotebookCell[];
        /**
         * The cells that changed.
         */
        changed: {
            /**
             * The cell data has changed, excluding its
             * text content which is reported via
             * `textContentChanged`.
             */
            data: {
                old: Proposed.NotebookCell;
                new: Proposed.NotebookCell;
            }[];
            /**
             * The text content of a cell has changed.
             * The actual text is available via the `Notebooks`
             * text document manager.
             */
            textContent: Proposed.NotebookCell[];
        };
    };
};
export declare class NotebookDocuments<T extends {
    uri: DocumentUri;
}> {
    private readonly notebookDocuments;
    private readonly notebookCellMap;
    private readonly notebookControllers;
    private readonly _onDidOpen;
    private readonly _onDidSave;
    private readonly _onDidChange;
    private readonly _onDidClose;
    private readonly _onDidSelectNotebookController;
    private _cellTextDocuments;
    constructor(configuration: TextDocumentsConfiguration<T>);
    get cellTextDocuments(): TextDocuments<T>;
    getCellTextDocument(cell: Proposed.NotebookCell): T | undefined;
    getNotebookDocument(uri: URI): Proposed.NotebookDocument | undefined;
    getNotebookCell(uri: DocumentUri): Proposed.NotebookCell | undefined;
    findNotebookDocumentForCell(cell: DocumentUri | Proposed.NotebookCell): Proposed.NotebookDocument | undefined;
    getNotebookController(notebookDocument: URI | Proposed.NotebookDocument): Proposed.NotebookController | undefined;
    get onDidOpen(): Event<Proposed.NotebookDocument>;
    get onDidSave(): Event<Proposed.NotebookDocument>;
    get onDidChange(): Event<NotebookDocumentChangeEvent>;
    get onDidClose(): Event<Proposed.NotebookDocument>;
    get onDidSelectNotebookController(): Event<{
        notebookDocument: Proposed.NotebookDocument;
        controller: Proposed.NotebookController;
        selected: boolean;
    }>;
    /**
     * Listens for `low level` notification on the given connection to
     * update the notebook documents managed by this instance.
     *
     * Please note that the connection only provides handlers not an event model. Therefore
     * listening on a connection will overwrite the following handlers on a connection:
     * `onDidOpenNotebookDocument`, `onDidChangeNotebookDocument`, `onDidSaveNotebookDocument`,
     *  and `onDidCloseNotebookDocument`.
     *
     * @param connection The connection to listen on.
     */
    listen(connection: _Connection<_, _, _, _, _, _, _, NotebooksFeatureShape>): void;
    private updateCellMap;
}
