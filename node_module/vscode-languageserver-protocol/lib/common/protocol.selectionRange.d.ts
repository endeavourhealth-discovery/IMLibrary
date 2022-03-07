import { RequestHandler } from 'vscode-jsonrpc';
import { TextDocumentIdentifier, Position, SelectionRange } from 'vscode-languageserver-types';
import { ProtocolRequestType } from './messages';
import { TextDocumentRegistrationOptions, WorkDoneProgressOptions, StaticRegistrationOptions, WorkDoneProgressParams, PartialResultParams } from './protocol';
export interface SelectionRangeClientCapabilities {
    /**
     * Whether implementation supports dynamic registration for selection range providers. If this is set to `true`
     * the client supports the new `SelectionRangeRegistrationOptions` return value for the corresponding server
     * capability as well.
     */
    dynamicRegistration?: boolean;
}
export interface SelectionRangeOptions extends WorkDoneProgressOptions {
}
export interface SelectionRangeRegistrationOptions extends SelectionRangeOptions, TextDocumentRegistrationOptions, StaticRegistrationOptions {
}
/**
 * A parameter literal used in selection range requests.
 */
export interface SelectionRangeParams extends WorkDoneProgressParams, PartialResultParams {
    /**
     * The text document.
     */
    textDocument: TextDocumentIdentifier;
    /**
     * The positions inside the text document.
     */
    positions: Position[];
}
/**
 * A request to provide selection ranges in a document. The request's
 * parameter is of type [SelectionRangeParams](#SelectionRangeParams), the
 * response is of type [SelectionRange[]](#SelectionRange[]) or a Thenable
 * that resolves to such.
 */
export declare namespace SelectionRangeRequest {
    const method: 'textDocument/selectionRange';
    const type: ProtocolRequestType<SelectionRangeParams, SelectionRange[] | null, SelectionRange[], any, SelectionRangeRegistrationOptions>;
    type HandlerSignature = RequestHandler<SelectionRangeParams, SelectionRange[] | null, void>;
}
