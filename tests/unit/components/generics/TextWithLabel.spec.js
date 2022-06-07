import { shallowMount } from "@vue/test-utils";
import TextWithLabel from "../../../../src/components/modules/generics/TextWithLabel.vue";

describe("TextWithLabel.vue", () => {
  let wrapper;

  beforeEach(() => {
    vi.resetAllMocks();

    wrapper = shallowMount(TextWithLabel, {
      props: { label: "Name", data: "Scoliosis", size: "50%", show: true }
    });
  });

  it("renders props", () => {
    const label = wrapper.get(".label");
    const data = wrapper.get(".data");
    expect(label.text()).toBe("Name:");
    expect(data.text()).toBe("Scoliosis");
  });
});
