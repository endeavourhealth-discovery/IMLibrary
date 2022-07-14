import { PropertyShape } from "./PropertyShape";

export interface PropertyGroup {
  label: string;
  comment: string;
  name: string;
  order: number;
  minCount: number;
  maxCount: number;
  property: PropertyShape[];
}
