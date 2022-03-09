import { App, Plugin } from "vue";
import * as components from "./components";
import Tooltip from "primevue/tooltip";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

export interface imlibraryInterface {
  install: Plugin;
}
const IMLibrary: imlibraryInterface = {
  install(app: App, options: any): void {
    dom.watch();
    library.add(fas as any, far as any);
    if (!options || !options.store) {
      throw new Error("Please initialise plugin with a Vuex store.");
    }
    if (options.store.state.docs) app.use(options.store);
    for (const key in components) {
      // @ts-expect-error
      app.component(key, components[key]);
    }
    app.directive("tooltip", Tooltip);
    app.component("font-awesome-icon", FontAwesomeIcon);
  }
};

import "./assets/main.scss";

export default IMLibrary;

export * from "./components";
export * from "./constants";
export * from "./utils";
export * from "./vocabulary";
export * from "./helpers";
export * from "./models";
export * from "./enums";
export * from "./interfaces";
