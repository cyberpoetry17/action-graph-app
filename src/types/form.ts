export type FormProperty = {
  name: string;
  prefillValue?: string;
};

export type MappedForm = {
  name: string;
  id: string;
  properties: FormProperty[];
};

export type MappedNodeForm = {
  nodeId: string;
  nodeName: string;
  prerequisites?: string[];
  formProperties: FormProperty[];
};
