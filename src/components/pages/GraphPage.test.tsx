import { render, screen } from "@testing-library/react";
import GraphPage from "./GraphPage";
import { FormProvider } from "../../store";

test("renders the page with all components", () => {
  render(
    <FormProvider>
      <GraphPage />
    </FormProvider>
  );

  expect(screen.getByTestId("chart-container")).toBeInTheDocument();
  expect(screen.queryByTestId("modal")).toBeNull();
  expect(screen.queryByTestId("form")).toBeNull();
});
