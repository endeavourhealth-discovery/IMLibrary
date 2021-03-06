import { flushPromises, shallowMount } from "@vue/test-utils";
import SecondaryTree from "@/components/modules/SecondaryTree.vue";
import Button from "primevue/button";
import Tree from "primevue/tree";
import ProgressSpinner from "primevue/progressspinner";
import OverlayPanel from "primevue/overlaypanel";
import Tooltip from "primevue/tooltip";
import { vi } from "vitest";

describe("SecondaryTree.vue", () => {
  let wrapper;
  let mockToast;
  let mockRoute;
  let mockRouter;
  let mockRef;
  let mockEntityService;

  const CONCEPT = {
    "@id": "http://snomed.info/sct#298382003",
    "http://www.w3.org/1999/02/22-rdf-syntax-ns#type": [{ "@id": "http://www.w3.org/2002/07/owl#Class", name: "Class" }],
    "http://www.w3.org/2000/01/rdf-schema#label": "Scoliosis deformity of spine (disorder)"
  };
  const PARENTS = [
    {
      name: "Curvature of spine (disorder)",
      hasChildren: false,
      type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
      "@id": "http://snomed.info/sct#64217002"
    },
    {
      name: "Disorder of musculoskeletal system (disorder)",
      hasChildren: false,
      type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
      "@id": "http://snomed.info/sct#928000"
    },
    {
      name: "Disorder of vertebral column (disorder)",
      hasChildren: false,
      type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
      "@id": "http://snomed.info/sct#699699005"
    }
  ];
  const CHILDREN = {
    totalCount: 3,
    result: [
      {
        "@id": "http://snomed.info/sct#111266001",
        hasChildren: true,
        hasGrandChildren: false,
        name: "Acquired scoliosis (disorder)",
        parents: [],
        type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
      },
      {
        "@id": "http://snomed.info/sct#773773006",
        hasChildren: false,
        hasGrandChildren: false,
        name: "Acrodysplasia scoliosis (disorder)",
        parents: [],
        type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
      },
      {
        "@id": "http://snomed.info/sct#205045003",
        hasChildren: false,
        hasGrandChildren: false,
        name: "Congenital scoliosis due to bony malformation (disorder)",
        parents: [],
        type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
      }
    ]
  };

  const SUMMARY = {
    name: "Acquired scoliosis",
    iri: "http://snomed.info/sct#111266001",
    code: "111266001",
    description: "Acquired scoliosis (disorder)",
    status: { name: "Active", "@id": "http://endhealth.info/im#Active" },
    scheme: { name: "Snomed-CT namespace", "@id": "http://snomed.info/sct#" },
    entityType: [
      { name: "Ontological Concept", "@id": "http://endhealth.info/im#Concept" },
      { name: "Organisation  (record type)", "@id": "http://endhealth.info/im#Organisation" }
    ],
    isDescendentOf: [],
    match: "629792015"
  };

  beforeEach(async () => {
    vi.resetAllMocks();
    mockToast = {
      add: vi.fn()
    };
    mockRef = { render: () => {}, methods: { show: vi.fn(), hide: vi.fn() } };
    mockRoute = { name: "Concept" };
    mockRouter = { push: vi.fn() };

    mockEntityService = {
      getPartialEntity: vi.fn().mockResolvedValue(CONCEPT),
      getEntityParents: vi.fn().mockResolvedValue(PARENTS),
      getPagedChildren: vi.fn().mockResolvedValue(CHILDREN),
      getEntitySummary: vi.fn().mockResolvedValue(SUMMARY)
    };

    wrapper = shallowMount(SecondaryTree, {
      global: {
        components: { Button, Tree, ProgressSpinner, OverlayPanel },
        mocks: { $toast: mockToast, $route: mockRoute, $router: mockRouter, $entityService: mockEntityService },
        stubs: { OverlayPanel: mockRef, FontAwesomeIcon: true },
        directives: { Tooltip: Tooltip }
      },
      props: { conceptIri: "http://snomed.info/sct#298382003" }
    });

    await flushPromises();
    await wrapper.vm.$nextTick();
    await flushPromises();
    vi.clearAllMocks();
  });

  it("mounts", () => {
    expect(wrapper.vm.conceptAggregate).toStrictEqual({
      concept: CONCEPT,
      parents: PARENTS,
      children: CHILDREN.result
    });
    expect(wrapper.vm.root).toStrictEqual([
      {
        children: [
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#111266001",
            key: "http://snomed.info/sct#111266001",
            label: "Acquired scoliosis (disorder)",
            leaf: false,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          },
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#773773006",
            key: "http://snomed.info/sct#773773006",
            label: "Acrodysplasia scoliosis (disorder)",
            leaf: true,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          },
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#205045003",
            key: "http://snomed.info/sct#205045003",
            label: "Congenital scoliosis due to bony malformation (disorder)",
            leaf: true,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          }
        ],
        color: "#c3ba4588",
        data: "http://snomed.info/sct#298382003",
        key: "http://snomed.info/sct#298382003",
        label: "Scoliosis deformity of spine (disorder)",
        leaf: true,
        loading: false,
        typeIcon: ["fa-solid", "fa-lightbulb"]
      }
    ]);
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#298382003": true });
    expect(wrapper.vm.selectedKey).toStrictEqual({ "http://snomed.info/sct#298382003": true });
    expect(wrapper.vm.currentParent).toStrictEqual({ iri: "http://snomed.info/sct#64217002", listPosition: 0, name: "Curvature of spine (disorder)" });
    expect(wrapper.vm.alternateParents).toStrictEqual([
      { iri: "http://snomed.info/sct#928000", listPosition: 1, name: "Disorder of musculoskeletal system (disorder)" },
      { iri: "http://snomed.info/sct#699699005", listPosition: 2, name: "Disorder of vertebral column (disorder)" }
    ]);
    expect(wrapper.vm.parentPosition).toBe(0);
    expect(wrapper.vm.hoveredResult).toStrictEqual({});
  });

  it("hidesPopup on unMount", () => {
    wrapper.vm.hidePopup = vi.fn();
    wrapper.vm.overlayLocation = { 1: 1, 2: 2, 3: 3 };
    wrapper.unmount();
    expect(wrapper.vm.hidePopup).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.hidePopup).toHaveBeenCalledWith({ 1: 1, 2: 2, 3: 3 });
  });

  it("hidesPopup on unMount ___ no keys", () => {
    wrapper.vm.hidePopup = vi.fn();
    wrapper.vm.overlayLocation = {};
    wrapper.unmount();
    expect(wrapper.vm.hidePopup).not.toHaveBeenCalled();
  });

  it("updates on conceptIri watch change", async () => {
    wrapper.vm.getConceptAggregate = vi.fn();
    wrapper.vm.createTree = vi.fn();
    wrapper.vm.$options.watch.conceptIri.call(wrapper.vm, "http://snomed.info/sct#298382003");
    expect(wrapper.vm.selectedKey).toStrictEqual({});
    expect(wrapper.vm.alternateParents).toStrictEqual([]);
    expect(wrapper.vm.expandedKeys).toStrictEqual({});
    expect(wrapper.vm.getConceptAggregate).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.getConceptAggregate).toHaveBeenCalledWith("http://snomed.info/sct#298382003");
    await flushPromises();
    expect(wrapper.vm.createTree).toHaveBeenCalledTimes(1);
  });

  it("can getConceptAggregate ___ success", async () => {
    wrapper.vm.conceptAggregate = {};
    expect(wrapper.vm.conceptAggregate).toStrictEqual({});
    wrapper.vm.getConceptAggregate("http://snomed.info/sct#298382003");
    await flushPromises();
    expect(mockEntityService.getPartialEntity).toHaveBeenCalledTimes(1);
    expect(mockEntityService.getPartialEntity).toHaveBeenCalledWith("http://snomed.info/sct#298382003", [
      "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
      "http://www.w3.org/2000/01/rdf-schema#label"
    ]);
    expect(mockEntityService.getEntityParents).toHaveBeenCalledTimes(1);
    expect(mockEntityService.getEntityParents).toHaveBeenCalledWith("http://snomed.info/sct#298382003");
    expect(mockEntityService.getPagedChildren).toHaveBeenCalledTimes(1);
    expect(mockEntityService.getPagedChildren).toHaveBeenCalledWith("http://snomed.info/sct#298382003", 1, 20);
    expect(wrapper.vm.conceptAggregate).toStrictEqual({
      concept: CONCEPT,
      parents: PARENTS,
      children: CHILDREN.result
    });
  });

  it("can createTree ___  !selected in expanded", async () => {
    wrapper.vm.setParents = vi.fn();
    wrapper.vm.root = [];
    wrapper.vm.expandedKeys = {};
    wrapper.vm.selectedKey = {};
    wrapper.vm.createTree(CONCEPT, PARENTS, CHILDREN.result, 0);
    expect(wrapper.vm.root).toStrictEqual([
      {
        children: [
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#111266001",
            key: "http://snomed.info/sct#111266001",
            label: "Acquired scoliosis (disorder)",
            leaf: false,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          },
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#773773006",
            key: "http://snomed.info/sct#773773006",
            label: "Acrodysplasia scoliosis (disorder)",
            leaf: true,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          },
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#205045003",
            key: "http://snomed.info/sct#205045003",
            label: "Congenital scoliosis due to bony malformation (disorder)",
            leaf: true,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          }
        ],
        color: "#c3ba4588",
        data: "http://snomed.info/sct#298382003",
        key: "http://snomed.info/sct#298382003",
        label: "Scoliosis deformity of spine (disorder)",
        leaf: true,
        loading: false,
        typeIcon: ["fa-solid", "fa-lightbulb"]
      }
    ]);
    expect(wrapper.vm.setParents).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.selectedKey).toStrictEqual({ "http://snomed.info/sct#298382003": true });
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#298382003": true });
  });

  it("can createTree ___  selected in expanded", async () => {
    wrapper.vm.setParents = vi.fn();
    wrapper.vm.root = [];
    wrapper.vm.expandedKeys = { "http://snomed.info/sct#298382003": true };
    wrapper.vm.selectedKey = {};
    wrapper.vm.createTree(CONCEPT, PARENTS, CHILDREN.result, 0);
    expect(wrapper.vm.root).toStrictEqual([
      {
        children: [
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#111266001",
            key: "http://snomed.info/sct#111266001",
            label: "Acquired scoliosis (disorder)",
            leaf: false,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          },
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#773773006",
            key: "http://snomed.info/sct#773773006",
            label: "Acrodysplasia scoliosis (disorder)",
            leaf: true,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          },
          {
            children: [],
            color: "#c3ba4588",
            data: "http://snomed.info/sct#205045003",
            key: "http://snomed.info/sct#205045003",
            label: "Congenital scoliosis due to bony malformation (disorder)",
            leaf: true,
            loading: false,
            typeIcon: ["fa-solid", "fa-lightbulb"]
          }
        ],
        color: "#c3ba4588",
        data: "http://snomed.info/sct#298382003",
        key: "http://snomed.info/sct#298382003",
        label: "Scoliosis deformity of spine (disorder)",
        leaf: true,
        loading: false,
        typeIcon: ["fa-solid", "fa-lightbulb"]
      }
    ]);
    expect(wrapper.vm.setParents).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.selectedKey).toStrictEqual({ "http://snomed.info/sct#298382003": true });
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#298382003": true });
  });

  it("setsParents ___ length === 1", () => {
    wrapper.vm.currentParent = {};
    wrapper.vm.alternateParents = [];
    wrapper.vm.setParents(
      [
        {
          name: "Curvature of spine (disorder)",
          hasChildren: false,
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
          "@id": "http://snomed.info/sct#64217002"
        }
      ],
      0
    );
    expect(wrapper.vm.currentParent).toStrictEqual({ iri: "http://snomed.info/sct#64217002", listPosition: 0, name: "Curvature of spine (disorder)" });
    expect(wrapper.vm.alternateParents).toStrictEqual([]);
  });

  it("setsParents ___ length > 1", () => {
    wrapper.vm.currentParent = {};
    wrapper.vm.alternateParents = [];
    wrapper.vm.setParents(
      [
        {
          name: "Curvature of spine (disorder)",
          hasChildren: false,
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
          "@id": "http://snomed.info/sct#64217002"
        },
        {
          name: "Disorder of musculoskeletal system (disorder)",
          hasChildren: false,
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
          "@id": "http://snomed.info/sct#928000"
        },
        {
          name: "Disorder of vertebral column (disorder)",
          hasChildren: false,
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
          "@id": "http://snomed.info/sct#699699005"
        }
      ],
      1
    );
    expect(wrapper.vm.currentParent).toStrictEqual({
      iri: "http://snomed.info/sct#928000",
      listPosition: 1,
      name: "Disorder of musculoskeletal system (disorder)"
    });
    expect(wrapper.vm.alternateParents).toStrictEqual([
      { iri: "http://snomed.info/sct#64217002", listPosition: 0, name: "Curvature of spine (disorder)" },
      { iri: "http://snomed.info/sct#699699005", listPosition: 2, name: "Disorder of vertebral column (disorder)" }
    ]);
  });

  it("setsParents ___ length === 0", () => {
    wrapper.vm.currentParent = {};
    wrapper.vm.alternateParents = [];
    wrapper.vm.setParents([], 0);
    expect(wrapper.vm.currentParent).toStrictEqual(null);
    expect(wrapper.vm.alternateParents).toStrictEqual([]);
  });

  it("can createTreeNode", () => {
    expect(
      wrapper.vm.createTreeNode(
        "Scoliosis deformity of spine (disorder)",
        "http://snomed.info/sct#298382003",
        [{ "@id": "http://www.w3.org/2002/07/owl#Class", name: "Class" }],
        false
      )
    ).toStrictEqual({
      children: [],
      color: "#c3ba4588",
      data: "http://snomed.info/sct#298382003",
      key: "http://snomed.info/sct#298382003",
      label: "Scoliosis deformity of spine (disorder)",
      leaf: true,
      loading: false,
      typeIcon: ["fa-solid", "fa-lightbulb"]
    });
  });

  it("can handle onNodeSelect", async () => {
    await flushPromises();
    wrapper.vm.selectedKey = { "Scoliosis deformity of spine (disorder)": true };
    wrapper.vm.onNodeSelect({
      children: [],
      color: "#c3ba4588",
      data: "http://snomed.info/sct#298382003",
      key: "Scoliosis deformity of spine (disorder)",
      label: "Scoliosis deformity of spine (disorder)",
      leaf: true,
      loading: false,
      typeIcon: ["fa-solid", "fa-lightbulb"]
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.selectedKey).toStrictEqual({ "Scoliosis deformity of spine (disorder)": true });
  });

  it("can expandChildren ___ !key ___ resolved service", async () => {
    mockEntityService.getPagedChildren = vi.fn().mockResolvedValue({
      totalCount: 6,
      result: [
        {
          "@id": "http://snomed.info/sct#405771009",
          hasChildren: true,
          hasGrandChildren: false,
          name: "Acquired kyphoscoliosis (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#203646004",
          hasChildren: true,
          hasGrandChildren: false,
          name: "Adolescent idiopathic scoliosis (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#310421000119106",
          hasChildren: false,
          hasGrandChildren: false,
          name: "Infantile idiopathic scoliosis of cervical spine (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#203647008",
          hasChildren: false,
          hasGrandChildren: false,
          name: "Post-surgical scoliosis (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#47518006",
          hasChildren: false,
          hasGrandChildren: false,
          name: "Scoliosis caused by radiation (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#72992003",
          hasChildren: true,
          hasGrandChildren: false,
          name: "Thoracogenic scoliosis (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        }
      ]
    });
    wrapper.vm.expandedKeys = {};
    const testNode = {
      key: "http://snomed.info/sct#111266001",
      label: "Acquired scoliosis (disorder)",
      typeIcon: ["fa-solid", "fa-lightbulb"],
      color: "#c3ba4588",
      data: "http://snomed.info/sct#111266001",
      leaf: false,
      loading: false,
      children: []
    };
    wrapper.vm.expandChildren(testNode);
    expect(testNode.loading).toBe(true);
    await flushPromises();
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#111266001": true });
    expect(mockEntityService.getPagedChildren).toHaveBeenCalledTimes(1);
    expect(testNode).toStrictEqual({
      children: [
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#405771009",
          key: "http://snomed.info/sct#405771009",
          label: "Acquired kyphoscoliosis (disorder)",
          leaf: false,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#203646004",
          key: "http://snomed.info/sct#203646004",
          label: "Adolescent idiopathic scoliosis (disorder)",
          leaf: false,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#310421000119106",
          key: "http://snomed.info/sct#310421000119106",
          label: "Infantile idiopathic scoliosis of cervical spine (disorder)",
          leaf: true,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#203647008",
          key: "http://snomed.info/sct#203647008",
          label: "Post-surgical scoliosis (disorder)",
          leaf: true,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#47518006",
          key: "http://snomed.info/sct#47518006",
          label: "Scoliosis caused by radiation (disorder)",
          leaf: true,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#72992003",
          key: "http://snomed.info/sct#72992003",
          label: "Thoracogenic scoliosis (disorder)",
          leaf: false,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        }
      ],
      color: "#c3ba4588",
      data: "http://snomed.info/sct#111266001",
      key: "http://snomed.info/sct#111266001",
      label: "Acquired scoliosis (disorder)",
      leaf: false,
      loading: false,
      typeIcon: ["fa-solid", "fa-lightbulb"]
    });
    expect(testNode.loading).toBe(false);
  });

  it("can expandChildren ___ key ___ resolved service ___ dup children", async () => {
    mockEntityService.getPagedChildren = vi.fn().mockResolvedValue({
      totalCount: 6,
      result: [
        {
          "@id": "http://snomed.info/sct#405771009",
          hasChildren: true,
          hasGrandChildren: false,
          name: "Acquired kyphoscoliosis (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#203646004",
          hasChildren: true,
          hasGrandChildren: false,
          name: "Adolescent idiopathic scoliosis (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#310421000119106",
          hasChildren: false,
          hasGrandChildren: false,
          name: "Infantile idiopathic scoliosis of cervical spine (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#203647008",
          hasChildren: false,
          hasGrandChildren: false,
          name: "Post-surgical scoliosis (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#47518006",
          hasChildren: false,
          hasGrandChildren: false,
          name: "Scoliosis caused by radiation (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        },
        {
          "@id": "http://snomed.info/sct#72992003",
          hasChildren: true,
          hasGrandChildren: false,
          name: "Thoracogenic scoliosis (disorder)",
          parents: [],
          type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }]
        }
      ]
    });
    wrapper.vm.expandedKeys = { "http://snomed.info/sct#111266001": true };
    const testNode = {
      key: "http://snomed.info/sct#111266001",
      label: "Acquired scoliosis (disorder)",
      typeIcon: ["fa-solid", "fa-lightbulb"],
      color: "#c3ba4588",
      data: "http://snomed.info/sct#111266001",
      leaf: false,
      loading: false,
      children: [
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#405771009",
          key: "http://snomed.info/sct#405771009",
          label: "Acquired kyphoscoliosis (disorder)",
          leaf: false,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        }
      ]
    };
    wrapper.vm.expandChildren(testNode);
    expect(testNode.loading).toBe(true);
    await flushPromises();
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#111266001": true });
    expect(mockEntityService.getPagedChildren).toHaveBeenCalledTimes(1);
    expect(testNode).toStrictEqual({
      children: [
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#405771009",
          key: "http://snomed.info/sct#405771009",
          label: "Acquired kyphoscoliosis (disorder)",
          leaf: false,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#203646004",
          key: "http://snomed.info/sct#203646004",
          label: "Adolescent idiopathic scoliosis (disorder)",
          leaf: false,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#310421000119106",
          key: "http://snomed.info/sct#310421000119106",
          label: "Infantile idiopathic scoliosis of cervical spine (disorder)",
          leaf: true,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#203647008",
          key: "http://snomed.info/sct#203647008",
          label: "Post-surgical scoliosis (disorder)",
          leaf: true,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#47518006",
          key: "http://snomed.info/sct#47518006",
          label: "Scoliosis caused by radiation (disorder)",
          leaf: true,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        },
        {
          children: [],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#72992003",
          key: "http://snomed.info/sct#72992003",
          label: "Thoracogenic scoliosis (disorder)",
          leaf: false,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        }
      ],
      color: "#c3ba4588",
      data: "http://snomed.info/sct#111266001",
      key: "http://snomed.info/sct#111266001",
      label: "Acquired scoliosis (disorder)",
      leaf: false,
      loading: false,
      typeIcon: ["fa-solid", "fa-lightbulb"]
    });
    expect(testNode.loading).toBe(false);
  });

  it("can check if containsChild ___ true", () => {
    const testNode = {
      key: "Acquired scoliosis (disorder)",
      label: "Acquired scoliosis (disorder)",
      typeIcon: "fa-solid fa-fw fa-lightbulb",
      color: "#c3ba4588",
      data: "http://snomed.info/sct#111266001",
      leaf: false,
      loading: false,
      children: [
        {
          key: "Acquired kyphoscoliosis (disorder)",
          label: "Acquired kyphoscoliosis (disorder)",
          typeIcon: "fa-solid fa-fw fa-lightbulb",
          color: "#c3ba4588",
          data: "http://snomed.info/sct#405771009",
          leaf: false,
          loading: false,
          children: []
        },
        {
          key: "Adolescent idiopathic scoliosis (disorder)",
          label: "Adolescent idiopathic scoliosis (disorder)",
          typeIcon: "fa-solid fa-fw fa-lightbulb",
          color: "#c3ba4588",
          data: "http://snomed.info/sct#203646004",
          leaf: false,
          loading: false,
          children: []
        }
      ]
    };
    expect(
      wrapper.vm.containsChild(testNode.children, {
        name: "Acquired kyphoscoliosis (disorder)",
        hasChildren: true,
        type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
        "@id": "http://snomed.info/sct#405771009"
      })
    ).toBe(true);
  });

  it("can check if containsChild ___ false", () => {
    const testNode = {
      key: "Acquired scoliosis (disorder)",
      label: "Acquired scoliosis (disorder)",
      typeIcon: "fa-solid fa-fw fa-lightbulb",
      color: "#c3ba4588",
      data: "http://snomed.info/sct#111266001",
      leaf: false,
      loading: false,
      children: [
        {
          key: "Adolescent idiopathic scoliosis (disorder)",
          label: "Adolescent idiopathic scoliosis (disorder)",
          typeIcon: "fa-solid fa-fw fa-lightbulb",
          color: "#c3ba4588",
          data: "http://snomed.info/sct#203646004",
          leaf: false,
          loading: false,
          children: []
        }
      ]
    };
    expect(
      wrapper.vm.containsChild(testNode.children, {
        name: "Acquired kyphoscoliosis (disorder)",
        hasChildren: true,
        type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
        "@id": "http://snomed.info/sct#405771009"
      })
    ).toBe(false);
  });

  it("can expandParents ___ no key", async () => {
    wrapper.vm.expandedKeys = {};
    wrapper.vm.createExpandedParentTree = vi.fn().mockReturnValue({
      data: {
        key: "http://snomed.info/sct#64217002",
        label: "Curvature of spine (disorder)",
        typeIcon: "fa-solid fa-fw fa-lightbulb",
        color: "#c3ba4588",
        data: "http://snomed.info/sct#64217002",
        leaf: false,
        loading: false,
        children: [
          {
            key: "http://snomed.info/sct#298382003",
            label: "Scoliosis deformity of spine (disorder)",
            typeIcon: "fa-solid fa-fw fa-lightbulb",
            color: "#c3ba4588",
            data: "http://snomed.info/sct#298382003",
            leaf: true,
            loading: false,
            children: [
              {
                key: "http://snomed.info/sct#111266001",
                label: "Acquired scoliosis (disorder)",
                typeIcon: "fa-solid fa-fw fa-lightbulb",
                color: "#c3ba4588",
                data: "http://snomed.info/sct#111266001",
                leaf: false,
                loading: false,
                children: []
              }
            ]
          }
        ]
      }
    });
    wrapper.vm.setExpandedParentParents = vi.fn();
    wrapper.vm.expandParents(0);
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#298382003": true });
    expect(mockEntityService.getEntityParents).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.createExpandedParentTree).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.setExpandedParentParents).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.root).toStrictEqual([
      {
        data: {
          children: [
            {
              children: [
                {
                  children: [],
                  color: "#c3ba4588",
                  data: "http://snomed.info/sct#111266001",
                  key: "http://snomed.info/sct#111266001",
                  label: "Acquired scoliosis (disorder)",
                  leaf: false,
                  loading: false,
                  typeIcon: "fa-solid fa-fw fa-lightbulb"
                }
              ],
              color: "#c3ba4588",
              data: "http://snomed.info/sct#298382003",
              key: "http://snomed.info/sct#298382003",
              label: "Scoliosis deformity of spine (disorder)",
              leaf: true,
              loading: false,
              typeIcon: "fa-solid fa-fw fa-lightbulb"
            }
          ],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#64217002",
          key: "http://snomed.info/sct#64217002",
          label: "Curvature of spine (disorder)",
          leaf: false,
          loading: false,
          typeIcon: "fa-solid fa-fw fa-lightbulb"
        }
      }
    ]);
  });

  it("can expandParents ___ key", async () => {
    wrapper.vm.expandedKeys = { "http://snomed.info/sct#298382003": true };
    wrapper.vm.createExpandedParentTree = vi.fn().mockReturnValue({
      data: {
        key: "http://snomed.info/sct#64217002",
        label: "Curvature of spine (disorder)",
        typeIcon: "fa-solid fa-fw fa-lightbulb",
        color: "#c3ba4588",
        data: "http://snomed.info/sct#64217002",
        leaf: false,
        loading: false,
        children: [
          {
            key: "http://snomed.info/sct#298382003",
            label: "Scoliosis deformity of spine (disorder)",
            typeIcon: "fa-solid fa-fw fa-lightbulb",
            color: "#c3ba4588",
            data: "http://snomed.info/sct#298382003",
            leaf: true,
            loading: false,
            children: [
              {
                key: "http://snomed.info/sct#111266001",
                label: "Acquired scoliosis (disorder)",
                typeIcon: "fa-solid fa-fw fa-lightbulb",
                color: "#c3ba4588",
                data: "http://snomed.info/sct#111266001",
                leaf: false,
                loading: false,
                children: []
              }
            ]
          }
        ]
      }
    });
    wrapper.vm.setExpandedParentParents = vi.fn();
    wrapper.vm.expandParents(0);
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#298382003": true });
    expect(mockEntityService.getEntityParents).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.createExpandedParentTree).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.setExpandedParentParents).toHaveBeenCalledTimes(1);
    expect(wrapper.vm.root).toStrictEqual([
      {
        data: {
          children: [
            {
              children: [
                {
                  children: [],
                  color: "#c3ba4588",
                  data: "http://snomed.info/sct#111266001",
                  key: "http://snomed.info/sct#111266001",
                  label: "Acquired scoliosis (disorder)",
                  leaf: false,
                  loading: false,
                  typeIcon: "fa-solid fa-fw fa-lightbulb"
                }
              ],
              color: "#c3ba4588",
              data: "http://snomed.info/sct#298382003",
              key: "http://snomed.info/sct#298382003",
              label: "Scoliosis deformity of spine (disorder)",
              leaf: true,
              loading: false,
              typeIcon: "fa-solid fa-fw fa-lightbulb"
            }
          ],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#64217002",
          key: "http://snomed.info/sct#64217002",
          label: "Curvature of spine (disorder)",
          leaf: false,
          loading: false,
          typeIcon: "fa-solid fa-fw fa-lightbulb"
        }
      }
    ]);
  });

  it("can expandParents ___ no root", async () => {
    wrapper.vm.root = undefined;
    mockEntityService.getEntityParents = vi.fn().mockRejectedValue(false);
    wrapper.vm.expandParents(0);
    await flushPromises();
    await wrapper.vm.$nextTick();
    expect(mockEntityService.getEntityParents).not.toHaveBeenCalled();
  });

  it("can createExpandedParentTree", () => {
    expect(
      wrapper.vm.createExpandedParentTree(
        [
          {
            name: "Acquired curvature of spine (disorder)",
            hasChildren: false,
            type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
            "@id": "http://snomed.info/sct#12903001"
          },
          {
            name: "Scoliosis deformity of spine (disorder)",
            hasChildren: false,
            type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
            "@id": "http://snomed.info/sct#298382003"
          }
        ],
        0
      )
    ).toStrictEqual({
      children: [
        {
          children: [
            {
              children: [],
              color: "#c3ba4588",
              data: "http://snomed.info/sct#111266001",
              key: "http://snomed.info/sct#111266001",
              label: "Acquired scoliosis (disorder)",
              leaf: false,
              loading: false,
              typeIcon: ["fa-solid", "fa-lightbulb"]
            },
            {
              children: [],
              color: "#c3ba4588",
              data: "http://snomed.info/sct#773773006",
              key: "http://snomed.info/sct#773773006",
              label: "Acrodysplasia scoliosis (disorder)",
              leaf: true,
              loading: false,
              typeIcon: ["fa-solid", "fa-lightbulb"]
            },
            {
              children: [],
              color: "#c3ba4588",
              data: "http://snomed.info/sct#205045003",
              key: "http://snomed.info/sct#205045003",
              label: "Congenital scoliosis due to bony malformation (disorder)",
              leaf: true,
              loading: false,
              typeIcon: ["fa-solid", "fa-lightbulb"]
            }
          ],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#298382003",
          key: "http://snomed.info/sct#298382003",
          label: "Scoliosis deformity of spine (disorder)",
          leaf: true,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        }
      ],
      color: "#c3ba4588",
      data: "http://snomed.info/sct#12903001",
      key: "http://snomed.info/sct#12903001",
      label: "Acquired curvature of spine (disorder)",
      leaf: false,
      loading: false,
      typeIcon: ["fa-solid", "fa-lightbulb"]
    });
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#12903001": true, "http://snomed.info/sct#298382003": true });
  });

  it("can createExpandedParentTree ___ existingExpandedKey", () => {
    wrapper.vm.expandedKeys["http://snomed.info/sct#12903001"] = true;
    expect(
      wrapper.vm.createExpandedParentTree(
        [
          {
            name: "Acquired curvature of spine (disorder)",
            hasChildren: false,
            type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
            "@id": "http://snomed.info/sct#12903001"
          },
          {
            name: "Scoliosis deformity of spine (disorder)",
            hasChildren: false,
            type: [{ name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" }],
            "@id": "http://snomed.info/sct#298382003"
          }
        ],
        0
      )
    ).toStrictEqual({
      children: [
        {
          children: [
            {
              children: [],
              color: "#c3ba4588",
              data: "http://snomed.info/sct#111266001",
              key: "http://snomed.info/sct#111266001",
              label: "Acquired scoliosis (disorder)",
              leaf: false,
              loading: false,
              typeIcon: ["fa-solid", "fa-lightbulb"]
            },
            {
              children: [],
              color: "#c3ba4588",
              data: "http://snomed.info/sct#773773006",
              key: "http://snomed.info/sct#773773006",
              label: "Acrodysplasia scoliosis (disorder)",
              leaf: true,
              loading: false,
              typeIcon: ["fa-solid", "fa-lightbulb"]
            },
            {
              children: [],
              color: "#c3ba4588",
              data: "http://snomed.info/sct#205045003",
              key: "http://snomed.info/sct#205045003",
              label: "Congenital scoliosis due to bony malformation (disorder)",
              leaf: true,
              loading: false,
              typeIcon: ["fa-solid", "fa-lightbulb"]
            }
          ],
          color: "#c3ba4588",
          data: "http://snomed.info/sct#298382003",
          key: "http://snomed.info/sct#298382003",
          label: "Scoliosis deformity of spine (disorder)",
          leaf: true,
          loading: false,
          typeIcon: ["fa-solid", "fa-lightbulb"]
        }
      ],
      color: "#c3ba4588",
      data: "http://snomed.info/sct#12903001",
      key: "http://snomed.info/sct#12903001",
      label: "Acquired curvature of spine (disorder)",
      leaf: false,
      loading: false,
      typeIcon: ["fa-solid", "fa-lightbulb"]
    });
    expect(wrapper.vm.expandedKeys).toStrictEqual({ "http://snomed.info/sct#12903001": true, "http://snomed.info/sct#298382003": true });
  });

  it("can setExpandedParentParents ___ length === 0", async () => {
    expect(wrapper.vm.currentParent).toStrictEqual({ iri: "http://snomed.info/sct#64217002", listPosition: 0, name: "Curvature of spine (disorder)" });
    expect(wrapper.vm.alternateParents).toStrictEqual([
      { iri: "http://snomed.info/sct#928000", listPosition: 1, name: "Disorder of musculoskeletal system (disorder)" },
      { iri: "http://snomed.info/sct#699699005", listPosition: 2, name: "Disorder of vertebral column (disorder)" }
    ]);
    mockEntityService.getEntityParents = vi.fn().mockResolvedValue([]);
    wrapper.vm.setExpandedParentParents();
    await flushPromises();
    expect(mockEntityService.getEntityParents).toHaveBeenCalledTimes(1);
    expect(mockEntityService.getEntityParents).toHaveBeenCalledWith("http://snomed.info/sct#298382003");
    expect(wrapper.vm.currentParent).toBe(null);
    expect(wrapper.vm.alternateParents).toStrictEqual([]);
  });

  it("can setExpandedParentParents ___ length === 1", async () => {
    expect(wrapper.vm.currentParent).toStrictEqual({ iri: "http://snomed.info/sct#64217002", listPosition: 0, name: "Curvature of spine (disorder)" });
    expect(wrapper.vm.alternateParents).toStrictEqual([
      { iri: "http://snomed.info/sct#928000", listPosition: 1, name: "Disorder of musculoskeletal system (disorder)" },
      { iri: "http://snomed.info/sct#699699005", listPosition: 2, name: "Disorder of vertebral column (disorder)" }
    ]);
    mockEntityService.getEntityParents = vi.fn().mockResolvedValue([
      {
        "@id": "http://endhealth.info/im#InformationModel",
        hasChildren: false,
        name: "Information Model",
        type: [{ name: "Folder", "@id": "http://endhealth.info/im#Folder" }]
      }
    ]);
    wrapper.vm.setExpandedParentParents();
    await flushPromises();
    expect(mockEntityService.getEntityParents).toHaveBeenCalledTimes(1);
    expect(mockEntityService.getEntityParents).toHaveBeenCalledWith("http://snomed.info/sct#298382003");
    expect(wrapper.vm.currentParent).toStrictEqual({ iri: "http://endhealth.info/im#InformationModel", listPosition: 0, name: "Information Model" });
    expect(wrapper.vm.alternateParents).toStrictEqual([]);
  });

  it("can setExpandedParentParents ___ length > 1", async () => {
    expect(wrapper.vm.currentParent).toStrictEqual({ iri: "http://snomed.info/sct#64217002", listPosition: 0, name: "Curvature of spine (disorder)" });
    expect(wrapper.vm.alternateParents).toStrictEqual([
      { iri: "http://snomed.info/sct#928000", listPosition: 1, name: "Disorder of musculoskeletal system (disorder)" },
      { iri: "http://snomed.info/sct#699699005", listPosition: 2, name: "Disorder of vertebral column (disorder)" }
    ]);
    mockEntityService.getEntityParents = vi.fn().mockResolvedValue([
      {
        name: "Curvature of spine (disorder)",
        hasChildren: false,
        type: [
          {
            name: "Class",
            "@id": "http://www.w3.org/2002/07/owl#Class"
          }
        ],
        "@id": "http://snomed.info/sct#64217002"
      },
      {
        name: "Disorder of musculoskeletal system (disorder)",
        hasChildren: false,
        type: [
          {
            name: "Class",
            "@id": "http://www.w3.org/2002/07/owl#Class"
          }
        ],
        "@id": "http://snomed.info/sct#928000"
      },
      {
        name: "Disorder of vertebral column (disorder)",
        hasChildren: false,
        type: [
          {
            name: "Class",
            "@id": "http://www.w3.org/2002/07/owl#Class"
          }
        ],
        "@id": "http://snomed.info/sct#699699005"
      }
    ]);
    wrapper.vm.setExpandedParentParents();
    await flushPromises();
    expect(mockEntityService.getEntityParents).toHaveBeenCalledTimes(1);
    expect(mockEntityService.getEntityParents).toHaveBeenCalledWith("http://snomed.info/sct#298382003");
    expect(wrapper.vm.currentParent).toStrictEqual({ iri: "http://snomed.info/sct#64217002", listPosition: 0, name: "Curvature of spine (disorder)" });
    expect(wrapper.vm.alternateParents).toStrictEqual([
      { iri: "http://snomed.info/sct#928000", listPosition: 1, name: "Disorder of musculoskeletal system (disorder)" },
      { iri: "http://snomed.info/sct#699699005", listPosition: 2, name: "Disorder of vertebral column (disorder)" }
    ]);
  });

  it("can get concept types", () => {
    expect(
      wrapper.vm.getConceptTypes([
        { name: "Class", "@id": "http://www.w3.org/2002/07/owl#Class" },
        { name: "NodeShape", "@id": "hppt://www.w3.org/2002/07/owl#NodeShape" }
      ])
    ).toBe("Class, NodeShape");
  });

  it("can showPopup", async () => {
    wrapper.vm.showPopup("testEvent", "http://snomed.info/sct#111266001");
    await flushPromises();
    expect(mockRef.methods.show).toHaveBeenCalledTimes(1);
    expect(mockRef.methods.show).toHaveBeenCalledWith("testEvent");
    expect(wrapper.vm.overlayLocation).toBe("testEvent");
    expect(wrapper.vm.hoveredResult).toStrictEqual({
      name: "Acquired scoliosis",
      iri: "http://snomed.info/sct#111266001",
      code: "111266001",
      description: "Acquired scoliosis (disorder)",
      status: { name: "Active", "@id": "http://endhealth.info/im#Active" },
      scheme: { name: "Snomed-CT namespace", "@id": "http://snomed.info/sct#" },
      entityType: [
        { name: "Ontological Concept", "@id": "http://endhealth.info/im#Concept" },
        { name: "Organisation  (record type)", "@id": "http://endhealth.info/im#Organisation" }
      ],
      isDescendentOf: [],
      match: "629792015"
    });
    expect(mockEntityService.getEntitySummary).toHaveBeenCalledTimes(1);
    expect(mockEntityService.getEntitySummary).toHaveBeenCalledWith("http://snomed.info/sct#111266001");
  });

  it("can hidePopup", () => {
    wrapper.vm.hidePopup("testEvent");
    expect(mockRef.methods.hide).toHaveBeenCalledTimes(1);
    expect(mockRef.methods.hide).toHaveBeenCalledWith("testEvent");
    expect(wrapper.vm.overlayLocation).toStrictEqual({});
  });

  it("can navigate ___ metaKey", () => {
    wrapper.vm.navigate({ metaKey: true }, "testIri");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "Concept", params: { selectedIri: "testIri" } });
  });

  it("can navigate ___ ctrlKey", () => {
    wrapper.vm.navigate({ ctrlKey: true }, "testIri");
    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "Concept", params: { selectedIri: "testIri" } });
  });

  it("can navigate ___ other", () => {
    wrapper.vm.navigate({ shiftKey: true }, "testIri");
    expect(mockRouter.push).not.toHaveBeenCalled();
  });
});
