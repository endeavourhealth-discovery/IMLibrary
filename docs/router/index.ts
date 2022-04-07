import {createRouter, createWebHashHistory, RouteRecordRaw, RouterHistory} from 'vue-router';
import { nextTick } from "vue";
import SnomedLicense from "../../src/components/modules/SnomedLicense.vue";

const APP_TITLE = "IM Library Docs";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/snomedLicense",
    name: "License",
    component: SnomedLicense
  }
];

const router = createRouter({
  history: process.isClient ? createWebHashHistory() : {} as RouterHistory,
  routes
});

router.beforeEach((to, from, next) => {

});

router.afterEach(to => {
  nextTick(() => {
    document.title = (to.meta.title as string) || APP_TITLE;
  });
});

export default router;
