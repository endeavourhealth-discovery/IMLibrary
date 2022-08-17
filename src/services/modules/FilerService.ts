import Env from "./Env";

export default class FilerService {
  axios: any;
  private api = Env.API;

  constructor(axios: any) {
    this.axios = axios;
  }

  public moveFolder(entity: string, oldFolder: string, newFolder: string): Promise<void> {
    return this.axios.post(this.api + "api/filer/folder/move", null, {
      params: {
        entity: entity,
        oldFolder: oldFolder,
        newFolder: newFolder
      }
    });
  }

  public async createFolder(container: string, name: string): Promise<string> {
    return this.axios.post(this.api + "api/filer/folder/create", null, {
      params: {
        container: container,
        name: name
      }
    });
  }

  public async downloadDeltas(): Promise<any> {
    return this.axios.get(this.api + "api/filer/deltas/download", { responseType: "blob" });
  }
}
