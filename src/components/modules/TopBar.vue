<template>
  <div id="topbar">
    <div id="topbar-start">
      <img class="im-logo" src="../../assets/logos/Logo-object-empty.png" alt="IM logo" v-on:click="toLandingPage" />
    </div>
    <div id="topbar-content">
      <slot name="content" />
    </div>
    <div id="topbar-end">
      <Button icon="pi pi-th-large" class="p-button-rounded p-button-text p-button-plain p-button-lg p-button-icon-only" @click="openAppsOverlay" />
      <OverlayPanel ref="appsO">
        <div class="grid">
          <div class="col-6">
            <Button v-tooltip.bottom="'Editor'" icon="far fa-edit" class="p-button-rounded p-button-text p-button-plain" @click="navigateToEditor" />
          </div>
          <div class="col-6">
            <Button v-tooltip.bottom="'UPRN'" icon="far fa-map" class="p-button-rounded p-button-text p-button-plain" @click="navigateToEditor" />
          </div>
        </div>
      </OverlayPanel>
      <Button
        v-if="!isLoggedIn"
        icon="pi pi-user"
        class="p-button-rounded p-button-text p-button-plain p-button-lg p-button-icon-only"
        @click="openUserMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      />
      <Button
        v-if="currentUser && isLoggedIn"
        class="p-button-rounded p-button-text p-button-plain p-button-lg p-button-icon-only"
        @click="openUserMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      >
        <img class="avatar-icon" alt="avatar icon" :src="getUrl(currentUser.avatar)" style="width: 1.5rem" />
      </Button>
      <Menu ref="userMenu" :model="getItems()" :popup="true" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import Menu from "primevue/menu";
import { AccountItem } from "../../interfaces/modules/AccountItem";
import { LoginItem } from "../../interfaces/modules/LoginItem";
import { mapState } from "vuex";
import { Env } from "../../services";

export default defineComponent({
  name: "TopBar",
  components: { Menu, Button, OverlayPanel },
  computed: mapState(["currentUser", "isLoggedIn", "authReturnUrl"]),
  mounted() {
    this.setUserMenuItems();
  },
  data() {
    return {
      loading: false,
      request: {} as { cancel: any; msg: string },
      searchText: "",
      loginItems: [] as LoginItem[],
      accountItems: [] as AccountItem[]
    };
  },
  methods: {
    toLandingPage() {
      window.location.href = "/";
    },
    navigateToEditor(): void {
      window.open("/editor/#/");
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
          icon: "fa fa-fw fa-user",
          url: Env.authUrl + "#/login?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Register",
          icon: "fa fa-fw fa-user-plus",
          url: Env.authUrl + "#/?returnUrl=" + this.authReturnUrl
        }
      ];
      this.accountItems = [
        {
          label: "My account",
          icon: "fa fa-fw fa-user",
          url: Env.authUrl + "#/my-account?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Edit account",
          icon: "fa fa-fw fa-user-edit",
          url: Env.authUrl + "#/my-account/edit?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Change password",
          icon: "fa fa-fw fa-user-lock",
          url: Env.authUrl + "#/my-account/password-edit?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Logout",
          icon: "fa fa-fw fa-sign-out-alt",
          url: Env.authUrl + "#/logout?returnUrl=" + this.authReturnUrl
        }
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
}
</style>
