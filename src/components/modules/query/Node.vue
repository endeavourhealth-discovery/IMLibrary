<template>
  <div :class="'node relative ' + [highlighted ? 'highlighted ' : ''] + [connector ? ' connector' : '']">
    <!-- Custom Sentences - add new ones here  -->
    <template v-if="template == 'MainEntity' && entity">
      <NodeCard  icon="user" :title="entity.name" />
      <Node class="mt-2 pl-5" :object="object" path="select.match" valueType="operator" operator="and" :highlighted="true" :edit="edit"> </Node>
    </template>
    <div v-else-if="template == 'entityInSet' && valueType == 'TTIriRef'" class="relative flex mt-10 ">
      <div class="connector-v flex-col relative">
        <div class="circle"></div>
        <div class="line-v"></div>
        <!-- <div class="operatorlabel absolute rounded-sm text-lg text-gray-700 font-bold">{{ operator }}</div> -->
      </div>

      <NodeCard class="relative -top-3 ml-5 mb-3">
        <template #header>
          <NodeIcon :class="`node-icon`" strokewidth="2" width="20" height="20" icon="search" />
          <div class="ml-4 text-blue-700 font-medium text-2xl">{{ entity.name }}</div>
        </template>
      </NodeCard>
    </div>

    <div v-else-if="template == 'leafEntity'" class="flex relative">
      <div class="connector-v flex-col relative">
        <div class="circle"></div>
        <div v-if="showLineV(index, indexCount, -1, -1)" class="line-v"></div>
        <!-- <div v-if="index > 0 || operator == 'or'" class="operatorlabel absolute rounded-sm text-lg text-gray-700 font-bold">{{ operator }}</div> -->
      </div>
      <NodeCard
        v-if="hasKey(entity, 'entityInSet')"
        icon="search"
        :title="'is part of the results of the search ' + entity?.entityInSet[0].name"
        class="relative"
      />
      <NodeCard v-else icon="document_text" :title="entity.displayText || 'Undefined Criteria'" class="relative" />
    </div>
    <!-- /Custom Sentences - add new ones here -->

    <!--  Clause  -->
    <template v-if="entity && children(entity).length" v-for="(child, childIndex) in children(entity)" :key="child?.path">
      <div class="connector operator horizontal">
        <!-- Connector -->
        <div class="flex-col relative">
          <div class="circle"></div>
          <div v-if="showLineV(index, indexCount, childIndex, children(entity).length)" class="line-v"></div>
        </div>
        <div class="line-h"></div>
        <!-- Connector -->

        <!-- Operator Children -->
        <div v-if="children(child.value).length" class="operator-items">
          <Node
            v-for="(grandChild, grandChildIndex) in children(child.value)"
            :object="object"
            :path="`${path}[${child?.path}].${grandChild?.path}`"
            valueType="match"
            :operator="grandChildIndex > 0 ? child.path : ''"
            :index="grandChildIndex"
            :edit="edit"
            :indexCount="children(child.value).length"
            template="leafEntity"
          >
          </Node>
        </div>
        <!--  Operator Children  -->

        <!-- Leaf Child -->
        <template v-else>
          <Node :object="object" :path="`${path}[${child?.path}]`" valueType="match" :edit="edit" template="leafEntity"> </Node>
        </template>
        <!-- Leaf Child  -->
      </div>
    </template>

    <!--  Clause  -->

    <!-- Child Nodes -->
    <slot> </slot>
    <!-- Child Nodes -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import NodeCard from "./NodeCard.vue";
import NodeIcon from "./NodeIcon.vue";
import Static from "./Static.vue";
import Selector from "./Selector.vue";
import Keyword from "./Keyword.vue";
import _ from "lodash";

export default defineComponent({
  name: "Node",
  components: { Selector, Static, Keyword, NodeIcon, NodeCard },
  props: [
    "indexCount",
    "template",
    "connector",
    "modelValue",
    "object",
    "path",
    "parentPath",
    "valueType",
    "keys",
    "excludedKeys",
    "operator",
    "highlighted",
    "index",
    "edit"
  ],
  emits: ["selectedClauseUpdated"],
  methods: {
    showLineV(index, indexCount, childIndex, childIndexCount): boolean {
      if (childIndexCount > 0 && childIndex < childIndexCount - 1) {
        return true;
      } else if (index == indexCount - 1) {
        //last item in a list should not have a line below it
        return false;
      } else if (!index && !indexCount) {
        return false;
      } else {
        return true;
      }
    },
    showOperator(path: string, index: number, childIndex: number): boolean {
      // console.log("path", path);
      // console.log("childIndex", index);
      // console.log("operator", this.operator == "or" );
      if ((index == 0 || childIndex == 0) && this.operator == "or") {
        // this.operator = "either";
        return true;
      }
      if (index > 0 || childIndex > 0) return true;

      return false;
    },
    isOperator(testString: any): boolean {
      return ["and", "or"].includes(testString);
    },
    hasKey(testObjecty: any, comparatorKey: string): boolean {
      return Object.keys(testObjecty).some(key => key == comparatorKey);
    },
    children(testObject: any): any {
      // console.log("keys", Object.keys(testObject));
      if (Array.isArray(testObject)) {
        return testObject.map((obj: string, index: number) => {
          return { path: index, value: obj };
        });
      } else {
        const includedKeys = ["and", "or", "property"];
        const excludedKeys = ["entityInSet", "pathTo", "alias"];

        const includedKey = Object.keys(testObject).find((key: string) => includedKeys.includes(key));
        const excludedKey = Object.keys(testObject).find((key: string) => excludedKeys.includes(key));

        if (includedKey && !excludedKey) {
          return testObject[includedKey].map((child: string, index: number) => {
            return { path: `${includedKey}[${index}]`, value: child };
          });
        } else {
          return [];
        }
      }
    }
  },
  data() {
    return {
      editMode: this.edit,
      entity: this.path ? _.get(this.object, this.path) : this.object,
      parent: this.parentPath ? _.get(this.object, this.parentPath) : null
    };
  },
  computed: {
    a: {
      get() {
        const testString = this?.entity?.name;
        if (!testString || testString == "") return "a";
        return ["a", "e", "i", "o", "u"].some((letter: string) => letter.toLowerCase() == testString.substring(0, 1).toLowerCase()) ? "an" : "a";
      },
      set() {}
    }
  },
  watch: {
    edit(newValue: boolean) {
      this.editMode = newValue;
    }
  }
});
</script>

<style>
.line-h {
  min-width: 10px;
  margin: 9px 3px 0 0;
  border-top: 3px solid #d1d5db;
}

.line-v {
  display: inline-block;
  min-width: 10px;
  margin-left: 5px;
  min-height: calc(100% - 25px);
  /* flex-grow: 1; */
  /* min-height: 5px; */
  border-left: 3px solid #cbd5e1;
}

.operatorlabel {
  top: calc(50% - 5px);
  right: 20px;
}

.circle {
  /* width: 12px;
  height: 12px;
  position: absolute;
  left: -10px;
  top: 5px;
  z-index: 2;
  border-radius: 50%;
  border: 1px solid #475569;
  box-shadow: 0px 0px 7px rgba(0, 0, 0, 0.13); */
  margin: 3px 3px 5px 0px;
  background-color: #cbd5e1;
  /* background-color: #334155; */
  min-width: 13px;
  min-height: 13px;
  width: 13px;
  height: 13px;
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.node-icon {
  color: #2563eb;
  min-height: 20px;
  min-width: 20px;
  /* left: -43px; */
  /* top: -1px */
}

.circle.middle {
  top: calc(50% + 10px);
}

/* .connector:after {
  content: "";
  height: 80%;
  border-left: solid 3px #d1d5db;
  position: absolute;
  left: -5px;
  top: 0;
  z-index: 1;
} */

.connector-text {
  padding-top: 5px;
  margin-bottom: 5px;
  margin-left: 30px;
}

.ml {
  margin-left: 10px;
}

.flex-wrap {
  flex-wrap: wrap;
}

.node,
.node .static {
  font-size: 14px !important;
  font-weight: 400 !important;
  color: #000 !important;
}

.node .vertical {
  display: inline-flex;
  flex-direction: column;
}

.subphrase {
  display: inline-flex;
}

.horizontal {
  display: flex;
}

.horizontal > :not(:first-child),
.subset > :not(:first-child) {
  margin-left: 5px;
}

.node.highlighted .operator-label,
.node.highlighted .keyword {
  font-weight: 600;
  color: #7e22ce;
}

.node.highlighted .iriref {
  font-weight: 700;
  color: #2563eb;
}

.node .iriref:hover {
  cursor: pointer;
}

.static {
  display: inline-flex;
}

.iriref {
  display: flex;
  /* margin-left: 10px; */
}

.node .operator,
.node .property {
  position: relative;
  /* margin-bottom: 5px; */
  /* padding: 0 5px; */
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: transparent;
}

/* .node .operator:hover,
.node .property:hover {
  background-color: rgb(156 163 175 / 0.05) !important;
  border-color: rgb(156 163 175) !important;
} */

.operator-items {
  display: flex;
  flex-direction: column;
}

.operator-label {
  min-width: 30px;
}

.operator-items:first-child {
  margin-left: 20px;
}
</style>
