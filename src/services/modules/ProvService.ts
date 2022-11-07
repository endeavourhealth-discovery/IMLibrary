import Env from "./Env";
import {TTIriRef} from "../../interfaces/modules/TTIriRef";

export default class EntityService {
  axios: any;
  private api = Env.API;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async  getProvHistory(iri:string) {
    try {
      return await this.axios.get(this.api + "api/prov/public/history", {
        params: { iri: iri }
      });
    } catch (error) {
      return [] as TTIriRef[];
    }
  }
}