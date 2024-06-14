import React from "react";
import SearchIcon from "../assets/svg/search-icon.svg";
import CloseIcon from "../assets/svg/close-icon.svg";

type TSearchBoxProps = {
  wrapperClassName?: string;
  inputClassName?: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
};

const AppSearchBox: React.FC<TSearchBoxProps> = ({
  wrapperClassName = "",
  inputClassName = "w-full rounded-md border-gray-200 py-2.5 ps-10 shadow-sm sm:text-sm",
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
        className={inputClassName}
      />

      <span className="absolute inset-y-0 start-0 grid w-10 place-content-center">
        <span className="text-gray-600 hover:text-gray-700">
          <span className="sr-only">Search</span>

          <img src={SearchIcon} alt={'Search'} className="size-4" />
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