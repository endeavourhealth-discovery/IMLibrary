import SnomedLicense from "../../../src/components/modules/SnomedLicense.vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import PrimeVue from "primevue/config";
import { expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/vue";
import { createStore } from "vuex";

const store = createStore({
  // update stateType.ts when adding new state!
  state: {
    snomedLicenseAccepted: false,
    snomedReturnUrl: "testUrl.org"
  },
  mutations: {
    updateSnomedLicenseAccepted(state, status) {
      state.snomedLicenseAccepted = status;
      localStorage.setItem("snomedLicenseAccepted", status);
    }
  }
});

describe("SnomedLicense.vue", () => {
  let mockLocation;
  let component;

  beforeEach(() => {
    mockLocation = { href: "" };
    location = window.location;
    delete window.location;
    window.location = mockLocation;
    component = render(SnomedLicense, {
      global: {
        plugins: [PrimeVue, store],
        components: { Dialog, Button }
      }
    });
  });

  afterEach(() => {
    window.location = location;
  });

  it("shows dialog", async () => {
    component.getByTestId("license-dialog");
  });

  it("routes after accepted", async () => {
    const button = component.getByTestId("agree-button");
    await fireEvent.click(button);
    expect(await component.queryByTestId("license-dialog")).toBeFalsy();
    expect(window.location.href).toBe("testUrl.org");
  });
});
