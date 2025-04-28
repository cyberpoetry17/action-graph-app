import { useEffect, useState } from "react";
import "./menu.css";
import Section from "./Section";
import { Section as SectionType } from "../../../../types/modal";
import { Prefill } from "../../../../types/form";
import Label from "../../../atoms/Label";

type MenuProps = {
  title: string;
  sections: SectionType[];
  selectedPrefill?: Prefill;
  handleSelectedPrefill?: (prefill: Prefill) => void;
};

const Menu = ({
  title,
  sections,
  selectedPrefill,
  handleSelectedPrefill,
}: MenuProps) => {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    const initialStates: Record<string, boolean> = {};
    sections.forEach((sections) => {
      initialStates[sections.id] = false;
    });
    setExpandedSections(initialStates);
  }, [sections]);

  const expandCollapseSection = (id: string) =>
    setExpandedSections((previous) => ({
      ...previous,
      [id]: !previous[id],
    }));

  return (
    <div className="menu-container" data-testid="menu">
      <Label dataTestId="menu-label">{title}</Label>
      {sections.map((section, index) => (
        <Section
          section={section}
          selectedPrefill={selectedPrefill}
          isExpanded={expandedSections[section.id]}
          handleExpanding={expandCollapseSection}
          handleSelectedPrefill={handleSelectedPrefill}
          customKey={index}
          key={index}
        />
      ))}
    </div>
  );
};

export default Menu;
