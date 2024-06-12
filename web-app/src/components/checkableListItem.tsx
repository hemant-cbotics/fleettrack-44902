import React, { FC } from "react";

type CheckableListItemProps = {
  id: string;
  title: string;
  checked?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CheckableListItem: FC<CheckableListItemProps> = ({
  id,
  title,
  checked = false,
  handleChange
}) => {
  return (
    <label
      htmlFor={`CheckableListItem_${id}`}
      className="flex items-center cursor-pointer gap-4 select-none rounded-lg border border-gray-200 px-4 py-2 transition hover:bg-gray-50"
    >
      <div className="flex items-center">
        &#8203;
        <input
          type="checkbox"
          className="size-4 rounded border-gray-300"
          id={`CheckableListItem_${id}`} 
          checked={checked}
          onChange={handleChange}
          />
      </div>

      <strong className="text-sm font-normal text-gray-900">
        {title}
      </strong>
    </label>
  );
}
export default CheckableListItem;