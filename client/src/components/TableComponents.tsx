import * as React from "react";

interface ProductData {
  name: string;
  quantity: number; // ✅ ubah jadi number
  date: string;
}

export const TableHeader: React.FC = () => (
  <div className="grid grid-cols-3 gap-6 pb-4 text-sm font-medium text-gray-500 border-gray-300 border-[0.5px]">
    <div>Products</div>
    <div>Quantity</div>
    <div>Date</div>
  </div>
);

export const TableRow: React.FC<ProductData> = ({ name, quantity, date }) => (
  <div className="grid grid-cols-3 py-3 text-sm text-gray-600 border-gray-300 border-[0.5px]">
    <div>{name}</div>
    <div>{quantity}</div>
    <div>{date}</div>
  </div>
);

export const FiltersButton: React.FC = () => (
  <button className="flex gap-2 justify-center items-center px-4 py-2.5 text-sm font-medium text-gray-500 rounded border border-gray-300">
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 10H15M2.5 5H17.5M7.5 15H12.5"
        stroke="#5D6679"
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span>Filters</span>
  </button>
);
