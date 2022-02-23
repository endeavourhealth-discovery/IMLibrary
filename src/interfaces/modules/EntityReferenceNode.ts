import { TTIriRef } from "./TTIriRef";

export interface EntityReferenceNode {
  "@id": string;
  hasChildren: boolean;
  name: string;
  type: TTIriRef[];
}
