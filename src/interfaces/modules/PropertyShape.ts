import { Argument } from "../../models/modules/AutoGen";
import { TTIriRef } from "./TTIriRef";

export interface PropertyShape {
  label: string;
  comment: string;
  name: string;
  order: number;
  minCount: number;
  maxCount: number;
  path: TTIriRef;
  datatype: TTIriRef;
  clazz: TTIriRef;
  node: TTIriRef;
  function: TTIriRef;
  isIri: TTIriRef;
  isNumericValue: string;
  isTextValue: string;
  componentType: TTIriRef;
  validation: TTIriRef;
  search: TTIriRef;
  argument: Argument[];
  valueVariable: string;
  select: TTIriRef[];
  builderChild: boolean;
}
