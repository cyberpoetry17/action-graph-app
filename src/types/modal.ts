// export type MappingSectionVariant =
//   | "parent"
//   | "transient-ancestor"
//   | "global"
//   | "other";

export enum MappingSectionVariant {
  Parent = "parent",
  Ancestor = "transient-ancestor",
  Global = "global",
  Other = "other",
}

export type MappingSection = {
  id: string;
  type: MappingSectionVariant;
  name: string;
  values: string[];
};
