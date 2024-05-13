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
    <div className="overflow-y-auto max-h-[350px]">
      <table className="w-full">
        <thead className="sticky top-0 bg-gray-50 border-b border-gray-500">
          <tr>
            {columns?.map((column, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-semibold text-black leading-6 uppercase tracking-wider">
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
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {item.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {item.role}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {item.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {item.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {item.timezone}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {item.active ? "Yes" : "No"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium leading-6 text-gray-700">
                {item.last_login}
              </td>
            </tr>
          )) : (
            <tr><td colSpan={columns.length} className="text-center py-4">{t('no_items_found')}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminTable;