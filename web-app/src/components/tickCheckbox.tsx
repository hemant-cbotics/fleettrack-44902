import React, { FC } from "react";
import Checkbox from "../assets/svg/checkbox.svg";
import CheckboxChecked from "../assets/svg/checkbox-checked.svg";

type TickCheckboxProps = {
  id: string;
  isChecked?: boolean;
  disabled?: boolean;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  skinned?: boolean;
};

const TickCheckbox: FC<TickCheckboxProps> = ({
  id,
  isChecked = false,
  disabled = false,
  handleChange,
  onClick,
  skinned = true,
}) => {
  const wrapperClass = 'relative w-6 h-6 flex items-center justify-center';
  return (
    <>
      {skinned ? (
      <span className={`group ${wrapperClass}`}>
        <input
          checked={isChecked}
          className="opacity-0 absolute w-6 h-6 peer cursor-pointer"
          disabled={disabled}
          id={id}
          onClick={onClick}
          onChange={handleChange}
          type="checkbox"
        />
        <img
          src={isChecked ? CheckboxChecked : Checkbox}
          alt="checkbox"
          className="group-hover:opacity-80 rounded-sm pointer-events-none touch-none peer-hover:ring-2 peer-hover:ring-accent-blue-pale peer-focus:ring-2 peer-focus:ring-accent-blue-dark"
        />
      </span>
      ) : (
        <div className={wrapperClass}>
          <input
            checked={isChecked}
            className="w-4 h-4 text-accent-blue-dark bg-gray-100 border-gray-300 rounded focus:ring-accent-blue-dark dark:focus:ring-accent-blue-dark dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            disabled={disabled}
            id={id}
            onClick={onClick}
            onChange={handleChange}
            type="checkbox"
          />
        </div>
      )}
    </>
  );
}
export default TickCheckbox;