<template>
  <div v-if="show && data && isArrayObjectWithName" :id="id" :style="{ width: size }">
    <div class="head-container">
      <strong class="label">{{ label }}: </strong>
      <span v-if="totalCount">&nbsp;({{ totalCount }})</span>
      <span v-else>&nbsp;({{ listboxData.length }})</span>
      <Button
        :icon="buttonExpanded ? 'pi pi-minus' : 'pi pi-plus'"
        class="p-button-rounded p-button-text p-button-primary p-button-sm expand-button"
        :id="'expand-button-' + id"
        @click="setButtonExpanded"
        v-styleclass="{
          selector: '#listbox-' + id,
          enterClass: 'hidden',
          enterActiveClass: 'my-fadein',
          leaveActiveClass: 'my-fadeout',
          leaveToClass: 'hidden'
        }"
      />
    </div>
    <Listbox
      :options="listboxData"
      listStyle="max-height: 40rem;overflow: auto;"
      v-model="selected"
      @change="navigate(selected['@id'])"
      emptyMessage="None"
      :id="'listbox-' + id"
      class="array-listbox hidden"
    >
      <template #option="slotProps">
        <div class="data-name">
          {{ slotProps.option?.name || slotProps.option?.["@id"] }}
        </div>
      </template>
      <template #footer>
        <Button v-if="loadMoreButtonVisible" label="Load more..." class="p-button-text p-button-plain" @click="loadMore" />
      </template>
    </Listbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RouteRecordName } from "vue-router";
import { mapState } from "vuex";
import { isArrayHasLength, isObjectHasKeys } from "../../helpers/modules/DataTypeCheckers";
import LoggerService from "../../services/modules/LoggerService";

export default defineComponent({
  name: "ArrayObjectNameListboxWithLabelAndLoadMore",
  props: {
    label: { type: String, required: true },
    data: { type: Object as PropType<{ children: any[]; totalCount: any; loadMore: Function }>, required: true },
    size: { type: String, default: "100%", required: false },
    id: { type: String, default: "array-object-name-listbox-with-label" },
    show: { type: Boolean, required: true }
  },
  watch: {
    data: {
      handler() {
        this.init();
      },
      deep: true
    }
  },
  computed: {
    ...mapState(["arrayObjectNameListboxWithLabelStartExpanded", "conceptIri"]),
    isArrayObjectWithName(): boolean {
      if (!this.data) return false;
      if (!isArrayHasLength(this.data.children)) return false;
      if (this.data.children.every(item => isObjectHasKeys(item, ["name"]))) {
        return true;
      } else {
        LoggerService.warn(
          undefined,
          "Data error. Data is not array, array does not contain Object or Object has no property 'name' for use within component ArrayObjectNameListboxWithLabelAndLoadMore.vue"
        );
        return false;
      }
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      selected: {} as any,
      buttonExpanded: false,
      loadMoreButtonVisible: false,
      pageSize: 10,
      nextPage: 2,
      totalCount: 0 as number,
      listboxData: [] as any
    };
  },
  methods: {
    init() {
      this.expandAtStartup();
      this.totalCount = this.data.totalCount;
      if (this.totalCount >= this.pageSize) {
        this.loadMoreButtonVisible = true;
      }
      this.listboxData = this.data.children;
    },

    navigate(iri: string) {
      const currentRoute = this.$route.name as RouteRecordName | undefined;
      if (iri)
        this.$router.push({
          name: currentRoute,
          params: { selectedIri: iri }
        });
    },

    setButtonExpanded() {
      this.buttonExpanded = !this.buttonExpanded;
    },

    expandAtStartup() {
      if (this.arrayObjectNameListboxWithLabelStartExpanded.includes(this.label)) {
        const button = document.getElementById(`expand-button-${this.id}`) as HTMLElement;
        if (button) button.click();
      }
    },

    async loadMore() {
      console.log("here");
      const result = await this.data.loadMore(this.listboxData, this.totalCount, this.nextPage, this.pageSize, this.loadMoreButtonVisible, this.conceptIri);
      this.listboxData = result.children;
      this.nextPage = result.nextPage;
      this.pageSize = result.pageSize;
      this.loadMoreButtonVisible = result.loadButton;
      console.log(result);
    }
  }
});
</script>

<style lang="scss" scoped>
.head-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
}

.array-listbox {
  margin: 0.5rem 0 0 0;
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
