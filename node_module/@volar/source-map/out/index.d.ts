import type { TextDocument } from 'vscode-languageserver-textdocument';
import type * as vscode from 'vscode-languageserver';
export interface Range {
    start: number;
    end: number;
}
export declare enum Mode {
    /**
     * @case1
     * 123456 -> abcdef
     * ^    ^    ^    ^
     * @case2
     * 123456 -> abcdef
     *  ^  ^      ^  ^
     * @case3
     * 123456 -> abcdef
     *   ^^        ^^
     */
    Offset = 0,
    /**
     * @case1
     * 123456 -> abcdef
     * ^    ^    ^    ^
     * @case2
     * 123456 -> abcdef
     *  ^  ^     NOT_MATCH
     * @case3
     * 123456 -> abcdef
     *   ^^      NOT_MATCH
     */
    Totally = 1,
    /**
     * @case1
     * 123456 -> abcdef
     * ^    ^    ^    ^
     * @case2
     * 123456 -> abcdef
     *  ^  ^     ^    ^
     * @case3
     * 123456 -> abcdef
     *   ^^      ^    ^
     */
    Expand = 2
}
export declare type MappingBase = {
    mode: Mode;
    sourceRange: Range;
    mappedRange: Range;
};
export declare type Mapping<T> = MappingBase & {
    data: T;
    additional?: MappingBase[];
};
export declare class SourceMapBase<Data = undefined> {
    mappings: Mapping<Data>[];
    constructor(_mappings?: Mapping<Data>[]);
    getSourceRange(start: number, end?: number, filter?: (data: Data) => boolean): [{
        start: number;
        end: number;
    }, Data] | undefined;
    getMappedRange(start: number, end?: number, filter?: (data: Data) => boolean): [{
        start: number;
        end: number;
    }, Data] | undefined;
    getSourceRanges(start: number, end?: number, filter?: (data: Data) => boolean): Generator<[{
        start: number;
        end: number;
    }, Data], void, unknown>;
    getMappedRanges(start: number, end?: number, filter?: (data: Data) => boolean): Generator<[{
        start: number;
        end: number;
    }, Data], void, unknown>;
    protected getRanges(startOffset: number, endOffset: number, sourceToTarget: boolean, filter?: (data: Data) => boolean): Generator<[{
        start: number;
        end: number;
    }, Data], void, unknown>;
    private getRange;
}
export declare class SourceMap<Data = undefined> extends SourceMapBase<Data> {
    sourceDocument: TextDocument;
    mappedDocument: TextDocument;
    _mappings?: Mapping<Data>[] | undefined;
    constructor(sourceDocument: TextDocument, mappedDocument: TextDocument, _mappings?: Mapping<Data>[] | undefined);
    getSourceRange<T extends number | vscode.Position>(start: T, end?: T, filter?: (data: Data) => boolean): [{
        start: T;
        end: T;
    }, Data] | undefined;
    getMappedRange<T extends number | vscode.Position>(start: T, end?: T, filter?: (data: Data) => boolean): [{
        start: T;
        end: T;
    }, Data] | undefined;
    getSourceRanges<T extends number | vscode.Position>(start: T, end?: T, filter?: (data: Data) => boolean): Generator<[{
        start: T;
        end: T;
    }, Data], void, unknown>;
    getMappedRanges<T extends number | vscode.Position>(start: T, end?: T, filter?: (data: Data) => boolean): Generator<[{
        start: T;
        end: T;
    }, Data], void, unknown>;
    protected getRanges<T extends number | vscode.Position>(start: T, end: T, sourceToTarget: boolean, filter?: (data: Data) => boolean): Generator<[{
        start: T;
        end: T;
    }, Data], void, unknown>;
}
