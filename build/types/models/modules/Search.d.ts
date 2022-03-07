import { TTIriRef } from "../../interfaces/modules/TTIriRef";
import { SortBy } from "../../enums/modules/SortBy";
export declare class ConceptSummary {
    name: string;
    iri: string;
    scheme: TTIriRef;
    code: string;
    entityType: TTIriRef[];
    isDescendentOf: TTIriRef[];
    weighting: number;
    match: string;
    status: TTIriRef;
}
export declare class SearchRequest {
    termFilter: string;
    statusFilter: string[];
    typeFilter: string[];
    schemeFilter: string[];
    descendentFilter: string[];
    markIfDescendentOf: string[];
    sortBy: SortBy;
    page: number;
    size: number;
}
export declare class SearchResponse {
    pageStart: number;
    pageEnd: number;
    pageSize: number;
    totalSize: number;
    concepts: ConceptSummary[];
    request?: SearchRequest;
}
