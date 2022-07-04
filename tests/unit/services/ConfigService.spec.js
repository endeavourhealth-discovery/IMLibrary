import ConfigService from "../../../src/services/modules/ConfigService";
import axios from "axios";
import Env from "../../../src/services/modules/Env";
import { vi } from "vitest";

let configService;

describe("ConfigService.ts ___ axios success", () => {
  const api = Env.API;

  beforeEach(() => {
    axios.get = vi.fn().mockResolvedValue(["test config"]);
    configService = new ConfigService(axios);
  });

  it("can get component layout", async () => {
    const result = await configService.getComponentLayout("definition");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/public/componentLayout", { params: { name: "definition" } });
    expect(result).toStrictEqual(["test config"]);
  });

  it("can get dashboard layout", async () => {
    const result = await configService.getDashboardLayout("conceptDashboard");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/public/dashboardLayout", { params: { name: "conceptDashboard" } });
    expect(result).toStrictEqual(["test config"]);
  });
});

describe("ConfigService.ts ___ axios fail", () => {
  const api = Env.API;

  beforeEach(() => {
    vi.resetAllMocks();
    const mockError = new Error("axios test error");
    axios.get = vi.fn().mockRejectedValue(mockError);
    configService = new ConfigService(axios);
  });

  it("can get component layout", async () => {
    const result = await configService.getComponentLayout("definition");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/public/componentLayout", { params: { name: "definition" } });
    expect(result).toStrictEqual([]);
  });

  it("can get dashboardLayout", async () => {
    const result = await configService.getDashboardLayout("conceptDashboard");
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(api + "api/config/public/dashboardLayout", { params: { name: "conceptDashboard" } });
    expect(result).toStrictEqual([]);
  });
});
