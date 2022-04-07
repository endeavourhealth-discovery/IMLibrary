<template>
  <div>
    <span>{</span>
    <ul>
      <li v-for="(value, key) of enum">{{ key }} = "{{ value }}",</li>
    </ul>
    <span>}</span>
  </div>
</template>

<script lang="ts">
import { AppEnum } from "../../../../src/enums/modules/AppEnum";
export default {
  data() {
    return {
      enum: AppEnum
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
