import { flushPromises, mount } from "@vue/test-utils";
import SnomedLicense from "@/components/SnomedLicense.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import { expect, vi } from "vitest";

describe("SnomedLicense.vue", () => {
  let wrapper;
  let mockStore;
  let mockLocation;

  beforeEach(() => {
    mockStore = {
      state: { snomedLicenseAccepted: "false", snomedReturnUrl: "testUrl" },
      commit: vi.fn(),
    };
    mockLocation = { href: "" };
    location = window.location;
    delete window.location;
    window.location = mockLocation;
    wrapper = mount(SnomedLicense, {
      global: {
        plugins: [PrimeVue],
        components: { Dialog, Button },
        mocks: { $store: mockStore },
      },
    });
  });

  afterEach(() => {
    window.location = location;
  });

  it("updates showDialog from store snomedLicenseAccepted ___ true", async () => {
    wrapper.vm.$options.watch.snomedLicenseAccepted.call(wrapper.vm, "false");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showDialog).toBe(true);
  });

  it("updates showDialog from store snomedLicenseAccepted __ false", async () => {
    wrapper.vm.$options.watch.snomedLicenseAccepted.call(wrapper.vm, "true");
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.showDialog).toBe(false);
  });

  it("updates store and reroutes on submitAgree", async () => {
    wrapper.vm.submitAgree();
    await wrapper.vm.$nextTick();
    expect(mockStore.commit).toBeCalledTimes(1);
    expect(mockStore.commit).toBeCalledWith(
      "updateSnomedLicenseAccepted",
      "true"
    );
    expect(window.location.href).toBe(wrapper.vm.testUrl);
  });

  it("reroutes on submitDecline", async () => {
    wrapper.vm.submitDecline();
    await wrapper.vm.$nextTick();
    expect(window.location.href).toBe("https://www.snomed.org/");
  });
});
