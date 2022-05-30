import ArrayObjectNameTagWithLabel from "../../../src/components/modules/ArrayObjectNameTagWithLabel.vue";
import { shallowMount } from "@vue/test-utils";
import Tag from "primevue/tag";
import LoggerService from "../../../src/services/modules/LoggerService";
import { IM } from "../../../src/vocabulary/IM";

describe("ArraObjectNameTagWithLabel.vue", () => {
  let wrapper;
  let mockStore;

  beforeEach(() => {
    vi.resetAllMocks();

    mockStore = {
      state: {
        tagSeverityMatches: [
          { "@id": IM.ACTIVE, severity: "success" },
          { "@id": IM.DRAFT, severity: "warning" },
          { "@id": IM.INACTIVE, severity: "danger" }
        ]
      }
    };

    wrapper = shallowMount(ArrayObjectNameTagWithLabel, {
      global: { components: { Tag }, mocks: { $store: mockStore } },
      props: { label: "Status", size: "50%", data: [{ "@id": "http://endhealth.info/im#Active", name: "Active" }], show: true }
    });
  });

  it("mounts", () => {
    expect(wrapper.vm.label).toBe("Status");
    expect(wrapper.vm.size).toBe("50%");
    expect(wrapper.vm.data).toStrictEqual([{ "@id": "http://endhealth.info/im#Active", name: "Active" }]);
  });

  it("can check isArrayObject ___ true", () => {
    expect(ArrayObjectNameTagWithLabel.computed.isArrayObject.call({ data: [{ "@id": "http://endhealth.info/im#Active", name: "Active" }] })).toBe(true);
  });

  it("can check isArrayObject ___ false", () => {
    expect(ArrayObjectNameTagWithLabel.computed.isArrayObject.call({ data: { "@id": "http://endhealth.info/im#Active", name: "Active" } })).toBe(false);
  });

  it("can getSeverity ___ active", () => {
    expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Active", name: "Active" })).toBe("success");
  });

  it("can getSeverity ___ draft", () => {
    expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Draft", name: "Draft" })).toBe("warning");
  });

  it("can getSeverity ___ inactive", () => {
    expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Inactive", name: "Inactive" })).toBe("danger");
  });

  it("can getSeverity ___ none", () => {
    LoggerService.warn = vi.fn();
    expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Obsolete", name: "Obsolete" })).toBe("info");
    expect(LoggerService.warn).toHaveBeenCalledTimes(1);
    expect(LoggerService.warn).toHaveBeenCalledWith("TagWithLabel missing case for severity");
  });

  it("can getSeverity ___ no name", () => {
    LoggerService.warn = vi.fn();
    expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Obsolete" })).toBe("info");
  });
});
