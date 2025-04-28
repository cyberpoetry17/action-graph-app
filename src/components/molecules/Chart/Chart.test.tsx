/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from "@testing-library/react";
import ChartForm from "./index";
import type { Node, Edge } from "@xyflow/react";

jest.mock("@xyflow/react", () => ({
  __esModule: true,
  ReactFlow: ({
    nodes,
    children,
  }: {
    nodes: any;
    children: React.ReactNode;
  }) => (
    <div data-testid="reactflow-mock">
      {nodes.map((node: any) => (
        <div key={node.id} onClick={() => node.onClick?.()}>
          {node.data.label}
        </div>
      ))}
      {children}
    </div>
  ),
}));
const defaultNodes: Node[] = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "Node1" },
    type: "default",
  },
];

const defaultEdges: Edge[] = [];

test("renders chart", () => {
  const handleNodeClick = jest.fn();
  render(
    <ChartForm
      nodes={defaultNodes}
      edges={defaultEdges}
      handleNodeClick={handleNodeClick}
    />
  );

  expect(screen.getByTestId("chart-container")).toBeInTheDocument();
});

test("renders children if passed", () => {
  const handleNodeClick = jest.fn();
  render(
    <ChartForm
      nodes={defaultNodes}
      edges={defaultEdges}
      handleNodeClick={handleNodeClick}
    >
      <div>Children</div>
    </ChartForm>
  );

  expect(screen.getByText("Children")).toBeInTheDocument();
});
