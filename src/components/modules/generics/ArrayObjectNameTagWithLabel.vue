<template>
  <div v-if="show" class="container" :style="{ width: size }" :id="id">
    <strong class="label" data-testid="label">{{ label }}: </strong>
    <div v-if="isArrayObject" class="tag-container">
      <Tag v-for="item of data" :key="item['@id']" :value="item.name" :severity="getSeverity(item)" class="data-tag" data-testid="data-tag" />
    </div>
    <span v-else class="tag-container">None</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { TTIriRef } from "../../../interfaces/Interfaces";
import { isArrayHasLength, isObjectHasKeys } from "../../../helpers/modules/DataTypeCheckers";
import LoggerService from "../../../services/modules/LoggerService";
import { mapState, useStore } from "vuex";

const props = defineProps({
  label: { type: String, required: true },
  data: { type: Array as PropType<TTIriRef[]>, required: true },
  size: { type: String, default: "100%" },
  id: { type: String, default: "array-object-name-tag-with-label" },
  show: { type: Boolean, required: true }
});

const store = useStore();
const tagSeverityMatches = computed(() => store.state.tagSeverityMatches);

const isArrayObject = computed(() => {
  if (props.data && isArrayHasLength(props.data) && isObjectHasKeys(props.data[0], ["@id"])) {
    return true;
  } else {
    return false;
  }
});

function getSeverity(item: TTIriRef): string {
  let result = "info";
  if (!tagSeverityMatches.value) throw new Error("Missing vuex store property 'tagSeverityMatches'");
  if (item && isObjectHasKeys(item, ["name"])) {
    const found = tagSeverityMatches.value.find((severity: { "@id": string; severity: string }) => severity["@id"] === item["@id"]);
    if (found) result = found.severity;
    else LoggerService.warn("TagWithLabel missing case for severity");
  }
  return result;
}
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

.tag-container {
  display: flex;
  flex-flow: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}
</style>
