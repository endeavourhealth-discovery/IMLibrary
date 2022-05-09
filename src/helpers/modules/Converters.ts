export function iriToUrl(iri: string) {
  return iri.replace(/\//gi, "%2F").replace(/#/gi, "%23");
}

export default {
  iriToUrl
};
