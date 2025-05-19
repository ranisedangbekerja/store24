import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ProductsTable } from "./ProductsTable";
import axios from "axios";
import { io } from "socket.io-client";
import '@testing-library/jest-dom';

jest.mock("axios");
jest.mock("socket.io-client", () => ({
  io: jest.fn(() => ({
    on: jest.fn(),
    disconnect: jest.fn(),
  })),
}));

const mockData = Array.from({ length: 15 }, (_, i) => ({
  name: `Product ${i + 1}`,
  quantity: i + 1,
  date: `2024-01-${(i + 1).toString().padStart(2, '0')}`,
  dateTime: `2024-01-${(i + 1).toString().padStart(2, '0')}T10:00:00Z`,
}));

describe("ProductsTable - Full Coverage", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: {
        data: mockData,
      },
    });
  });

  it("renders loading and then shows data", async () => {
    render(<ProductsTable searchQuery="" />);
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
    expect(await screen.findByText(/products/i)).toBeInTheDocument();
  });

  it("renders pagination and navigates", async () => {
    render(<ProductsTable searchQuery="" />);
    await screen.findByText("Product 1");

    const nextBtn = screen.getByRole("button", { name: /next/i });
    const prevBtn = screen.getByRole("button", { name: /previous/i });

    expect(nextBtn).toBeInTheDocument();
    fireEvent.click(nextBtn);
    fireEvent.click(prevBtn);
  });

  it("applies sorting options", async () => {
    render(<ProductsTable searchQuery="" />);
    await screen.findByText("Product 1");

    const sortButton = screen.getByRole("button", { name: /sort/i });
    fireEvent.click(sortButton);
    fireEvent.click(screen.getByText(/quantity high/i));
    fireEvent.click(sortButton);
    fireEvent.click(screen.getByText(/quantity low/i));
    fireEvent.click(sortButton);
    fireEvent.click(screen.getByText(/oldest date/i));
  });

  it("filters by search", async () => {
    render(<ProductsTable searchQuery="product 1" />);
    expect(await screen.findByText("Product 1")).toBeInTheDocument();
    expect(screen.queryByText("Product 5")).not.toBeInTheDocument();
  });

  it("handles add product form toggle", async () => {
    render(<ProductsTable searchQuery="" />);
    await screen.findByText("Product 1");

    const addButton = screen.getByRole("button", { name: /add product/i });
    fireEvent.click(addButton);
    expect(screen.getByText(/submit/i)).toBeInTheDocument();
  });

  it("handles API error and retry", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Error"));
    render(<ProductsTable searchQuery="" />);
    expect(await screen.findByText(/failed to load products/i)).toBeInTheDocument();

    const retryBtn = screen.getByText(/retry/i);
    fireEvent.click(retryBtn);
    await screen.findByText(/products/i);
  });

  it("handles invalid socket product", async () => {
    const mockSocket = {
      on: jest.fn((event: string, cb: Function) => {
        if (event === "new-product") {
          cb({}); // Invalid payload
        }
      }),
      disconnect: jest.fn(),
    };
    (io as jest.Mock).mockReturnValueOnce(mockSocket);
    render(<ProductsTable searchQuery="" />);
    await screen.findByText("Product 1");
  });
});
