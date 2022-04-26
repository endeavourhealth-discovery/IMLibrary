import axios, { CancelToken } from "axios";
import { EntityReferenceNode, FiltersAsIris } from "../../interfaces/Interfaces";
import { Models } from "../../models";
import Env from "./Env";

export default class EntityService {
  public static async getPartialEntity(iri: string, predicates: string[]): Promise<any> {
    try {
      const response = await axios.get(Env.api + "api/entity/public/partial", {
        params: {
          iri: iri,
          predicate: predicates.join(",")
        }
      });
      return response.data;
    } catch (error) {
      return {} as any;
    }
  }

  public static async getEntityParents(iri: string, filters?: FiltersAsIris): Promise<EntityReferenceNode[]> {
    try {
      const response = await axios.get(Env.api + "api/entity/public/parents", {
        params: { iri: iri, schemeIris: filters?.schemes.join(",") }
      });
      return response.data;
    } catch (error) {
      return [] as EntityReferenceNode[];
    }
  }

  public static async getEntityChildren(iri: string, filters?: FiltersAsIris, cancelToken?: CancelToken): Promise<EntityReferenceNode[]> {
    try {
      const response = await axios.get(Env.api + "api/entity/public/children", {
        params: { iri: iri, schemeIris: filters?.schemes.join(",") },
        cancelToken: cancelToken
      });
      return response.data;
    } catch (error) {
      return [] as EntityReferenceNode[];
    }
  }

  public static async getEntitySummary(iri: string): Promise<Models.Search.ConceptSummary> {
    try {
      const response = await axios.get(Env.api + "api/entity/public/summary", {
        params: { iri: iri }
      });
      return response.data;
    } catch (error) {
      return {} as Models.Search.ConceptSummary;
    }
  }
}
