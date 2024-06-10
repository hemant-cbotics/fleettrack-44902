import React from "react";

type TSearchBoxProps = {
  wrapperClassName?: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const AppSearchBox: React.FC<TSearchBoxProps> = ({
  wrapperClassName = "",
  placeholder,
  value = "",
  onChange
}) => {
  return (
    <div className={`relative ${wrapperClassName}`}>
      <input
        type="text"
        placeholder={placeholder}
        defaultValue={value}
        // value={value}  // TODO: Uncomment this line to make the input controlled
        onChange={onChange}
        className="w-full rounded-md border-gray-200 py-2.5 ps-10 shadow-sm sm:text-sm"
      />

      <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
        <button type="button" className="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </span>
    </div>
  )
}
export default AppSearchBox;