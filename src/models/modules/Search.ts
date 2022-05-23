import { TTIriRef } from "../../interfaces/modules/TTIriRef";
import { SortBy } from "../../enums/modules/SortBy";

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
  isA!: string[];
  sortBy!: SortBy;
  page!: number;
  size!: number;
}

export class SearchResponse {
  page!: number;
  count!: number;
  entities!: ConceptSummary[];
}
