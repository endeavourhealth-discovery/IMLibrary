import { ECLComponent } from "../../enums/modules/ECLComponent";
import { ECLType } from "../../enums/modules/ECLType";

export interface ECLComponentDetails {
  id: string;
  value: any;
  position: number;
  type: ECLType;
  label: any;
  component: ECLComponent;
}
