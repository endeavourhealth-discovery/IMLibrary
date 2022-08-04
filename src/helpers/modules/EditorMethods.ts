import { ComponentType } from "../../enums/Enums";
import { PropertyShape, TTIriRef } from "../../interfaces/Interfaces";
import { IM } from "../../vocabulary/IM";

export function processArguments(property: PropertyShape, valueVariableMap?: Map<string, any>) {
  const result = new Map<string, any>();
  property.argument.forEach(arg => {
    let key = "";
    let value: any;
    if (arg.parameter === "this" && !arg.valueIri) key = property.path["@id"];
    else key = arg.parameter;
    if (arg.valueIri) value = arg.valueIri["@id"];
    else if (arg.valueVariable) value = valueVariableMap?.get(arg.valueVariable);
    else if (arg.valueText) value = arg.valueText;
    result.set(key, value);
  });
  return result;
}

function processComponentType(type: TTIriRef): any {
  switch (type["@id"]) {
    case IM.TEXT_DISPLAY_COMPONENT:
      return ComponentType.TEXT_DISPLAY;
    case IM.TEXT_INPUT_COMPONENT:
      return ComponentType.TEXT_INPUT;
    case IM.HTML_INPUT_COMPONENT:
      return ComponentType.HTML_INPUT;
    case IM.ARRAY_BUILDER_COMPONENT:
      return ComponentType.ARRAY_BUILDER;
    case IM.ENTITY_SEARCH_COMPONENT:
      return ComponentType.ENTITY_SEARCH;
    case IM.ENTITY_COMBOBOX_COMPONENT:
      return ComponentType.ENTITY_COMBOBOX;
    case IM.ENTITY_DROPDOWN_COMPONENT:
      return ComponentType.ENTITY_DROPDOWN;
    case IM.ENTITY_AUTO_COMPLETE_COMPONENT:
      return ComponentType.ENTITY_AUTO_COMPLETE;
    default:
      throw new Error("Invalid component type encountered in shape group" + type["@id"]);
  }
}

export default { processArguments, processComponentType };
