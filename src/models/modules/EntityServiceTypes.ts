import { ConceptSummary } from "./Search";

export interface PartialBundle {
  entity: any;
  predicates: object;
}

export interface SearchResponse {
  entities: ConceptSummary[];
  page: number;
  count: number;
}
