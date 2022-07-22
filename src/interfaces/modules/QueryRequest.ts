import { Query } from "../../models/modules/AutoGen";
import { TTIriRef } from "./TTIriRef";

export interface QueryRequest {
  page: number;
  pageSize: number;
  textSearch: string;
  focusVariables: Map<string, string>;
  query: Query;
  queryIri: TTIriRef;
  referenceDate: string;
}
