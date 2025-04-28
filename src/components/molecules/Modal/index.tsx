import { useCallback, useEffect, useState } from "react";
import "./modal.css";
import PortalWrapper from "../../atoms/PortalWrapper";
import Menu from "./Menu";
import Label from "../../atoms/Label";
import Button, { ButtonVariant } from "../../atoms/Button";
import { Section } from "../../../types/modal";
import { Prefill } from "../../../types/form";
import {
  MDOAL_BUTTON_CANCEL,
  MODAL_BUTTON_SELECT,
  MODAL_HEADER,
  MODAL_MENU_TITLE,
} from "../../../constants";

type ModalProps = {
  isOpen?: boolean;
  sections?: Section[];
  onClose?: () => void;
  onSelectPrefill?: (prefill?: Prefill) => void;
};

const Modal = ({
  onClose,
  onSelectPrefill,
  sections,
  isOpen = false,
}: ModalProps) => {
  const [selectedPrefill, setSelectedPrefill] = useState<Prefill>();

  const clearValue = () => setSelectedPrefill(undefined);

  const handleClose = useCallback(() => {
    clearValue();
    onClose?.();
  }, [onClose]);

  const handleSelectButton = () => {
    onSelectPrefill?.(selectedPrefill);
    handleClose();
  };

  const handleSelectPrefill = (prefill: Prefill) => setSelectedPrefill(prefill);

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose?.();
    };
    document.addEventListener("keydown", handleEscapeKey);

    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [handleClose]);

  return isOpen ? (
    <PortalWrapper>
      <div className="modal-overlay" data-testid="modal">
        <div className="modal-container">
          <div className="modal-header">
            <Label
              style={{ fontSize: "16px", fontWeight: 700 }}
              dataTestId="modal-header-label"
            >
              {MODAL_HEADER}
            </Label>
          </div>
          <div className="modal-body">
            {sections && (
              <Menu
                sections={sections}
                selectedPrefill={selectedPrefill}
                title={MODAL_MENU_TITLE}
                handleSelectedPrefill={handleSelectPrefill}
              />
            )}
          </div>
          <div className="modal-footer">
            <Button
              dataTestId="modal-button-cancel"
              onClick={handleClose}
              text={MDOAL_BUTTON_CANCEL}
              variant={ButtonVariant.Secondary}
            />
            <Button
              dataTestId="modal-button-select"
              onClick={handleSelectButton}
              text={MODAL_BUTTON_SELECT}
              disabled={!selectedPrefill?.prefillValue}
              variant={ButtonVariant.Primary}
            />
          </div>
        </div>
      </div>
    </PortalWrapper>
  ) : null;
};

export default Modal;
