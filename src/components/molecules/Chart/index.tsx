import { ReactFlow } from "@xyflow/react";
import Background, { BackgroundProps } from "./Background";
import type { Node, Edge, NodeMouseHandler } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

type ChartProps = {
  nodes: Node[];
  edges: Edge[];
  minZoom?: number;
  maxZoom?: number;
  fitView?: boolean;
  background?: BackgroundProps;
  children?: React.ReactNode;
  handleNodeClick: (node: string) => void;
};

const Chart = ({
  nodes,
  edges,
  minZoom,
  maxZoom,
  fitView,
  background,
  handleNodeClick,
  children,
}: ChartProps) => {
  const onNodeClick: NodeMouseHandler<Node> = (_, node) =>
    handleNodeClick(node.id);

  return (
    <div
      data-testid="chart-container"
      style={{ width: "100%", height: "100%" }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        maxZoom={maxZoom}
        minZoom={minZoom}
        fitView={fitView}
        onNodeClick={onNodeClick}
      >
        {children}
        {background && (
          <Background
            variant={background.variant}
            color={background.color}
            gap={background.gap}
            id={background.id}
            size={background.size}
          />
        )}
      </ReactFlow>
    </div>
  );
};

export default Chart;
