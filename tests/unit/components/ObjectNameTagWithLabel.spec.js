import ObjectNameTagWithLabel from "../../../src/components/modules/ObjectNameTagWithLabel.vue";
import { shallowMount } from "@vue/test-utils";
import Tag from "primevue/tag";
import LoggerService from "../../../src/services/modules/LoggerService";
import { IM } from "../../../src/vocabulary/IM";

describe("ObjectNameTagWithLabel.vue", () => {
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

    wrapper = shallowMount(ObjectNameTagWithLabel, {
      global: { components: { Tag }, mocks: { $store: mockStore } },
      props: { label: "Status", data: { "@id": "http://endhealth.info/im#Active", name: "Active" }, size: "100%", show: true }
    });
  });

  describe("isObjectWithName", () => {
    it("returns true if object with name", () => {
      expect(ObjectNameTagWithLabel.computed.isObjectWithName.call({ data: { "@id": "http://endhealth.info/im#Active", name: "Active" } })).toBe(true);
    });

    it("returns false if not object with name", () => {
      expect(ObjectNameTagWithLabel.computed.isObjectWithName.call({ data: "Name" })).toBe(false);
    });
  });

  describe("getSeverity", () => {
    it("returns correct severity ___ Active", () => {
      expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Active", name: "Active" })).toBe("success");
    });

    it("returns correct severity ___ Draft", () => {
      expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Draft", name: "Draft" })).toBe("warning");
    });

    it("returns correct severity ___ Inactive", () => {
      expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Inactive", name: "Inactive" })).toBe("danger");
    });

    it("returns correct severity ___ none", () => {
      expect(wrapper.vm.getSeverity(null)).toBe("info");
    });

    it("returns correct severity ___ unknown name", () => {
      LoggerService.warn = vi.fn();
      expect(wrapper.vm.getSeverity({ "@id": "http://endhealth.info/im#Discontinued", name: "Discontinued" })).toBe("info");
      expect(LoggerService.warn).toHaveBeenCalledTimes(1);
      expect(LoggerService.warn).toHaveBeenCalledWith("TagWithLabel missing case for severity");
    });
  });
});
