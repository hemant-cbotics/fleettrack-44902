import React, { FC } from "react";
import SearchIcon from "../../../assets/svg/search-icon.svg";
import AppSearchBox from "../../../components/searchBox";

export type TListingFilters = {
  slug: string;
  title: string;
};

type TListingTableHeaderProps = {
  heading: string;
  searchBoxPlaceholder?: string;
  searchBoxOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters?: TListingFilters[];
  activeFilterSlug?: string;
  handleFilterChange?: (slug: string) => void;
};

const ListingTableHeader: FC<TListingTableHeaderProps> = ({
  heading,
  searchBoxPlaceholder,
  searchBoxOnChange,
  filters,
  activeFilterSlug,
  handleFilterChange
}) => {
  return (
    <div className="flex mt-6">
      <div className="flex items-center">
        <p className="text-lg font-bold leading-6">{heading}</p>
      </div>
      <div className="flex-grow"></div>
      {filters && filters.length > 0 && (
        <>
          <div className="sm:hidden">
            <label htmlFor="Tab" className="sr-only">Tab</label>

            <select id="Tab" className="w-full rounded-md border-gray-200">
              {filters.map((filter, i) => (
                <option key={`select_${i}_${filter.slug}`} {...(filter.slug === activeFilterSlug ? { selected: true } : null)}>
                  {filter.title}
                </option>
              ))}
            </select>
          </div>

          <div className="hidden sm:block">
            <nav className="X-mb-px flex gap-3 mr-4 translate-y-1" aria-label="Tabs">
              {filters.map((filter, i) => (
                <a
                  className={`shrink-0 border-b-2 px-1 py-2 text-sm font-semibold ${filter.slug === activeFilterSlug ? `border-accent-blue-text text-accent-blue-text cursor-default` : `border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 cursor-pointer`}`}
                  key={`tab_${i}_${filter.slug}`}
                  onClick={() => handleFilterChange?.(filter.slug)}
                >
                  {filter.title}
                </a>
              ))}
            </nav>
          </div>
        </>
      )}
      <div className="flex">
        {searchBoxPlaceholder && searchBoxOnChange && (
          <AppSearchBox
            placeholder={searchBoxPlaceholder}
            onChange={searchBoxOnChange}
          />
        )}
        {/* <div className="relative ml-4">
          <input
            type="text"
            className="w-full p-2 pl-10 rounded-md border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <img
            src={SearchIcon}
            alt="search-icon"
            className="absolute size-5 left-3 top-1/2 transform -translate-y-1/2"
          />
        </div> */}
      </div>
    </div>
  )
};
export default ListingTableHeader;
