<template>
  <div class="flex flex-column justify-contents-start" id="secondary-tree-bar-container">
    <div id="alternate-parents-container" class="flex flex-column justify-contents-start align-items-start">
      <Button
        v-for="altParent of alternateParents"
        :key="altParent.iri"
        :label="altParent.name"
        :disabled="loading || altParent.name === ''"
        icon="pi pi-chevron-up"
        @click="expandParents(altParent.listPosition)"
        @mouseenter="showPopup($event, altParent.iri)"
        @mouseleave="hidePopup($event)"
        class="p-button-text p-button-plain"
      />
    </div>
    <div class="flex flex-row justify-contents-start" id="secondary-tree-parents-bar">
      <Button
        :label="currentParent?.name"
        :disabled="loading || !currentParent"
        icon="pi pi-chevron-up"
        @click="expandParents(parentPosition)"
        @mouseenter="showPopup($event, currentParent?.iri)"
        @mouseleave="hidePopup($event)"
        class="p-button-text p-button-plain"
      />
    </div>
    <Tree
      :value="root"
      selectionMode="single"
      v-model:selectionKeys="selectedKey"
      :expandedKeys="expandedKeys"
      @node-select="onNodeSelect"
      @node-expand="expandChildren"
      @node-collapse="onNodeCollapse"
      class="tree-root"
      :loading="loading"
    >
      <template #default="slotProps">
        <div v-if="slotProps.node.data === 'loadMore'"
          class="tree-row"
          @mouseover="showPopup($event, slotProps.node.data, slotProps.node)"
          @mouseleave="hidePopup($event)"
        >
        </div>
        <div v-else
            class="tree-row"
            @mouseover="showPopup($event, slotProps.node.data, slotProps.node)"
            @mouseleave="hidePopup($event)"
            @click="navigate($event, slotProps.node.data)"
            @dblclick="onDblClick(slotProps.node.data)"
            v-tooltip.top="'CTRL+click to navigate'"
        >
          <span v-if="!slotProps.node.loading">
            <div :style="'color:' + slotProps.node.color">
              <i :class="slotProps.node.typeIcon" class="fa-fw" aria-hidden="true" />
            </div>
          </span>
          <ProgressSpinner v-if="slotProps.node.loading" />
          <span class="tree-node-label">{{ slotProps.node.label }}</span>
        </div>
      </template>
    </Tree>

    <OverlayPanel v-if="hoveredResult.iri === 'load'" ref="altTreeOP" id="secondary_tree_overlay_panel" style="width: 700px" :breakpoints="{ '960px': '75vw' }">
      <div class="flex flex-row justify-contents-start result-overlay" style="width: 100%; gap: 7px">
        <span>{{ hoveredResult.name }}</span>
      </div>
    </OverlayPanel>
    <OverlayPanel v-else ref="altTreeOP" id="secondary_tree_overlay_panel" style="width: 700px" :breakpoints="{ '960px': '75vw' }">
      <div v-if="hoveredResult.name" class="flex flex-row justify-contents-start result-overlay" style="width: 100%; gap: 7px">
        <div class="left-side" style="width: 50%">
          <p>
            <strong>Name: </strong>
            <span>{{ hoveredResult.name }}</span>
          </p>
          <p>
            <strong>Iri: </strong>
            <span style="word-break: break-all">{{ hoveredResult.iri }}</span>
          </p>
          <p v-if="hoveredResult.code">
            <strong>Code: </strong>
            <span>{{ hoveredResult.code }}</span>
          </p>
        </div>
        <div class="right-side" style="width: 50%">
          <p v-if="hoveredResult.status">
            <strong>Status: </strong>
            <span>{{ hoveredResult.status.name }}</span>
          </p>
          <p v-if="hoveredResult.scheme">
            <strong>Scheme: </strong>
            <span>{{ hoveredResult.scheme.name }}</span>
          </p>
          <p v-if="hoveredResult.entityType">
            <strong>Type: </strong>
            <span>{{ getConceptTypes(hoveredResult.entityType) }}</span>
          </p>
        </div>
      </div>
    </OverlayPanel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getColourFromType, getFAIconFromType, getNamesAsStringFromTypes } from "../../helpers/modules/ConceptTypeMethods";
import { isArrayHasLength, isObject, isObjectHasKeys } from "../../helpers/modules/DataTypeCheckers";
import { ConceptAggregate, EntityReferenceNode, TreeNode, TreeParent, TTIriRef } from "../../interfaces/Interfaces";
import { Models } from "../../models";
import { IM } from "../../vocabulary/IM";
import { RDF } from "../../vocabulary/RDF";
import { RDFS } from "../../vocabulary/RDFS";

export default defineComponent({
  name: "SecondaryTree",
  props: { conceptIri: { type: String, required: true } },
  watch: {
    async conceptIri(newValue) {
      this.selectedKey = {};
      this.alternateParents = [];
      this.expandedKeys = {};
      await this.getConceptAggregate(newValue);
      await this.createTree(this.conceptAggregate.concept, this.conceptAggregate.parents, this.conceptAggregate.children, this.parentPosition);
    },

    loading(newValue) {
      if (newValue) this.hidePopup(this.overlayLocation);
    }
  },
  data() {
    return {
      conceptAggregate: {} as ConceptAggregate,
      root: [] as TreeNode[],
      expandedKeys: {} as any,
      selectedKey: {} as any,
      currentParent: {} as TreeParent | null,
      alternateParents: [] as TreeParent[],
      parentPosition: 0,
      hoveredResult: {} as Models.Search.ConceptSummary | any,
      overlayLocation: {} as any,
      loading: false,
      totalCount: 0
    };
  },
  async mounted() {
    await this.getConceptAggregate(this.conceptIri);
    await this.createTree(this.conceptAggregate.concept, this.conceptAggregate.parents, this.conceptAggregate.children, 0);
  },
  beforeUnmount() {
    if (isObject(this.overlayLocation) && isArrayHasLength(Object.keys(this.overlayLocation))) {
      this.hidePopup(this.overlayLocation);
    }
  },
  methods: {
    async getConceptAggregate(iri: string): Promise<void> {
      this.loading = true;
      this.conceptAggregate.concept = await this.$entityService.getPartialEntity(iri, [RDF.TYPE, RDFS.LABEL]);

      this.conceptAggregate.parents = await this.$entityService.getEntityParents(iri);

      const pagedChildren = await this.$entityService.getPagedChildren(iri, 1,20);
      this.totalCount = pagedChildren.totalCount;
      this.conceptAggregate.children = pagedChildren.result;
      this.loading = false;
    },

    async createTree(concept: any, parentHierarchy: EntityReferenceNode[], children: EntityReferenceNode[], parentPosition: number): Promise<void> {
      this.loading = true;
      const selectedConcept = this.createTreeNode(concept[RDFS.LABEL], concept[IM.IRI], concept[RDF.TYPE], concept.hasChildren);
      children.forEach((child: EntityReferenceNode) => {
        selectedConcept.children.push(this.createTreeNode(child.name, child["@id"], child.type, child.hasChildren));
      });
      if(this.totalCount >= 20){
        selectedConcept.children.push(this.createLoadMoreNode(selectedConcept,2,this.totalCount))
      }
      this.root = [] as TreeNode[];
      this.setParents(parentHierarchy, parentPosition);
      this.root.push(selectedConcept);
      if (!isObjectHasKeys(this.expandedKeys, [selectedConcept.key])) {
        this.expandedKeys[selectedConcept.key] = true;
      }
      this.selectedKey[selectedConcept.key] = true;
      this.loading = false;
    },

    setParents(parentHierarchy: EntityReferenceNode[], parentPosition: number): void {
      if (isArrayHasLength(parentHierarchy)) {
        if (parentHierarchy.length === 1) {
          this.currentParent = {
            name: parentHierarchy[parentPosition].name,
            iri: parentHierarchy[parentPosition]["@id"],
            listPosition: 0
          };
          this.alternateParents = [] as TreeParent[];
        } else {
          for (let i = 0; i < parentHierarchy.length; i++) {
            if (i === parentPosition) {
              this.currentParent = {
                name: parentHierarchy[parentPosition].name,
                iri: parentHierarchy[parentPosition]["@id"],
                listPosition: i
              };
            } else {
              this.alternateParents.push({
                name: parentHierarchy[i].name,
                iri: parentHierarchy[i]["@id"],
                listPosition: i
              });
            }
          }
        }
      } else {
        this.currentParent = null;
        this.alternateParents = [] as TreeParent[];
      }
    },

    createTreeNode(conceptName: string, conceptIri: string, conceptTypes: TTIriRef[], hasChildren: boolean): TreeNode {
      return {
        key: conceptName,
        label: conceptName,
        typeIcon: getFAIconFromType(conceptTypes),
        color: getColourFromType(conceptTypes),
        data: conceptIri,
        leaf: !hasChildren,
        loading: false,
        children: [] as TreeNode[]
      };
    },

    createLoadMoreNode(parentNode: TreeNode, nextPage: number, totalCount: number): any {
      return {
        key: "loadMore" + parentNode.data,
        label: "Load more...",
        typeIcon: null,
        color: null,
        data: "loadMore",
        leaf: true,
        loading: false,
        children: [] as TreeNode[],
        parentNode: parentNode,
        nextPage: nextPage,
        totalCount: totalCount,
        style: "font-weight: bold;"
      };
    },

    async expandChildren(node: TreeNode): Promise<void> {
      node.loading = true;
      if (!isObjectHasKeys(this.expandedKeys, [node.key])) {
        this.expandedKeys[node.key] = true;
      }
      const children = await this.$entityService.getPagedChildren(node.data, 1, 20);
      children.result.forEach((child: EntityReferenceNode) => {
        if (!this.containsChild(node.children, child)) {
          node.children.push(this.createTreeNode(child.name, child["@id"], child.type, child.hasChildren));
        }
      });
      if(children.totalCount >= 20){
        node.children.push(this.createLoadMoreNode(node,2,children.totalCount))
      }
      node.loading = false;
    },

    containsChild(nodeChildren: TreeNode[], child: EntityReferenceNode): boolean {
      return nodeChildren.some(nodeChild => nodeChild.data === child["@id"]);
    },

    async expandParents(parentPosition: number): Promise<void> {
      this.loading = true;
      if (!isArrayHasLength(this.root)) return;
      if (!isObjectHasKeys(this.expandedKeys, [this.root[0].key])) {
        this.expandedKeys[this.root[0].key] = true;
      }

      const parents = await this.$entityService.getEntityParents(this.root[0].data);
      const parentNode = this.createExpandedParentTree(parents, parentPosition);
      this.root = [] as TreeNode[];
      this.root.push(parentNode);
      await this.setExpandedParentParents();
      // this refreshes the keys so they start open if children and parents were both expanded
      this.expandedKeys = { ...this.expandedKeys };
      this.loading = false;
    },

    createExpandedParentTree(parents: any, parentPosition: number): TreeNode {
      let parentNode = {} as TreeNode;
      for (let i = 0; i < parents.length; i++) {
        if (i === parentPosition) {
          parentNode = this.createTreeNode(parents[i].name, parents[i]["@id"], parents[i].type, true);
          parentNode.children.push(this.root[0]);
          if (!isObjectHasKeys(this.expandedKeys, [parentNode.key])) {
            this.expandedKeys[parentNode.key] = true;
          }
        }
      }
      return parentNode;
    },

    async setExpandedParentParents(): Promise<void> {
      const result = await this.$entityService.getEntityParents(this.root[0].data);
      this.currentParent = null;
      this.alternateParents = [] as TreeParent[];
      if (!isArrayHasLength(result)) return;
      if (result.length === 1) {
        this.parentPosition = 0;
        this.currentParent = {
          name: result[0].name,
          iri: result[0]["@id"],
          listPosition: 0
        };
      } else {
        for (let i = 0; i < result.length; i++) {
          if (i === 0) {
            this.currentParent = {
              name: result[i].name,
              iri: result[i]["@id"],
              listPosition: i
            };
          } else {
            this.alternateParents.push({
              name: result[i].name,
              iri: result[i]["@id"],
              listPosition: i
            });
          }
        }
      }
    },

    async onNodeSelect(node:any): Promise<void> {
      if(node.data === "loadMore"){
        await this.loadMore(node);
      } else {}
      await this.$nextTick();
      this.selectedKey = {} as any;
      this.selectedKey[this.conceptAggregate.concept[RDFS.LABEL]] = true;
    },

    async showPopup(event: any, iri?: string, node?:any): Promise<void> {
      if(iri === "loadMore"){
        this.overlayLocation = event;
        const x = this.$refs.altTreeOP as any;
        x.show(event);
        this.hoveredResult.iri = "load";
        this.hoveredResult.name = node.parentNode.label;
      } else if (iri) {
        this.overlayLocation = event;
        const x = this.$refs.altTreeOP as any;
        x.show(event);
        this.hoveredResult = await this.$entityService.getEntitySummary(iri);
      }
    },

    hidePopup(event: any): void {
      const x = this.$refs.altTreeOP as any;
      x.hide(event);
      this.overlayLocation = {} as any;
    },

    getConceptTypes(types: TTIriRef[]): string {
      return getNamesAsStringFromTypes(types);
    },

    navigate(event: any, iri: string): void {
      if (event.metaKey || event.ctrlKey) this.$router.push({ name: this.$route.name || undefined, params: { selectedIri: iri } });
    },

    onDblClick(iri: string) {
      this.$router.push({ name: this.$route.name || undefined, params: { selectedIri: iri } });
    },

    async loadMore(node: any){
      const pageSize = 20;
      if (node.nextPage * pageSize < node.totalCount) {
        const children = await this.$entityService.getPagedChildren(node.parentNode.data, node.nextPage, pageSize);
        node.parentNode.children.pop();
        children.result.forEach((child:any) => {
          node.parentNode.children.push(this.createTreeNode(child.name, child["@id"], child.type, child.hasChildren));
        });
        node.nextPage = node.nextPage + 1;
        node.parentNode.children.push(this.createLoadMoreNode(node.parentNode,node.nextPage,node.totalCount));
      } else if (node.nextPage * pageSize > node.totalCount) {
        const children = await this.$entityService.getPagedChildren(node.parentNode.data, node.nextPage, pageSize);
        node.parentNode.children.pop();
        children.result.forEach((child:any) => {
          node.parentNode.children.push(this.createTreeNode(child.name, child["@id"], child.type, child.hasChildren));
        });
      } else {
        node.parentNode.children.pop();
      }
    },

    onNodeCollapse(node: any) {
      node.children = [];
      node.leaf = false;
    }
  }
});
</script>

<style scoped>
.tree-root {
  overflow: auto;
  border: 0;
  padding-top: 0;
}

.tree-root ::v-deep(.p-tree-toggler) {
  min-width: 2rem;
}

#secondary-tree-bar-container {
  flex: 1 1 auto;
  border-top: 1px solid #dee2e6;
}

.p-progress-spinner {
  width: 1.25em !important;
  height: 1.25em !important;
}

#secondary-tree-bar-container ::v-deep(.p-treenode-selectable) {
  cursor: default !important;
}

.tree-row {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.25rem;
}

.tree-node-label {
  word-break: break-all;
}
</style>
