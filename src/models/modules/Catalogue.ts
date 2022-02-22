export interface InstanceHistoryItem {
  "@id": string;
  iriType: { "@id": string };
  name: string;
}

export interface InstanceSearchResult {
  "@id": string;
  iriType: {
    "@id": string;
  };
}

export interface InstanceTreeItem {
  key: number;
  label: string;
  data?: any;
  type?: string;
  children: InstanceTreeItem[];
}
