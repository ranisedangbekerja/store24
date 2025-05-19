// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import { ProductInputForm } from "./ProductInputForm";

// describe("ProductInputForm", () => {
//   test("renders input fields and buttons", () => {
//     render(<ProductInputForm />);
//     expect(screen.getByPlaceholderText(/enter product name/i)).toBeInTheDocument();
//     expect(screen.getByPlaceholderText(/enter product quantity/i)).toBeInTheDocument();
//     expect(screen.getByText(/discard/i)).toBeInTheDocument();
//     expect(screen.getByText(/add product/i)).toBeInTheDocument();
//   });

//   test("shows error when quantity is invalid", () => {
//     render(<ProductInputForm />);
//     fireEvent.change(screen.getByPlaceholderText(/enter product quantity/i), {
//       target: { value: "0" },
//     });
//     fireEvent.click(screen.getByText(/add product/i));
//     expect(screen.getByText(/quantity must be greater than 0/i)).toBeInTheDocument();
//   });

//   test("shows error when product name is empty", () => {
//     render(<ProductInputForm />);
//     fireEvent.change(screen.getByPlaceholderText(/enter product quantity/i), {
//       target: { value: "5" },
//     });
//     fireEvent.click(screen.getByText(/add product/i));
//     expect(screen.getByText(/product name is required/i)).toBeInTheDocument();
//   });

//   test("shows error when product name exceeds 100 characters", () => {
//     render(<ProductInputForm />);
//     const longName = "x".repeat(101);
//     fireEvent.change(screen.getByPlaceholderText(/enter product name/i), {
//       target: { value: longName },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/enter product quantity/i), {
//       target: { value: "10" },
//     });
//     fireEvent.click(screen.getByText(/add product/i));
//     expect(screen.getByText(/product name cannot exceed 100 characters/i)).toBeInTheDocument();
//   });

//   test("calls onSubmit with valid inputs and resets form", () => {
//     const onSubmitMock = jest.fn();
//     const onCloseMock = jest.fn();

//     render(<ProductInputForm onSubmit={onSubmitMock} onClose={onCloseMock} />);

//     fireEvent.change(screen.getByPlaceholderText(/enter product name/i), {
//       target: { value: "Test Product" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/enter product quantity/i), {
//       target: { value: "10" },
//     });

//     fireEvent.click(screen.getByText(/add product/i));

//     expect(onSubmitMock).toHaveBeenCalledWith({ name: "test product", quantity: 10 });

//     // Check reset
//     expect(screen.getByPlaceholderText(/enter product name/i)).toHaveValue("");
//     expect(screen.getByPlaceholderText(/enter product quantity/i)).toHaveValue(null);

//     expect(onCloseMock).toHaveBeenCalled();
//   });
//   test("clears error after correcting inputs and resubmitting", () => {
//   render(<ProductInputForm />);
  
//   // Trigger error first
//   fireEvent.change(screen.getByPlaceholderText(/enter product quantity/i), {
//     target: { value: "0" },
//   });
//   fireEvent.click(screen.getByText(/add product/i));
//   expect(screen.getByText(/quantity must be greater than 0/i)).toBeInTheDocument();

//   // Correct the error
//   fireEvent.change(screen.getByPlaceholderText(/enter product name/i), {
//     target: { value: "Correct Name" },
//   });
//   fireEvent.change(screen.getByPlaceholderText(/enter product quantity/i), {
//     target: { value: "5" },
//   });

//   fireEvent.click(screen.getByText(/add product/i));
  
//   // Error should disappear
//   expect(screen.queryByText(/quantity must be greater than 0/i)).not.toBeInTheDocument();
// });

//   test("discard button clears inputs and errors and calls onClose", () => {
//     const onCloseMock = jest.fn();
//     render(<ProductInputForm onClose={onCloseMock} />);

//     fireEvent.change(screen.getByPlaceholderText(/enter product name/i), {
//       target: { value: "Test" },
//     });
//     fireEvent.change(screen.getByPlaceholderText(/enter product quantity/i), {
//       target: { value: "5" },
//     });

//     fireEvent.click(screen.getByText(/discard/i));

//     expect(screen.getByPlaceholderText(/enter product name/i)).toHaveValue("");
//     expect(screen.getByPlaceholderText(/enter product quantity/i)).toHaveValue(null);
//     expect(onCloseMock).toHaveBeenCalled();
//   });
// });
