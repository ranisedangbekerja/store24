import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";

describe("SideBar", () => {
  it("renders the store name", () => {
    render(<SideBar />);
    expect(screen.getByText("STORE 24")).toBeInTheDocument();
  });

  it("renders the inventory menu item", () => {
    render(<SideBar />);
    expect(screen.getByText("Inventory")).toBeInTheDocument();
  });

  it("renders the logout button", () => {
    render(<SideBar />);
    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  it("renders all required images", () => {
    render(<SideBar />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3); // Logo, Inventory icon, and Logout icon
  });
});
