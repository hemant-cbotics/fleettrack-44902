/**
 * -----------------------------------------------------------------------------
 * Groups Listing Page
 * -----------------------------------------------------------------------------
 * This page is used to list all the groups of the organization.
 */

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { TListingQueryParams, TModalsState, setListingQueryParams, setModalsData } from "../../../api/store/commonSlice";
import { localStorageKeys, useLocalStorage } from "../../../utils/localStorageItems";
import { EditListingColumnsButton, EditListingColumnsModal, TListingColumn } from "../../../components/editListingColumns";
import React from "react";
import { useLoggedInUserData } from "../../../utils/user";
import { APP_CONFIG } from "../../../constants/constants";
import { useDebouncedCallback } from "use-debounce";
import { useOrganizationGroupsQuery } from "../../../api/network/adminApiServices";
import { TAdminTableRowData } from "../components/types";
import { OrganizationGroup } from "../../../api/types/Group";
import { routeUrls } from "../../../navigation/routeUrls";
import HeaderView from "../../../components/admin/headerView";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import ListingTableHeader from "../components/listingTableHeader";
import AdminTable from "../components/adminTable";
import Pagination, { TPaginationSelected } from "../components/pagination";
import { TSelectboxOption } from "../../../components/admin/formFields";
import AdminsGroupsCreateNew from "./createNewGroup";


const all_columns = [
  "Name",
  "Description",
  "No. Of Active Vehicles",
  "No. Of Inactive Vehicles",
  "Parent Group",
]

const ScreenDashboardAdminGroups = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.groups'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const listingQueryParams: TListingQueryParams = useSelector((state: any) => state.commonReducer.listingQueryParams);
  const { groups: orgGroupsQueryParams } = listingQueryParams;
  const dispatch = useDispatch();

  // columns
  const { getLocalStorageItem } = useLocalStorage();
  const savedColumns = getLocalStorageItem(localStorageKeys.columns.Groups);
  const [columns, setColumns] = React.useState<TListingColumn[]>(
    all_columns
      .map((colItem, _) => {
        return {
          name: colItem,
          show: !!savedColumns ? savedColumns.includes(colItem) : true
        }
      })
    );

  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    dispatch(setListingQueryParams({ ...listingQueryParams, groups: { ...orgGroupsQueryParams, search: value }}));
  }, 500);

  // fetch groups data
  const {
    data: dataOrgGroups,
    isFetching: isFetchingOrgGroups,
    error
  } = useOrganizationGroupsQuery(orgGroupsQueryParams);

  const { count, next, previous, results } = dataOrgGroups || {};

  // preparing table data
  const tableData: TAdminTableRowData[] = !!results
  ? (results || [] as OrganizationGroup[]).map((item: OrganizationGroup, index: number) => (
    {
      navLink: `${routeUrls.dashboardChildren.adminChildren.groups}/${item.id}`,
      cellData: [
        item?.name ?? '-', // "Group Name",
        item?.description ?? '-', // "Description",
        item?.vehicles?.filter(vehicle => vehicle.is_active).length ?? 0, // "Active Vehicles",
        item?.vehicles?.filter(vehicle => !vehicle.is_active).length , // "Inactive Vehicles",
        '-', // "Parent Group"
      ].filter((_, index) => columns[index].show)
    }))
  : [];

  // rendering
  return (
    <>  
      <HeaderView title={t('heading')} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} pt-4`}>
        <ListingPageSubHeader
          heading={t("sub_heading")}
          buttonText={t("add_new")}
          buttonCallback={() => {
            dispatch(setModalsData({ ...modalsState, showCreateGroup: true }))
          }}
        />
        <ListingTableHeader
          heading={t("listing_heading")}
          searchBoxPlaceholder={t("search_placeholder")}
          searchBoxValue={orgGroupsQueryParams.search}
          searchBoxOnChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
        />
        <EditListingColumnsModal
          columns={columns}
          setColumns={setColumns}
          lsKey={localStorageKeys.columns.Groups}
        />
        <div className="py-4 mt-4 relative">
          <EditListingColumnsButton />
          <AdminTable
            columns={columns.filter(item => item.show).map((item) => item.name)}
            data={tableData}
            isLoading={isFetchingOrgGroups}
          />
          {!isFetchingOrgGroups && (
            <Pagination
              pageSize={orgGroupsQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                dispatch(setListingQueryParams({ ...listingQueryParams, groups: { ...orgGroupsQueryParams, page: 1, page_size: parseInt(`${e?.value}`) }}));
              }}
              totalPages={count ? Math.ceil(count / orgGroupsQueryParams.page_size) : 1}
              forcePage={orgGroupsQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                dispatch(setListingQueryParams({ ...listingQueryParams, groups: { ...orgGroupsQueryParams, page: data?.selected + 1 }}));
              }}
            />
          )}
        </div>
      </div>
      <AdminsGroupsCreateNew />
    </>
  )
}

export default ScreenDashboardAdminGroups;