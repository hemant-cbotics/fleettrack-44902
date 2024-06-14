import { FC } from "react";
import CheckedIcon from "../assets/svg/checked-icon.svg"

const SortingItems = [
  "Latest First", "Oldest First" , "Alphabetical (A to Z)", "Alphabetical (Z to A)"
]

type SortingFilterProps = {
  showSortingDropdown?: boolean,
  selectedSorting: string,
  setSelectedSorting: (item:any) => void,
}

// TODO , maybe make it as general component to use in various place
const SortingFilter:FC<SortingFilterProps> = ({showSortingDropdown = false, selectedSorting, setSelectedSorting}) => {
  return (
    <div
      className={`absolute top-4 right-2 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg z-modal${
        showSortingDropdown ? "" : " hidden"
      }`}
      role="menu"
    >
      <div className="p-2 space-y-2">
        {SortingItems?.map((item, index) => (
          <div className="px-3 py-2 space-x-3 flex items-center" key={index}>
            {selectedSorting === item && (
              <img src={CheckedIcon} alt="checked-icon" />
            )}
            <p
              className={`block rounded-lg text-sm cursor-pointer hover:text-blue-700 ${selectedSorting === item ? "text-blue-700" : "text-gray-500"}`}
              role="menuitem"
              onClick={() => setSelectedSorting(item)}
            >
            {item}
          </p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default SortingFilter;
