"use client";
import * as React from "react";
import { SearchBar } from "./SearchBar";
import { InventoryStats } from "./InventoryStats";
import { ProductsTable } from "./ProductsTable";
import SideBar from "./SideBar";

type ProductsTableProps = {
  searchQuery: string;
};
const InputDesign: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  // Handle search query change
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <main className="flex bg-gray-100 min-h-screen">
      {/* Sidebar (fixed, tidak perlu perubahan di sini) */}
      <SideBar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 pl-[280px] h-screen overflow-auto">
        {/* Pass handleSearch function to SearchBar as onSearch prop */}
        <SearchBar onSearch={handleSearch} />
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <InventoryStats />
          {/* Pass searchQuery to ProductsTable */}
          <ProductsTable searchQuery={searchQuery} />
        </div>
      </div>
    </main>
  );
};

export default InputDesign;
