import Env from "./Env";

export default class FilerService {
  axios: any;
  private api = Env.API;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async moveFolder(entity: string, oldFolder: string, newFolder: string): Promise<boolean> {
    try {
      return await this.axios.post(this.api + "api/filer/folder/move", null, {
        params: {
          entity: entity,
          oldFolder: oldFolder,
          newFolder: newFolder
        }
      });
    } catch (error) {
      return false;
    }
  }

  public async createFolder(container: string, name: string): Promise<boolean> {
    try {
      return await this.axios.post(this.api + "api/filer/folder/create", null, {
        params: {
          container: container,
          name: name
        }
      });
    } catch (error) {
      return false;
    }
  }
}
