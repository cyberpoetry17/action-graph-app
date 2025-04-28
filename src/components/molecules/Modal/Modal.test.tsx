import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./index";
import { SectionVariant } from "../../../types/modal";

const defaultSections = [
  {
    id: "1",
    type: SectionVariant.Parent,
    name: "section1",
    values: ["test1", "test2", "test3"],
  },
  {
    id: "2",
    type: SectionVariant.Parent,
    name: "section2",
    values: ["test1", "test2", "test3"],
  },
];

test("modal not rendered (modal closed)", () => {
  render(<Modal sections={defaultSections} />);
  //   const modal = screen.que
  //   expect(modal).toBeNull();
});

// test("renders menu label", () => {
//   render(<Menu title="test title" sections={defaultSection} />);
//   const menu = screen.getByTestId("menu");
//   expect(menu).toBeInTheDocument();

//   const label = screen.getByTestId("menu-label");
//   expect(label).toBeInTheDocument();
// });
