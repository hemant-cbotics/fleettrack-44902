import { FC } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { APP_CONFIG } from "../../../constants/constants";
import Select from "react-select";
import { TSelectboxOption } from "../../../components/admin/formFields";

export type TPaginationSelected = {
  selected: number;
}

type TPaginatonProps = {
  pageSizeOptions?: number[];
  pageSize: number;
  // handlePageSizeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handlePageSizeChange?: (e: TSelectboxOption | null) => void;
  totalPages?: number;
  forcePage: number;
  handlePageClick: (data: TPaginationSelected) => void;
  onlyPageChange?: boolean;
  size?: 1 | 2;
}

const Pagination: FC<TPaginatonProps> = ({
  pageSizeOptions = APP_CONFIG.LISTINGS.PAGE_SIZES,
  pageSize = APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
  handlePageSizeChange,
  totalPages = 1,
  forcePage,
  handlePageClick,
  onlyPageChange = false,
  size = 2,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "pagination" });
  return (
    <div className={`flex ${onlyPageChange ? "justify-center" : "justify-between"} mt-7 items-center`}>
      {onlyPageChange ? <></> : (
      <div className="flex space-x-4 items-center">
        <p className="font-semibold text-sm leading-6">{t('number_of_items')}</p>
        <Select
          classNames={{
            control: (state) =>
              state.isFocused ? 'border-red-600' : 'border-grey-300',
          }}
          options={pageSizeOptions.map((ps) => ({ value: `${ps}`, label: `${ps}` }))}
          defaultValue={{ value: `${pageSize}`, label: `${pageSize}` }}
          onChange={handlePageSizeChange}
        />
      </div>
      )}
      <ReactPaginate
        onPageChange={handlePageClick}
        pageCount={totalPages}
        forcePage={forcePage}
        pageRangeDisplayed={2}
        marginPagesDisplayed={2}
        containerClassName={`flex gap-${size} items-center ${size === 1 ? "text-xs" : "text-sm"} `}
        pageClassName={`border border-gray-200 rounded-lg`}
        pageLinkClassName={`block px-${size*2} py-${size} text-gray-600`}
        activeClassName={`bg-accent-blue-pale text-accent-blue-dark`}
        previousClassName={`border border-gray-200 px-${size*2} py-${size} rounded-lg`}
        nextClassName={`border border-gray-200 px-${size*2} py-${size} rounded-lg`}
        disabledClassName={`text-gray-400 opacity-50`}
        disabledLinkClassName={`cursor-default`}
        breakLabel="..."
        previousLabel="Prev"
        nextLabel="Next"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
