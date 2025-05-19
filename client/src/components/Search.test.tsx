import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

describe("SearchBar", () => {
  it("renders input with correct placeholder", () => {
    render(<SearchBar onSearch={() => {}} />);
    expect(screen.getByPlaceholderText("Search product, supplier, order")).toBeInTheDocument();
  });

  it("calls onSearch callback with input value on change", () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText("Search product, supplier, order");
    fireEvent.change(input, { target: { value: "apple" } });

    expect(onSearchMock).toHaveBeenCalledWith("apple");
  });

  it("calls onSearch on multiple input changes", () => {
    const onSearchMock = jest.fn();
    render(<SearchBar onSearch={onSearchMock} />);

    const input = screen.getByPlaceholderText("Search product, supplier, order");

    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "ap" } });
    fireEvent.change(input, { target: { value: "app" } });

    expect(onSearchMock).toHaveBeenCalledTimes(3);
    expect(onSearchMock).toHaveBeenLastCalledWith("app");
  });
});
