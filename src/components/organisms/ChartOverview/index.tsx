import { useCallback, useMemo } from "react";
import { MAX_ZOOM, MIN_ZOOM } from "../../../constants";
import Chart from "../../molecules/Chart";
import { useForms } from "../../../store/hooks/useForms";
import { Node, Edge } from "../../../types/graph";

type ChartOverviewProps = {
  nodes?: Node[];
  edges?: Edge[];
};

const ChartOverview = ({ nodes, edges }: ChartOverviewProps) => {
  const { enrichedForms, setSelectedFormId } = useForms();

  const mappedNodes = useMemo(() => {
    return (
      nodes?.map((node) => ({
        id: node.id,
        data: { label: node.data.name },
        position: node.position,
      })) ?? []
    );
  }, [nodes]);

  const mappedEdges = useMemo(() => {
    return (
      edges?.map((edge) => ({
        id: `e${edge.source}-${edge.target}`,
        source: edge.source,
        target: edge.target,
        type: "default",
      })) ?? []
    );
  }, [edges]);

  const handleNodeClick = useCallback(
    (id: string) =>
      setSelectedFormId(
        enrichedForms?.find((form) => form.nodeId === id)?.nodeId
      ),
    [enrichedForms, setSelectedFormId]
  );

  return (
    <>
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

export default ChartOverview;
