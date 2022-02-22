import { TTIriRef } from "./TripleTree";

export interface ExportValueSet {
  valueSet: TTIriRef;
  limited: boolean;
  members: Array<ValueSetMember>;
}

export interface ValueSetMember {
  entity: TTIriRef;
  code: string;
  scheme: TTIriRef;
  label: string;
  type: string;
  directParent: TTIriRef;
}
