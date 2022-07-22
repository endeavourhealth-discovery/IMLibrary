import { BuilderType } from "../../enums/modules/BuilderType";
import { ComponentType } from "../../enums/modules/ComponentType";

export interface ComponentDetails {
  id: string;
  value: any;
  position: number;
  type: any;
  json: any;
  builderType: BuilderType;
  showButtons?: { minus: boolean; plus: boolean };
}
