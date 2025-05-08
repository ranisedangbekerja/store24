"use client";
import * as React from "react";
import { ActionButton } from "./ActionButton";
import { TableHeader, TableRow, FiltersButton } from "./TableComponents";
import { FormInput } from "./FormInput";

const productData = [
  { name: "Maggi", quantity: "43 Packets", date: "11/12/22" },
  { name: "Bru", quantity: "22 Packets", date: "21/12/22" },
  { name: "Red Bull", quantity: "36 Packets", date: "5/12/22" },
  { name: "Bourn Vita", quantity: "14 Packets", date: "8/12/22" },
  { name: "Horlicks", quantity: "5 Packets", date: "9/1/23" },
  { name: "Harpic", quantity: "10 Packets", date: "9/1/23" },
  { name: "Ariel", quantity: "23 Packets", date: "15/12/23" },
  { name: "Scotch Brite", quantity: "43 Packets", date: "6/6/23" },
  { name: "Coca cola", quantity: "41 Packets", date: "11/11/22" },
];

export const ProductsTable: React.FC = () => {
  return (
    <section className="p-5 bg-white rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-zinc-700">Products</h2>
        <div className="flex gap-3">
          <ActionButton variant="primary">Add Product</ActionButton>
          <FiltersButton />
          <ActionButton>Download all</ActionButton>
        </div>
      </div>
      <div className="w-full">
        <TableHeader />
        <div className="flex flex-col">
          {productData.map((product, index) => (
            <TableRow key={index} {...product} />
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <button className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white rounded border border-gray-300 shadow-sm">
            Previous
          </button>
          <div className="text-sm text-gray-600">Page 1 of 10</div>
          <button className="px-4 py-2.5 text-sm font-medium text-gray-600 bg-white rounded border border-gray-300 shadow-sm">
            Next
          </button>
        </div>
      </div>
    </section>
  );
};
