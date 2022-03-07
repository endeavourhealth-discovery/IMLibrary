import { App, Plugin } from "vue";
import * as components from "./components";
export interface imlibraryInterface {
  install: Plugin;
}
const IMLibrary: imlibraryInterface = {
  install(app: App, options: any): void {
    console.log(options);
    if (!options || !options.store) {
      throw new Error("Please initialise plugin with a Vuex store.");
    }
    if (options.store.state.docs) app.use(options.store);
    for (const key in components) {
      // @ts-expect-error
      app.component(key, components[key]);
    }
  },
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
