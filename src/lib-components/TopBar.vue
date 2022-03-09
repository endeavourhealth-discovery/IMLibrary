<template>
  <Menubar>
    <template #start>
      <img class="im-logo" src="../assets/logos/Logo-object-empty.png" alt="IM logo" />
    </template>
    <template #end>
      <Button icon="pi pi-th-large" class="p-button-rounded p-button-text p-button-plain p-button-lg" @click="openAppsOverlay" />
      <OverlayPanel ref="appsO">
        <div class="grid">
          <div class="col-6">
            <Button v-tooltip.bottom="'Editor'" icon="far fa-edit" class="p-button-rounded p-button-text p-button-plain" @click="navigateToEditor" />
          </div>
          <div class="col-6">
            <Button v-tooltip.bottom="'UPRN'" icon="far fa-map" class="p-button-rounded p-button-text p-button-plain" @click="navigateToUPRN" />
          </div>
        </div>
      </OverlayPanel>
      <Button
        v-if="!isLoggedIn"
        icon="pi pi-user"
        class="p-button-rounded p-button-text p-button-plain p-button-lg"
        @click="openUserMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      />
      <Button
        v-if="isLoggedIn"
        class="p-button-rounded p-button-text p-button-plain p-button-lg"
        @click="openUserMenu"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      >
        <img class="avatar-icon" alt="avatar icon" :src="getUrl(currentUser.avatar)" style="width: 1.5rem" />
      </Button>
      <Menu ref="userMenu" :model="getItems()" :popup="true" />
    </template>
  </Menubar>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuBar from "primevue/menubar";
import Button from "primevue/button";
import OverlayPanel from "primevue/overlaypanel";
import Menu from "primevue/menu";

class User {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string;
  id: string;

  constructor(username: string, firstName: string, lastName: string, email: string, password: string, avatar: string) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.id = "";
  }

  setId(id: string): void {
    this.id = id;
  }
}

interface LoginItem {
  label: string;
  icon: string;
  url: string;
}

interface AccountItem {
  label: string;
  icon: string;
  url: string;
}

export default /*#__PURE__*/ defineComponent({
  name: "TopBar",
  props: {
    currentUser: { type: User, required: false },
    isLoggedIn: { type: Boolean, required: true }
  },
  components: { MenuBar, Menu, Button, OverlayPanel },
  data() {
    return {
      loading: false,
      request: {} as { cancel: any; msg: string },
      searchText: "",
      loginItems: [
        {
          label: "Login",
          icon: "fa fa-fw fa-user",
          url: process.env.VUE_APP_AUTH_URL + "login?returnUrl=VUE_APP_EDITOR"
        },
        {
          label: "Register",
          icon: "fa fa-fw fa-user-plus",
          url: process.env.VUE_APP_AUTH_URL + "register?returnUrl=VUE_APP_EDITOR"
        }
      ] as LoginItem[],
      accountItems: [
        {
          label: "My account",
          icon: "fa fa-fw fa-user",
          url: process.env.VUE_APP_AUTH_URL + "my-account?returnUrl=VUE_APP_EDITOR"
        },
        {
          label: "Edit account",
          icon: "fa fa-fw fa-user-edit",
          url: process.env.VUE_APP_AUTH_URL + "my-account/edit?returnUrl=VUE_APP_EDITOR"
        },
        {
          label: "Change password",
          icon: "fa fa-fw fa-user-lock",
          url: process.env.VUE_APP_AUTH_URL + "my-account/password-edit?returnUrl=VUE_APP_EDITOR"
        },
        {
          label: "Logout",
          icon: "fa fa-fw fa-sign-out-alt",
          url: process.env.VUE_APP_AUTH_URL + "logout?returnUrl=VUE_APP_EDITOR"
        }
      ] as AccountItem[]
    };
  },
  methods: {
    navigateToEditor() {
      window.open("/editor/#/");
    },
    navigateToUPRN() {
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
      return require("@/assets/avatars/" + item);
    },
    openAppsOverlay(event: any) {
      (this.$refs.appsO as any).toggle(event);
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
}
.app-list-container {
  justify-content: center;
}

.app-icons-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
}

.app-icon {
  width: calc(25% - 1rem);
}

@media screen and (max-width: 1439px) {
  .im-logo {
    width: 3vw;
  }
}
@media screen and (min-width: 1440px) {
  .im-logo {
    width: 3vw;
  }
}

.p-menubar {
  background: #ffffff;
}

.p-menubar-root-list,
.p-menubar-button {
  visibility: hidden;
}
</style>
