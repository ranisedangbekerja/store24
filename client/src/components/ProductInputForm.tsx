"use client";

import * as React from "react";
import { FormInput } from "./FormInput";
import { FormButtons } from "./FormButtons";

export const ProductInputForm: React.FC = () => {
  const [productName, setProductName] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [uploadDate, setUploadDate] = React.useState("");

  const handleDiscard = () => {
    setProductName("");
    setQuantity("");
    setUploadDate("");
  };

  const handleAdd = () => {
    // Handle form submission
    console.log({
      productName,
      quantity,
      uploadDate,
    });
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-neutral-100">
      <section className="p-8 bg-white rounded-lg w-[500px] max-sm:w-[95%]">
        <h1 className="mb-6 text-xl font-medium text-zinc-700">New Product</h1>
        <form className="flex flex-col gap-8">
          <FormInput
            label="Product Name"
            placeholder="Enter product name"
            value={productName}
            onChange={setProductName}
          />
          <FormInput
            label="Quantity"
            placeholder="Enter product quantity"
            value={quantity}
            onChange={setQuantity}
          />
          <FormInput
            label="Upload Date"
            placeholder="Enter expiry date"
            value={uploadDate}
            onChange={setUploadDate}
          />
          <FormButtons onDiscard={handleDiscard} onAdd={handleAdd} />
        </form>
      </section>
    </main>
  );
};

export default ProductInputForm;
