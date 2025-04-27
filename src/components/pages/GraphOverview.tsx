import { useCallback, useEffect, useMemo, useState } from "react";
import {
  BASE_API,
  BLUEPRINT_ID,
  MAX_ZOOM,
  MIN_ZOOM,
  TENANT_ID,
} from "../../constants";
import { ActionGraph } from "../../types/graph";
import ChartForm from "../molecules/Form";
import Chart from "../molecules/Chart";
import { MappedNodeForm, Prefill } from "../../types/form";
import Modal from "../molecules/Modal";
import {
  createSections,
  EnrichedFormsUpdateProps,
  getParents,
  getUpdatedEnrichedForms,
} from "../../utils";
import { MappingSection, MappingSectionVariant } from "../../types/modal";

const GraphOverview = () => {
  //API
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

  //MAPPED NODES, EDGES
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
                prefillValue:
                  "Form: Adwdwjkdw dwijdiwjd jdwkdjw djwidjwi fefef fefefef fefefef fefe",
              },
            }))
          : [],
      };
    });
  }, [actionGraph?.forms, actionGraph?.nodes]);

  //ENRICHED FORMS:

  const [enrichedForms, setEnrichedForms] = useState<MappedNodeForm[]>();
  const [selectedFormId, setSelectedFormId] = useState<string>();

  useEffect(() => {
    setEnrichedForms(mappedData);
  }, [mappedData]);

  const selectedForm = useMemo(() => {
    return enrichedForms?.find((form) => form.nodeId === selectedFormId);
  }, [enrichedForms, selectedFormId]);

  const handleNodeClick = useCallback(
    (id: string) =>
      setSelectedFormId(
        enrichedForms?.find((form) => form.nodeId === id)?.nodeId
      ),
    [enrichedForms]
  );

  const updateEnrichedForms = (args: EnrichedFormsUpdateProps) => {
    setEnrichedForms((prev) =>
      getUpdatedEnrichedForms({ ...args, enrichedForms: prev })
    );
  };

  const handleClearPrefillValue = useCallback(
    (name: string) => {
      updateEnrichedForms({
        name: name,
        id: selectedFormId!,
        enrichedForms: enrichedForms,
      });
    },
    [enrichedForms, selectedFormId]
  );

  const handleUpdatePrefillValue = useCallback(
    (name: string, prefill: Prefill) => {
      updateEnrichedForms({
        name,
        id: selectedFormId!,
        enrichedForms: enrichedForms,
        prefill: prefill,
      });
    },
    [enrichedForms, selectedFormId]
  );

  //MODAL

  const [sections, setSections] = useState<MappingSection[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => setIsOpen(false);
  const handleOpenModal = (name: string) => {
    const parents = getParents(selectedForm?.prerequisites, enrichedForms);
    const newSections = [
      ...createSections(parents, MappingSectionVariant.Parent),
    ];
    console.log(newSections);
    setSections(newSections);
    setIsOpen(true);
  };

  //COMPONENTS
  return (
    <>
      <Modal
        isOpen={isOpen}
        handleClose={handleCloseModal}
        sections={sections}
        handlePrefill={handleUpdatePrefillValue}
      />
      {selectedForm && (
        <ChartForm
          form={selectedForm}
          handleClick={handleOpenModal}
          handleClearPrefillValue={handleClearPrefillValue}
        />
      )}
      {mappedNodes && mappedEdges && (
        <Chart
          nodes={mappedNodes}
          edges={mappedEdges}
          maxZoom={MAX_ZOOM}
          minZoom={MIN_ZOOM}
          background={{ id: "active-graph-chart" }}
          handleNodeClick={handleNodeClick}
        ></Chart>
      )}
    </>
  );
};

export default GraphOverview;
