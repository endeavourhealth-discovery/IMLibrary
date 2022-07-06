<template>
  <div :class="'node-card inline-flex flex-col'">
    <div class="node-card-header inline-flex relative">
      <NodeIcon :class="`node-icon`" strokewidth="2" width="20" height="20" :icon="icon" />
      <div class="ml-4 text-blue-700 font-medium text-2xl">{{ title }}</div>
    </div>
    <div class="node-card-body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NodeIcon from "./NodeIcon.vue";

export default defineComponent({
  name: "NodeCard",
  props: ["icon", "title"],
  components: { NodeIcon }
});
</script>

<style scoped>
.node-card {
  /* background: #f9fafb; */
  background: #fff;
  border: 1px solid #d1d5db;
  top: -5px;
  margin-bottom: 7px;
  border-radius: 7px;
  padding: 6px 10px 6px 10px;
}

.node-card:hover {
  cursor: pointer;

  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.13);
}
</style>
