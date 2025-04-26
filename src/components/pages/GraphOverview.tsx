import { useEffect, useMemo, useState } from "react";
import {
  BASE_API,
  BLUEPRINT_ID,
  MAX_ZOOM,
  MIN_ZOOM,
  TENANT_ID,
} from "../../constants";
import { ActionGraph } from "../../types/graph";
import ChartForm from "../molecules/Chart/Form";
import Chart from "../molecules/Chart";
import { MappedForm } from "../../types/form";

const GraphOverview = () => {
  const [actionGraph, setActionGraph] = useState<ActionGraph>();

  const fetchGraph = async () => {
    try {
      const response = await fetch(
        `${BASE_API}/api/v1/${TENANT_ID}/actions/blueprints/${BLUEPRINT_ID}/graph`
      );
      const data = await response.json();
      setActionGraph(data);
    } catch (error) {
      console.error(`Error while trying to fetch graph: ${error}`);
    }
  };

  useEffect(() => {
    fetchGraph();
  }, []);

  const mappedNodes = useMemo(() => {
    return (
      actionGraph?.nodes?.map((node) => ({
        id: node.id,
        data: { label: node.data.name },
        position: node.position,
      })) ?? []
    );
  }, [actionGraph?.nodes]);

  const mappedEdges = useMemo(() => {
    return (
      actionGraph?.edges?.map((edge) => ({
        id: `e${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: "default",
      })) ?? []
    );
  }, [actionGraph?.edges]);

  const mappedForms: MappedForm[] | undefined = actionGraph?.forms?.map(
    ({ name, id, field_schema }) => ({
      name,
      id,
      properties: Object.keys(field_schema.properties).map((key) => ({
        name: key,
        prefillValue: undefined,
      })),
    })
  );

  const [selectedForm, setSelectedForm] = useState<MappedForm>();

  const handleNodeClick = (id: string) => {
    const node = actionGraph?.nodes?.find((node) => node.id === id);
    setSelectedForm(
      mappedForms?.find((form) => form.id === node?.data.component_id)
    );
  };

  return (
    <>
      {selectedForm && <ChartForm form={selectedForm} />}
      {mappedNodes && mappedEdges && (
        <Chart
          nodes={mappedNodes}
          edges={mappedEdges}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          background={{ id: "active-graph-chart" }}
          handleNodeClick={handleNodeClick}
        />
      )}
    </>
  );
};

export default GraphOverview;
