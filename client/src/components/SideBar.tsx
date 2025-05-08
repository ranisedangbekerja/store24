"use client";
import * as React from "react";
import { LogoSection } from "./LogoSection";
import { MenuItem } from "./MenuItem";

const SideBar: React.FC = () => {
  return (
    <nav className="fixed left-0 top-0 h-screen w-[280px] px-6 py-7 bg-white border-r border-solid border-r-[color:var(--Grey-grey-50,#F0F1F3)] overflow-hidden z-50">
      <div className="w-full text-blue-600 max-w-[232px]">
        <LogoSection
          logoUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/b550b16358bc6dc1abd08e6a5f1b1972a17bbf06?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
          storeName="STORE 24"
        />

        <div className="flex gap-2 items-center px-4 py-2 mt-8 w-full text-base font-medium whitespace-nowrap">
          <div className="flex flex-col flex-1 shrink justify-center self-stretch my-auto w-full basis-0">
            <MenuItem
              icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2224d656d71895ea647ddb707b3413aefa32e459?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
              text="Inventory"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 text-base font-medium text-gray-500">
        <MenuItem
          icon="https://cdn.builder.io/api/v1/image/assets/TEMP/69855c4253abf663a66d52872ab0c43dd241fc57?placeholderIfAbsent=true&apiKey=1801958dbb714fc188da4c859fd1275c"
          text="Log Out"
          textColor="text-gray-500"
        />
      </div>
    </nav>
  );
};

export default SideBar;
