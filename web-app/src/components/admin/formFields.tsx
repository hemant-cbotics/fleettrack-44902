import { FC, ReactNode, useState } from "react";
import Select, { components, CSSObjectWithLabel, GroupBase, OptionsOrGroups } from "react-select";
import AsyncSelect from "react-select/async";
import SearchIcon from "../../assets/svg/search-icon.svg";
import CloseIcon from "../../assets/svg/close-icon.svg";

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
  detailsFormField?: boolean;
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
  detailsFormField = false,
  customInputClass = "",
  customWrapperClass = "col-span-6",
}) => {
  const fieldHasError = detailsFormField ?  !disabled && !!error : touched && !!error;
  let wrapperClass = fieldHasError ? "" : "";
  let labelClass =
    fieldHasError ? "text-field-error-dark" : "text-field-label-valid";
  let inputClass =
    fieldHasError
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
        className={`mt-1 w-full h-11 px-3 rounded-md text-sm shadow-sm enabled:outline-accent-blue-dark focus-visible:outline-4 focus-visible:shadow-none${
          touched ? " touched" : ""
        } ${disabled || readOnly ? "bg-gray-100" : "bg-white"} ${inputClass} ${customInputClass}`}
      />
      {fieldHasError && (
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
  placeholder?: ReactNode | string;
  // onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onChange?: (e: TSelectboxOption | null) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  value?: string | null;
  options?: TSelectboxOption[];
  touched?: boolean;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  detailsFormField?: boolean;
  customSelectboxClass?: string;
  customWrapperClass?: string;

  menuPlacement?: "auto" | "top" | "bottom";
};

type AdminFormFieldAsyncDropdownProps = AdminFormFieldDropdownProps & {
  noOptionsMessage?: (obj: { inputValue: string }) => string;
  defaultOption?: TSelectboxOption;
  defaultOptions?: TSelectboxOption[];
  loadOptions: ((inputValue: string, callback: (options: OptionsOrGroups<TSelectboxOption, GroupBase<TSelectboxOption>>) => void) => void/* | Promise<...>*/) | undefined;
  searchStyle?: boolean;
  searchStyleOnClear?: () => void;
}

export const PseudoSelect: FC<{
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
  detailsFormField = false,
  customSelectboxClass = "",
  customWrapperClass = "col-span-6",

  menuPlacement = "auto",
}) => {
  const fieldHasError = detailsFormField ?  !disabled && !!error : touched && !!error;
  let wrapperClass = fieldHasError ? "" : "";
  let labelClass =
    fieldHasError ? "text-field-error-dark" : "text-field-label-valid";
  let inputClass =
    fieldHasError
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
        inputId={id}
        classNames={{
          control: (controlProps) =>
            `mt-1 w-full h-11 px-1 rounded-md bg-white text-sm shadow-sm border focus-visible:outline-4 focus-visible:shadow-none ${
              controlProps.isFocused ? 'border-red-600' : 'border-grey-300'
            } ${
                controlProps.isDisabled ? 'bg-gray-400' : ''
              } ${inputClass} ${customSelectboxClass}`
        }}
        placeholder={placeholder}
        options={options}
        value={options.find(optItem => optItem.value === selected)}
        onChange={handleChange}
        isDisabled={disabled || readOnly}
        // onBlur={onBlur}
        menuPlacement={menuPlacement}
      />
      {fieldHasError && (
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
  defaultOptions = [],
  noOptionsMessage = () => "No options found",
  defaultOption = null,
  loadOptions,
  touched,
  error,
  disabled = false,
  readOnly = false,
  detailsFormField = false,
  customSelectboxClass = "",
  customWrapperClass = "col-span-6",

  menuPlacement = "auto",
  searchStyle = false,
  searchStyleOnClear = () => {}
}) => {
  const fieldHasError = detailsFormField ?  !disabled && !!error : touched && !!error;
  let wrapperClass = fieldHasError ? "" : "";
  let labelClass =
    fieldHasError ? "text-field-error-dark" : "text-field-label-valid";
  let inputClass =
    fieldHasError
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
        inputId={id}
        name={name}
        classNames={{
          control: (controlProps) => {
            // console.log('classNames state', controlProps)
            return `${!!label ? 'mt-1' : ''} w-full h-11 px-1${searchStyle && ' pl-7'} rounded-md bg-white text-sm shadow-sm border-2 focus-visible:outline-4 focus-visible:shadow-none ${inputClass} ${customSelectboxClass} ${
              controlProps.isFocused ? 'border-red-600' : 'border-grey-300'
            } ${
                controlProps.isDisabled ? 'bg-gray-400' : ''
              }`
          }
        }}
        styles={{
          control: (styles, controlProps) => {
            // console.log('styles state', styles, controlProps)
            return {
              ...styles,
              border: !!error && !controlProps.isDisabled
                ? `2px solid #D0021B`
                : controlProps.isFocused
                ? '2px solid #005FCC'
                : '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: 'none',
              outline: 'none',
              '&:hover': {
                borderColor: !!error && !controlProps.isDisabled
                ? '#D0021B'
                : controlProps.isFocused
                ? '#005FCC'
                : '#e5e7eb',
              },
            }
          },
          valueContainer: (styles, valueContainerProps) => {
            let customStyles: CSSObjectWithLabel = {};
            if(searchStyle) {
              customStyles = {
                overflow: searchStyle ? 'visible' : 'hidden',
                '&:before': {
                  content: '""',
                  position: 'absolute',
                  top: '50%',
                  left: '10px',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  background: `url(${SearchIcon}) no-repeat center`,
                  backgroundSize: 'contain',
                  marginLeft: '-24px',
                }
              }
            }
            return {
              ...styles,
              ...customStyles,
            }
          },
        }}
        placeholder={placeholder}
        cacheOptions
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        value={defaultOptions.find(optItem => optItem.value === selected)}
        onChange={(e) => handleChange(e)}
        isDisabled={disabled || readOnly}
        menuPlacement={menuPlacement}
        defaultValue={defaultOption}
        noOptionsMessage={noOptionsMessage}
        {...(searchStyle && {
          components: {
            DropdownIndicator: () => null,
            IndicatorSeparator:() => null,
            ClearIndicator: (props) => {
              // reference: https://codesandbox.io/p/sandbox/react-select-custom-clearindicator-c8fxv?file=%2Fexample.js%3A18%2C48-18%2C71
              // reference: https://codesandbox.io/p/sandbox/react-select-custom-valuecontainer-nnvmu?file=%2Findex.js%3A14%2C24-35%2C2
              const clearValue = () => {
                props.clearValue();
                // props.selectProps?.onClear && props.selectProps.onClear();
                searchStyleOnClear?.();
              };
            
              const innerProps = {
                ...props.innerProps,
                onMouseDown: clearValue,
                onTouchEnd: clearValue,
              };
              return (
                <components.ClearIndicator {...props} innerProps={innerProps}>
                  <span className="block cursor-pointer">
                    <img src={CloseIcon} alt="" className="size-5 opacity-50" />
                  </span>
                </components.ClearIndicator>
              )
            },
          },
          isClearable: true,
        })}
      />
      {fieldHasError && (
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
  icon?: string | null;
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
  icon = null,
  customWrapperClass = "col-span-4",
}) => {
  const handleChange = (e:any) => {
    onChange?.(e)
  }
  
  return (
    <label
      htmlFor={id}
      className={`bg-white flex justify-between items-center p-3 rounded-lg shadow-sm border-gray-200${disabled ? ' opacity-50' : ''} cursor-pointer ${customWrapperClass}`}>
      <span className="flex gap-2 items-center">
        {icon && (
          <img src={icon} alt="icon"/>
        )}
        <span className={`block text-sm font-display font-semibold text-field-label-valid`}>
          {label}
        </span>
      </span>
      <div>
        <input
          type={type}
          id={id}
          name={name}
          checked={checked}
          onChange={handleChange}
          onBlur={onBlur}
          className="mt-1 w-12 h-11 px-3 disabled:bg-gray-200 disabled:border-gray-300 rounded-md text-sm shadow-sm sr-only peer focus-visible:outline-4 focus-visible:shadow-none"
          disabled={disabled}
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
          className="relative w-12 h-7 pointer-events-none touch-none bg-gray-200 rounded-full peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:start-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500 peer-focus:outline outline-2 outline-accent-blue-dark"
        ></div>
      </div>
    </label>
  );
};

type AdminFormFieldSubmitProps = {
  type?: 'submit' | 'button';
  variant?: 'primary' | 'primary-like' | 'secondary' | 'danger-transparent' | 'danger' | 'success';
  label: string | ReactNode;
  titleText?: string;
  onClick?: () => void;
  disabled?: boolean;
  customWrapperClass?: string;
};

export const AdminFormFieldSubmit: FC<AdminFormFieldSubmitProps> = ({ type = 'submit', variant = 'secondary', label, titleText = '', onClick, disabled = false, customWrapperClass = "col-span-6" }) => {
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
    <div className={customWrapperClass}>
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

type AdminFormFieldPillListProps = {
  customWrapperClass?: string;
  disabled?: boolean;
  children?: ReactNode;
};

export const AdminFormFieldPillList: FC<AdminFormFieldPillListProps> = ({
  customWrapperClass = "col-span-12",
  disabled = false,
  children,
}) => {
  return (
    <div className={`${customWrapperClass} p-3 gap-2 ${!disabled ? "bg-white" : "bg-gray-100"} border border-gray-300 rounded-lg flex items-start flex-wrap min-h-24`}>
      {children}
    </div>
  )
}

export type PillItem = {
  name: string;
};
type AdminFormFieldPillItemProps = {
  disabled: boolean;
  item: PillItem;
  onRemove: (item: any) => void;
};

export const AdminFormFieldPillItem: FC<AdminFormFieldPillItemProps> = ({
  disabled,
  item,
  onRemove,
}) => {
  return (
    <div className="flex items-center bg-gray-200 rounded-lg gap-3 py-1 px-2">
      <span className="p-1 font-semibold text-sm text-gray-500 leading-4 tracking-tighter">{item.name}</span>
      {!disabled && (
        <img
          src={CloseIcon}
          alt={item.name}
          className="size-5 cursor-pointer opacity-80 hover:opacity-40"
          onClick={() => onRemove(item)}
        />
      )}
    </div>
  )
}
