import { FC } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { APP_CONFIG } from "../../../constants/constants";

export type TPaginationSelected = {
  selected: number;
}

type TPaginatonProps = {
  pageSizeOptions?: number[];
  pageSize: number;
  handlePageSizeChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  totalPages?: number;
  forcePage: number;
  handlePageClick: (data: TPaginationSelected) => void;
}

const Pagination: FC<TPaginatonProps> = ({
  pageSizeOptions = APP_CONFIG.LISTINGS.PAGE_SIZES,
  pageSize = APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
  handlePageSizeChange,
  totalPages = 1,
  forcePage,
  handlePageClick
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "pagination" });
  return (
    <div className="flex justify-between mt-7 items-center">
      <div className="flex space-x-4 items-center">
        <p className="font-semibold text-sm leading-6">{t('number_of_items')}</p>
        <select
          className="w-16 h-10 px-0 rounded-md bg-white text-sm text-center shadow-sm border focus-visible:outline-4 focus-visible:shadow-none"
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          {pageSizeOptions.map((ps, i) => (
            <option key={`page_${ps}_${i}`} value={ps}>{ps}</option>
          ))}
        </select>
      </div>
      <ReactPaginate
        onPageChange={handlePageClick}
        pageCount={totalPages}
        forcePage={forcePage}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        containerClassName="flex space-x-2 items-center text-sm"
        pageClassName="border border-gray-200 rounded-lg"
        pageLinkClassName="block px-4 py-2 text-gray-600"
        activeClassName="bg-accent-blue-pale text-accent-blue-dark"
        previousClassName="border border-gray-200 px-4 py-2 rounded-lg"
        nextClassName="border border-gray-200 px-4 py-2 rounded-lg"
        disabledClassName="text-gray-400 opacity-50"
        disabledLinkClassName="cursor-default"
        breakLabel="..."
        previousLabel="Prev"
        nextLabel="Next"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
