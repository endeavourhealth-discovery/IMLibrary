import { ECLType } from "../../enums/modules/ECLType";
export interface ECLNextComponentSummary {
    previousComponentType: ECLType;
    previousPosition: number;
    parentGroup?: ECLType;
}
