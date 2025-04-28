import { useEffect, useMemo, useState } from "react";
import { BASE_API, BLUEPRINT_ID, TENANT_ID } from "../../constants";
import { ActionGraph } from "../../types/graph";
import { MappedNodeForm } from "../../types/form";
import { useForms } from "../../store/hooks/useForms";
import FormOverview from "../organisms/FormOverview";
import ChartOverview from "../organisms/ChartOverview";

const GraphOverview = () => {
  const [actionGraph, setActionGraph] = useState<ActionGraph>();
  const { setEnrichedForms } = useForms();

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

  const mappedData: MappedNodeForm[] | undefined = useMemo(() => {
    const nodes = actionGraph?.nodes;
    const forms = actionGraph?.forms;

    return nodes?.map(({ id, data }) => {
      const form = forms?.find((form) => form.id === data.component_id);
      const properties = form?.field_schema?.properties;

      return {
        nodeId: id,
        nodeName: data.name,
        prerequisites: data.prerequisites,
        formProperties: properties
          ? Object.keys(properties).map((key) => ({
              name: key,
              prefill: {
                prefillValue: "",
              },
            }))
          : [],
      };
    });
  }, [actionGraph?.forms, actionGraph?.nodes]);

  useEffect(() => {
    setEnrichedForms(mappedData);
  }, [mappedData, setEnrichedForms]);

  return (
    <>
      <FormOverview />
      <ChartOverview nodes={actionGraph?.nodes} edges={actionGraph?.edges} />
    </>
  );
};

export default GraphOverview;
