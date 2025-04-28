import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "./index";

test("renders default input", () => {
  const onClick = jest.fn();
  render(<Input onClick={onClick} dataTestId="input" />);
  const input = screen.getByTestId("input");
  expect(input).toBeInTheDocument();
});

test("renders readOnly input", () => {
  const onClick = jest.fn();
  render(<Input onClick={onClick} readOnly dataTestId="input" />);
  const input = screen.getByTestId("input");

  expect(input).toBeInTheDocument();
  expect(input).toHaveAttribute("readOnly");
});

test("calls onClick method when clicked on input ", () => {
  const onClick = jest.fn();
  render(<Input onClick={onClick} readOnly dataTestId="input" />);
  const input = screen.getByTestId("input");

  expect(input).toBeInTheDocument();
  fireEvent.click(input);
  expect(onClick).toHaveBeenCalledTimes(1);
});

describe("input element with button children", () => {
  test("button element renders", () => {
    const onClearValue = jest.fn();
    render(<Input onClearValue={onClearValue} readOnly value="test value" />);
    const button = screen.getByTestId("input-button");
    expect(button).toBeInTheDocument();
  });

  test("calls onClearValue method when clicked on button", () => {
    const onClearValue = jest.fn();
    render(<Input onClearValue={onClearValue} readOnly value="test value" />);
    const button = screen.getByTestId("input-button");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClearValue).toHaveBeenCalledTimes(1);
  });
});
