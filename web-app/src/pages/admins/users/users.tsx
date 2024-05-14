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
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import { useOrganizationUsersQuery } from "../../../api/network/adminApiServices";
import { TAdminTableRowData } from "../components/types";
import { OrganizationUser } from "../../../api/types/Admin";
import { useDebouncedCallback } from 'use-debounce';
import { routeUrls } from "../../../navigation/routeUrls";
import { useLoggedInUserData } from "../../../utils/user";
import { TSelectboxOption } from "../../../components/admin/formFields";

const columns = [
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
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgUsersQueryParams, setOrgUsersQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: ""
  });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgUsersQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  const {
    data: dataOrgUsers,
    isFetching: isFetchingOrgUsers,
    error
  } =
    useOrganizationUsersQuery(orgUsersQueryParams, {
      skip: !thisUserOrganizationId
    });
  const { count, next, previous, results } = dataOrgUsers || {};

  const tableData: TAdminTableRowData[] = !!results
    ? (results || [] as OrganizationUser[]).map((item: OrganizationUser, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.users}/${item.id}`,
        cellData: [
          index + 1, // SrNo: 
          item?.user?.id, // id: 
          item?.user?.profile?.description || "Not available", // description: 
          item?.user?.role_and_permission?.role?.name || "Not available", // role: 
          item?.user?.name || "Not available", // name: 
          item?.user?.email, // email: 
          item?.user?.profile?.timezone || "Not available", // timezone: 
          item?.user?.profile?.is_active, // active: 
          "2021-09-01 12:00:00" // last_login: 
        ]
      }))
    : [];

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
          searchBoxOnChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
        />
        <div className="py-4 mt-4">
          <AdminTable
            columns={columns}
            data={tableData}
            isLoading={isFetchingOrgUsers}
            listingQueryParams={orgUsersQueryParams}
          />
          {!isFetchingOrgUsers && (
            <Pagination
              pageSize={orgUsersQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                  setOrgUsersQueryParams((prev) => { return {
                    ...prev,
                    page: 1,
                    page_size: parseInt(`${e?.value}`)
                  }})
                }}
              totalPages={count ? Math.ceil(count / orgUsersQueryParams.page_size) : 1}
              forcePage={orgUsersQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                setOrgUsersQueryParams((prev) => { return {
                  ...prev,
                  page: data?.selected + 1
                }})
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
