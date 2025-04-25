import { useEffect, useState } from "react";
import "./App.css";
import Chart from "./components/molecules/Chart";
import { ActionGraph } from "./types/graph";
import { BASE_API, BLUEPRINT_ID, TENANT_ID } from "./constants";
import Input from "./components/atoms/Input";

const App = () => {
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

  const nodes = actionGraph?.nodes?.map((node) => ({
    id: node.id,
    data: { label: node.data.name },
    position: node.position,
  }));

  const edges = actionGraph?.edges?.map((edge) => ({
    id: "e" + edge.source + "-" + edge.target,
    source: edge.source,
    target: edge.target,
  }));

  return (
    <div className="grid-container">
      <div className="grid-item-chart">
        {nodes && edges && (
          <Chart nodes={nodes} edges={edges} maxZoom={10} minZoom={0.5} />
        )}
      </div>
    </div>
  );
};

export default App;
