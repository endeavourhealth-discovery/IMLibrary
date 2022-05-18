<template>
  <div v-if="data && isArrayObjectWithName" :id="id" :style="{ width: size }">
    <div class="head-container">
      <strong class="label">{{ label }}: </strong>
      <span v-if="totalCount[predicate] !== null">&nbsp;({{ totalCount[predicate] }})</span>
      <span v-else>&nbsp;({{ data.length }})</span>
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
      :options="data"
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
        <Button v-if="totalCount[predicate] !== null && visible" label="Load more..." class="p-button-text p-button-plain" @click="loadMore()"/>
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
  name: "ArrayObjectNameListboxWithLabel",
  props: {
    label: { type: String, required: true },
    data: { type: Array as PropType<Array<unknown>>, required: true },
    size: { type: String, default: "100%", required: false },
    id: { type: String, default: "array-object-name-listbox-with-label" },
    predicate: { type: String as any},
    totalCount: { type: Object as any},
    visible: { type: Boolean}
  },
  computed: {
    ...mapState(["arrayObjectNameListboxWithLabelStartExpanded"]),
    isArrayObjectWithName(): boolean {
      if (!this.data) return false;
      if (!isArrayHasLength(this.data)) return false;
      if (this.data.every(item => isObjectHasKeys(item, ["name"]))) {
        return true;
      } else {
        LoggerService.warn(
          undefined,
          "Data error. Data is not array, array does not contain Object or Object has no property 'name' for use within component ArrayObjectNameListboxWithLabel.vue"
        );
        return false;
      }
    }
  },
  mounted() {
    this.expandAtStartup();
  },
  data() {
    return {
      selected: {} as any,
      buttonExpanded: false
    };
  },
  methods: {
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
      this.$emit("loadMore",this.predicate);
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
