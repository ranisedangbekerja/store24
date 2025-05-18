"use client";

import * as React from "react";

//  ✅ Tipe props baru: quantity sekarang number
type ProductInputFormProps = {
  onClose?: () => void;
  onSubmit?: (newProduct: { name: string; quantity: number; date: string }) => void;
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
    const parsedQuantity = Number(quantity);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setQuantityError("Quantity must be greater than 0.");
      return;
    } else {
      setQuantityError(null);
    }

    if (productName.length === 0) {
      setNameError("Product name is required.");
      return;
    } else if (productName.length > 100) {
      setNameError("Product name cannot exceed 100 characters.");
      return;
    } else {
      setNameError(null);
    }

    const newProduct = {
      name: productName,
      quantity: parsedQuantity, // ✅ kirim sebagai number
      date: uploadDate,
    };

    if (onSubmit) onSubmit(newProduct);
    handleDiscard();
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(e.target.value);
    setQuantityError(null); // reset error saat input valid
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
            onChange={handleQuantityChange}
            min="1"
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
