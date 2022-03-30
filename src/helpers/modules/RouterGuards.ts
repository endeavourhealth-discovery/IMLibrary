import Env from "../../services/modules/Env";

export function checkLicense(
  to: any,
  next: any,
  store: any,
  hasCalledNext: boolean
) {
  if (to.matched.some((record: any) => record.meta.requiresLicense)) {
    console.log("snomed license accepted:" + store.state.snomedLicenseAccepted);
    if (store.state.snomedLicenseAccepted !== "true") {
      hasCalledNext = true;
      next({
        path: "/snomedLicense",
      });
    }
  }
  return hasCalledNext;
}

export async function checkAuth(
  to: any,
  next: any,
  store: any,
  hasCalledNext: boolean,
  currentUrl: string
) {
  if (to.matched.some((record: any) => record.meta.requiresAuth)) {
    await store.dispatch("authenticateCurrentUser").then((res: any) => {
      console.log("auth guard user authenticated:" + res.authenticated);
      if (!res.authenticated) {
        console.log("redirecting to login");
        if ((currentUrl = "Auth")) {
          hasCalledNext = true;
          next({ path: "/login" });
        } else {
          window.location.href = Env.authUrl + "login?returnUrl=" + currentUrl;
        }
      }
    });
  }
  return hasCalledNext;
}

export default {
  checkAuth,
  checkLicense,
};
