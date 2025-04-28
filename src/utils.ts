import { EnrichedForm, Prefill } from "./types/form";
import { Section, SectionVariant } from "./types/modal";

export type EnrichedFormsUpdateProps = {
  id: string;
  name: string;
  sourceName?: string;
  enrichedForms: EnrichedForm[] | undefined;
  prefill?: Prefill;
};

export const getUpdatedEnrichedForms = ({
  id,
  name,
  enrichedForms,
  prefill,
}: EnrichedFormsUpdateProps): EnrichedForm[] | undefined => {
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
  enrichedForms?: EnrichedForm[]
): EnrichedForm[] => {
  if (!prerequisites?.length || !enrichedForms?.length) return [];

  return prerequisites
    .map((prerequisite) =>
      enrichedForms.find((form) => form.nodeId === prerequisite)
    )
    .filter((parent): parent is EnrichedForm => Boolean(parent));
};

export const getAncestors = (
  prerequisites?: string[],
  enrichedForms?: EnrichedForm[],
  ancestors?: Set<EnrichedForm>
) => {
  if (!prerequisites?.length || !enrichedForms?.length) return [];

  if (!prerequisites.length) {
    return;
  }

  const parents = getParents(prerequisites, enrichedForms);

  parents.forEach((parent) => {
    ancestors?.add(parent);
  });

  getAncestors(
    parents.flatMap((parent) =>
      parent.prerequisites ? parent.prerequisites : ""
    ),
    enrichedForms,
    ancestors
  );
};

export const createSections = (
  data: EnrichedForm[],
  type: SectionVariant
): Section[] =>
  data.map((item) => ({
    id: item.nodeId,
    type,
    name: item.nodeName,
    values: item.formProperties.map((form) => form.name),
  }));
