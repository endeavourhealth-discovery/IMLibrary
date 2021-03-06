import { shallowMount } from "@vue/test-utils";
import ObjectNameWithLabel from "../../../../src/components/modules/generics/ObjectNameWithLabel.vue";
import LoggerService from "../../../../src/services/modules/LoggerService";

describe("ObjectNameWithLabel.vue", () => {
  let wrapper;

  beforeEach(() => {
    vi.resetAllMocks();
    wrapper = shallowMount(ObjectNameWithLabel, {
      props: { label: "Status", data: { name: "Active" }, size: "50%", show: true }
    });
  });

  it("can mount and check is object with name", () => {
    const text = wrapper.get(".data");
    expect(text.text()).toBe("Active");
    const label = wrapper.get(".label");
    expect(label.text()).toBe("Status:");
  });

  it("can check isObjectWithname ___ true", () => {
    expect(ObjectNameWithLabel.computed.isObjectWithName.call({ data: { name: "Active", "@id": "http://endhealth.info/im#Active" } })).toBe(true);
  });

  it("can check isObjectWithname ___ false no name", () => {
    LoggerService.error = vi.fn();
    expect(ObjectNameWithLabel.computed.isObjectWithName.call({ data: { statusname: "Active", "@id": "http://endhealth.info/im#Active" } })).toBe(false);
    expect(LoggerService.error).toHaveBeenCalledTimes(1);
  });

  it("can check isObjectWithname ___ false no data", () => {
    LoggerService.error = vi.fn();
    expect(ObjectNameWithLabel.computed.isObjectWithName.call({ data: undefined })).toBe(false);
    expect(LoggerService.error).toHaveBeenCalledTimes(1);
  });

  it("can check isObjectWithname ___ false no Object", () => {
    LoggerService.error = vi.fn();
    expect(ObjectNameWithLabel.computed.isObjectWithName.call({ data: [] })).toBe(false);
    expect(LoggerService.error).toHaveBeenCalledTimes(1);
  });
});
