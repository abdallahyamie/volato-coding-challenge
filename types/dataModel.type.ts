
export interface Functions {
  [key: string]: (...args: any[]) => number | boolean | string | undefined | null | Promise<number | boolean | string | undefined | null>;
}

export interface DataField {
  label: string;
  type: "int" | "float" | "number" | "boolean" | "string";
  value?: number | boolean | string | null;
  readOnly: boolean;
  calculate: string | null;
}

export interface DataModel {
  name: string;
  fields: {
    [key: string]: DataField;
  }
}


