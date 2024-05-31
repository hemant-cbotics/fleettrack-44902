import React, { FC, useEffect, useState } from "react";

type GroupVehicleItemProps = {
  id: string;
  title: string;
  sub_title?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  show?: boolean;
  disabled?: boolean;
};

const GroupVehicleItem: FC<GroupVehicleItemProps> = ({ id, title, sub_title = '', handleChange, show = true, disabled  = false }) => {
  // Create a state for the checked status of the checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Update the checked status when the checkbox is clicked
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    handleChange?.(e);
  }

  // Uncheck the checkbox when it's disabled
  useEffect(() => {
    if (disabled) {
      setIsChecked(false);
    }
  }, [disabled]);
  return (
    <label
      htmlFor={`GroupVehicleItem_${id}`}
      className={`${show ? '' : 'hidden '}flex items-center cursor-pointer gap-4 select-none rounded-lg border border-gray-200 px-4 py-2 transition hover:bg-gray-50 has-[:checked]:bg-blue-50`}
    >
      <div className="flex items-center">
        &#8203;
        <input
          type="checkbox"
          className="size-4 rounded border-gray-300 disabled:bg-gray-200 disabled:border-gray-300"
          id={`GroupVehicleItem_${id}`} 
          onChange={handleCheckboxChange}
          disabled={disabled}
          checked={isChecked}
          />
      </div>

      <strong className="text-sm font-normal text-gray-900">
        {title}{!!sub_title && <span className="text-xs text-gray-400 ml-2">{sub_title}</span>}
      </strong>
    </label>
  );
}
export default GroupVehicleItem;