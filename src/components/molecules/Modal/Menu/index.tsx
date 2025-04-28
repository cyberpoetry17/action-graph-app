import { useEffect, useState } from "react";
import "./index.css";
import { MappingSection } from "../../../../types/modal";
import Section from "./Section";
import { Prefill } from "../../../../types/form";

type MenuProps = {
  title: string;
  sections: MappingSection[];
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
  console.log(title, "title");

  return (
    <div className="menu-container">
      {/* <Label>{title}</Label>
      <div>Search</div> */}
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
