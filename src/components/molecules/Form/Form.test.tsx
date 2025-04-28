import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChartForm from "./index";
const defaultForm = {
  nodeId: "testId",
  nodeName: "testName",
  prerequisites: undefined,
  formProperties: [
    { name: "testProp1" },
    { name: "testProp2" },
    { name: "testProp3" },
    { name: "testProp4" },
    { name: "testProp5" },
    {
      name: "testProp6",
      prefill: {
        prefillValue: "prefill-test",
        prefillSourceName: "test",
        prefillSourceId: "test",
      },
    },
  ],
};

test("renders form", () => {
  render(<ChartForm form={defaultForm} />);
  const form = screen.getByTestId("form");
  expect(form).toBeInTheDocument();
});

test("renders label in form", () => {
  render(<ChartForm form={defaultForm} />);
  const form = screen.getByTestId("form");
  expect(form).toBeInTheDocument();

  const label = screen.getByTestId("form-label");
  expect(label).toBeInTheDocument();
});

test("renders 6 inputs for 6 form properties ", () => {
  render(<ChartForm form={defaultForm} />);
  const form = screen.getByTestId("form");
  expect(form).toBeInTheDocument();

  const inputs = screen.getAllByRole("textbox");
  expect(inputs).toHaveLength(6);
});

test("calls onClick method for input", () => {
  const onClick = jest.fn();
  render(<ChartForm form={defaultForm} handleClick={onClick} />);
  const form = screen.getByTestId("form");
  expect(form).toBeInTheDocument();

  const input = screen.getByTestId("input-testProp2");
  expect(input).toBeInTheDocument();

  fireEvent.click(input);
  expect(onClick).toHaveBeenCalledTimes(1);
});

test("calls onClearValue method on button element in input field", () => {
  const onClearValue = jest.fn();
  render(
    <ChartForm form={defaultForm} handleClearPrefillValue={onClearValue} />
  );
  const form = screen.getByTestId("form");
  expect(form).toBeInTheDocument();

  const input = screen.getByTestId("input-testProp6");
  expect(input).toBeInTheDocument();

  const button = screen.getByRole("button");
  expect(button).toBeInTheDocument();

  fireEvent.click(button);
  expect(onClearValue).toHaveBeenCalledTimes(1);
});
