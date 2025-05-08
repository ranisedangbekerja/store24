"use client";
import * as React from "react";

export const SearchBar: React.FC = () => {
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
            <path
              d="M22.2277 20.4093L17.4404 15.6226C17.1972 15.3795 16.8537 15.3025 16.5433 15.3844L15.5162 14.3573C16.6749 13.0448 17.3848 11.3267 17.3848 9.44218C17.3848 5.33871 14.0464 2 9.94285 2C5.83871 2 2.5 5.33871 2.5 9.44285C2.5 13.5467 5.83871 16.885 9.94285 16.885C11.8271 16.885 13.5452 16.1755 14.8579 15.0164L15.885 16.0436C15.8031 16.354 15.8798 16.6972 16.1233 16.9406L20.91 21.727C21.0923 21.9093 21.3303 22 21.5688 22C21.8074 22 22.0457 21.909 22.2277 21.727C22.5914 21.3633 22.5914 20.7733 22.2277 20.4093ZM3.43193 9.44254C3.43193 5.85288 6.35235 2.93187 9.9426 2.93187C13.5328 2.93187 16.4529 5.85288 16.4529 9.44288C16.4529 13.0325 13.5322 15.9532 9.9426 15.9532C6.35302 15.9532 3.43193 13.0325 3.43193 9.44254Z"
              fill="#858D9D"
            />
          </svg>
          <input
            type="text"
            placeholder="Search product, supplier, order"
            className="flex-1 text-base text-gray-400 outline-none"
          />
        </div>
      </div>
    </div>
  );
};
