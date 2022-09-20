<template>
  <div>
    <DataTable class="p-datatable-sm term-code-table" :value="terms" responsiveLayout="scroll" :scrollable="true" scrollHeight="flex">
      <template #empty> No terms found. </template>
      <Column field="name" header="Name"> </Column>
      <Column field="code" header="Code"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";

const props = defineProps({
  terms: { type: Array as PropType<Array<{ name: string; code: string }>>, required: true }
});
</script>
<style scoped>
.term-code.table {
  height: 100%;
  width: 100%;
}
</style>
