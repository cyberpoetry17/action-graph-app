import "@xyflow/react/dist/style.css";
import { ReactFlow } from "@xyflow/react";
import type { Node, Edge, NodeMouseHandler } from "@xyflow/react";
import Background, { BackgroundProps } from "./Background";

type ChartProps = {
  nodes: Node[];
  edges: Edge[];
  minZoom?: number;
  maxZoom?: number;
  fitView?: boolean;
  background?: BackgroundProps;
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
}: ChartProps) => {
  const onNodeClick: NodeMouseHandler<Node> = (_, node) =>
    handleNodeClick(node.id);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      maxZoom={maxZoom}
      minZoom={minZoom}
      fitView={fitView}
      onNodeClick={onNodeClick}
    >
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
  );
};

export default Chart;
