import axios, { AxiosResponse, CancelToken } from "axios";
import _ from "lodash"
import Env from "./Env";

export default class QueryService {


  public static async querySummary(iri: string): Promise<any> {
    try {
      const _res = await axios.get(Env.VITE_NODE_API + "node_api/query/public/querySummary", {
        params: {
          iri: iri
        }
      });
      // console.log("api response", _.cloneDeep(_res))
      return _res;
    } catch (error) {
      return {} as any;
    }
  }


  public static async definition(iri: string): Promise<any> {
    try {
      const _res = await axios.get(Env.VITE_NODE_API + "node_api/query/public/definition", {
        params: {
          iri: iri
        }
      });
      // console.log("api response", _.cloneDeep(_res))
      return _res;
    } catch (error) {
      return {} as any;
    }
  }

  public static async getRichDefinition(iri: string): Promise<any> {
    try {
      const _res = await axios.get(Env.VITE_NODE_API + "node_api/query/public/richDefinition", {
        params: {
          iri: iri
        }
      });
      // console.log("api response", _.cloneDeep(_res))
      return _res;
    } catch (error) {
      return {} as any;
    }
  }
}
