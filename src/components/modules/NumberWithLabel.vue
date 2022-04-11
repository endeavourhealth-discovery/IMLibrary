<template>
  <div class="number-with-label-container" :style="{ width: size }" :id="id">
    <strong class="label">{{ label }}: </strong>
    <span class="data break-text">{{ data }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NumberWithLabel",
  props: {
    label: { type: String, required: true },
    data: { type: [Number, String], required: true },
    size: { type: String, default: "100%" },
    id: { type: String, default: "number-with-label" }
  },
  computed: {
    asString(): string {
      if (!this.data) return "None";
      if (typeof this.data === "number") return this.data.toString();
      else return this.data;
    }
  }
});
</script>

<style scoped>
.text-with-label-container {
  padding: 0.25rem 0.5rem 0 0;
}
.break-text {
  word-break: break-all;
}
</style>
