"use client";

import * as React from "react";

interface FormButtonsProps {
  onDiscard: () => void;
  onAdd: () => void;
}

export const FormButtons: React.FC<FormButtonsProps> = ({
  onDiscard,
  onAdd,
}) => {
  return (
    <div className="flex gap-3 justify-end mt-8 max-sm:flex-col max-sm:gap-4">
      <button
        onClick={onDiscard}
        className="px-2 py-2.5 text-base font-medium text-gray-400 rounded border border-gray-100"
      >
        Discard
      </button>
      <button
        onClick={onAdd}
        className="px-4 py-2.5 text-sm font-medium text-white bg-blue-600 rounded"
      >
        Add Product
      </button>
    </div>
  );
};
