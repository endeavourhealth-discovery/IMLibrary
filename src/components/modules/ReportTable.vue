<template>
  <div :id="id" class="dashcard-container">
    <Card class="dashcard dash-table">
      <template #title v-if="title">
        <span>{{ title }}</span>
      </template>
      <template #subtitle v-if="subTitle">
        <span>{{ subTitle }}</span>
      </template>
      <template #content>
        <DataTable v-if="isCorrectInputData" :value="tableData" class="p-datatable-sm" :scrollable="true" scrollHeight="350px" :loading="loading">
          <template #header v-if="tableHeader"> {{ tableHeader }} </template>
          <Column field="label" header="Label"></Column>
          <Column field="count" header="Total"></Column>
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RDFS, OWL } from "../../vocabulary/Vocabulary";
import { isObjectHasKeys } from "../../helpers/modules/DataTypeCheckers";

export default defineComponent({
  name: "ReportTable",
  props: {
    title: { type: String, required: false },
    subTitle: { type: String, required: false },
    tableHeader: { type: String, required: false },
    inputData: { type: Array as PropType<Array<any>>, default: [] },
    id: { type: String, default: "report-table" }
  },
  computed: {
    isCorrectInputData(): boolean {
      return this.inputData.every(item => {
        if (isObjectHasKeys(item, [RDFS.LABEL, OWL.HAS_VALUE]) || isObjectHasKeys(item, ["count", "label"])) return true;
        else return false;
      });
    }
  },
  data() {
    return {
      tableData: [] as { count: number; label: string }[],
      loading: false
    };
  },
  mounted() {
    this.getReportTableData();
  },
  methods: {
    getReportTableData(): void {
      if (!this.isCorrectInputData) return;
      this.loading = true;
      for (const entry of this.inputData) {
        if (isObjectHasKeys(entry, [RDFS.LABEL, OWL.HAS_VALUE])) {
          this.tableData.push({
            label: entry[RDFS.LABEL],
            count: entry[OWL.HAS_VALUE]
          });
        }
        if (isObjectHasKeys(entry, ["label", "count"])) {
          this.tableData.push({
            label: entry.label,
            count: entry.count
          });
        }
      }
      this.loading = false;
    }
  }
});
</script>

<style scoped>
.dashcard-container {
  height: 100%;
  width: 100%;
}

.dashcard {
  height: 100%;
  width: 100%;
}

.loading-container {
  width: 100%;
  height: 100%;
}
</style>
