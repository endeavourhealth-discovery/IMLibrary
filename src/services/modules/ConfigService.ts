import { FilterDefaultsConfig, DefinitionConfig, DashboardLayout } from "../../interfaces/Interfaces";
import Env from "./Env";

export default class ConfigService {
  axios: any;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async getComponentLayout(name: string): Promise<DefinitionConfig[]> {
    try {
      return await this.axios.get(Env.API + "api/config/public/componentLayout", {
        params: {
          name: name
        }
      });
    } catch (error) {
      return [] as DefinitionConfig[];
    }
  }

  public async getDashboardLayout(name: string): Promise<DashboardLayout[]> {
    try {
      return await this.axios.get(Env.API + "api/config/public/dashboardLayout", {
        params: {
          name: name
        }
      });
    } catch (error) {
      return [] as DashboardLayout[];
    }
  }
}
