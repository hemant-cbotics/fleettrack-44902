/**
 * -----------------------------------------------------------------------------
 * Users Listing Page
 * -----------------------------------------------------------------------------
 * This page is used to list all the users of the organization.
 */

import React from "react";
import AdminTable from "../components/adminTable";
import Pagination, { TPaginationSelected } from "../components/pagination";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import HeaderView from "../../../components/admin/headerView";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import ListingTableHeader from "../components/listingTableHeader";
import AdminsUsersCreateNew from "./createNewUser";
import { useDispatch, useSelector } from "react-redux";
import { TListingQueryParams, TModalsState, setListingQueryParams, setModalsData } from "../../../api/store/commonSlice";
import { useOrganizationUsersQuery } from "../../../api/network/adminApiServices";
import { TAdminTableRowData } from "../components/types";
import { OrganizationUser } from "../../../api/types/Admin";
import { useDebouncedCallback } from 'use-debounce';
import { routeUrls } from "../../../navigation/routeUrls";
import { useLoggedInUserData } from "../../../utils/user";
import { TSelectboxOption } from "../../../components/admin/formFields";
import { EditListingColumnsButton, EditListingColumnsModal, TListingColumn } from "../../../components/editListingColumns";
import { localStorageKeys, useLocalStorage } from "../../../utils/localStorageItems";

const all_columns = [
  "Sr. No",
  "User Id",
  "Description",
  "Role",
  "Contact Name",
  "Email",
  "Timezone",
  "Active",
  "Last Login"
]

const ScreenDashboardAdminUsers = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'admins.users'});
  const { t: tMain } = useTranslation();
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const listingQueryParams: TListingQueryParams = useSelector((state: any) => state.commonReducer.listingQueryParams);
  const { users: orgUsersQueryParams } = listingQueryParams;
  const dispatch = useDispatch();

  // columns
  const { getLocalStorageItem } = useLocalStorage();
  const savedColumns = getLocalStorageItem(localStorageKeys.columns.Users);
  const [columns, setColumns] = React.useState<TListingColumn[]>(
    all_columns
      .map((colItem, _) => {
        return {
          name: colItem,
          show: !!savedColumns ? savedColumns.includes(colItem) : true
        }
      })
    );

  // preparing query params
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    dispatch(setListingQueryParams({ ...listingQueryParams, users: { ...orgUsersQueryParams, page: 1, search: value }}));
  }, 500);

  // fetching user data
  const {
    data: dataOrgUsers,
    isFetching: isFetchingOrgUsers,
    error
  } =
    useOrganizationUsersQuery(orgUsersQueryParams, {
      skip: !thisUserOrganizationId
    });
  const { count, next, previous, results } = dataOrgUsers || {};

  // preparing table data
  const tableData: TAdminTableRowData[] = !!results
    ? (results || [] as OrganizationUser[]).map((item: OrganizationUser, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.users}/${item.user.id}`,
        cellData: [
          index + 1, // SrNo: 
          item?.user?.id, // id: 
          item?.user?.profile?.description || "-", // description: 
          item?.user?.role_and_permission?.role?.name || "-", // role: 
          item?.user?.name || "-", // name: 
          item?.user?.email, // email: 
          item?.user?.profile?.timezone || "-", // timezone: 
          item?.user?.is_active
          ? <span className="text-field-success">{tMain('yes')}</span>
          : <span className="text-field-error-dark">{tMain('no')}</span>, // active: 
          "-" // last_login: 
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
            dispatch(setModalsData({ ...modalsState, showCreateUser: true }))
          }}
        />
        <ListingTableHeader
          heading={t("listing_heading")}
          searchBoxPlaceholder={t("search_placeholder")}
          searchBoxValue={orgUsersQueryParams.search}
          searchBoxOnChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
          searchBoxOnClear={() => debouncedSetSearchKeyword("")}
        />
        <EditListingColumnsModal
          columns={columns}
          setColumns={setColumns}
          lsKey={localStorageKeys.columns.Users}
        />
        <div className="py-4 mt-4 relative">
          <EditListingColumnsButton />
          <AdminTable
            columns={columns.filter(item => item.show).map((item) => item.name)}
            data={tableData}
            isLoading={isFetchingOrgUsers}
            listingQueryParams={orgUsersQueryParams}
          />
          {!isFetchingOrgUsers && (
            <Pagination
              pageSize={orgUsersQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                  dispatch(setListingQueryParams({ ...listingQueryParams, users: { ...orgUsersQueryParams, page: 1, page_size: parseInt(`${e?.value}`) }}));
                }}
              totalPages={count ? Math.ceil(count / orgUsersQueryParams.page_size) : 1}
              forcePage={orgUsersQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                dispatch(setListingQueryParams({ ...listingQueryParams, users: { ...orgUsersQueryParams, page: data?.selected + 1 }}));
              }}
            />
          )}
        </div>
      </div>
      <AdminsUsersCreateNew />
    </>
  );
};

export default ScreenDashboardAdminUsers;
