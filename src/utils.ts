import { MappedNodeForm, Prefill } from "./types/form";
import { MappingSection, MappingSectionVariant } from "./types/modal";

export type EnrichedFormsUpdateProps = {
  id: string;
  name: string;
  sourceName?: string;
  enrichedForms: MappedNodeForm[] | undefined;
  prefill?: Prefill;
};

export const getUpdatedEnrichedForms = ({
  id,
  name,
  enrichedForms,
  prefill,
}: EnrichedFormsUpdateProps): MappedNodeForm[] | undefined => {
  const form = enrichedForms?.find((form) => form.nodeId === id);
  if (!form) return enrichedForms;

  const updatedFormProperties = form.formProperties.map((property) =>
    property.name === name
      ? {
          ...property,
          prefill: {
            prefillSourceId: prefill?.prefillSourceId ?? "",
            prefillValue: prefill?.prefillValue ?? "",
            prefillSourceName: prefill?.prefillSourceName ?? "",
          },
        }
      : property
  );

  return enrichedForms?.map((form) =>
    form.nodeId === id
      ? {
          ...form,
          formProperties: updatedFormProperties,
        }
      : form
  );
};

export const getParents = (
  prerequisites?: string[],
  enrichedForms?: MappedNodeForm[]
): MappedNodeForm[] => {
  if (!prerequisites?.length || !enrichedForms?.length) return [];

  return prerequisites
    .map((prerequisite) =>
      enrichedForms.find((form) => form.nodeId === prerequisite)
    )
    .filter((parent): parent is MappedNodeForm => Boolean(parent));
};

export const createSections = (
  data: MappedNodeForm[],
  type: MappingSectionVariant
): MappingSection[] =>
  data.map((item) => ({
    id: item.nodeId,
    type,
    name: item.nodeName,
    values: item.formProperties.map((form) => form.name),
  }));
