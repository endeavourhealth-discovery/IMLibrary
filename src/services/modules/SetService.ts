import { CancelToken } from "axios";
import { SearchResponse } from "../../interfaces/Interfaces";
import Env from "./Env";

export default class SetService {
  axios: any;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async download(conceptIri: string, expanded: boolean, v1: boolean) {
    return this.axios.get(Env.API + "api/set/public/download", {
      params: {
        iri: conceptIri,
        expandMembers: expanded,
        v1: expanded && v1,
        format: "excel"
      },
      responseType: "blob"
    });
  }

  public async ECLSearch(searchString: string, includeLegacy: boolean, limit: number, cancelToken: CancelToken): Promise<SearchResponse> {
    try {
      return await this.axios.post(Env.API + "api/set/public/eclSearch", searchString, {
        headers: { "Content-Type": "text/plain" },
        params: { includeLegacy: includeLegacy, limit: limit },
        cancelToken: cancelToken
      });
    } catch (error) {
      return {} as SearchResponse;
    }
  }
}
