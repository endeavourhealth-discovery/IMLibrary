<template>
  <div>
    <DataTable class="p-datatable-sm" :value="terms" responsiveLayout="scroll">
      <template #empty> No terms found. </template>
      <Column field="name" header="Name"> </Column>
      <Column field="code" header="Code"></Column>
    </DataTable>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "TermCodeTable",
  props: {
    terms: { type: Array as PropType<Array<any>>, required: true }
  }
});
</script>
