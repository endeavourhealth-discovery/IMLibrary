import DefaultTheme from "vitepress/theme";
import PrimeVue from "primevue/config";
import DemoContainer from "../components/DemoContainer.vue";
import IMLibrary from "im-library";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "./custom.css";

import store from "../../store";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(PrimeVue);
    app.use(IMLibrary, { store });
    app.component("DemoContainer", DemoContainer);
  },
};
