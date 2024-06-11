import React from "react";
import CloseIcon from "../assets/svg/close-icon.svg";

type TSearchBoxProps = {
  wrapperClassName?: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
};

const AppSearchBox: React.FC<TSearchBoxProps> = ({
  wrapperClassName = "",
  placeholder,
  value = "",
  onChange,
  onClear
}) => {
  const [searchText, setSearchText] = React.useState<string>(value);
  return (
    <div className={`relative ${wrapperClassName}`}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          onChange?.(e)
        }}
        className="w-full rounded-md border-gray-200 py-2.5 ps-10 shadow-sm sm:text-sm"
      />

      <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
        <span className="text-gray-600 hover:text-gray-700">
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
        </span>
      </span>
      {!!onClear && !!searchText && (<button type="button" className="absolute inset-y-0 end-0 grid w-10 place-content-center">
        <img src={CloseIcon} alt={'Clear'}
          className="size-5 cursor-pointer opacity-80 hover:opacity-40"
          onClick={() => {
            setSearchText('');
            onClear?.()
          }}/>
      </button>)}
    </div>
  )
}
export default AppSearchBox;