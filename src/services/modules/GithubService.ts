import Env from "./Env";

export default class GithubService {
  axios: any;
  private api = Env.VITE_NODE_API;

  constructor(axios: any) {
    this.axios = axios;
  }

  public async getLatestRelease(repositoryName: string) {
    try {
      return await this.axios.get(this.api + "node_api/github/public/latestRelease/", { params: { repositoryName: repositoryName } });
    } catch (error) {
      console.warn(error);
      return {} as any;
    }
  }

  public async getReleases(repositoryName: string) {
    try {
      return await this.axios.get(this.api + "node_api/github/public/releases", { params: { repositoryName: repositoryName } });
    } catch (error) {
      console.warn(Error);
      return [];
    }
  }
}
