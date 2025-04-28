import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Section from "./index";
import { SectionVariant } from "../../../../../types/modal";

const defaultSection = {
  id: "",
  type: SectionVariant.Parent,
  name: "",
  values: ["test1", "test2", "test3"],
};

test("renders section without list", () => {
  const handleExpanding = jest.fn();
  render(
    <Section
      section={defaultSection}
      handleExpanding={handleExpanding}
      customKey={"1"}
    />
  );
  const list = screen.queryByRole("list");
  expect(list).toBeNull();
});

test("renders section with list", () => {
  const handleExpanding = jest.fn();
  render(
    <Section
      customKey={"1"}
      section={defaultSection}
      handleExpanding={handleExpanding}
      isExpanded={true}
    />
  );
  const list = screen.getByTestId("section-list");
  expect(list).toBeInTheDocument();
});

test("expands list on button click", () => {
  const handleExpanding = jest.fn();
  render(
    <Section
      customKey={"1"}
      section={defaultSection}
      handleExpanding={handleExpanding}
    />
  );

  const button = screen.getByTestId("section-button");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(handleExpanding).toHaveBeenCalledTimes(1);
});
