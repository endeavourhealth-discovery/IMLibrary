export enum BuilderType {
  MEMBER = "member",
  PARENT = "parent",
}

export interface ComponentDetails {
  id: string;
  value: any;
  position: number;
  type: ComponentType;
  json: any;
  builderType: BuilderType;
}

export enum ComponentType {
  LOGIC = "Logic",
  ENTITY = "Entity",
  ADD_NEXT = "AddNext",
  BUILDER = "Builder",
  REFINEMENT = "Refinement",
  QUANTIFIER = "Quantifier",
}

export interface NextComponentSummary {
  previousComponentType: ComponentType;
  previousPosition: number;
  parentGroup?: ComponentType;
}
