import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SnomedLicense from "../../src/components/modules/SnomedLicense.vue";

const APP_TITLE = "IM Library Docs";

const routes: Array<RouteRecordRaw> = [{ path: "/", name: "Docs", component: SnomedLicense }];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
