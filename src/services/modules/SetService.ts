import { CancelToken } from "axios";
import { Query, SearchResponse } from "../../interfaces/Interfaces";
import Env from "./Env";

export default class SetService {
  axios: any;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async ECLSearch(searchString: string, includeLegacy: boolean, limit: number, controller: AbortController): Promise<SearchResponse> {
    try {
      return await this.axios.post(Env.API + "api/set/public/eclSearch", searchString, {
        headers: { "Content-Type": "text/plain" },
        params: { includeLegacy: includeLegacy, limit: limit },
        signal: controller.signal
      });
    } catch (error) {
      return {} as SearchResponse;
    }
  }

  public async getQueryFromECL(ecl: string): Promise<Query> {
    return this.axios.get(Env.API + "api/set/public/ecl/query", {
      params: { ecl: ecl }
    });
  }

  public async isValidECL(ecl: string): Promise<boolean> {
    return this.axios.get(Env.API + "api/set/public/ecl/validity", {
      params: { ecl: ecl }
    });
  }

  public async getECLFromQuery(query: Query): Promise<string> {
    return this.axios.post(Env.API + "api/set/public/query/ecl", query);
  }

  public async publish(conceptIri: string) {
    return this.axios.get(Env.API + "api/set/publish", {
      params: { iri: conceptIri }
    });
  }

  public async IMV1(conceptIri: string) {
    return this.axios.get(Env.API + "api/set/public/export", {
      params: { iri: conceptIri },
      responseType: "blob"
    });
  }
}
