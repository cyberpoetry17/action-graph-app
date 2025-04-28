import { useEffect, useState } from "react";
import "./menu.css";
import Section from "./Section";
import { Section as SectionType } from "../../../../types/modal";
import { Prefill } from "../../../../types/form";
import Label from "../../../atoms/Label";

type MenuProps = {
  title: string;
  sections: SectionType[];
  handleSelectedPrefill?: (prefill: Prefill) => void;
};

const Menu = ({ title, sections, handleSelectedPrefill }: MenuProps) => {
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
      <div>Search</div>
      {sections.map((section) => (
        <Section
          section={section}
          isExpanded={expandedSections[section.id]}
          handleExpanding={expandCollapseSection}
          handleSelectedPrefill={handleSelectedPrefill}
        />
      ))}
    </div>
  );
};

export default Menu;
