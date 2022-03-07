declare const _default: {
    ChartRescale: {
        setTooltips: typeof import("./modules/ChartRescale").setTooltips;
        rescaleData: typeof import("./modules/ChartRescale").rescaleData;
    };
    ConceptTypeMethods: {
        isOfTypes: typeof import("./modules/ConceptTypeMethods").isOfTypes;
        isProperty: typeof import("./modules/ConceptTypeMethods").isProperty;
        isValueSet: typeof import("./modules/ConceptTypeMethods").isValueSet;
        getColourFromType: typeof import("./modules/ConceptTypeMethods").getColourFromType;
        getFAIconFromType: typeof import("./modules/ConceptTypeMethods").getFAIconFromType;
    };
    CopyConceptToClipboard: {
        copyConceptToClipboard: typeof import("./modules/CopyConceptToClipboard").copyConceptToClipboard;
        conceptObjectToCopyString: typeof import("./modules/CopyConceptToClipboard").conceptObjectToCopyString;
    };
    DataTypeCheckers: {
        isArrayHasLength: typeof import("./modules/DataTypeCheckers").isArrayHasLength;
        isObjectHasKeys: typeof import("./modules/DataTypeCheckers").isObjectHasKeys;
        isObject: typeof import("./modules/DataTypeCheckers").isObject;
    };
    ContainerDimensionGetters: {
        getContainerElementOptimalHeight: typeof import("./modules/ContainerDimensionGetters").getContainerElementOptimalHeight;
        getContainerElementOptimalWidth: typeof import("./modules/ContainerDimensionGetters").getContainerElementOptimalWidth;
    };
    GraphTranslator: {
        translateFromEntityBundle: typeof import("./modules/GraphTranslator").translateFromEntityBundle;
        hasNodeChildrenByName: typeof import("./modules/GraphTranslator").hasNodeChildrenByName;
        findNodeByName: (data: import("../interfaces/Interfaces").TTGraphData, name: string, nodes: import("../interfaces/Interfaces").TTGraphData[]) => void;
        toggleNodeByName: typeof import("./modules/GraphTranslator").toggleNodeByName;
    };
    ModuleIris: {
        MODULE_IRIS: string[];
    };
    Sorters: {
        byLabel: typeof import("./modules/Sorters").byLabel;
        byName: typeof import("./modules/Sorters").byName;
        byOrder: typeof import("./modules/Sorters").byOrder;
        byPosition: typeof import("./modules/Sorters").byPosition;
        byPriority: typeof import("./modules/Sorters").byPriority;
        byScheme: typeof import("./modules/Sorters").byScheme;
    };
    Transforms: {
        bundleToText: typeof import("./modules/Transforms").bundleToText;
        ttArrayToString: typeof import("./modules/Transforms").ttArrayToString;
        ttIriToString: typeof import("./modules/Transforms").ttIriToString;
        ttNodeToString: typeof import("./modules/Transforms").ttNodeToString;
        ttValueToString: typeof import("./modules/Transforms").ttValueToString;
        termToString: typeof import("./modules/Transforms").termToString;
    };
    UserMethods: {
        verifyEmailsMatch: typeof import("./modules/UserMethods").verifyEmailsMatch;
        verifyIsEmail: typeof import("./modules/UserMethods").verifyIsEmail;
        verifyIsName: typeof import("./modules/UserMethods").verifyIsName;
        verifyIsUsername: typeof import("./modules/UserMethods").verifyIsUsername;
        verifyPasswordsMatch: typeof import("./modules/UserMethods").verifyPasswordsMatch;
        checkPasswordStrength: typeof import("./modules/UserMethods").checkPasswordStrength;
    };
    EditorBuilderJsonMethods: {
        genNextOptions: typeof import("./modules/EditorBuilderJsonMethods").genNextOptions;
        generateNewComponent: typeof import("./modules/EditorBuilderJsonMethods").generateNewComponent;
        updateItem: typeof import("./modules/EditorBuilderJsonMethods").updateItem;
        updatePositions: typeof import("./modules/EditorBuilderJsonMethods").updatePositions;
        deleteItem: typeof import("./modules/EditorBuilderJsonMethods").deleteItem;
        addItem: typeof import("./modules/EditorBuilderJsonMethods").addItem;
        addNextOptions: typeof import("./modules/EditorBuilderJsonMethods").addNextOptions;
        scrollIntoView: typeof import("./modules/EditorBuilderJsonMethods").scrollIntoView;
    };
};
export default _default;
