import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
interface ActionButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
}
export const ActionButton: React.FC<ActionButtonProps> = ({
  variant = "secondary",
  children,
  onClick,
}) => {
  const baseStyles = "px-4 py-2.5 text-sm font-medium rounded";
  const variantStyles = {
    primary: "text-white bg-blue-600",
    secondary: "text-gray-500 border border-gray-300",
  };
  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};