import { App, Plugin } from "vue";
import MenuBar from "primevue/menubar";
import Menu from "primevue/menu";
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import PrimeVue from "primevue/config";

// Import vue components
import * as components from "@/lib-components";

// install function executed by Vue.use()
const install: Exclude<Plugin["install"], undefined> =
  function installImLibrary(app: App) {
    // register prime vue components to app
    app.use(PrimeVue, { ripple: true });
    app.component("MenuBar", MenuBar);
    app.component("Menu", Menu);
    app.component("Button", Button);
    app.component("OverlayPanel", OverlayPanel);

    Object.entries(components).forEach(([componentName, component]) => {
      app.component(componentName, component);
    });
  };

// Create module definition for Vue.use()
export default install;

// To allow individual component use, export components
// each can be registered via Vue.component()
export * from "@/lib-components";
