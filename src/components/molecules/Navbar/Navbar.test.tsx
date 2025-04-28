import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Navbar from "./index";

jest.mock("../../atoms/HomeIcon", () => () => <div>HomeIcon</div>);

test("renders Navbar with HomeIcon", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  );

  const homeIcon = screen.getByText("HomeIcon");
  expect(homeIcon).toBeInTheDocument();
});
