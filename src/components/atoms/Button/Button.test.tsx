import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button, { ButtonVariant } from "./index";

test("renders primary button", () => {
  const onClick = jest.fn();
  render(
    <Button text={"Select"} onClick={onClick} variant={ButtonVariant.Primary} />
  );
  const button = screen.getByText("Select");
  expect(button).toHaveClass("button-primary");
});

test("renders secondary button", () => {
  const onClick = jest.fn();
  render(
    <Button
      text={"Select"}
      onClick={onClick}
      variant={ButtonVariant.Secondary}
    />
  );
  const button = screen.getByText("Select");
  expect(button).toHaveClass("button-secondary");
});

test("call onClick method when clicked", () => {
  const onClick = jest.fn();
  render(
    <Button text={"Select"} onClick={onClick} variant={ButtonVariant.Primary} />
  );
  const button = screen.getByText("Select");
  fireEvent.click(button);
  expect(onClick).toHaveBeenCalledTimes(1);
});
