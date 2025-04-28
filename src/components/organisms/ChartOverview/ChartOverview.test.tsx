import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChartOverview from ".";
import { Edge } from "../../../types/graph";
import { FormProvider } from "../../../store";

const defaultNodes = [
  {
    id: "node1",
    type: "form",
    position: {
      x: 1093.4015147514929,
      y: 155.2205909169969,
    },
    data: {
      id: "form1",
      component_key: "form1",
      component_type: "form1",
      component_id: "form1",
      name: "Test form 1",
      prerequisites: ["form2"],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: {
        number: 0,
        unit: "minutes",
      },
      approval_required: false,
      approval_roles: [],
    },
  },
  {
    id: "node2",
    type: "form",
    position: {
      x: 1093.4015147514929,
      y: 155.2205909169969,
    },
    data: {
      id: "form2",
      component_key: "form2",
      component_type: "form2",
      component_id: "form2",
      name: "Test form 2",
      prerequisites: [],
      permitted_roles: [],
      input_mapping: {},
      sla_duration: {
        number: 0,
        unit: "minutes",
      },
      approval_required: false,
      approval_roles: [],
    },
  },
];

const defaultEdges: Edge[] = [];

describe("rendering of elements", () => {
  it("renders successfully", () => {
    render(
      <FormProvider>
        <ChartOverview nodes={defaultNodes} edges={defaultEdges} />
      </FormProvider>
    );

    const chart = screen.getByTestId("chart-container");
    expect(chart).toBeInTheDocument();
  });

  it("renders successfully without nodes and edges", () => {
    render(
      <FormProvider>
        <ChartOverview />
      </FormProvider>
    );

    const chart = screen.getByTestId("chart-container");
    expect(chart).toBeInTheDocument();
  });
});
