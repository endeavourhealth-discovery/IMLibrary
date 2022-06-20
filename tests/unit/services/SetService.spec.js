import SetService from "../../../src/services/modules/SetService";
import axios from "axios";
import Env from "../../../src/services/modules/Env";

const setService = new SetService(axios);

describe("SetService.ts ___ axios success", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    axios.get = vi.fn().mockResolvedValue("axios get return");
    axios.post = vi.fn().mockResolvedValue("axios post return");
  });

  it("can download ___ !v1 && !expanded", async () => {
    const result = await setService.download("testIri", false, false);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(Env.API + "api/set/public/download", {
      params: { iri: "testIri", expandMembers: false, v1: false, format: "excel" },
      responseType: "blob"
    });
    expect(result).toBe("axios get return");
  });

  it("can download ___ v1 &&  expanded", async () => {
    const result = await setService.download("testIri", true, true);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(Env.API + "api/set/public/download", {
      params: { iri: "testIri", expandMembers: true, v1: true, format: "excel" },
      responseType: "blob"
    });
    expect(result).toBe("axios get return");
  });

  it("can get ECLSearch", async () => {
    const controller = new AbortController();
    const result = await setService.ECLSearch("testString", false, 1000, controller);
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(Env.API + "api/set/public/eclSearch", "testString", {
      headers: { "Content-Type": "text/plain" },
      params: { includeLegacy: false, limit: 1000 },
      signal: controller.signal
    });
    expect(result).toBe("axios post return");
  });

  it("can publish", async () => {
    const result = await setService.publish("testIri");
    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(Env.API + "api/set/publish", {
      params: { iri: "testIri" }
    });
    expect(result).toBe("axios get return");
  });

  it("can get IMV1", async () => {
    const result = await setService.IMV1("testIri");
    expect(axios.get).toBeCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(Env.API + "api/set/public/export", { params: { iri: "testIri" }, responseType: "blob" });
    expect(result).toBe("axios get return");
  });
});

describe("SetService.ts ___ axios fail", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    axios.get = vi.fn().mockRejectedValue(false);
    axios.post = vi.fn().mockRejectedValue(false);
  });

  it("can get ECLSearch", async () => {
    const controller = new AbortController();
    const result = await setService.ECLSearch("testString", false, 1000, controller);
    expect(axios.post).toBeCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(Env.API + "api/set/public/eclSearch", "testString", {
      headers: { "Content-Type": "text/plain" },
      params: { includeLegacy: false, limit: 1000 },
      signal: controller.signal
    });
    expect(result).toStrictEqual({});
  });
});
