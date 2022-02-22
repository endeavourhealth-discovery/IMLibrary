export interface DashboardLayout {
  type: string;
  order: number;
  iri: string;
}

export interface DefinitionConfig {
  label: string;
  order: number;
  predicate: string;
  size: string;
  type: string;
}

export interface FilterDefaultsConfig {
  schemeOptions: string[];
  statusOptions: string[];
  typeOptions: string[];
}
