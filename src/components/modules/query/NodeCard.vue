<template>
  <div :class="'node-card '">
    <div class="node-card-header">
      <NodeIcon :class="`node-icon`" strokewidth="2" width="20" height="20" :icon="icon" />
      <div class="node-card-title">{{ title }}</div>
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
  position: relative;
  display: inline-flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #d1d5db;
  top: -5px;
  margin-bottom: 7px;
  border-radius: 7px;
  padding: 6px 10px 6px 10px;
}

.node-card-header {
  display: inline-flex;
  position: relative;
}
.node-card-title {
  margin-left: 1rem;
  color: #334155;
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 500;
}

.node-card:hover {
  cursor: pointer;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.13);
}
</style>