import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Menu from "./index";
import { SectionVariant } from "../../../../types/modal";

const defaultSection = [
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

test("renders menu", () => {
  render(<Menu title="test title" sections={defaultSection} />);
  const menu = screen.getByTestId("menu");
  expect(menu).toBeInTheDocument();
});

test("renders menu label", () => {
  render(<Menu title="test title" sections={defaultSection} />);
  const menu = screen.getByTestId("menu");
  expect(menu).toBeInTheDocument();

  const label = screen.getByTestId("menu-label");
  expect(label).toBeInTheDocument();
});

test("renders menu with two list (expanded)", () => {
  render(<Menu title="test title" sections={defaultSection} />);
  const menu = screen.getByTestId("menu");
  expect(menu).toBeInTheDocument();

  const label = screen.getByTestId("menu-label");
  expect(label).toBeInTheDocument();

  const section1 = screen.getByText("section1");
  fireEvent.click(section1);
  const section2 = screen.getByText("section2");
  fireEvent.click(section2);

  const lists = screen.getAllByRole("list");
  expect(lists[0]).toBeInTheDocument();
  expect(lists[1]).toBeInTheDocument();
});

test("should expand or collapse sections when clicked", () => {
  render(
    <Menu
      title="Test Menu"
      sections={defaultSection}
      handleSelectedPrefill={() => {}}
    />
  );

  const section = screen.getByText("section1");
  fireEvent.click(section);

  const list = screen.getByRole("list");
  expect(list).toBeInTheDocument();
});
