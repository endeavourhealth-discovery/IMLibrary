<template>
  <div v-if="show" class="container" :style="{ width: size }" :id="id">
    <strong class="label">{{ label }}: </strong>
    <span class="data-string">
      {{ arrayToString ? arrayToString : "None" }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { isArrayHasLength, isObjectHasKeys } from "../../helpers/modules/DataTypeCheckers";
import { Vocabulary } from "../../vocabulary";

export default defineComponent({
  name: "ArrayObjectNamesToStringWithLabel",
  props: {
    label: { type: String, required: true },
    data: { type: Array as PropType<Array<string>>, required: true },
    size: { type: String, default: "100%" },
    id: { type: String, default: "array-object-names-to-string-with-label" },
    show: { type: Boolean, required: true }
  },
  computed: {
    arrayToString(): string | undefined {
      if (isArrayHasLength(this.data) && this.data.every(item => isObjectHasKeys(item, ["name"]))) {
        return this.data
          .map(function (item: any) {
            if (item["@id"] === Vocabulary.SHACL.NODESHAPE) return "Data model";
            return item.name;
          })
          .join(", ");
      } else {
        return undefined;
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
