<template>
  <div class="container" :style="{ width: size }" :id="id">
    <strong class="label">{{ label }}: </strong>
    <span v-if="data && isObjectWithName" class="data break-text">
      {{ data.name }}
    </span>
    <span v-else class="data">None</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isObjectHasKeys } from "../../helpers/modules/DataTypeCheckers";
import LoggerService from "../../services/modules/LoggerService";

export default defineComponent({
  name: "ObjectNameWithLabel",
  props: {
    label: { type: String, required: true },
    data: { type: Object, required: true },
    size: { type: String, default: "100%" },
    id: { type: String, default: "object-name-with-label" }
  },
  computed: {
    isObjectWithName(): boolean {
      if (isObjectHasKeys(this.data, ["name"])) {
        return true;
      } else {
        LoggerService.error(undefined, "No data, data is not Object or Object has no property 'name' for use within component ObjectNameWithLabel.vue");
        return false;
      }
    }
  }
});
</script>

<style scoped>
.container {
  margin: 0;
  padding: 0.25rem 0.5rem 0 0;
}

.break-text {
  word-break: break-all;
}
</style>
