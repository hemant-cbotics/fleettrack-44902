import { FC } from "react";
import { useTranslation } from "react-i18next";

interface PaginatonProps {
  pageSize: number;
  currentPage: number;
  count: number;
}

const Pagination: FC<PaginatonProps> = ({ pageSize, currentPage, count }) => {
  const { t } = useTranslation("translation", { keyPrefix: "pagination" });
  return (
    <div className="flex justify-between mt-7 items-center">
      <div className="flex space-x-4 items-center">
        <p className="font-semibold text-sm leading-6">{t('number_of_items')}</p>
        <select className="p-2">
          <option>10</option>
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
      <div className="flex space-x-2 items-center">
        <button disabled = {currentPage < 2} className="border border-gray-200 px-4 py-2 rounded-lg">Prev</button>
        <button className="border border-gray-200 px-4 py-2 rounded-lg">1</button>
        <button className="border border-gray-200 px-4 py-2 rounded-lg">2</button>
        <button className="border border-gray-200 px-4 py-2 rounded-lg">3</button>
        <button className="border border-gray-200 px-4 py-2 rounded-lg">...</button>
        <button className="border border-gray-200 px-4 py-2 rounded-lg">{10}</button>
        <button disabled = {currentPage > pageSize -1} className="border border-gray-200 px-4 py-2 rounded-lg">Next</button>
      </div>
    </div>
  );
};

export default Pagination;
