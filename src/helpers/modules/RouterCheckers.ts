import Env from "../../services/modules/Env";

export function checkLicense(to: any, next: any, store: any) {
  if (to.matched.some((record: any) => record.meta.requiresLicense)) {
    console.log("snomed license accepted:" + store.state.snomedLicenseAccepted);
    if (store.state.snomedLicenseAccepted !== "true") {
      next({
        path: "/snomedLicense",
      });
    }
  }
}

export async function checkAuth(to: any, currentUrl: string, store: any) {
  if (to.matched.some((record: any) => !record.meta.requiresAuth)) {
    store.commit("updateConceptIri", to.params.selectedIri as string);
  } else {
    await store.dispatch("authenticateCurrentUser").then((res: any) => {
      console.log("auth guard user authenticated:" + res.authenticated);
      if (!res.authenticated) {
        console.log("redirecting to login");
        window.location.href = Env.authUrl + "login?returnUrl=" + currentUrl;
      }
    });
  }
}

export default {
  checkAuth,
  checkLicense,
};
