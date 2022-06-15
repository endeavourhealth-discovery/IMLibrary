import { CancelToken } from "axios";
import {
  EntityReferenceNode,
  FiltersAsIris,
  TTBundle,
  TTIriRef,
  EntityDefinitionDto,
  GraphData,
  TermCode,
  Namespace,
  DataModelProperty,
  ExportValueSet
} from "../../interfaces/Interfaces";
import { Models } from "../../models";
import Env from "./Env";

export default class EntityService {
  axios: any;
  private api = Env.API;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async downloadConcept(iri: string, format: string): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/entity/public/exportConcept", {
        params: {
          iri: iri,
          format: format
        },
        responseType: "blob"
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async getFullExportSet(iri: string, v1: boolean): Promise<any> {
    const client = this.axios.create({
      baseURL: this.api,
      timeout: 0
    });

    return client.get("api/entity/public/setExport", {
      params: {
        iri: iri,
        legacy: v1
      },
      responseType: "blob"
    });
  }

  public async getSimpleMaps(iri: string): Promise<any[]> {
    try {
      return await this.axios.get(this.api + "api/entity/public/simpleMaps", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return [] as any[];
    }
  }

  public async getPartialEntity(iri: string, predicates: string[]): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/entity/public/partial", {
        params: {
          iri: iri,
          predicate: predicates.join(",")
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async getFullEntity(iri: string): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/entity/fullEntity", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async getPartialEntityBundle(iri: string, predicates: string[]): Promise<TTBundle> {
    try {
      return await this.axios.get(this.api + "api/entity/public/partialBundle", {
        params: {
          iri: iri,
          predicate: predicates.join(",")
        }
      });
    } catch (error) {
      return {} as TTBundle;
    }
  }

  public async iriExists(iri: string): Promise<boolean> {
    try {
      return await this.axios.get(this.api + "api/entity/public/iriExists", { params: { iri: iri } });
    } catch (error) {
      return false;
    }
  }

  public async getDefinitionBundle(iri: string): Promise<TTBundle> {
    try {
      return await this.axios.get(this.api + "api/entity/public/inferredBundle", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return {} as TTBundle;
    }
  }

  public async getInferredAsString(iri: string): Promise<string> {
    try {
      return await this.axios.get(this.api + "api/entity/public/inferredAsString", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return "";
    }
  }

  public async advancedSearch(request: Models.Search.SearchRequest, cancelToken: CancelToken): Promise<Models.Search.ConceptSummary[]> {
    try {
      return await this.axios.post(this.api + "api/entity/public/search", request, {
        cancelToken: cancelToken
      });
    } catch (error) {
      return [] as Models.Search.ConceptSummary[];
    }
  }

  public async getFolderPath(iri: string): Promise<TTIriRef[]> {
    try {
      return await this.axios.get(this.api + "api/entity/public/folderPath", {
        params: { iri: iri }
      });
    } catch (error) {
      return [] as TTIriRef[];
    }
  }

  public async getParentHierarchy(iri: string): Promise<EntityReferenceNode> {
    try {
      return await this.axios.get(this.api + "api/entity/public/parentHierarchy", {
        params: { iri: iri }
      });
    } catch (error) {
      return {} as EntityReferenceNode;
    }
  }

  public async getEntityDefinitionDto(iri: string): Promise<EntityDefinitionDto> {
    try {
      return await this.axios.get(this.api + "api/entity/public/definition", {
        params: { iri: iri }
      });
    } catch (error) {
      return {} as EntityDefinitionDto;
    }
  }

  public async getEntityParents(iri: string, filters?: FiltersAsIris): Promise<EntityReferenceNode[]> {
    try {
      return await this.axios.get(this.api + "api/entity/public/parents", {
        params: { iri: iri, schemeIris: filters?.schemes.join(",") }
      });
    } catch (error) {
      return [] as EntityReferenceNode[];
    }
  }

  public async getEntityChildren(iri: string, filters?: FiltersAsIris, cancelToken?: CancelToken): Promise<EntityReferenceNode[]> {
    try {
      return await this.axios.get(this.api + "api/entity/public/children", {
        params: { iri: iri, schemeIris: filters?.schemes.join(",") },
        cancelToken: cancelToken
      });
    } catch (error) {
      return [] as EntityReferenceNode[];
    }
  }

  public async getPagedChildren(iri: string, pageIndex: number, pageSize: number, filters?: FiltersAsIris, cancelToken?: CancelToken): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/entity/public/childrenPaged", {
        params: { iri: iri, page: pageIndex, size: pageSize, schemeIris: filters?.schemes.join(",") },
        cancelToken: cancelToken
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async getEntityUsages(iri: string, pageIndex: number, pageSize: number): Promise<TTIriRef[]> {
    try {
      return await this.axios.get(this.api + "api/entity/public/usages", {
        params: {
          iri: iri,
          page: pageIndex,
          size: pageSize
        }
      });
    } catch (error) {
      return [] as TTIriRef[];
    }
  }

  public async getUsagesTotalRecords(iri: string): Promise<number> {
    try {
      return await this.axios.get(this.api + "api/entity/public/usagesTotalRecords", {
        params: {
          iri: iri
        }
      });
    } catch (error) {
      return 0;
    }
  }

  public async getEntityGraph(iri: string): Promise<GraphData> {
    try {
      return await this.axios.get(this.api + "api/entity/public/graph", { params: { iri: iri } });
    } catch (error) {
      return {} as GraphData;
    }
  }

  public async getEntityTermCodes(iri: string): Promise<TermCode[]> {
    try {
      return await this.axios.get(Env.API + "api/entity/public/termCode", {
        params: { iri: iri }
      });
    } catch (error) {
      return {} as TermCode[];
    }
  }

  public async getEntitySummary(iri: string): Promise<Models.Search.ConceptSummary> {
    try {
      return await this.axios.get(this.api + "api/entity/public/summary", {
        params: { iri: iri }
      });
    } catch (error) {
      return {} as Models.Search.ConceptSummary;
    }
  }

  public async getNamespaces(): Promise<Namespace[]> {
    try {
      return await this.axios.get(this.api + "api/entity/public/namespaces");
    } catch (error) {
      return [] as Namespace[];
    }
  }

  public async getEcl(bundle: TTBundle): Promise<string> {
    try {
      return await this.axios.post(this.api + "api/entity/public/ecl", bundle);
    } catch (error) {
      return "";
    }
  }

  public async getPartialEntities(typeIris: string[], predicates: string[]) {
    const promises: Promise<any>[] = [];
    typeIris.forEach(iri => {
      promises.push(this.getPartialEntity(iri, predicates));
    });
    try {
      return await Promise.all(promises);
    } catch (error) {
      return [];
    }
  }

  public async getPathBetweenNodes(descendant: string, ancestor: string): Promise<TTIriRef[]> {
    try {
      return await this.axios.get(this.api + "api/entity/public/shortestParentHierarchy", {
        params: { descendant: descendant, ancestor: ancestor }
      });
    } catch (error) {
      return [];
    }
  }

  public async getNames(iris: string[]): Promise<TTIriRef[]> {
    try {
      return await this.axios.post(this.api + "api/entity/public/getNames", iris);
    } catch (error) {
      return [];
    }
  }

  public async saveMapping(mappings: Map<string, string[]>): Promise<any[]> {
    try {
      return await this.axios.post(this.api + "api/entity/mapping", mappings);
    } catch (error) {
      return [] as any[];
    }
  }

  public async removeTaskAction(taskIri: string, removedActionIri: string): Promise<any> {
    try {
      return await this.axios.delete(this.api + "api/entity/task/action", {
        params: {
          taskIri: taskIri,
          removedActionIri: removedActionIri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async addTaskAction(entityIri: string, taskIri: string): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/entity/task/action", {
        params: {
          entityIri: entityIri,
          taskIri: taskIri
        }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async createTask(entity: any): Promise<any> {
    try {
      return await this.axios.post(this.api + "api/entity/task", entity);
    } catch (error) {
      return {} as any;
    }
  }

  public async getPredefinedList(listPath: string): Promise<TTIriRef[]> {
    try {
      return await this.axios.get(this.api + "api/entity/public/" + listPath);
    } catch (error) {
      return [] as any[];
    }
  }

  public async getMappingSuggestions(request: Models.Search.SearchRequest, cancelToken: CancelToken): Promise<Models.Search.ConceptSummary[]> {
    try {
      return await this.axios.post(this.api + "api/entity/public/search", request, {
        cancelToken: cancelToken
      });
    } catch (error) {
      return [] as Models.Search.ConceptSummary[];
    }
  }

  public async getEntityAsEntityReferenceNode(iri: string): Promise<EntityReferenceNode> {
    try {
      return await this.axios.get(this.api + "api/entity/public/asEntityReferenceNode", { params: { iri: iri } });
    } catch (error) {
      return {} as EntityReferenceNode;
    }
  }

  public async getPartialAndTotalCount(
    iri: string,
    predicate: string,
    pageIndex: number,
    pageSize: number,
    filters?: FiltersAsIris,
    cancelToken?: CancelToken
  ): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/entity/public/partialAndTotalCount", {
        params: { iri: iri, predicate: predicate, page: pageIndex, size: pageSize, schemeIris: filters?.schemes.join(",") },
        cancelToken: cancelToken
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async getHasMember(
    iri: string,
    predicate: string,
    pageIndex: number,
    pageSize: number,
    filters?: FiltersAsIris,
    cancelToken?: CancelToken
  ): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/entity/public/hasMember", {
        params: { iri: iri, predicate: predicate, page: pageIndex, size: pageSize, schemeIris: filters?.schemes.join(",") },
        cancelToken: cancelToken
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async getEntityByPredicateExclusions(iri: string, predicates: string[]): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/entity/public/entityByPredicateExclusions", {
        params: { iri: iri, predicates: predicates.join(",") }
      });
    } catch (error) {
      return {} as any;
    }
  }

  public async getBundleByPredicateExclusions(iri: string, predicates: string[]): Promise<TTBundle> {
    try {
      return await this.axios.get(this.api + "api/entity/public/bundleByPredicateExclusions", {
        params: { iri: iri, predicates: predicates.join(",") }
      });
    } catch (error) {
      return {} as TTBundle;
    }
  }

  public async createEntity(entity: any): Promise<any> {
    try {
      return await this.axios.post(this.api + "api/entity/create", entity);
    } catch (error) {
      return {};
    }
  }

  public async updateEntity(entity: any): Promise<any> {
    try {
      return await this.axios.post(this.api + "api/entity/update", entity);
    } catch (error) {
      return {};
    }
  }

  public async getDataModelProperties(iri: string): Promise<DataModelProperty[]> {
    try {
      return await this.axios.get(Env.API + "api/entity/public/dataModelProperties", {
        params: { iri: iri }
      });
    } catch (error) {
      return [] as DataModelProperty[];
    }
  }

  public async getEntityMembers(
    iri: string,
    expandMembers?: boolean,
    expandSubsets?: boolean,
    limit?: number,
    withHyperlinks?: boolean
  ): Promise<ExportValueSet> {
    try {
      return await this.axios.get(Env.API + "api/entity/public/members", {
        params: {
          iri: iri,
          expandMembers: expandMembers,
          expandSubsets: expandSubsets,
          limit: limit,
          withHyperlinks: withHyperlinks
        }
      });
    } catch (error) {
      return {} as ExportValueSet;
    }
  }
}
