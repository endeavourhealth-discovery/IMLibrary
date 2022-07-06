<template>
  <div :class="'node ' + [highlighted ? 'highlighted ' : ''] + [connector ? ' connector' : '']">
    <!-- Custom Sentences - add new ones here  -->
    <template v-if="template == 'MainEntity' && entity">
      <NodeCard icon="user" :title="entity.name" />
      <Node class="mt-2 pl-5" :object="data" path="select.match" valueType="operator" operator="and" :highlighted="true" :edit="edit"> </Node>
    </template>

    <div v-else-if="template == 'leafEntity'" class="flex relative">
      <div class="connector-v">
        <div class="circle"></div>
        <div v-if="showLineV(index, indexCount, -1, -1)" class="line-v"></div>
        <!-- <div v-if="index > 0 || operator == 'or'" class="operatorlabel absolute rounded-sm text-lg text-gray-700 font-bold">{{ operator }}</div> -->
      </div>
      <NodeCard
        v-if="hasKey(entity, 'entityInSet')"
        icon="search"
        :title="'is part of the results of the search ' + entity?.entityInSet[0].name"
      />
      <NodeCard v-else icon="document_text" :title="entity.displayText || 'Undefined Criteria'" />
    </div>
    <!-- /Custom Sentences - add new ones here -->

    <!--  Clause  -->
    <template v-if="entity && children(entity).length" v-for="(child, childIndex) in children(entity)" :key="child?.path">
      <div class="connector operator horizontal">
        <!-- Connector -->
        <div class="connector-h">
          <div class="circle"></div>
          <div v-if="showLineV(index, indexCount, childIndex, children(entity).length)" class="line-v"></div>
        </div>
        <div class="line-h"></div>
        <!-- /Connector -->

        <!-- Operator Children -->
        <div v-if="children(child.value).length" class="operator-items">
          <Node
            v-for="(grandChild, grandChildIndex) in children(child.value)"
            :object="data"
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
        <!--  /Operator Children  -->

        <!-- Leaf Child -->
        <template v-else>
          <Node :object="data" :path="`${path}[${child?.path}]`" valueType="match" :edit="edit" template="leafEntity"> </Node>
        </template>
        <!-- /Leaf Child  -->
      </div>
    </template>

    <!--  /Clause  -->

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
    showLineV(index: number, indexCount: number, childIndex: number, childIndexCount: number): boolean {
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
      data: this.object,
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
    },
    object(newValue: any) {
      this.data = newValue;
      this.entity = this.path ? _.get(newValue, this.path) : newValue;
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
  border-left: 3px solid #cbd5e1;
}

.operatorlabel {
  top: calc(50% - 5px);
  right: 20px;
}

.circle {
  margin: 3px 3px 5px 0px;
  background-color: #cbd5e1;
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

.circle.middle {
  top: calc(50% + 10px);
}

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
}

.node .operator,
.node .property {
  border-radius: 0.375rem;
  border-width: 1px;
  border-color: transparent;
}

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
