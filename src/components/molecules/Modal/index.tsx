import "./index.css";
import PortalWrapper from "../../atoms/PortalWrapper";
import { useEffect } from "react";
import { MappingSection } from "../../../types/modal";

type ModalProps = {
  isOpen?: boolean;
  sections?: MappingSection[];
  handleClose?: () => void;
};

const Modal = ({ handleClose, sections, isOpen = false }: ModalProps) => {
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose?.();
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleClose]);

  return isOpen ? (
    <PortalWrapper>
      <div className="modal-overlay">
        <div className="modal-container">
          {sections && sections.map((section) => <div>{section.name}</div>)}
        </div>
      </div>
    </PortalWrapper>
  ) : null;
};

export default Modal;
