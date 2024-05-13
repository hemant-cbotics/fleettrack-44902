import { ChangeEvent, FC, useState } from "react";

type AdminFormFieldInputProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: any;
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  customInputClass?: string;
  customWrapperClass?: string;
};

export const AdminFormFieldInput: FC<AdminFormFieldInputProps> = ({
  label,
  type,
  id,
  name,
  placeholder = "",
  onChange,
  onBlur,
  value,
  touched,
  error,
  disabled = false,
  customInputClass = "",
  customWrapperClass = "col-span-6",
}) => {
  let wrapperClass = touched && !!error ? "" : "";
  let labelClass =
    touched && !!error ? "text-field-error-dark" : "text-field-label-valid";
  let inputClass =
    touched && !!error
      ? "border-field-error-border focus-visible:outline-field-error-dark text-field-error-dark"
      : "border-gray-200 text-field-label-valid";
  const floatingError = false;

  return (
    <div
      className={`${
        floatingError ? ` relative pb-4` : ""
      } ${wrapperClass} ${customWrapperClass}`}
    >
      <label
        htmlFor={id}
        className={`block text-sm font-display font-semibold ${labelClass}`}
      >
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        disabled={disabled}
        className={`mt-1 w-full h-11 px-3 rounded-md bg-white text-sm shadow-sm focus-visible:outline-4 focus-visible:shadow-none${
          touched ? " touched" : ""
        } ${disabled ? "bg-gray-400" : ""} ${inputClass} ${customInputClass}`}
      />
      {touched && !!error && (
        <p
          className={`${
            floatingError ? "absolute" : ""
          } bg-field-error-light px-2 py-1 rounded text-field-error-dark text-xs mt-1`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export type TSelectboxOption = {
  value: string;
  label: string;
};

type AdminFormFieldDropdownProps = {
  label: string | false;
  id: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  value: string;
  options?: TSelectboxOption[];
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  customSelectboxClass?: string;
};

export const AdminFormFieldDropdown: FC<AdminFormFieldDropdownProps> = ({
  label,
  id,
  name,
  placeholder = "",
  onChange,
  onBlur,
  value,
  options = [],
  touched,
  error,
  disabled = false,
  customSelectboxClass = "",
}) => {
  let wrapperClass = touched && !!error ? "" : "";
  let labelClass =
    touched && !!error ? "text-field-error-dark" : "text-field-label-valid";
  let inputClass =
    touched && !!error
      ? "border-field-error-border focus-visible:outline-field-error-dark text-field-error-dark"
      : "border-gray-200 text-field-label-valid";
  const floatingError = false;

  const [selected, setSelected] = useState(value);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    onChange?.(e)
  }

  return (
    <div className={`col-span-6${
      floatingError ? ` relative pb-4` : ""
    } ${wrapperClass}`}>
      {!!label && <label
        htmlFor={id}
        className={`block text-sm font-display font-semibold ${labelClass}`}
      >
        {label}
      </label>}

      <select
        value={selected}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        className={`mt-1 w-full h-11 px-3 rounded-md bg-white text-sm shadow-sm border focus-visible:outline-4 focus-visible:shadow-none${
          touched ? " touched" : ""
        } ${disabled ? "bg-gray-400" : ""} ${inputClass} ${customSelectboxClass}`}
      >
        {!!placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && !!error && (
        <p
          className={`${
            floatingError ? "absolute" : ""
          } bg-field-error-light px-2 py-1 rounded text-field-error-dark text-xs mt-1`}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export const AdminFormFieldCheckbox: FC<AdminFormFieldInputProps> = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  onBlur,
  touched,
  error,
  disabled = false,
}) => {

  const [checked, setChecked] = useState(value);

  const handleChange = (e:any) => {
    setChecked(e.target.checked);
    onChange?.(e)
  }
  
  return (
    <div className="bg-white col-span-4 flex justify-between items-center p-3 rounded-lg shadow-sm border-gray-200 cursor-pointer">
      <label
        className={`block text-sm font-display font-semibold text-field-label-valid`}
      >
        {label}
      </label>
      <div>
        <input
          type={type}
          id={id}
          name={name}
          checked={checked}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          className="mt-1 w-full h-11 px-3 rounded-md text-sm shadow-sm sr-only peer focus-visible:outline-4 focus-visible:shadow-none"
        />
        <div onClick={() => disabled ? () => {} : handleChange({ target: { checked: !checked, value: !checked ? true : false, name: name } })} className="relative w-12 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
      </div>
    </div>
  );
};

type AdminFormFieldSubmitProps = {
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary' | 'danger';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const AdminFormFieldSubmit: FC<AdminFormFieldSubmitProps> = ({ type = 'submit', variant = 'secondary', label, onClick, disabled = false }) => {
  let variantClass = "";
  const disabledClass = "border-gray-200 bg-gray-200 text-gray-400"
  switch (variant) {
    case "primary":
      variantClass =
        disabled
        ? disabledClass
        : "border-accent-blue-pale bg-accent-blue-pale text-accent-blue-dark enabled:hover:bg-accent-blue-dark enabled:hover:text-white enabled:hover:bg-accent-blue-dark active:bg-accent-blue-pale";
      break;
    case "danger":
      variantClass =
        disabled
        ? disabledClass
        : "border-0 bg-transparent text-red-600 enabled:hover:bg-red-100 ring-red-200";
      break;
    default: // secondary
      variantClass =
        disabled
          ? disabledClass
          : variantClass = "border-accent-blue-dark bg-transparent text-accent-blue-dark enabled:hover:bg-accent-blue-pale active:bg-accent-blue-dark active:text-accent-blue-pale";
  }
  return (
    <div className="col-span-6">
      <button
        className={`h-12 w-full rounded-full border text-sm font-display font-semibold transition focus:outline-none focus:ring ${variantClass}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}
