import "./section.css";
import { Section as SectionType } from "../../../../../types/modal";
import { Prefill } from "../../../../../types/form";

type SectionProps = {
  customKey: string | number;
  section: SectionType;
  isExpanded?: boolean;
  selectedPrefill?: Prefill;
  handleExpanding: (id: string) => void;
  handleSelectedPrefill?: (prefill: Prefill) => void;
};

const Section = ({
  section,
  customKey,
  handleExpanding,
  handleSelectedPrefill,
  selectedPrefill,
  isExpanded = false,
}: SectionProps) => {
  const { id, name, values } = section;
  return (
    <div className="modal-menu-section-container" key={customKey}>
      <button
        onClick={() => handleExpanding(id)}
        className="modal-menu-section-button"
        data-testid="section-button"
      >
        {name}
      </button>
      {isExpanded && (
        <ul key={id} className="modal-menu-section" data-testid="section-list">
          {values.map((value, index) => (
            <li
              key={index + value}
              onClick={() =>
                handleSelectedPrefill?.({
                  prefillValue: value,
                  prefillSourceName: section.name,
                  prefillSourceId: section.id,
                })
              }
              className={`modal-menu-section-element ${
                selectedPrefill?.prefillSourceId === section.id &&
                selectedPrefill.prefillValue === value
                  ? "section-highlight"
                  : ""
              }`}
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Section;
