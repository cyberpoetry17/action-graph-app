import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Label from "./index";

test("renders default label", () => {
  render(<Label>Available data</Label>);
  const label = screen.getByText("Available data");
  expect(label).toHaveClass("default-label");
});

test("renders default label with custom class", () => {
  render(<Label className="custom-class">Available data</Label>);
  const label = screen.getByText("Available data");
  expect(label).toHaveClass("custom-class");
});

test("renders default label with custom style", () => {
  render(<Label style={{ fontWeight: 400 }}>Available data</Label>);
  const label = screen.getByText("Available data");
  expect(label).toHaveStyle("font-weight: 400");
});
