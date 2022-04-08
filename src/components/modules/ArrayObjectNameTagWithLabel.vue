<template>
  <div class="container" :style="{ width: size }" :id="id">
    <strong class="label">{{ label }}: </strong>
    <span v-if="isArrayObject">
      <Tag v-for="item of data" :key="item['@id']" :value="item.name" :severity="getSeverity(item)" class="data-tag" />
    </span>
    <span v-else class="data">None</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TTIriRef } from "../../interfaces/Interfaces";
import { isArrayHasLength, isObjectHasKeys } from "../../helpers/modules/DataTypeCheckers";
import LoggerService from "../../services/modules/LoggerService";
import { mapState } from "vuex";

export default defineComponent({
  name: "ArrayObjectNameTagWithLabel",
  props: {
    label: { type: String, default: "Label" },
    data: { type: Array as PropType<Array<TTIriRef>>, default: [] },
    size: { type: String, default: "100%" },
    id: { type: String, default: "ArrayObjectnameTagWithLabel" }
  },
  computed: {
    ...mapState(["TagSeverityMatches"]),
    isArrayObject(): boolean {
      if (this.data && isArrayHasLength(this.data) && isObjectHasKeys(this.data[0], ["@id"])) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getSeverity(item: TTIriRef): string {
      let result = "info";
      if (item && isObjectHasKeys(item, ["name"])) {
        const found = this.TagSeverityMatches.find((severity: { "@id": string; severity: string }) => severity["@id"] === item["@id"]);
        if (found) result = found.severity;
        else LoggerService.warn("TagWithLabel missing case for severity");
      }
      return result;
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
