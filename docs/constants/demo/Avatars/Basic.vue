<template>
  <div>
    <span>[</span>
    <ul>
      <li v-for="avatar of avatars">"{{ avatar }}",</li>
    </ul>
    <span>]</span>
  </div>
</template>

<script lang="ts">
import { Avatars } from "../../../../src/constants/modules/Avatars";
export default {
  data() {
    return {
      avatars: Avatars
    };
  }
};
</script>

<style scoped>
ul {
  margin: 0 0 0 1.25rem;
  padding: 0;
  list-style-type: none;
}
</style>
