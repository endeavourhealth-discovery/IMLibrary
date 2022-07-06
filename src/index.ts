import { App, Plugin } from "vue";
import axios from "axios";
import * as components from "./components";
import Tooltip from "primevue/tooltip";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { ConfigService, DirectService, EntityService, Env, LoggerService, SetService } from "./services/Services";

export interface imlibraryInterface {
  install: Plugin;
}
const IMLibrary: imlibraryInterface = {
  install(app: App, options: any): void {
    if (!options || !options.store) {
      throw new Error("Please initialise plugin with a Vuex store.");
    }
    // registers for docs only
    if (options.store.state.docs) {
      const configService = new ConfigService(axios);
      const directService = new DirectService(options.store);
      const entityService = new EntityService(axios);
      const setService = new SetService(axios);
      app.use(options.store);
      app.use(options.router);
      dom.watch();
      library.add(fas as any, far as any);
      app.directive("tooltip", Tooltip);
      app.config.globalProperties.$configService = configService;
      app.config.globalProperties.$directService = directService;
      app.config.globalProperties.$entityService = entityService;
      app.config.globalProperties.$env = Env;
      app.config.globalProperties.$loggerService = LoggerService;
      app.config.globalProperties.$setService = setService;
    }
    for (const key in components) {
      // @ts-expect-error
      app.component(key, components[key]);
    }
  }
};

import "./assets/main.scss";

export default IMLibrary;

export * from "./components";
export * from "./constants";
export * from "./vocabulary";
export * from "./helpers";
export * from "./models";
export * from "./enums";
export * from "./interfaces";
export * from "./services";
export * from "./config";
