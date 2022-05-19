<template>
  <div id="topbar">
    <div id="topbar-start">
      <img class="im-logo" src="../../assets/logos/Logo-object-empty.png" alt="IM logo" v-on:click="toLandingPage" />
    </div>
    <div id="topbar-content">
      <slot name="content" />
    </div>
    <div id="topbar-end">
      <Button
        icon="pi pi-th-large"
        class="p-button-rounded p-button-text p-button-plain p-button-lg p-button-icon-only topbar-end-button"
        @click="openAppsOverlay"
      />
      <OverlayPanel ref="appsO">
        <div class="flex flex-row flex-wrap gap-1 justify-content-start">
          <Button
            v-for="item in appItems"
            v-tooltip.bottom="item.label"
            :icon="item.icon"
            class="p-button-rounded p-button-text p-button-plain"
            @click="navigate(item.url)"
          />
        </div>
      </OverlayPanel>
      <Button
        v-if="!isLoggedIn"
        icon="pi pi-user"
        class="p-button-rounded p-button-text p-button-plain p-button-lg p-button-icon-only topbar-end-button"
        @click="openUserMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      />
      <Button
        v-if="currentUser && isLoggedIn"
        class="p-button-rounded p-button-text p-button-plain p-button-lg p-button-icon-only topbar-end-button"
        @click="openUserMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      >
        <img class="avatar-icon" alt="avatar icon" :src="getUrl(currentUser.avatar)" style="min-width: 1.75rem" />
      </Button>
      <Menu ref="userMenu" :model="getItems()" :popup="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { AccountItem } from "../../interfaces/modules/AccountItem";
import { LoginItem } from "../../interfaces/modules/LoginItem";
import { mapState } from "vuex";
import { Env } from "../../services";

export default defineComponent({
  name: "TopBar",
  computed: mapState(["currentUser", "isLoggedIn", "authReturnUrl"]),
  mounted() {
    this.setUserMenuItems();
    this.setAppMenuItems();
  },
  data() {
    return {
      loading: false,
      request: {} as { cancel: any; msg: string },
      searchText: "",
      loginItems: [] as LoginItem[],
      accountItems: [] as AccountItem[],
      appItems: [] as { icon: string; url: string; label: string }[]
    };
  },
  methods: {
    toLandingPage() {
      window.location.href = "/";
    },
    navigate(url: string) {
      window.open(url);
    },
    getItems(): LoginItem[] | AccountItem[] {
      if (this.isLoggedIn) {
        return this.accountItems;
      } else {
        return this.loginItems;
      }
    },
    openUserMenu(event: any): void {
      (this.$refs.userMenu as any).toggle(event);
    },
    getUrl(item: string): string {
      const url = new URL(`/src/assets/avatars/${item}`, import.meta.url);
      return url.href;
    },
    openAppsOverlay(event: any) {
      (this.$refs.appsO as any).toggle(event);
    },
    setUserMenuItems(): void {
      this.loginItems = [
        {
          label: "Login",
          icon: "fa-solid fa-fw fa-user",
          url: Env.AUTH_URL + "#/login?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Register",
          icon: "fa-solid fa-fw fa-user-plus",
          url: Env.AUTH_URL + "#/?returnUrl=" + this.authReturnUrl
        }
      ];
      this.accountItems = [
        {
          label: "My account",
          icon: "fa-solid fa-fw fa-user",
          url: Env.AUTH_URL + "#/my-account?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Edit account",
          icon: "fa-solid fa-fw fa-user-pen",
          url: Env.AUTH_URL + "#/my-account/edit?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Change password",
          icon: "fa-solid fa-fw fa-user-lock",
          url: Env.AUTH_URL + "#/my-account/password-edit?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Logout",
          icon: "fa-solid fa-fw fa-arrow-right-from-bracket",
          url: Env.AUTH_URL + "#/logout?returnUrl=" + this.authReturnUrl
        }
      ];
    },
    setAppMenuItems() {
      this.appItems = [
        { label: "Directory", icon: "fa-solid fa-folder-open", url: "/" },
        { label: "Creator", icon: "fa-solid fa-circle-plus", url: "/editor/#/creator" },
        { label: "Editor", icon: "fa-solid fa-pen-to-square", url: "/editor/#/editor" },
        { label: "Mapper", icon: "fa-solid fa-diagram-project", url: "/editor/#/mapper" }
      ];
    }
  }
});
</script>

<style scoped>
.im-logo {
  cursor: pointer;
  margin: 0 0.5rem;
  width: 2.25rem;
}

#topbar {
  height: 3.5rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}

#topbar-start {
  height: 100%;
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
}

#topbar-content {
  height: 100%;
  flex: 0 1 auto;
  overflow: auto;
}

#topbar-end {
  height: 100%;
  flex: 1 0 auto;
  justify-self: end;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
  padding: 0 0.5rem 0 0;
  gap: 0.25rem;
}
</style>

<style>
.topbar-end-button:hover {
  background-color: #6c757d !important;
  color: #ffffff !important;
}
</style>
