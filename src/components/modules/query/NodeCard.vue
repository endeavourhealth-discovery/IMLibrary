<template>
  <div :class="'node-card '" @click="onClick">
    <div class="node-card-header">
      <NodeIcon :class="`node-icon`" strokewidth="2" width="20" height="20" :icon="icon" />
      <div class="node-card-title" v-html="richTitle()"></div>
    </div>
    <div class="node-card-body"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NodeIcon from "./NodeIcon.vue";
import jp from "jsonpath";

export default defineComponent({
  name: "NodeCard",
  props: ["icon", "title", "object"],
  components: { NodeIcon },
  methods: {
    richTitle() {
      //populates title with hyperlinks to IM Viewer
      let html: string = `<div>${this.title}</div>`;
      const definition = this.object;
      const jsonQuery = `$..[?(@.name && @.@id)]`;
      const names = jp.nodes(definition, jsonQuery);
      names.forEach((item: any) => {
        const url = `https://dev.endhealth.co.uk/viewer/#/concept/${encodeURIComponent(item?.value["@id"])}`;
        const name = item?.value?.name;
        html = html.replaceAll(name, `<a target="_blank" href="${url}">${name}</a>`);
      });
      return html;
    },
    onClick() {
      console.log(this.object);
    }
  }
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
  margin-left: 10px;
  margin-top: 2px;
  color: #0f172a;
  font-size: 14px;
  line-height: 16px;
  font-weight: 500;
}

.node-card:hover {
  cursor: pointer;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.13);
}
</style>

<style>
.node-card-header a {
  color: #1d4ed8 !important;
  font-weight: 700;
}
.node-card-header a:hover {
  text-decoration: underline !important;
}
</style>
