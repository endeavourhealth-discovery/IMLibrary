import { TTBundle, TTIriRef } from "../../interfaces/Interfaces";

export function isTTIriRef(data: any): data is TTIriRef {
  if ((data as TTIriRef)["@id"]) return true;
  return false;
}

export function isTTBundle(data: any): data is TTBundle {
  if ((data as TTBundle).entity && (data as TTBundle).predicates) return true;
  return false;
}

export default {
  isTTIriRef,
  isTTBundle
};
