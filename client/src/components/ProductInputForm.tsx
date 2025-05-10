"use client";

import * as React from "react";

//  tipe props untuk menerima onClose dan onSubmit
type ProductInputFormProps = {
  onClose?: () => void;
  onSubmit?: (newProduct: { name: string; quantity: string; date: string }) => void;
};

export const ProductInputForm: React.FC<ProductInputFormProps> = ({ onClose, onSubmit }) => {
  const [productName, setProductName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [uploadDate, setUploadDate] = React.useState("");
  const [quantityError, setQuantityError] = React.useState<string | null>(null);
  const [nameError, setNameError] = React.useState<string | null>(null);

  const handleDiscard = () => {
    setProductName("");
    setQuantity("");
    setUploadDate("");
    setQuantityError(null);
    setNameError(null);
    if (onClose) onClose();
  };

  const handleAdd = () => {
    // Validate quantity and name
    if (parseFloat(quantity) <= 0) {
      setQuantityError("Quantity cannot be less than 0.");
      return;
    } else {
      setQuantityError(null);
    }

    if (productName.length > 100) {
      setNameError("Product name cannot exceed 100 characters.");
      return;
    } else {
      setNameError(null);
    }

    const newProduct = {
      name: productName,
      quantity,
      date: uploadDate,
    };

    if (onSubmit) onSubmit(newProduct); // panggil callback dari parent
    handleDiscard(); // reset & tutup
  };

  // Handle quantity input change and ensure it's not less than 0
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Ensure the value is either a positive number or zero
    if (!isNaN(parseFloat(value)) && parseFloat(value) >= 0) {
      setQuantity(value);
      setQuantityError(null); // Clear any existing error when input is valid
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
      <h1 className="mb-6 text-xl font-medium text-zinc-700">New Product</h1>
      <form className="flex flex-col gap-6">
        <div className="flex items-start gap-4">
          <label className="w-32 text-sm font-medium text-gray-700 mt-2">Product Name</label>
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700 placeholder-gray-400"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          {nameError && <span className="text-red-500 text-sm">{nameError}</span>}
        </div>

        <div className="flex items-start gap-4">
          <label className="w-32 text-sm font-medium text-gray-700 mt-2">Quantity</label>
          <input
            type="number"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700 placeholder-gray-400"
            placeholder="Enter product quantity"
            value={quantity}
            onChange={handleQuantityChange} // Use the new handler
          />
          {quantityError && <span className="text-red-500 text-sm">{quantityError}</span>}
        </div>

        <div className="flex items-start gap-4">
          <label className="w-32 text-sm font-medium text-gray-700 mt-2">Upload Date</label>
          <input
            type="date"
            className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring text-gray-700 placeholder-gray-400"
            value={uploadDate}
            onChange={(e) => setUploadDate(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button type="button" onClick={handleDiscard} className="px-4 py-2 text-gray-700 border rounded">
            Discard
          </button>
          <button type="button" onClick={handleAdd} className="px-4 py-2 text-white bg-blue-600 rounded">
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductInputForm;
