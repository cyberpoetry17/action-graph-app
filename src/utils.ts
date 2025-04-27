import { MappedNodeForm } from "./types/form";

export type EnrichedFormsUpdateProps = {
  id: string;
  name: string;
  sourceName?: string;
  enrichedForms: MappedNodeForm[] | undefined;
  prefillValue?: string;
};

export const getUpdatedEnrichedForms = ({
  id,
  name,
  enrichedForms,
  prefillValue = "",
}: EnrichedFormsUpdateProps): MappedNodeForm[] | undefined => {
  const form = enrichedForms?.find((form) => form.nodeId === id);
  if (!form) return enrichedForms;

  const updatedFormProperties = form.formProperties.map((property) =>
    property.name === name ? { ...property, prefillValue } : property
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
