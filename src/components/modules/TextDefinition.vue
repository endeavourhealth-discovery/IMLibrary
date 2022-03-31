<template>
  <div v-if="hasData" id="axioms-container" :style="{ width: size }">
    <div class="head-container">
      <strong class="label">{{ label }}</strong>
      <span v-if="getCount()">&nbsp;({{ getCount() }})</span>
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
          leaveToClass: 'hidden',
        }"
      />
    </div>
    <div
      v-html="definition"
      :class="'hidden text-definition tgl-' + label"
    ></div>
    <div class="loading-container" v-if="loading">
      <ProgressSpinner />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core";
import { mapState } from "vuex";
import { TTBundle, PartialEntity } from "../../interfaces/Interfaces";
import {
  isArrayHasLength,
  isObjectHasKeys,
} from "../../helpers/modules/DataTypeCheckers";
import { bundleToText } from "../../helpers/modules/Transforms";

export default defineComponent({
  name: "TextDefinition",
  props: {
    label: { type: String },
    data: {
      type: Object as () => PartialEntity,
      default: () => null,
    },
    size: { type: String },
    show: { type: Boolean },
  },
  computed: {
    hasData(): boolean {
      if (
        isObjectHasKeys(this.data, ["entity", "predicates"]) &&
        isObjectHasKeys(this.data.entity)
      ) {
        return true;
      } else {
        return false;
      }
    },
    ...mapState(["blockedIris", "defaultPredicateNames"]),
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      buttonExpanded: false,
      count: 0,
      definition: "",
      loading: false,
    };
  },
  methods: {
    init(): void {
      this.loading = true;
      this.getDefinition();
      this.loading = false;
      if (this.label === "Definition") {
        const button = document.getElementById(
          `expand-button-${this.label}`
        ) as HTMLElement;
        if (button) button.click();
      }
    },

    setButtonExpanded(): void {
      this.buttonExpanded = !this.buttonExpanded;
    },

    getDefinition(): void {
      if (!this.hasData) return;
      this.definition = bundleToText(
        "/viewer",
        this.data as TTBundle,
        this.defaultPredicateNames,
        0,
        true,
        this.blockedIris
      );
    },

    getCount(): number {
      let count = 0;
      Object.keys(this.data.entity).forEach((key) => {
        if (isArrayHasLength((this.data.entity as any)[key])) {
          count += (this.data.entity as any)[key].length;
        } else {
          count++;
        }
      });
      return count;
    },
  },
});
</script>

<style scoped>
.loading-container {
  height: 100%;
  widows: 100%;
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
  white-space: pre;
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
