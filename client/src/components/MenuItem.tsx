import * as React from "react";

interface MenuItemProps {
  icon: string;
  text: string;
  textColor?: string;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  icon,
  text,
  textColor = "text-blue-600",
}) => {
  return (
    <div className="flex flex-col justify-center items-start p-4 w-full rounded-lg">
      <div className="flex gap-4 items-center w-full min-h-6">
        <img
          src={icon}
          className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          alt=""
        />
        <p className={`self-stretch my-auto ${textColor}`}>{text}</p>
      </div>
    </div>
  );
};
