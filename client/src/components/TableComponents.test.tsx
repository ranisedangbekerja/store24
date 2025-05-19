import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  TableHeader,
  TableRow,
  SortButton,
} from "./TableComponents";

describe("TableHeader", () => {
  it("renders headers correctly", () => {
    render(<TableHeader />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
  });
});

describe("TableRow", () => {
  it("renders row data correctly", () => {
    render(
      <TableRow
        name="Test Product"
        quantity={10}
        date="2024-01-01"
      />
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
    expect(screen.getByText("2024-01-01")).toBeInTheDocument();
  });
});

describe("SortButton", () => {
  const setup = (activeSort = null as any, onSortChange = jest.fn()) => {
    render(<SortButton activeSort={activeSort} onSortChange={onSortChange} />);
    return { onSortChange };
  };

  it("renders sort button with label", () => {
    setup();
    expect(screen.getByText("Sort By")).toBeInTheDocument();
  });

  it("shows dropdown on hover", async () => {
    setup();
    const dropdownItems = [
      "Date (old to new)",
      "Quantity (high to low)",
      "Quantity (low to high)",
    ];

    // Simulate hover (in jsdom we trigger click to simulate)
    fireEvent.mouseOver(screen.getByText("Sort By"));

    for (const item of dropdownItems) {
      expect(screen.getByText(item)).toBeInTheDocument();
    }
  });

  it("calls onSortChange with selected option", () => {
    const { onSortChange } = setup(null);

    fireEvent.mouseOver(screen.getByText("Sort By"));
    fireEvent.click(screen.getByText("Quantity (high to low)"));

    expect(onSortChange).toHaveBeenCalledWith("qty-high");
  });

  it("toggles active sort off if clicked again", () => {
    const { onSortChange } = setup("qty-high");

    fireEvent.mouseOver(screen.getByText("Sort By"));
    fireEvent.click(screen.getByText("Quantity (high to low)"));

    expect(onSortChange).toHaveBeenCalledWith(null);
  });
});
