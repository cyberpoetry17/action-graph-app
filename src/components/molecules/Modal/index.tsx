import "./index.css";
import PortalWrapper from "../../atoms/PortalWrapper";
import { useCallback, useEffect, useState } from "react";
import { MappingSection } from "../../../types/modal";
import Menu from "./Menu";
import Label from "../../atoms/Label";
import { Prefill } from "../../../types/form";

type ModalProps = {
  isOpen?: boolean;
  sections?: MappingSection[];
  handleClose?: () => void;
  handlePrefill?: (prefill?: Prefill) => void;
};
const TITLE = "Available data";

const Modal = ({
  handleClose,
  handlePrefill,
  sections,
  isOpen = false,
}: ModalProps) => {
  const [selectedPrefill, setSelectedPrefill] = useState<Prefill>();

  const handleCloseAndClearValue = useCallback(() => {
    setSelectedPrefill(undefined);
    handleClose?.();
  }, [handleClose]);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseAndClearValue?.();
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleCloseAndClearValue]);

  const handleSelectedPrefill = (prefill: Prefill) =>
    setSelectedPrefill(prefill);

  return isOpen ? (
    <PortalWrapper>
      <div className="modal-overlay">
        <div className="modal-container">
          <Label>Select something please</Label>
          <div className="modal-body">
            {sections && (
              <Menu
                sections={sections}
                title={TITLE}
                handleSelectedPrefill={handleSelectedPrefill}
              />
            )}
          </div>
          <div className="modal-footer">
            <button onClick={handleCloseAndClearValue}>Cancel</button>
            <button
              disabled={!selectedPrefill}
              onClick={() => handlePrefill?.(selectedPrefill)}
            >
              Select
            </button>
          </div>
        </div>
      </div>
    </PortalWrapper>
  ) : null;
};

export default Modal;
