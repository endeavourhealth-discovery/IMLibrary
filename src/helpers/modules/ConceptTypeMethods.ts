// Categories
// Set, Query Set, Value Set
// Class, Record Type
// Everything else

import { TTIriRef } from "../../interfaces/modules/TTIriRef";
import { Vocabulary } from "../../vocabulary/index";
import palette from "google-palette";

export function isOfTypes(conceptTypeElements: TTIriRef[], ...types: string[]): boolean {
  if (!conceptTypeElements || !conceptTypeElements.length) {
    return false;
  }
  let found = false;
  let index = 0;
  while (!found && index < types.length) {
    if (conceptTypeElements.some((e: any) => e.iri === types[index] || e[Vocabulary.IM.IRI] === types[index])) {
      found = true;
    }
    index++;
  }
  return found;
}

export function isValueSet(conceptTypes: TTIriRef[]): boolean {
  return isOfTypes(
    conceptTypes,
    Vocabulary.IM.SET,
    Vocabulary.IM.QUERY_SET,
    Vocabulary.IM.VALUE_SET,
    Vocabulary.IM.CONCEPT_SET,
    Vocabulary.IM.CONCEPT_SET_GROUP
  );
}

export function isTask(conceptTypes: TTIriRef[]): boolean {
  return (
    isOfTypes(conceptTypes, Vocabulary.IM.TASK) || isOfTypes(conceptTypes, Vocabulary.IM.MAPPING_TASK) || isOfTypes(conceptTypes, Vocabulary.IM.UPDATE_TASK)
  );
}

export function isProperty(conceptTypes: TTIriRef[]): boolean {
  return isOfTypes(conceptTypes, Vocabulary.RDF.PROPERTY);
}

export function isConcept(conceptTypes: TTIriRef[]): boolean {
  return isOfTypes(conceptTypes, Vocabulary.IM.CONCEPT);
}

export function isQuery(entityTypes: TTIriRef[]): boolean {
  return isOfTypes(entityTypes, Vocabulary.IM.QUERY);
}

export function isRecordModel(entityTypes: TTIriRef[]): boolean {
  return isOfTypes(entityTypes, Vocabulary.SHACL.NODESHAPE);
}

export function isFolder(entityTypes: TTIriRef[]): boolean {
  return isOfTypes(entityTypes, Vocabulary.IM.FOLDER);
}

export function getFAIconFromType(conceptTypes: TTIriRef[]): string[] {
  if (isOfTypes(conceptTypes, Vocabulary.SHACL.NODESHAPE)) {
    return ["fa-solid", "fa-diagram-project"];
  }
  if (isTask(conceptTypes)) {
    return ["fa-solid", "fa-clipboard-check"];
  }
  if (isProperty(conceptTypes)) {
    return ["fa-solid", "fa-pen-to-square"];
  }
  if (isValueSet(conceptTypes)) {
    return ["fa-solid", "fa-list-check"];
  }
  if (isFolder(conceptTypes)) {
    return ["fa-solid", "fa-folder"];
  }
  if (isQuery(conceptTypes)) {
    return ["fa-solid", "fa-magnifying-glass"];
  }
  return ["fa-solid", "fa-lightbulb"];
}

export function getColourFromType(conceptTypes: TTIriRef[]): string {
  const bgs = palette("tol-rainbow", 7);
  const bgsFixed = bgs.map((color: string) => "#" + color + "88");
  if (isOfTypes(conceptTypes, Vocabulary.SHACL.NODESHAPE)) {
    return bgsFixed[0];
  }
  if (isTask(conceptTypes)) {
    return bgsFixed[6];
  }
  if (isProperty(conceptTypes)) {
    return bgsFixed[5];
  }
  if (isValueSet(conceptTypes)) {
    return bgsFixed[2];
  }
  if (isFolder(conceptTypes)) {
    return bgsFixed[1];
  }
  if (isQuery(conceptTypes)) {
    return bgsFixed[3];
  }
  return bgsFixed[4];
}

export function getNamesAsStringFromTypes(typeList: TTIriRef[]) {
  return typeList
    .map(type => {
      if (type["@id"] === Vocabulary.SHACL.NODESHAPE) {
        return "Data model";
      } else return type.name;
    })
    .join(", ");
}

export default {
  isOfTypes,
  isProperty,
  isValueSet,
  isConcept,
  isFolder,
  isQuery,
  isRecordModel,
  getColourFromType,
  getFAIconFromType,
  getNamesAsStringFromTypes
};
