"use client";

import * as React from "react";

interface FormInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex gap-14 items-center max-sm:flex-col max-sm:gap-3 max-sm:items-start">
      <label className="text-base font-medium text-gray-600">{label}</label>
      <div className="flex-1">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="px-3.5 py-2.5 w-full text-base text-gray-400 bg-white rounded-lg border border-gray-300 shadow-sm"
        />
      </div>
    </div>
  );
};
