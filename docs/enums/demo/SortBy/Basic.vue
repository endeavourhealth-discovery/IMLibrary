<template>
  <div>
    <span>{</span>
    <ul>
      <li v-for="(key, value) in enum">{{ key }} ="{{ value }}",</li>
    </ul>
    <span>}</span>
  </div>
</template>

<script lang="ts">
import { SortBy } from "../../../../src/enums/modules/SortBy";
export default {
  data() {
    return {
      enum: SortBy
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
