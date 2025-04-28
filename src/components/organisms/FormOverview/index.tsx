import { useCallback, useMemo, useState } from "react";
import { MappingSection, MappingSectionVariant } from "../../../types/modal";
import {
  createSections,
  EnrichedFormsUpdateProps,
  getParents,
  getUpdatedEnrichedForms,
} from "../../../utils";
import { useForms } from "../../../store/hooks/useForms";
import { Prefill } from "../../../types/form";
import Modal from "../../molecules/Modal";
import ChartForm from "../../molecules/Form";

const FormOverview = () => {
  const { enrichedForms, setEnrichedForms, selectedFormId } = useForms();
  const [selectedPropertyName, setSelectedPropertyName] = useState("");

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
      console.log(prefill, "this is my prefil here");
      updateEnrichedForms({
        name: selectedPropertyName,
        id: selectedFormId!,
        enrichedForms: enrichedForms,
        prefill: prefill,
      });
    },
    [enrichedForms, selectedFormId, selectedPropertyName, updateEnrichedForms]
  );

  const [sections, setSections] = useState<MappingSection[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => setIsOpen(false);

  const handleOpenModal = (propertyName: string) => {
    setSelectedPropertyName(propertyName);
    const parents = getParents(selectedForm?.prerequisites, enrichedForms);
    const newSections = [
      ...createSections(parents, MappingSectionVariant.Parent),
    ];

    setSections(newSections);
    setIsOpen(true);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        sections={sections}
        handlePrefill={handleUpdatePrefillValue}
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
