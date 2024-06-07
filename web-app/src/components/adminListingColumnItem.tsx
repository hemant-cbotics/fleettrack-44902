import React, { FC } from "react";

type TAdminListingColumnItemProps = {
  selected?: boolean;
  onClick: () => void;
  title: string;
  description: string;
  asideText: string;
  bottomText: string;
};

const AdminListingColumnItem: FC<TAdminListingColumnItemProps> = ({
  selected = false,
  onClick,
  title,
  description = '',
  asideText,
  bottomText,
}) => {
  return (
    <div
      className={`border-b px-3 py-2 border-gray-200 ${
        selected ? "bg-accent-blue-paleO66" : "hover:bg-accent-blue-paleO66 cursor-pointer"
      }`}
      onClick={onClick}
    >
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          <p className="font-semibold text-sm leading-6 text-blue-900">
            {title}
          </p>
          {!!description && (<p className="font-normal text-[10px] leading-4 text-gray-500 mt-[2px]">
            {description}
          </p>)}
          <p className="font-medium text-xs leading-4 text-gray-700 mt-1">
            {bottomText}
          </p>
        </div>
        <div className="col-span-1 font-bold text-xs leading-4 text-right">
          {asideText}
        </div>
      </div>
    </div>
  );
}
export default AdminListingColumnItem;