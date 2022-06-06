<template>
  <div v-if="show" class="container" :style="{ width: size }">
    <strong class="label">{{ label }}: </strong>
    <Tag v-if="isObjectWithName" :value="data.name" :severity="getSeverity(data)" class="data-tag" />
    <span v-else class="data">None</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { TTIriRef } from "../../../interfaces/Interfaces";
import { isObjectHasKeys } from "../../../helpers/modules/DataTypeCheckers";
import LoggerService from "../../../services/modules/LoggerService";
import { mapState } from "vuex";

export default defineComponent({
  name: "ObjectNameTagWithLabel",
  props: {
    label: { type: String, required: true },
    data: { type: Object as PropType<TTIriRef>, required: true },
    size: { type: String, default: "100%" },
    id: { type: String, default: "object-name-tag-with-label" },
    show: { type: Boolean, required: true }
  },
  computed: {
    ...mapState(["tagSeverityMatches"]),
    isObjectWithName(): boolean {
      if (isObjectHasKeys(this.data, ["name"])) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    getSeverity(data: TTIriRef): string {
      let result = "info";
      if (!this.tagSeverityMatches) throw new Error("Missing vuex store property 'tagSeverityMatches'");
      if (data && isObjectHasKeys(data, ["@id"])) {
        const found = this.tagSeverityMatches.find((severity: { "@id": string; severity: string }) => severity["@id"] === data["@id"]);
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
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}
</style>
