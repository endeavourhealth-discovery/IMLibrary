import { BuilderType } from "../../enums/modules/BuilderType";
import { ComponentDetails } from "../../interfaces/modules/ComponentDetails";
import { ComponentType } from "../../enums/modules/ComponentType";
import { NextComponentSummary } from "../../interfaces/modules/NextComponentSummary";
export declare function generateNewComponent(type: ComponentType, position: number, data: any, builderType: BuilderType): {
    id: string;
    value: any;
    position: number;
    type: ComponentType;
    json: {};
    builderType: BuilderType;
} | undefined;
export declare function genNextOptions(position: number, previous: ComponentType, builderType: BuilderType, group?: ComponentType): ComponentDetails;
export declare function updatePositions(build: ComponentDetails[]): void;
export declare function deleteItem(itemToDelete: ComponentDetails, build: ComponentDetails[], parentGroup: ComponentType, builderType: BuilderType): void;
export declare function updateItem(itemToUpdate: ComponentDetails, build: ComponentDetails[]): void;
export declare function addNextOptions(previousComponent: NextComponentSummary, build: ComponentDetails[], builderType: BuilderType): ComponentDetails;
export declare function scrollIntoView(component: ComponentDetails): void;
export declare function addItem(itemToAdd: {
    selectedType: ComponentType;
    position: number;
    value: any;
}, build: ComponentDetails[], parentGroup: ComponentType, builderType: BuilderType): void;
declare const _default: {
    genNextOptions: typeof genNextOptions;
    generateNewComponent: typeof generateNewComponent;
    updateItem: typeof updateItem;
    updatePositions: typeof updatePositions;
    deleteItem: typeof deleteItem;
    addItem: typeof addItem;
    addNextOptions: typeof addNextOptions;
    scrollIntoView: typeof scrollIntoView;
};
export default _default;
