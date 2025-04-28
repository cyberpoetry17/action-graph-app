export enum SectionVariant {
  Parent = "parent",
  Ancestor = "transient-ancestor",
  Global = "global",
  Other = "other",
}

export type Section = {
  id: string;
  type: SectionVariant;
  name: string;
  values: string[];
};
