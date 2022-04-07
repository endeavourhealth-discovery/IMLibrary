<template>
  <ul>
    <li v-for="avatar of avatars">{{ avatar }}</li>
  </ul>
</template>

<script>
import { Avatars } from "../../../../src/constants/modules/Avatars";
export default {
  data() {
    return {
      avatars: Avatars
    };
  }
};
</script>

<style></style>
