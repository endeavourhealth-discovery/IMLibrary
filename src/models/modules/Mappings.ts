export interface ChartTableNode {
  key: string;
  type: string;
  data: any;
}

export interface ChartMapNode {
  key: string;
  type: string;
  data: { label: string };
  children: any[];
}

export interface MapItem {
  assuranceLevel: string;
  iri: string;
  name: string;
  priority: number;
}

export interface SimpleMap {
  "@id": string;
  code: string;
  name: string;
  scheme: string;
}

export interface SimpleMapIri {
  name: string;
  iri: string;
  scheme: string;
  code: string;
}
