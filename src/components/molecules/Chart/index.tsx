import "@xyflow/react/dist/style.css";
import { ReactFlow } from "@xyflow/react";
import type { Node, Edge } from "@xyflow/react";

type ChartProps = {
  nodes: Node[];
  edges: Edge[];
  minZoom?: number;
  maxZoom?: number;
};

const Chart = ({ nodes, edges, minZoom, maxZoom }: ChartProps) => {
  return (
    <ReactFlow nodes={nodes} edges={edges} maxZoom={maxZoom} minZoom={minZoom}>
      {/* to extract this into another component - pass as child? */}
      <label>testing label</label>
    </ReactFlow>
  );
};

export default Chart;
