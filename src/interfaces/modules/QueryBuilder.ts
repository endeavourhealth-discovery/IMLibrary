export interface Field {
  name: string;
  type: string;
  genericType: string | GenericType;
}

export interface GenericType {
  actualTypeArguments: string[];
  rawType: string;
  typeName: string;
}

export interface QueryObject {
  key: number;
  label: string;
  type: string | GenericType;
  value?: any;
  children?: QueryObject[];
  selectable?: boolean;
}
