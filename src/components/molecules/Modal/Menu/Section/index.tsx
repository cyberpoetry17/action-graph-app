import "./index.css";
import { MappingSection } from "../../../../../types/modal";
import { Prefill } from "../../../../../types/form";

type SectionProps = {
  section: MappingSection;
  isExpanded?: boolean;
  handleExpanding: (id: string) => void;
  handleSelectedPrefill?: (prefill: Prefill) => void;
};

const Section = ({
  section,
  handleExpanding,
  handleSelectedPrefill,
  isExpanded = false,
}: SectionProps) => {
  const { id, name, values } = section;
  return (
    <>
      <button
        onClick={() => handleExpanding(id)}
        className="modal-menu-section-button"
      >
        {name}
      </button>
      {isExpanded && (
        <ul key={id} className="modal-menu-section">
          {values.map((value, index) => (
            <li
              key={index}
              onClick={() =>
                handleSelectedPrefill?.({
                  prefillValue: value,
                  prefillSourceName: section.name,
                  prefillSourceId: section.id,
                })
              }
              className="modal-menu-section-element"
            >
              {value}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Section;
