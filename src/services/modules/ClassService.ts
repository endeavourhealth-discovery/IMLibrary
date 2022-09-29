import { Field, FieldDto } from "../../interfaces/modules/QueryBuilder";
import Env from "./Env";

export default class ClassService {
  axios: any;
  private api = Env.API;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async getClassProperties(className: string): Promise<Field[]> {
    try {
      return await this.axios.get(this.api + "api/class/public/classProperties", {
        params: {
          className: className
        }
      });
    } catch (error) {
      return [] as Field[];
    }
  }

  public async getClassFields(className: string): Promise<FieldDto[]> {
    try {
      return await this.axios.get(this.api + "api/class/public/classFields", {
        params: {
          className: className
        }
      });
    } catch (error) {
      return [] as FieldDto[];
    }
  }
}
