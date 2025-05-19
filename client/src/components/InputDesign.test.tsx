import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputDesign from "./InputDesign";
import '@testing-library/jest-dom';

// Mock child components so we only test InputDesign logic
jest.mock("../components/SearchBar", () => ({
  SearchBar: ({ onSearch }: { onSearch: (q: string) => void }) => (
    <input
      placeholder="Search..."
      onChange={(e) => onSearch(e.target.value)}
      data-testid="search-bar"
    />
  ),
}));

jest.mock("../components/ProductsTable", () => ({
  ProductsTable: ({ searchQuery }: { searchQuery: string }) => (
    <div data-testid="products-table">{searchQuery}</div>
  ),
}));

jest.mock("../components/InventoryStats", () => ({
  InventoryStats: () => <div data-testid="inventory-stats">Stats</div>,
}));

jest.mock("../components/SideBar", () => ({
  __esModule: true,
  default: () => <aside data-testid="sidebar">Sidebar</aside>,
}));

describe("InputDesign Component", () => {
  it("renders all main sections", () => {
    render(<InputDesign />);
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByTestId("inventory-stats")).toBeInTheDocument();
    expect(screen.getByTestId("products-table")).toBeInTheDocument();
  });

  it("updates searchQuery when typing in search bar", () => {
    render(<InputDesign />);
    const searchInput = screen.getByTestId("search-bar");
    fireEvent.change(searchInput, { target: { value: "apple" } });

    expect(screen.getByTestId("products-table").textContent).toBe("apple");
  });
});
