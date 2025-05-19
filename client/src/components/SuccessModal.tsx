"use client";

import React, { useEffect, useState } from "react";

type SuccessModalProps = {
  message: string;
};

const SuccessModal: React.FC<SuccessModalProps> = ({ message }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000); // durasi muncul modal

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        w-[400px] h-[300px] 
        bg-green-100 border border-green-400 text-green-700
        rounded-lg shadow-lg transition-opacity duration-300
        flex flex-col justify-center items-center gap-4
        px-6 py-5
      "
    >
      {/* Icon centang di atas */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-green-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>

      {/* Pesan di bawah icon */}
      <p className="text-center text-lg font-semibold">{message}</p>
    </div>
  );
};

export default SuccessModal;
