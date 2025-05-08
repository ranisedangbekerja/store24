import * as React from "react";

export const InventoryStats: React.FC = () => {
  return (
    <section className="p-5 bg-white rounded-lg">
      <h2 className="mb-5 text-xl font-medium text-zinc-700">
        Overall Inventory
      </h2>
      <div className="flex gap-6 items-center">
        <div className="flex flex-col items-center">
          <p className="text-base font-medium text-gray-500">21,190</p>
          <p className="text-sm text-neutral-600">Total Products</p>
        </div>
      </div>
    </section>
  );
};
