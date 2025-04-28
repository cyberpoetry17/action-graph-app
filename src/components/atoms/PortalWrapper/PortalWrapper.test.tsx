import { render } from "@testing-library/react";
import PortalWrapper from "./index.tsx";

jest.mock("react-dom", () => ({
  ...jest.requireActual("react-dom"),
  createPortal: jest.fn((children) => {
    return children;
  }),
}));

test("renders children inside root element", () => {
  document.body.innerHTML = '<div id="portal"></div>';

  const { container } = render(
    <PortalWrapper rootId="portal">
      <div>Test element</div>
    </PortalWrapper>
  );

  expect(container.querySelector("div")).toHaveTextContent("Test element");
});

test("does not render if root element not found", () => {
  document.body.innerHTML = "";

  const { container } = render(
    <PortalWrapper rootId="portal">
      <div>Test Element</div>
    </PortalWrapper>
  );
  expect(container).toBeEmptyDOMElement();
});
