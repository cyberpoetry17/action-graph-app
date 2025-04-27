type MappingSectionVariant =
  | "parent"
  | "transient-ancestor"
  | "global"
  | "other";

export type MappingSection = {
  type: MappingSectionVariant;
  name: string;
  values: string[];
};
