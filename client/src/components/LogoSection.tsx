import * as React from "react";

interface LogoSectionProps {
  logoUrl: string;
  storeName: string;
}

export const LogoSection: React.FC<LogoSectionProps> = ({
  logoUrl,
  storeName,
}) => {
  return (
    <header className="flex flex-col justify-center items-start px-3 py-1 w-full text-xl font-semibold text-center">
      <div className="flex gap-3 items-center">
        <img
          src={logoUrl}
          className="object-contain shrink-0 self-stretch my-auto w-8 aspect-square"
          alt="Store logo"
        />
        <h1 className="self-stretch my-auto text-blue-600">{storeName}</h1>
      </div>
    </header>
  );
};
