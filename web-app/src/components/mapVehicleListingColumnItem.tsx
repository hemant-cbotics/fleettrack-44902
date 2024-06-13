import React, { FC, ReactNode } from "react";
import TickCheckbox from "./tickCheckbox";

type TMapVehicleListingColumnItemProps = {
  asideText: ReactNode | string;
  bottomText: string;
  checked?: boolean | null;
  description: string;
  id: string;
  onClick: () => void;
  onClickCheckbox?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
  selected?: boolean;
};

const MapVehicleListingColumnItem: FC<TMapVehicleListingColumnItemProps> = ({
  asideText,
  bottomText,
  checked = null,
  description = '',
  id,
  onClickCheckbox,
  onClick,
  title,
  selected = false,
}) => {
  return (
    <div
      className={`border-b px-4 py-3 border-gray-300 ${
        selected ? "bg-accent-blue-paleO66" : "hover:bg-accent-blue-paleO66 cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="grid grid-cols-8">
        <div className="col-span-6 flex items-start gap-3">
          {checked !== null && (
            <TickCheckbox
              id={id}
              isChecked={checked}
              handleChange={onClickCheckbox}
              onClick={(e) => e.stopPropagation()}
            />
          )}
          <div className="flex flex-col">
            <p className="font-semibold text-sm leading-6 text-accent-blue-dark">
              {title}
            </p>
            {!!description && (<p className="font-normal text-[10px] leading-4 text-gray-500 mt-[2px]">
              {description}
            </p>)}
            <p className="font-medium text-xs leading-4 text-gray-700 mt-1">
              {bottomText}
            </p>
          </div>
        </div>
        <div className="col-span-2 font-bold text-xs leading-4 text-right">
          {asideText}
        </div>
      </div>
    </div>
  );
}
export default MapVehicleListingColumnItem;