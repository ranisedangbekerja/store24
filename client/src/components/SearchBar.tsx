"use client";

import * as React from "react";

type SearchBarProps = {
  onSearch: (query: string) => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="p-7 w-full bg-white border border-zinc-100">
      <div className="flex gap-2 items-center w-full">
        <div className="flex gap-2 items-center px-4 py-2.5 w-full rounded border border-gray-100">
          <svg
            width="25"
            height="24"
            viewBox="0 0 25 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[24px] h-[24px]"
          >
          </svg>
          <input
            type="text"
            placeholder="Search product, supplier, order"
            className="flex-1 text-base text-gray-400 outline-none"
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};
