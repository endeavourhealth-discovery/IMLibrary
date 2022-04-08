<template>
  <div class="container" :style="{ width: size }">
    <strong class="label">{{ label }}: </strong>
    <Tag v-if="isObjectWithName" :value="data.name" :severity="getSeverity" class="data-tag" />
    <span v-else class="data">None</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TTIriRef } from "../../interfaces/Interfaces";
import { isObjectHasKeys } from "../../helpers/modules/DataTypeCheckers";
import LoggerService from "../../services/modules/LoggerService";
import { mapState } from "vuex";

export default defineComponent({
  name: "ObjectNameTagWithLabel",
  props: {
    label: { type: String, default: "Label" },
    data: { type: Object as PropType<TTIriRef>, default: null },
    size: { type: String, default: "100%" },
    id: { type: String, default: "ObjectNameTagWithLabel" }
  },
  computed: {
    ...mapState(["tagSeverityMatches"]),
    isObjectWithName(): boolean {
      if (isObjectHasKeys(this.data, ["name"])) {
        return true;
      } else {
        return false;
      }
    },

    getSeverity(): string {
      let result = "info";
      if (!this.tagSeverityMatches) throw new Error("Missing vuex store property 'tagSeverityMatches'");
      if (this.data && isObjectHasKeys(this.data, ["name"])) {
        const found = this.tagSeverityMatches.find((severity: { "@id": string; severity: string }) => severity["@id"] === this.data["@id"]);
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
