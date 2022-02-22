import { TTIriRef } from "./TripleTree";

export class ConceptSummary {
  name = "";
  iri = "";
  scheme = {} as TTIriRef;
  code = "";
  entityType = [] as TTIriRef[];
  isDescendentOf = [] as TTIriRef[];
  weighting = 0;
  match = "";
  status = {} as TTIriRef;
}

export class SearchRequest {
  termFilter!: string;
  statusFilter!: string[];
  typeFilter!: string[];
  schemeFilter!: string[];
  descendentFilter!: string[];
  markIfDescendentOf!: string[];
  sortBy!: SortBy;
  page!: number;
  size!: number;
}

export class SearchResponse {
  pageStart!: number;
  pageEnd!: number;
  pageSize!: number;
  totalSize!: number;
  concepts!: ConceptSummary[];
  request?: SearchRequest;
}

export enum SortBy {
  Usage,
  Length,
}
