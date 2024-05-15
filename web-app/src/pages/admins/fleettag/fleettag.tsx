import React from "react";
import AdminTable from "../components/adminTable";
import Pagination, { TPaginationSelected } from "../components/pagination";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import HeaderView from "../../../components/admin/headerView";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import ListingTableHeader, { TListingFilters } from "../components/listingTableHeader";
import { useDebouncedCallback } from "use-debounce";
import { useOrganizationDriversQuery } from "../../../api/network/adminApiServices";
import { useLoggedInUserData } from "../../../utils/user";
import { TAdminTableRowData } from "../components/types";
import { routeUrls } from "../../../navigation/routeUrls";
import { TSelectboxOption } from "../../../components/admin/formFields";
import { setModalsData, TModalsState } from "../../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminsFleetTagsCreateNew from "./createNewFleettag";
import { OrganizationDriver } from "../../../api/types/Driver";

const columns = [
  "Sr. No",
  "Fleet Tag ID",
  "Description",
  "In Range",
  "Last Connected/Disconnected Address",
  "Timestamp"
]

const ScreenDashboardAdminFleetTags = () => {
  const { t: tFilters } = useTranslation('translation', { keyPrefix: 'admins.filters'});
  const { t } = useTranslation('translation', { keyPrefix: 'admins.fleettags'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  // TODO: Start - Change the following line to use the correct API call for fleet tags
  const [orgFleetTagsQueryParams, setOrgFleetTagsQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: ""
  });
  // TODO: End - Change the following line to use the correct API call for fleet tags
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgFleetTagsQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  const {
    data: dataOrgFleetTags,
    isFetching: isFetchingOrgFleetTags,
    error
  } =
    useOrganizationDriversQuery(orgFleetTagsQueryParams);
  const { count, next, previous, results } = dataOrgFleetTags || {};

  const tableData: TAdminTableRowData[] = !!results
    ? (results || [] as OrganizationDriver[]).map((item: OrganizationDriver, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.fleettags}/${item.id}`,
        cellData: [
          index + 1, // "Sr. No",
          '-', // "Fleet Tag ID",
          '-', // "Description",
          '-', // "In Range",
          '-', // "Last Connected/Disconnected Address",
          '-', // "Timestamp"
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
            dispatch(setModalsData({ ...modalsState, showCreateFleetTag: true }))
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
            isLoading={isFetchingOrgFleetTags}
          />
          {!isFetchingOrgFleetTags && (
            <Pagination
              pageSize={orgFleetTagsQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                setOrgFleetTagsQueryParams((prev) => { return {
                  ...prev,
                  page: 1,
                  page_size: parseInt(`${e?.value}`)
                }})
              }}
              totalPages={count ? Math.ceil(count / orgFleetTagsQueryParams.page_size) : 1}
              forcePage={orgFleetTagsQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                setOrgFleetTagsQueryParams((prev) => { return {
                  ...prev,
                  page: data?.selected + 1
                }})
              }}
            />
          )}
        </div>
      </div>
      <AdminsFleetTagsCreateNew />
    </>
  );
};

export default ScreenDashboardAdminFleetTags;
