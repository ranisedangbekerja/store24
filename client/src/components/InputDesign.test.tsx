import { render, screen } from "@testing-library/react";
import InputDesign from "./InputDesign";

describe("InputDesign", () => {
  it("renders the main sections", () => {
    render(<InputDesign />);

    // Check for main sections
    expect(
      screen.getByPlaceholderText("Search product, supplier, order"),
    ).toBeInTheDocument();
    expect(screen.getByText("Overall Inventory")).toBeInTheDocument();
    expect(screen.getByText("Products")).toBeInTheDocument();
  });

  it("displays the correct total products count", () => {
    render(<InputDesign />);
    expect(screen.getByText("21,190")).toBeInTheDocument();
    expect(screen.getByText("Total Products")).toBeInTheDocument();
  });

  it("renders the product table with correct headers", () => {
    render(<InputDesign />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });

  it("renders action buttons", () => {
    render(<InputDesign />);
    expect(screen.getByText("Add Product")).toBeInTheDocument();
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Download all")).toBeInTheDocument();
  });

  it("renders pagination controls", () => {
    render(<InputDesign />);
    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
    expect(screen.getByText("Page 1 of 10")).toBeInTheDocument();
  });
});
