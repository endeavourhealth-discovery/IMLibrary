<template>
  <MenuBar :model="menuBarItems">
    <template #item>
      <div style="margin-left:10px">
        <slot name="content"></slot>
      </div>
    </template>
    <template #start>
      <img class="im-logo" src="../../assets/logos/Logo-object-empty.png" alt="IM logo" v-on:click="toLandingPage" />
    </template>
    <template #end>
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
    </template>
  </MenuBar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "primevue/menubar";
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import Menu from "primevue/menu";
import { AccountItem } from "../../interfaces/modules/AccountItem";
import { LoginItem } from "../../interfaces/modules/LoginItem";
import { mapState } from "vuex";

export default defineComponent({
  name: "TopBar",
  components: { MenuBar, Menu, Button, OverlayPanel },
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
      accountItems: [] as AccountItem[],
      menuBarItems: [{ label: "" }] as { label: string | undefined }[]
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
          url: import.meta.env.VITE_AUTH_URL + "login?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Register",
          icon: "fa fa-fw fa-user-plus",
          url: import.meta.env.VITE_AUTH_URL + "register?returnUrl=" + this.authReturnUrl
        }
      ];
      this.accountItems = [
        {
          label: "My account",
          icon: "fa fa-fw fa-user",
          url: import.meta.env.VITE_AUTH_URL + "my-account?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Edit account",
          icon: "fa fa-fw fa-user-edit",
          url: import.meta.env.VITE_AUTH_URL + "my-account/edit?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Change password",
          icon: "fa fa-fw fa-user-lock",
          url: import.meta.env.VITE_AUTH_URL + "my-account/password-edit?returnUrl=" + this.authReturnUrl
        },
        {
          label: "Logout",
          icon: "fa fa-fw fa-sign-out-alt",
          url: import.meta.env.VITE_AUTH_URL + "logout?returnUrl=" + this.authReturnUrl
        }
      ];
    }
  }
});
</script>

<style scoped>
.im-logo {
  text-align: center;
  color: lightgray;
  font-weight: bold;
  cursor: pointer;
  margin-bottom: 0rem;
  width: 2.25rem;
}

.p-menubar-root-list,
.p-menubar-button {
  visibility: hidden;
}

.topbar-title {
  padding: 0.75rem;
  font-size: 1.25rem;
}
</style>