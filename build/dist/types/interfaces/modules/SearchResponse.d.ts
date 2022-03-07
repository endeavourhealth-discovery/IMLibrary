import { ConceptSummary } from "../../models/modules/Search";
export interface SearchResponse {
    entities: ConceptSummary[];
    page: number;
    count: number;
}
