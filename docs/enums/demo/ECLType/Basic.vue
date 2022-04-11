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
import { ECLType } from "../../../../src/enums/modules/ECLType";
export default {
  data() {
    return {
      enum: ECLType
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
