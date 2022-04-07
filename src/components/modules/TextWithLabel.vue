<template>
  <div class="text-with-label-container" :id="id" :style="{ width: size }">
    <strong class="label">{{ label }}: </strong>
    <span class="data break-text">{{ data }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TextWithLabel",
  props: {
    label: { type: String, default: "Label" },
    data: { type: String, default: "None" },
    size: { type: String, default: "100%" },
    id: { type: String, default: "TextWithLabel" }
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
