import { TTIriRef } from "./TripleTree";

export interface EntityReferenceNode {
  "@id": string;
  hasChildren: boolean;
  name: string;
  type: TTIriRef[];
}
