import { TTIriRef } from "../../interfaces/modules/TTIriRef";
import { SortBy } from "../../enums/modules/SortBy";

export interface ConceptSummary {
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

export class SearchRequest {
  termFilter!: string;
  statusFilter!: string[];
  typeFilter!: string[];
  schemeFilter!: string[];
  descendentFilter!: string[];
  markIfDescendentOf!: string[];
  isA!: string[];
  select!: string[];
  sortBy!: SortBy;
  sortField!: string;
  sortDirection!: SortDirection;
  page!: number;
  size!: number;
}

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export interface SearchResponse {
  page: number;
  count: number;
  entities: ConceptSummary[];
}
