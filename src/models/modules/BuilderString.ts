export interface ComponentDetails {
  id: string;
  value: any;
  position: number;
  type: ECLType;
  label: any;
  component: ECLComponent;
}

export interface NextComponentSummary {
  previousComponentType: ECLType;
  previousPosition: number;
  parentGroup?: ECLType;
}

export enum ECLComponent {
  LOGIC = "Logic",
  CONSTRAINT = "Constraint",
  EXPRESSION = "Expression",
  REFINEMENT = "Refinement",
  OPERATOR = "Operator",
  FOCUS_CONCEPT = "FocusConcept",
  ADD_NEXT = "AddNext",
  REFINEMENT_GROUP = "RefinementGroup",
}

export enum ECLType {
  LOGIC = "logic",
  CONSTRAINT = "constraint",
  EXPRESSION = "expression",
  REFINEMENT = "refinement",
  OPERATOR = "operator",
  FOCUS_CONCEPT = "focusConcept",
  ADD_NEXT = "addNext",
  REFINEMENT_GROUP = "refinementGroup",
}
