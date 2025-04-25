type Edge = {
  source: string;
  target: string;
};

type SlaDuration = {
  number: number;
  unit: string;
};

type NodeData = {
  id: string;
  component_key: string;
  component_type: string;
  component_id: string;
  name: string;
  prerequisites?: string[];
  permitted_roles: string[];
  sla_duration: SlaDuration;
  approval_required?: boolean;
  approval_roles?: string[];
};

type Node = {
  data: NodeData;
  id: string;
  position: Position;
  type: string;
};

type DynamicFieldConfig = {
  output_id?: string;
};

type FieldSchema = {
  type: string;
  properties: Record<string, unknown>[];
  required?: string[];
};

type Form = {
  id: string;
  description: string;
  is_reusable: boolean;
  name: string;
  $schema?: string;
  custom_javascript?: string;
  custom_javascript_triggering_fields?: string[];
  field_schema: FieldSchema;
  dynamic_field_config: DynamicFieldConfig;
  nodes: Node[];
};

type Position = {
  x: number;
  y: number;
};

export type ActionGraph = {
  $schema: string;
  position: Position;
  blueprint_id?: string;
  blueprint_name?: string;
  branches?: ActionGraph[] | null;
  tenant_id: string;
  status?: string;
  version_id?: string;
  version_notes?: string;
  edges?: Edge[];
  forms?: Form[];
  nodes?: Node[];
};
