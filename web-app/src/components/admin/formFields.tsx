import { FC, ReactNode, useState } from "react";
import Select, { GroupBase, OptionsOrGroups } from "react-select";
import AsyncSelect from "react-select/async";

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
  readOnly?: boolean;
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
  readOnly = false,
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
        readOnly={readOnly}
        className={`mt-1 w-full h-11 px-3 rounded-md text-sm shadow-sm focus-visible:outline-4 focus-visible:shadow-none${
          touched ? " touched" : ""
        } ${disabled || readOnly ? "bg-gray-100" : "bg-white"} ${inputClass} ${customInputClass}`}
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
  loadingData?: boolean;
  label: string | false;
  id: string;
  name: string;
  placeholder?: string;
  // onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange?: (e: TSelectboxOption | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  value?: string | null;
  options?: TSelectboxOption[];
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  customSelectboxClass?: string;
  customWrapperClass?: string;

  menuPlacement?: "auto" | "top" | "bottom";
};

type AdminFormFieldAsyncDropdownProps = AdminFormFieldDropdownProps & {
  loadOptions: ((inputValue: string, callback: (options: OptionsOrGroups<TSelectboxOption, GroupBase<TSelectboxOption>>) => void) => void/* | Promise<...>*/) | undefined;
}

const PseudoSelect: FC<{
  label: string | false;
}> = ({ label }) => {
  return (
    <div className="col-span-6">
      <label
        className={`block text-sm font-display font-semibold`}
      >
        {label}
      </label>
      <div className="mt-1 w-full h-11 px-1 rounded-md bg-white text-sm shadow-sm border focus-visible:outline-4 focus-visible:shadow-none¯ overflow-hidden">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-4 py-1">
            <div className="h-9 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const RealSelect: FC<AdminFormFieldDropdownProps> = ({
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
  readOnly = false,

  customSelectboxClass = "",
  customWrapperClass = "col-span-6",

  menuPlacement = "auto",
}) => {
  let wrapperClass = touched && !!error ? "" : "";
  let labelClass =
    touched && !!error ? "text-field-error-dark" : "text-field-label-valid";
  let inputClass =
    touched && !!error
      ? "border-field-error-border focus-visible:outline-field-error-dark text-field-error-dark"
      : "border-gray-200 text-field-label-valid";
  const floatingError = false;

  const [selected, setSelected] = useState<string | null>(value ?? '');
  const handleChange = (e: TSelectboxOption | null) => {
    setSelected(`${e?.value}`);
    onChange?.(e)
  }

  return (
    <div className={`${
      floatingError ? ` relative pb-4` : ""
    } ${wrapperClass} ${customWrapperClass}`}>
      {!!label && <label
        htmlFor={id}
        className={`block text-sm font-display font-semibold ${labelClass}`}
      >
        {label}
      </label>}

      <Select
        classNames={{
          control: (state) =>
            `mt-1 w-full h-11 px-1 rounded-md bg-white text-sm shadow-sm border focus-visible:outline-4 focus-visible:shadow-none ${
              state.isFocused ? 'border-red-600' : 'border-grey-300'
            } ${
                state.isDisabled ? 'bg-gray-400' : ''
              } ${inputClass} ${customSelectboxClass}`,
        }}
        placeholder={placeholder}
        options={options}
        value={options.find(optItem => optItem.value === selected)}
        onChange={handleChange}
        isDisabled={disabled || readOnly}
        // onBlur={onBlur}
        menuPlacement={menuPlacement}
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

export const AdminFormFieldDropdown: FC<AdminFormFieldDropdownProps> = (props) => {
  return (
    <>
      {props?.loadingData ? (
        <PseudoSelect label={props.label} />
      ) : (
        <RealSelect {...props} />
      )}
    </>
  );
};

export const AdminFormFieldAsyncDropdown: FC<AdminFormFieldAsyncDropdownProps> = ({
  label,
  id,
  name,
  placeholder = "",
  onChange,
  onBlur,
  value,
  options = [],
  loadOptions,
  touched,
  error,
  disabled = false,
  readOnly = false,

  customSelectboxClass = "",
  customWrapperClass = "col-span-6",

  menuPlacement = "auto",
}) => {
  let wrapperClass = touched && !!error ? "" : "";
  let labelClass =
    touched && !!error ? "text-field-error-dark" : "text-field-label-valid";
  let inputClass =
    touched && !!error
      ? "border-field-error-border focus-visible:outline-field-error-dark text-field-error-dark"
      : "border-gray-200 text-field-label-valid";
  const floatingError = false;

  const [selected, setSelected] = useState<string | null>(value ?? '');
  const handleChange = (e: TSelectboxOption | null) => {
    setSelected(`${e?.value}`);
    onChange?.(e)
  }

  return (
    <div className={`${
      floatingError ? ` relative pb-4` : ""
    } ${wrapperClass} ${customWrapperClass}`}>
      {!!label && <label
        htmlFor={id}
        className={`block text-sm font-display font-semibold ${labelClass}`}
      >
        {label}
      </label>}

      <AsyncSelect
        classNames={{
          control: (state) =>
            `mt-1 w-full h-11 px-1 rounded-md bg-white text-sm shadow-sm border focus-visible:outline-4 focus-visible:shadow-none ${
              state.isFocused ? 'border-red-600' : 'border-grey-300'
            } ${
                state.isDisabled ? 'bg-gray-400' : ''
              } ${inputClass} ${customSelectboxClass}`,
        }}
        placeholder={placeholder}
        cacheOptions
        loadOptions={loadOptions}
        value={options.find(optItem => optItem.value === selected)}
        onChange={handleChange}
        isDisabled={disabled || readOnly}
        menuPlacement={menuPlacement}
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

type AdminFormFieldChecboxProps = Omit<AdminFormFieldInputProps, "value"> & {
  checked?: boolean;
};

export const AdminFormFieldCheckbox: FC<AdminFormFieldChecboxProps> = ({
  label,
  id,
  type,
  name,
  checked = false,
  onChange,
  onBlur,
  touched,
  error,
  disabled = false,
}) => {
  const handleChange = (e:any) => {
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
          onChange={handleChange}
          onBlur={onBlur}
          className="mt-1 w-12 h-11 px-3 disabled:bg-gray-200 disabled:border-gray-300 rounded-md text-sm shadow-sm sr-only peer focus-visible:outline-4 focus-visible:shadow-none"
        />
        <div
          onClick={() =>
            disabled
            ? () => {}
            : handleChange({
              target: {
                checked: !checked,
                value: !checked ? true : false,
                name: name
              }
            })}
          className="relative w-12 h-7 bg-gray-200 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"
        ></div>
      </div>
    </div>
  );
};

type AdminFormFieldSubmitProps = {
  type?: 'submit' | 'button';
  variant?: 'primary' | 'primary-like' | 'secondary' | 'danger-transparent' | 'danger' | 'success';
  label: string | ReactNode;
  titleText?: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const AdminFormFieldSubmit: FC<AdminFormFieldSubmitProps> = ({ type = 'submit', variant = 'secondary', label, titleText = '', onClick, disabled = false }) => {
  let variantClass = "";
  const disabledClass = "border-gray-200 bg-gray-200 text-gray-400"
  switch (variant) {
    case "success":
      variantClass =
        disabled
          ? disabledClass
          : "border-0 bg-accent-green text-white enabled:hover:opacity-80 ring-green-200";
      break;
    case "primary":
      variantClass =
        disabled
        ? disabledClass
        : "border-accent-blue-pale bg-accent-blue-pale text-accent-blue-dark enabled:hover:bg-accent-blue-dark enabled:hover:text-white active:bg-accent-blue-pale";
      break;
    case "primary-like": // opacity on hover
      variantClass =
        disabled
        ? disabledClass
        : "border-accent-blue-pale bg-accent-blue-pale text-accent-blue-dark enabled:hover:opacity-80 active:bg-accent-blue-pale";
      break;
    case "danger-transparent":
      variantClass =
        disabled
        ? disabledClass
        : "border-0 bg-transparent text-red-600 enabled:hover:bg-red-100 ring-red-200";
      break;
    case "danger":
      variantClass =
        disabled
        ? disabledClass
        : "border border-red-600 bg-transparent text-red-600 enabled:hover:bg-red-100 ring-red-200";
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
        className={`flex items-center justify-center h-10 w-full px-4 rounded-lg border text-sm font-display font-semibold transition focus:outline-none focus:ring ${variantClass}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
        title={titleText}
      >
        {label}
      </button>
    </div>
  );
}
