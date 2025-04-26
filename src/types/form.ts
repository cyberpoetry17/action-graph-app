export type FormProperty = {
  name: string;
  prefillValue?: string;
};

export type MappedForm = {
  name: string;
  id: string;
  properties: FormProperty[];
};
