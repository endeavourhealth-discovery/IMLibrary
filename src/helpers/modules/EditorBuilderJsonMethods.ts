import { BuilderType } from "../../enums/modules/BuilderType";
import { ComponentDetails } from "../../interfaces/modules/ComponentDetails";
import { ComponentType } from "../../enums/modules/ComponentType";
import { NextComponentSummary } from "../../interfaces/modules/NextComponentSummary";

export function generateNewComponent(type: ComponentType, position: number, data: any, builderType: BuilderType, showButtons: boolean) {
  let result;
  switch (type) {
    case ComponentType.LOGIC:
      result = {
        id: ComponentType.LOGIC + "_" + position,
        value: data,
        position: position,
        type: ComponentType.LOGIC,
        json: {},
        builderType: builderType,
        showButtons: showButtons
      };
      break;
    case ComponentType.ENTITY:
      result = {
        id: ComponentType.ENTITY + "_" + position,
        value: data,
        position: position,
        type: ComponentType.ENTITY,
        json: {},
        builderType: builderType,
        showButtons: showButtons
      };
      break;
    case ComponentType.QUANTIFIER:
      result = {
        id: ComponentType.QUANTIFIER + "_" + position,
        value: data,
        position: position,
        type: ComponentType.QUANTIFIER,
        json: {},
        builderType: builderType,
        showButtons: showButtons
      };
      break;
    case ComponentType.REFINEMENT:
      result = {
        id: ComponentType.REFINEMENT + "_" + position,
        value: data,
        position: position,
        type: ComponentType.REFINEMENT,
        json: {},
        builderType: builderType,
        showButtons: showButtons
      };
      break;
    case ComponentType.DEFINITION:
      result = {
        id: ComponentType.DEFINITION + "_" + position,
        value: data,
        position: position,
        type: ComponentType.DEFINITION,
        json: {},
        builderType: builderType,
        showButtons: showButtons
      };
      break;
    case ComponentType.HAS_MEMBER:
      result = {
        id: ComponentType.HAS_MEMBER + "_" + position,
        value: data,
        position: position,
        type: ComponentType.HAS_MEMBER,
        json: {},
        builderType: builderType,
        showButtons: showButtons
      };
      break;
    default:
      throw new Error(`helper function generateNewComponent encountered an unexpected component type: ${type}`);
  }
  return result;
}

export function genNextOptions(position: number, previous: ComponentType, builderType: BuilderType, group?: ComponentType): ComponentDetails {
  return {
    id: "addNext_" + (position + 1),
    value: {
      previousPosition: position,
      previousComponentType: previous,
      parentGroup: group
    },
    position: position + 1,
    type: ComponentType.ADD_NEXT,
    json: {},
    builderType: builderType
  };
}

export function updatePositions(build: ComponentDetails[]) {
  build.forEach((item: ComponentDetails, index: number) => {
    item.position = index;
  });
}

export function deleteItem(itemToDelete: ComponentDetails, build: ComponentDetails[], parentGroup: ComponentType, builderType: BuilderType) {
  const index = build.findIndex(buildItem => buildItem.position === itemToDelete.position);
  const length = build.length;
  if (itemToDelete.position === 0) {
    if (build.length > 1) {
      build.shift();
    } else {
      build[0] = genNextOptions(-1, parentGroup, builderType, parentGroup);
    }
  } else {
    if (index === length - 1) {
      build[index] = genNextOptions(index - 1, build[index - 1].type, builderType, parentGroup);
    } else {
      if (build[index - 1].type === ComponentType.ADD_NEXT) {
        build.splice(index, 1);
        if (build[index].type === ComponentType.ADD_NEXT) {
          build.splice(index, 1);
        }
      } else {
        build.splice(index, 1);
      }
    }
  }
  updatePositions(build);
}

export function updateItem(itemToUpdate: ComponentDetails, build: ComponentDetails[]) {
  const index = build.findIndex(buildItem => buildItem.position === itemToUpdate.position);
  build[index] = itemToUpdate;
}

export function addNextOptions(previousComponent: NextComponentSummary, build: ComponentDetails[], builderType: BuilderType): ComponentDetails {
  const nextOptionsComponent = genNextOptions(
    previousComponent.previousPosition,
    previousComponent.previousComponentType,
    builderType,
    previousComponent.parentGroup
  );
  if (previousComponent.previousPosition !== build.length - 1 && build[previousComponent.previousPosition + 1].type === ComponentType.ADD_NEXT) {
    build[previousComponent.previousPosition + 1] = nextOptionsComponent;
  } else {
    build.splice(previousComponent.previousPosition + 1, 0, nextOptionsComponent);
  }
  updatePositions(build);
  return nextOptionsComponent;
}

export function scrollIntoView(component: ComponentDetails) {
  const itemToScrollTo = document.getElementById(component.id);
  itemToScrollTo?.scrollIntoView();
}

export function addItem(
  itemToAdd: { selectedType: ComponentType; position: number; value: any },
  build: ComponentDetails[],
  builderType: BuilderType,
  showButtons: boolean
) {
  const newComponent = generateNewComponent(itemToAdd.selectedType, itemToAdd.position, itemToAdd.value, builderType, showButtons);
  if (!newComponent) return;
  build.splice(itemToAdd.position, 0, newComponent);
  updatePositions(build);
}

export default {
  genNextOptions,
  generateNewComponent,
  updateItem,
  updatePositions,
  deleteItem,
  addItem,
  addNextOptions,
  scrollIntoView
};
