import React from "react";
import AdminTable from "../components/adminTable";
import Pagination, { TPaginationSelected } from "../components/pagination";
import SearchIcon from "../../../assets/svg/search-icon.svg";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import HeaderView from "../../../components/admin/headerView";
import ButtonIconPlus from "../../../assets/svg/buttonicon-plus.svg";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import ListingTableHeader from "../components/listingTableHeader";
import AdminsUsersCreateNew from "./createNewUser";
import { useDispatch, useSelector } from "react-redux";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import { useOrganizationUsersQuery } from "../../../api/network/adminApiServices";
import { TAdminTableData } from "../components/types";
import { sessionStorageKeys, useSessionStorage } from "../../../utils/sessionStorageItems";
import { OrganizationUser } from "../../../api/types/Admin";
import { TLoggedInUser, TLoggedInUserOrganization } from "../../../api/types/User";
import { useDebouncedCallback } from 'use-debounce';

const columns = [ "Sr. No", "User Id", "Description", "Role", "Contact Name", "Email", "Timezone", "Active", "Last Login"]

const ScreenDashboardAdminUsers = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'admins.users'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  const { getSessionStorageItem } = useSessionStorage();

  const thisUser = {
    ownerOrganization: getSessionStorageItem(sessionStorageKeys.ownerOrganization),
    user: getSessionStorageItem(sessionStorageKeys.user)
  };
  const thisUserOrganizationId = !!thisUser.ownerOrganization
    ? ((thisUser.ownerOrganization || {}) as TLoggedInUserOrganization)?.id
    : ((thisUser.user || {}) as TLoggedInUser)?.role_and_permission?.role?.organization;

  const [orgUsersQueryParams, setOrgUsersQueryParams] = React.useState({
    organization_id: thisUserOrganizationId,
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

  const tabledata: TAdminTableData[] = !!results ? (results || [] as OrganizationUser[]).map((item: OrganizationUser, index: number) => (
    {
      SrNo: index + 1,
      id: item?.user?.id,
      description: item?.user?.profile?.description || "Not available",
      role: item?.user?.role_and_permission?.role?.name || "Not available",
      name: item?.user?.name || "Not available",
      email: item?.user?.email,
      timezone: item?.user?.profile?.timezone || "Not available",
      active: item?.user?.profile?.is_active,
      last_login: "2021-09-01 12:00:00"
    }
  )) : [];
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
          <AdminTable columns={columns} data={tabledata} isLoading={isFetchingOrgUsers} />
          {!isFetchingOrgUsers && (
            <Pagination
              pageSize={orgUsersQueryParams.page_size}
              handlePageSizeChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setOrgUsersQueryParams((prev) => { return {
                  ...prev,
                  page: 1,
                  page_size: parseInt(e.target.value)
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
