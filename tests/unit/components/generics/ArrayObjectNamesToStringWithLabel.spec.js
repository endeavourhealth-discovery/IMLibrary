import { shallowMount } from "@vue/test-utils";
import ArrayObjectNamesToStringWithLabel from "../../../../src/components/modules/generics/ArrayObjectNamesToStringWithLabel.vue";

describe("ArrayObjectNameToStringWithLabel.vue", () => {
  let wrapper;

  beforeEach(() => {
    vi.resetAllMocks();

    wrapper = shallowMount(ArrayObjectNamesToStringWithLabel, {
      props: {
        label: "Types",
        size: "50%",
        data: [
          { "@id": "http://endhealth.info/im#RecordType", name: "Record type" },
          { "@id": "http://www.w3.org/ns/shacl#NodeShape", name: "Node shape" },
          { "@id": "http://www.w3.org/2002/07/owl#Class", name: "Class" }
        ],
        show: true
      }
    });
  });

  it("renders after mount", () => {
    const label = wrapper.get(".label");
    expect(label.text()).toBe("Types:");
    const data = wrapper.get(".data-string");
    expect(data.text()).toBe("Record type, Data model, Class");
  });

  it("can convert arrayToString ___ success", () => {
    expect(
      ArrayObjectNamesToStringWithLabel.computed.arrayToString.call({
        data: [
          { "@id": "http://endhealth.info/im#RecordType", name: "Record type" },
          { "@id": "http://www.w3.org/ns/shacl#NodeShape", name: "Node shape" },
          { "@id": "http://www.w3.org/2002/07/owl#Class", name: "Class" }
        ]
      })
    ).toBe("Record type, Data model, Class");
  });

  it("can convert arrayToString ___ fail", () => {
    expect(
      ArrayObjectNamesToStringWithLabel.computed.arrayToString.call({
        data: [
          { "@id": "http://endhealth.info/im#RecordType", name: "Record type" },
          {
            "@id": "http://www.w3.org/ns/shacl#NodeShape",
            typename: "Node shape"
          },
          { "@id": "http://www.w3.org/2002/07/owl#Class", name: "Class" }
        ]
      })
    ).toBe(undefined);
  });
});
