<template>
  <div v-if="show" :style="{ width: size }" class="section-divider">
    <Divider />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
  name: "SectionDivider",
  props: {
    size: { type: String, default: "100%" },
    show: { type: Boolean }
  }
});
</script>
<style scoped></style>
