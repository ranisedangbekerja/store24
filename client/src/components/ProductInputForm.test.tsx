import { render, screen, fireEvent } from "@testing-library/react";
import { ProductInputForm } from "./ProductInputForm";

describe("ProductInputForm", () => {
  it("renders all form elements", () => {
    render(<ProductInputForm />);

    expect(screen.getByText("New Product")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter product name"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter product quantity"),
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter expiry date"),
    ).toBeInTheDocument();
    expect(screen.getByText("Discard")).toBeInTheDocument();
    expect(screen.getByText("Add Product")).toBeInTheDocument();
  });

  it("handles input changes", () => {
    render(<ProductInputForm />);

    const nameInput = screen.getByPlaceholderText("Enter product name");
    fireEvent.change(nameInput, { target: { value: "Test Product" } });
    expect(nameInput).toHaveValue("Test Product");
  });

  it("clears form on discard", () => {
    render(<ProductInputForm />);

    const nameInput = screen.getByPlaceholderText("Enter product name");
    const quantityInput = screen.getByPlaceholderText("Enter product quantity");
    const dateInput = screen.getByPlaceholderText("Enter expiry date");

    fireEvent.change(nameInput, { target: { value: "Test Product" } });
    fireEvent.change(quantityInput, { target: { value: "10" } });
    fireEvent.change(dateInput, { target: { value: "2024-01-01" } });

    fireEvent.click(screen.getByText("Discard"));

    expect(nameInput).toHaveValue("");
    expect(quantityInput).toHaveValue("");
    expect(dateInput).toHaveValue("");
  });
});
