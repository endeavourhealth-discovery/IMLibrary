import { QueryRequest } from "../../interfaces/modules/query/QueryRequest";
import Env from "./Env";
import { isObjectHasKeys } from "../../helpers/modules/DataTypeCheckers";
import { mapToObject } from "../../helpers/modules/Transforms";
import { QueryDisplay, QueryObject, TTIriRef } from "../../interfaces/Interfaces";

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

  public async queryIM(query: QueryRequest, controller?: AbortController): Promise<{ entities: any[]; "@context": any }> {
    try {
      if (controller) return await this.axios.post(Env.API + "api/query/public/queryIM", query, { signal: controller.signal });
      else return await this.axios.post(Env.API + "api/query/public/queryIM", query);
    } catch (error) {
      return undefined as any;
    }
  }

  public async checkValidation(validationIri: string, data: any): Promise<boolean> {
    try {
      return await this.axios.post(Env.VITE_NODE_API + "node_api/validation/public/validate", data, { params: { iri: validationIri } });
    } catch (error) {
      return false;
    }
  }

  public async runFunction(iri: string, args?: Map<string, any>): Promise<any> {
    try {
      if (args && args.size > 0) {
        const replacedArgs = mapToObject(args);
        const result = await this.axios.post(Env.API + "api/function/public/callFunction", {
          functionIri: iri,
          arguments: replacedArgs
        });
        if (isObjectHasKeys(replacedArgs, ["fieldName"])) return result[replacedArgs.fieldName];
        else return result;
      } else return await this.axios.post(Env.API + "api/function/public/callFunction", { functionIri: iri });
    } catch (error) {
      return undefined;
    }
  }

  public async entityQuery(query: QueryRequest, controller?: AbortController) {
    try {
      if (controller) return await this.axios.post(Env.API + "api/query/public/entityQuery", query, { signal: controller.signal });
      else return await this.axios.post(Env.API + "api/query/public/entityQuery", query);
    } catch (error) {
      return undefined;
    }
  }

  public async getSetQueryDisplay(query: any): Promise<QueryDisplay> {
    try {
      return await this.axios.post(Env.VITE_NODE_API + "/node_api/query/public/queryDisplay", query);
    } catch (error) {
      return {} as QueryDisplay;
    }
  }

  public async getQueryObject(query: any): Promise<QueryObject> {
    try {
      return await this.axios.post(Env.VITE_NODE_API + "/node_api/query/public/queryObject", query);
    } catch (error) {
      return {} as QueryObject;
    }
  }

  public async getQueryDefinitionDisplay(conceptIri: string): Promise<QueryDisplay> {
    try {
      return await this.axios.get(Env.VITE_NODE_API + "/node_api/query/public/queryDefinitionDisplay", {
        params: { iri: conceptIri }
      });
    } catch (error) {
      return {} as QueryDisplay;
    }
  }

  public async getQueryObjectByIri(conceptIri: string): Promise<QueryObject> {
    try {
      return await this.axios.get(Env.VITE_NODE_API + "/node_api/query/public/queryObjectDisplay", {
        params: { iri: conceptIri }
      });
    } catch (error) {
      return {} as QueryObject;
    }
  }

  public async getAllowablePropertySuggestions(conceptIri: string, searchTerm?: string): Promise<TTIriRef[]> {
    try {
      return await this.axios.get(Env.VITE_NODE_API + "/node_api/query/public/allowablePropertySuggestions", {
        params: { iri: conceptIri, searchTerm: searchTerm }
      });
    } catch (error) {
      return [] as TTIriRef[];
    }
  }

  public async getAllowableRangeSuggestions(conceptIri: string, searchTerm?: string): Promise<TTIriRef[]> {
    try {
      return await this.axios.get(Env.VITE_NODE_API + "/node_api/query/public/allowableRangeSuggestions", {
        params: { iri: conceptIri, searchTerm: searchTerm }
      });
    } catch (error) {
      return [] as TTIriRef[];
    }
  }
}
