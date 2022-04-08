import DefaultTheme from "vitepress/theme";
import PrimeVue from "primevue/config";
import DemoContainer from "../components/DemoContainer.vue";
import IMLibrary from "im-library";

import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Listbox from "primevue/listbox";
import Menu from "primevue/menu";
import OverlayPanel from "primevue/overlaypanel";
import StyleClass from "primevue/styleclass";
import Tag from "primevue/tag";

import "primevue/resources/themes/saga-blue/theme.css"; //theme
import "primevue/resources/primevue.min.css"; //core css
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "./custom.css";

import store from "../../store";
import router from "../../router";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.use(PrimeVue);
    app.use(IMLibrary, { store, router });
    app.directive("styleclass", StyleClass);
    app.component("DemoContainer", DemoContainer);
    app
      .component("Button", Button)
      .component("Dialog", Dialog)
      .component("Listbox", Listbox)
      .component("Menu", Menu)
      .component("OverlayPanel", OverlayPanel)
      .component("Tag", Tag);
  }
};
