import React, { FC } from "react";

type GroupVehicleItemProps = {
  id: number;
  title: string;
};

const GroupVehicleItem: FC<GroupVehicleItemProps> = ({ id, title }) => {
  return (
    <label
      htmlFor={`GroupVehicleItem_${id}`}
      className="flex items-center cursor-pointer gap-4 select-none rounded-lg border border-gray-200 px-4 py-2 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
    >
      <div className="flex items-center">
        &#8203;
        <input
          type="checkbox"
          className="size-4 rounded border-gray-300"
          id={`GroupVehicleItem_${id}`} />
      </div>

      <strong className="text-sm font-normal text-gray-900">
        {title}
      </strong>
    </label>
  );
}
export default GroupVehicleItem;