import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FormOverview from ".";
import { FormProvider } from "../../../store";

describe("rendering of elements", () => {
  test("not rendering form when page loads", () => {
    render(
      <FormProvider>
        <FormOverview />
      </FormProvider>
    );

    const form = screen.queryByTestId("form");
    expect(form).toBeNull();
  });

  test("not rendering modal when page loads", () => {
    render(
      <FormProvider>
        <FormOverview />
      </FormProvider>
    );

    const modal = screen.queryByTestId("modal");
    expect(modal).toBeNull();
  });
});
