import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";
import { TAdminTableData } from "./types";

interface AdminTableProps {
  data: TAdminTableData[] | null;
  columns: string[];
}

const AdminTable: FC<AdminTableProps> = ({ columns, data }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="overflow-y-auto">
      <table className="w-full">
        <thead className="sticky top-0 bg-white border-b border-gray-500">
          <tr>
            {columns?.map((column, index) => (
              <th key={index} className="px-4 py-3 text-left text-sm font-semibold text-black leading-6 whitespace-nowrap">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 border-b border-gray-200">
          {!!data && data.length > 0 ? data.map((item: any, index: number) => (
            <tr key={`table_${index}_${item.SrNo}`} className="cursor-pointer" onClick={() => {
              navigate(`${routeUrls.dashboardChildren.adminChildren.users}/${item.id}`);
            }}>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {index + 1}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {item.id}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {item.description}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {item.role}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {item.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {item.email}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {item.timezone}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {item.active ? "Yes" : "No"}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-xs font-medium leading-6 text-gray-700">
                {item.last_login}
              </td>
            </tr>
          )) : (
            <tr><td colSpan={columns.length} className="text-center py-24 text-lg font-bold text-gray-400">{t('no_items_found')}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable;