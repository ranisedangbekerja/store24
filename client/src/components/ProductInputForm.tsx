"use client";

import * as React from "react";
import SuccessModal from "./SuccessModal"; // pastikan path sudah benar

type ProductInputFormProps = {
  onClose?: () => void;
  onSubmit?: (newProduct: { name: string; quantity: number }) => void;
  successDuration?: number; // durasi tampil modal sukses dalam ms, optional
};

export const ProductInputForm: React.FC<ProductInputFormProps> = ({
  onClose,
  onSubmit,
  successDuration = 2000, // default 10 detik
}) => {
  const [productName, setProductName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [quantityError, setQuantityError] = React.useState<string | null>(null);
  const [nameError, setNameError] = React.useState<string | null>(null);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const handleDiscard = () => {
    setProductName("");
    setQuantity("");
    setQuantityError(null);
    setNameError(null);
    if (onClose) onClose();
  };

  const handleAdd = () => {
    const parsedQuantity = Number(quantity);
    let hasError = false;

    // Validate product name
    if (productName.trim().length === 0) {
      setNameError("Product name is required.");
      hasError = true;
    } else if (productName.length > 100) {
      setNameError("Product name cannot exceed 100 characters.");
      hasError = true;
    } else {
      setNameError(null);
    }

    // Validate quantity
    if (quantity.trim() === "") {
      setQuantityError("This field is required and must be greater than 0.");
      hasError = true;
    } else if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setQuantityError("This field must be greater than 0.");
      hasError = true;
    } else {
      setQuantityError(null);
    }

    if (hasError) return;

    const newProduct = {
      name: productName.toLowerCase(),
      quantity: parsedQuantity,
    };

    if (onSubmit) onSubmit(newProduct);

    // Show success modal
    setShowSuccess(true);

    // Clear form input but keep UI active
    setProductName("");
    setQuantity("");

    // Hide modal after successDuration milliseconds
    setTimeout(() => {
      setShowSuccess(false);
    }, successDuration);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    setQuantityError(null);
  };

  return (
    <div className="relative bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
      <h1 className="mb-6 text-xl font-medium text-zinc-700">New Product</h1>

      {showSuccess && (
        <div className="absolute top-4 right-4 z-50">
          <SuccessModal message="Product successfully added!" />
        </div>
      )}

      <form className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Product Name</label>
          {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
          <input
            type="text"
            className={`px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700 placeholder-gray-400 ${
              nameError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Quantity</label>
          {quantityError && <span className="text-red-500 text-sm">{quantityError}</span>}
          <input
            type="number"
            className={`px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700 placeholder-gray-400 ${
              quantityError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter product quantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-4 py-2 text-gray-700 border rounded"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleAdd}
            className="px-4 py-2 text-white bg-blue-600 rounded"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductInputForm;
