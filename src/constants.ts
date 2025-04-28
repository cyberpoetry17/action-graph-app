import { Section, SectionVariant } from "./types/modal";

//api
export const BASE_API = "http://localhost:3000";
export const TENANT_ID = 1;
export const BLUEPRINT_ID = 1;

//chart
export const MAX_ZOOM = 10;
export const MIN_ZOOM = 0.5;
export const BACKGROUND_COLOR_DEFAULT = "#e0e0e0";
export const BACKGROUND_LINES_GAP_DEFAULT = 20;
export const BACKGROUND_SIZE_DEFAULT = 1;

//modal
export const MODAL_MENU_TITLE = "Available data";
export const MDOAL_BUTTON_CANCEL = "Cancel";
export const MODAL_BUTTON_SELECT = "Select";
export const MODAL_HEADER = "Select data element to map";

export const ActionProperties: Section = {
  id: "action-properties",
  type: SectionVariant.Global,
  name: "Action Properties",
  values: ["name", "email", "dynamic object", "id"],
};

export const ClientOrganisationProperties: Section = {
  id: "client-organisation-properties",
  type: SectionVariant.Global,
  name: "Client Organisation Properties",
  values: ["name", "email", "dynamic object", "id"],
};
