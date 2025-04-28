export type Prefill = {
  prefillValue?: string;
  prefillSourceId?: string;
  prefillSourceName?: string;
};

export type FormProperty = {
  name: string;
  prefill?: Prefill;
};

export type MappedForm = {
  name: string;
  id: string;
  properties: FormProperty[];
};

export type EnrichedForm = {
  nodeId: string;
  nodeName: string;
  prerequisites?: string[];
  formProperties: FormProperty[];
};
