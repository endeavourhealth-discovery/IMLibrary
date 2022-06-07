import axios from "axios";
import Env from "./Env";

export default class QueryService {
  public static async querySummary(iri: string): Promise<any> {
    try {
      return await axios.get(Env.VITE_NODE_API + "node_api/query/public/querySummary", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public static async definition(iri: string): Promise<any> {
    try {
      return await axios.get(Env.VITE_NODE_API + "node_api/query/public/definition", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public static async getRichDefinition(iri: string): Promise<any> {
    try {
      return await axios.get(Env.VITE_NODE_API + "node_api/query/public/richDefinition", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }
}
