<template>
  <div v-if="show && hasData" id="axioms-container" :style="{ width: size }">
    <div class="head-container">
      <strong class="label" data-testid="label">{{ label }}</strong>
      <span v-if="getCount()" data-testid="count">&nbsp;({{ getCount() }})</span>
      <Button
        :icon="buttonExpanded ? 'pi pi-minus' : 'pi pi-plus'"
        class="p-button-rounded p-button-text p-button-primary p-button-sm expand-button"
        :id="'expand-button-' + label"
        @click="setButtonExpanded()"
        v-styleclass="{
          selector: '.tgl-' + label,
          enterClass: 'hidden',
          enterActiveClass: 'my-fadein',
          leaveActiveClass: 'my-fadeout',
          leaveToClass: 'hidden'
        }"
        data-testid="expand-button"
      />
    </div>
    <div v-html="definition" :class="'hidden text-definition tgl-' + label" data-testid="text-definition"></div>
    <div class="loading-container" v-if="loading">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, computed, ref, onMounted, watch } from "vue";
import { mapState, useStore } from "vuex";
import { TTBundle } from "../../../interfaces/Interfaces";
import { isArrayHasLength, isObjectHasKeys } from "../../../helpers/modules/DataTypeCheckers";
import { bundleToText } from "../../../helpers/modules/Transforms";
import { isTTBundle } from "../../../helpers/modules/TypeGuards";
import { Config } from "../../../config";
import { IM } from "../../../vocabulary/Vocabulary";
import _ from "lodash";

const props = defineProps({
  label: { type: String, required: true },
  data: {
    type: Object as () => TTBundle,
    required: true
  },
  size: { type: String, default: "100%" },
  id: { type: String, default: "text-definition" },
  show: { type: Boolean, required: true }
});

const store = useStore();
const textDefinitionStartExpanded = computed(() => store.state.textDefinitionStartExpanded);
const conceptIri = computed(() => store.state.conceptIri);

const hasData = computed(() => isTTBundle(data.value) && isObjectHasKeys(data.value.entity));
watch(
  () => _.cloneDeep(props.data),
  () => (data.value = props.data)
);

const buttonExpanded = ref(false);
const count = ref(0);
const definition = ref("");
const loading = ref(false);
const data = ref({ ...props.data });

onMounted(() => init());

function init(): void {
  loading.value = true;
  getDefinition();
  loading.value = false;
  startExpanded();
}

function startExpanded() {
  if (!Array.isArray(textDefinitionStartExpanded.value)) throw new Error("TextDefinition missing vuex store property 'textDefinitionStartExpanded'");
  if (textDefinitionStartExpanded.value.includes(props.label)) {
    const button = document.getElementById(`expand-button-${props.label}`) as HTMLElement;
    if (button) button.click();
  }
}

function setButtonExpanded(): void {
  buttonExpanded.value = !buttonExpanded.value;
}

function getDefinition(): void {
  if (!hasData.value) return;
  for (const value of Config.TextDefinitionExcludePredicates) {
    if (data.value.entity[value]) delete data.value.entity[value];
  }
  if (isObjectHasKeys(data.value.entity, [IM.DEFINITION, IM.HAS_MEMBER])) {
    delete data.value.entity[IM.HAS_MEMBER];
  }
  definition.value = bundleToText("/viewer", data.value, Config.DefaultPredicateNames, 0, true, conceptIri.value, Config.XmlSchemaDatatypes);
}

function getCount(): number {
  let count = 0;
  Object.keys(data.value.entity).forEach(key => {
    if (isArrayHasLength(data.value.entity[key])) {
      count += data.value.entity[key].length;
    } else {
      count++;
    }
  });
  return count;
}
</script>

<style scoped>
.loading-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.text-definition {
  width: 100%;
  border: 1px solid #dee2e6;
  border-radius: 3px;
  padding: 0.5rem;
  margin: 0.5rem 0 0 0;
  overflow: auto;
  white-space: pre-wrap;
}

.head-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}

@keyframes my-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes my-fadeout {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

.my-fadein {
  animation: my-fadein 150ms linear;
}

.my-fadeout {
  animation: my-fadeout 150ms linear;
}
</style>
