import Env from "./Env";

export default class ClassService {
  axios: any;
  private api = Env.API;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async getClassProperties(className: string): Promise<any> {
    try {
      return await this.axios.get(this.api + "api/class/public/classProperties", {
        params: {
          className: className
        }
      });
    } catch (error) {
      return {} as any;
    }
  }
}
