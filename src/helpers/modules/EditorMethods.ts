import { PropertyShape } from "../../interfaces/Interfaces";

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

export default { processArguments };
