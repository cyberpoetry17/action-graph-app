import { useCallback, useMemo, useState } from "react";
import Modal from "../../molecules/Modal";
import ChartForm from "../../molecules/Form";
import { useForms } from "../../../store/hooks/useForms";
import { EnrichedForm, Prefill } from "../../../types/form";
import { Section, SectionVariant } from "../../../types/modal";
import {
  createSections,
  EnrichedFormsUpdateProps,
  getAncestors,
  getParents,
  getUpdatedEnrichedForms,
} from "../../../utils";
import {
  ActionProperties,
  ClientOrganisationProperties,
} from "../../../constants";

const FormOverview = () => {
  const { enrichedForms, setEnrichedForms, selectedFormId } = useForms();
  const [selectedPropertyName, setSelectedPropertyName] = useState("");

  const [sections, setSections] = useState<Section[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const selectedForm = useMemo(() => {
    return enrichedForms?.find((form) => form.nodeId === selectedFormId);
  }, [enrichedForms, selectedFormId]);

  const updateEnrichedForms = useCallback(
    (args: EnrichedFormsUpdateProps) => {
      setEnrichedForms((prev) =>
        getUpdatedEnrichedForms({ ...args, enrichedForms: prev })
      );
    },
    [setEnrichedForms]
  );

  const handleClearPrefillValue = useCallback(
    (name: string) => {
      updateEnrichedForms({
        name: name,
        id: selectedFormId!,
        enrichedForms: enrichedForms,
      });
    },
    [enrichedForms, selectedFormId, updateEnrichedForms]
  );

  const handleUpdatePrefillValue = useCallback(
    (prefill?: Prefill) => {
      updateEnrichedForms({
        name: selectedPropertyName,
        id: selectedFormId!,
        enrichedForms: enrichedForms,
        prefill: prefill,
      });
    },
    [enrichedForms, selectedFormId, selectedPropertyName, updateEnrichedForms]
  );

  const handleCloseModal = () => setIsOpen(false);

  const handleOpenModal = (propertyName: string) => {
    setSelectedPropertyName(propertyName);

    //traversing graphs
    const parents = getParents(selectedForm?.prerequisites, enrichedForms);
    const ancestors = new Set<EnrichedForm>();
    getAncestors(
      parents.flatMap((parent) =>
        parent.prerequisites ? parent.prerequisites : ""
      ),
      enrichedForms,
      ancestors
    );

    //creating menu sections
    const newParentSections = [
      ...createSections(parents, SectionVariant.Parent),
    ];
    const newAncestorSections = [
      ...createSections(Array.from(ancestors), SectionVariant.Ancestor),
    ];

    setSections([
      ActionProperties,
      ClientOrganisationProperties,
      ...newParentSections,
      ...newAncestorSections,
    ]);
    setIsOpen(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        sections={sections}
        onSelectPrefill={handleUpdatePrefillValue}
      />
      {selectedForm && (
        <ChartForm
          form={selectedForm}
          handleClick={handleOpenModal}
          handleClearPrefillValue={handleClearPrefillValue}
        />
      )}
    </>
  );
};

export default FormOverview;
