import { useState } from "react";
import { Form } from "../../../types/graph";
import ChartForm from "../../molecules/Form";
import Chart from "../../molecules/Chart";
import type { Node, Edge } from "@xyflow/react";
import { MAX_ZOOM, MIN_ZOOM } from "../../../constants";

type ChartOverviewProps = {
  nodes: Node[];
  edges: Edge[];
  forms?: Form[];
};

const ChartOverview = ({ nodes, edges, forms }: ChartOverviewProps) => {
  return <></>;
  //   const [selectedForm, setSelectedForm] = useState<Form>();

  //   const handleNodeClick = (id: string) => {
  //     const node = nodes.find((node) => node.id === id);
  //     setSelectedForm(forms?.find((form) => form.id === node?.data.));
  //   };

  //   console.log(selectedForm, "this form is selected");
  //   return (
  //     <>
  //       {selectedForm?.field_schema.properties && (
  //         <ChartForm properties={selectedForm.field_schema.properties} />
  //       )}
  //       {nodes && edges && (
  //         <Chart
  //           initialNodes={nodes}
  //           initialEdges={edges}
  //           maxZoom={MAX_ZOOM}
  //           minZoom={MIN_ZOOM}
  //           background={{ id: "active-graph-chart" }}
  //           handleNodeClick={handleNodeClick}
  //         />
  //       )}
  //     </>
  //   );
};

export default ChartOverview;
