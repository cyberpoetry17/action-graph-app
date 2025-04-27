import { ReactNode } from "react";
import { createPortal } from "react-dom";

type PortalWrapperProps = {
  children: ReactNode;
  rootId?: string;
};

const PortalWrapper = ({ children, rootId = "portal" }: PortalWrapperProps) => {
  const root = document.getElementById(rootId);
  if (!root) return null;

  return createPortal(children, root);
};

export default PortalWrapper;
