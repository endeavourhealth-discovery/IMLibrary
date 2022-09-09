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
