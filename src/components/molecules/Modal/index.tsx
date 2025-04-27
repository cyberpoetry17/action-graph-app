import "./index.css";
import PortalWrapper from "../../atoms/PortalWrapper";
import { useEffect, useState } from "react";
import { MappingSection } from "../../../types/modal";
import Menu from "./Menu";
import Label from "../../atoms/Label";
import { Prefill } from "../../../types/form";

type ModalProps = {
  isOpen?: boolean;
  sections?: MappingSection[];
  handleClose?: () => void;
  handlePrefill?: (name: string, prefill: Prefill) => void;
};
const TITLE = "Available data";

const Modal = ({ handleClose, sections, isOpen = false }: ModalProps) => {
  const [selectedPrefill, setSelectedPrefill] = useState<Prefill>();

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose?.();
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleClose]);

  const handleSelectedPrefill = (prefill: Prefill) =>
    setSelectedPrefill(prefill);

  const handleSelectAction = () => {
    //pozvati funkciju koja setuje
    console.log(selectedPrefill, "prefill value");
  };

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
            <button onClick={handleClose}>Cancel</button>
            <button disabled={!selectedPrefill} onClick={handleSelectAction}>
              Select
            </button>
          </div>
        </div>
      </div>
    </PortalWrapper>
  ) : null;
};

export default Modal;
