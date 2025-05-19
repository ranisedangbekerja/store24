import * as React from "react";

interface ProductData {
  name: string;
  quantity: number; // ✅ ubah jadi number
  date: string;
}

export const TableHeader: React.FC = () => (
  <div className="grid grid-cols-3 gap-6 pb-4 text-sm font-medium text-black border-gray-300 border-[0.5px]">
    <div>Products</div>
    <div>Quantity</div>
    <div>Date</div>
  </div>
);

export const TableRow: React.FC<ProductData> = ({ name, quantity, date }) => (
  <div className="grid grid-cols-3 py-3 text-sm text-black border-gray-300 border-[0.5px]">
    <div>{name}</div>
    <div>{quantity}</div>
    <div>{date}</div>
  </div>
);

type SortOption =
  | null
  | "date-old"
  | "qty-high"
  | "qty-low";

interface SortButtonProps {
  activeSort: SortOption;
  onSortChange: (option: SortOption) => void;
}

export const SortButton: React.FC<SortButtonProps> = ({ activeSort, onSortChange }) => {
  const toggleSort = (option: SortOption) => {
    if (activeSort === option) {
      onSortChange(null); // reset if clicked again
    } else {
      onSortChange(option);
    }
  };

  return (
    <div className="relative group">
      <button
        className="flex gap-2 justify-center items-center px-4 py-2.5 text-sm font-medium text-black rounded border border-gray-300"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 5H15" stroke="#5D6679" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 10H11" stroke="#5D6679" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 15H7" stroke="#5D6679" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <span>Sort By</span>
      </button>

      <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded shadow-md z-10 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity duration-150">
        {[
          { label: "Date (old to new)", value: "date-old" },
          { label: "Quantity (high to low)", value: "qty-high" },
          { label: "Quantity (low to high)", value: "qty-low" },
        ].map(({ label, value }) => (
          <button
            key={value}
            onClick={() => toggleSort(value as SortOption)}
            className={`block w-full px-4 py-2 text-left text-sm hover:bg-blue-600 hover:text-black ${
              activeSort === value ? "bg-blue-600 font-semibold text-black" : "text-black"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};



