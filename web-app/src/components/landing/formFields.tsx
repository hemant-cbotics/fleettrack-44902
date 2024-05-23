import React, { FC } from "react";

type LandingFormFieldInputProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  value?: string;
  touched?: boolean;
  error?: string;
  readonly?: boolean;
  customInputClass?: string;
};

export const LandingFormFieldInput: FC<LandingFormFieldInputProps> = ({ label, type, id, name, placeholder = '', onChange, onBlur, value, touched, error, readonly = false, customInputClass = '' }) => {
  let wrapperClass = touched && !!error ? '' : '';
  let labelClass =
    touched && !!error
    ? 'text-field-error-dark'
    : 'text-field-label-valid';
  let inputClass =
    touched && !!error
    ? 'border-field-error-border focus-visible:outline-field-error-dark text-field-error-dark'
    : 'border-gray-200 focus-visible:outline-accent-blue-pale text-field-label-valid';
  const floatingError = false;

  return (
    <div className={`col-span-6${floatingError ? ` relative pb-4` : ''} ${wrapperClass}`}>
      <label
        htmlFor={id}
        className={`block text-sm font-display font-semibold ${labelClass}`}>
          {label}
      </label>

      <input
        {...(type === 'password' && { autoComplete: 'off' })}
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        readOnly={readonly}
        className={`mt-1 w-full h-11 px-3 rounded-md bg-white read-only:bg-gray-200 read-only:border-gray-300 text-sm shadow-sm focus-visible:outline-4 focus-visible:shadow-none${touched ? ' touched' : ''} ${inputClass} ${customInputClass}`}
      />
      {touched && !!error && <p className={`${floatingError ? 'absolute' : ''} bg-field-error-light px-2 py-1 rounded text-field-error-dark text-xs mt-1`}>{error}</p>}
    </div>
  );
}

type LandingFormFieldSubmitProps = {
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
};

export const LandingFormFieldSubmit: FC<LandingFormFieldSubmitProps> = ({ type = 'submit', variant = 'secondary', label, onClick, disabled = false }) => {
  let variantClass = "";
  const disabledClass = "border-gray-200 bg-gray-200 text-gray-400"
  switch (variant) {
    case "primary":
      variantClass =
        disabled
        ? disabledClass
        : "border-accent-blue-pale bg-accent-blue-pale text-accent-blue-dark enabled:hover:bg-accent-blue-dark enabled:hover:text-white enabled:hover:bg-accent-blue-dark active:bg-accent-blue-pale";
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
        className={`h-12 w-full rounded-lg border text-sm font-display font-semibold transition focus:outline-none focus:ring ${variantClass}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
      >
        {label}
      </button>
    </div>
  );
}
