import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./index";
import { SectionVariant } from "../../../types/modal";

jest.mock("../../atoms/PortalWrapper", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

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
  render(<Modal isOpen={false} />);
  expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
});

test("renders modal when isOpen is true", () => {
  render(<Modal isOpen={true} sections={defaultSections} />);
  expect(screen.getByTestId("modal")).toBeInTheDocument();
  expect(screen.getByTestId("modal-header-label")).toBeInTheDocument();
});

test("calls handleClose method when clicking cancel button", () => {
  const handleClose = jest.fn();

  render(
    <Modal isOpen={true} sections={defaultSections} onClose={handleClose} />
  );
  expect(screen.getByTestId("modal")).toBeInTheDocument();

  const button = screen.getByTestId("modal-button-cancel");
  expect(button).toBeInTheDocument();

  fireEvent.click(screen.getByTestId("modal-button-cancel"));
  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("calls handlePrefill method when clicking select button", () => {
  const handlePrefill = jest.fn();
  render(
    <Modal isOpen sections={defaultSections} onSelectPrefill={handlePrefill} />
  );

  const section = screen.getByText("section1");
  fireEvent.click(section);

  const lists = screen.getAllByRole("list");
  expect(lists[0]).toBeInTheDocument();

  const listItems = within(lists[0]).getAllByRole("listitem");
  fireEvent.click(listItems[0]);

  const selectButton = screen.getByTestId("modal-button-select");
  fireEvent.click(selectButton);

  expect(handlePrefill).toHaveBeenCalledTimes(1);
  expect(handlePrefill).toHaveBeenCalledWith(
    expect.objectContaining({
      prefillValue: "test1",
    })
  );
});

test("modal closes on Escape key press", () => {
  const handleClose = jest.fn();
  render(<Modal isOpen sections={defaultSections} onClose={handleClose} />);

  fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
  expect(handleClose).toHaveBeenCalledTimes(1);
});
