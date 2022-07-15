import Env from "./Env";

export default class QueryService {
  axios: any;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async querySummary(iri: string): Promise<any> {
    try {
      return await this.axios.get(Env.VITE_NODE_API + "node_api/query/public/querySummary", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async definition(iri: string): Promise<any> {
    try {
      return await this.axios.get(Env.VITE_NODE_API + "node_api/query/public/definition", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async getRichDefinition(iri: string): Promise<any> {
    try {
      return await this.axios.get(Env.VITE_NODE_API + "node_api/query/public/richDefinition", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async generateSQL(conceptIri: string) {
    return this.axios.get(Env.VITE_NODE_API + "node_api/query/public/getSQL", {
      params: {
        iri: conceptIri
      },
      responseType: "text"
    });
  }

  public async queryIM(query: any): Promise<{ entities: any[]; "@context": any }> {
    try {
      return await this.axios.post(Env.API + "api/query/public/queryIM", query);
    } catch (error) {
      return {} as any;
    }
  }

  public async checkValidation(value: any, validationIri: string): Promise<boolean> {
    try {
      return await this.axios.get(Env.API + "api/query/public/checkValidation", { params: { value: value, validationIri: validationIri } });
    } catch (error) {
      return false;
    }
  }

  public async getQueryFromFunctionIri(iri: string): Promise<any> {
    try {
      return await this.axios.get(Env.API + "api/query/public/getQueryFromFunctionIri", { params: { iri: iri } });
    } catch (error) {
      return {} as any;
    }
  }
}
