"use client";
import * as React from "react";
import { SearchBar } from "./SearchBar";
import { InventoryStats } from "./InventoryStats";
import { ProductsTable } from "./ProductsTable";
import SideBar from "./SideBar";

const InputDesign: React.FC = () => {
  return (
    <main className="flex bg-gray-100 min-h-screen">
      {/* Sidebar (fixed, tidak perlu perubahan di sini) */}
      <SideBar />

      {/* Main Content */}
      <div className="flex flex-col flex-1 pl-[280px] h-screen overflow-auto">
        <SearchBar />
        <div className="flex flex-col gap-6 p-6 md:p-8">
          <InventoryStats />
          <ProductsTable />
        </div>
      </div>
    </main>
  );
};

export default InputDesign;
