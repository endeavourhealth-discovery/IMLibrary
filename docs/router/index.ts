import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import { nextTick } from "vue";
import SnomedLicense from "../../src/components/SnomedLicense.vue";

const APP_TITLE = "IM Library Docs";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/snomedLicense",
    name: "License",
    component: SnomedLicense
  }
];

const router = createRouter({
  history: createWebHashHistory(),
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
