import { AppEnum } from "../../enums/modules/AppEnum";

export interface RecentActivityItem {
  iri: string;
  name: string;
  type: string;
  dateTime: Date;
  app: AppEnum;
}
