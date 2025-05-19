import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActionButton } from "./ActionButton"; // sesuaikan path jika perlu

describe("ActionButton", () => {
  test("renders with default variant (secondary)", () => {
    render(<ActionButton>Default Button</ActionButton>);
    const button = screen.getByRole("button", { name: "Default Button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("text-gray-500");
    expect(button).toHaveClass("border-gray-300");
  });

  test("renders with primary variant", () => {
    render(<ActionButton variant="primary">Primary Button</ActionButton>);
    const button = screen.getByRole("button", { name: "Primary Button" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-blue-600");
    expect(button).toHaveClass("text-white");
  });

  test("calls onClick when clicked", () => {
    const handleClick = jest.fn();
    render(<ActionButton onClick={handleClick}>Clickable</ActionButton>);
    const button = screen.getByRole("button", { name: "Clickable" });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("has base class styles applied", () => {
    render(<ActionButton>Styled Button</ActionButton>);
    const button = screen.getByRole("button", { name: "Styled Button" });
    expect(button.className).toMatch(/px-4/);
    expect(button.className).toMatch(/py-2\.5/);
    expect(button.className).toMatch(/text-sm/);
    expect(button.className).toMatch(/font-medium/);
    expect(button.className).toMatch(/rounded/);
  });

  test("renders children correctly", () => {
    render(<ActionButton>Inner Text</ActionButton>);
    expect(screen.getByText("Inner Text")).toBeInTheDocument();
  });
});
