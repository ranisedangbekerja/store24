import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { ProductsTable } from "./ProductsTable";
import axios from "axios";
import { io } from "socket.io-client";
import '@testing-library/jest-dom';

// Mock axios and socket.io
jest.mock("axios");
jest.mock("socket.io-client", () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

const mockData = [
  {
    name: "Apple",
    quantity: 10,
    date: "2024-01-01",
    dateTime: "2024-01-01T10:00:00Z",
  },
  {
    name: "Banana",
    quantity: 5,
    date: "2024-01-02",
    dateTime: "2024-01-02T11:00:00Z",
  },
];

describe("ProductsTable", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        data: mockData,
      },
    });
  });

  it("renders loading state initially", async () => {
    render(<ProductsTable searchQuery="" />);
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    await waitFor(() => screen.getByText(/products/i));
  });

  it("renders products from API", async () => {
    render(<ProductsTable searchQuery="" />);
    expect(await screen.findByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();
  });

  it("filters products by searchQuery", async () => {
    render(<ProductsTable searchQuery="banana" />);
    await waitFor(() => {
      expect(screen.queryByText("Apple")).not.toBeInTheDocument();
      expect(screen.getByText("Banana")).toBeInTheDocument();
    });
  });

  it("handles API error gracefully", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));
    render(<ProductsTable searchQuery="" />);
    expect(await screen.findByText(/failed to load products/i)).toBeInTheDocument();
  });
});
