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
import AdminsDriversCreateNew from "./createNewDriver";
import { OrganizationDriver } from "../../../api/types/Driver";

const columns = [
  "Sr. No",
  "Driver Id",
  "Description",
  "Phone",
  "Email",
  "Badge/Employee ID",
  "Card ID"
]

const ScreenDashboardAdminDrivers = () => {
  const { t: tFilters } = useTranslation('translation', { keyPrefix: 'admins.filters'});
  const { t } = useTranslation('translation', { keyPrefix: 'admins.drivers'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  const filters: TListingFilters[] = [
    {
      slug: "active",
      title: tFilters("active"),
    },
    {
      slug: "inactive",
      title: tFilters("inactive"),
    },
    {
      slug: "both",
      title: tFilters("both"),
    },
  ];
  const [activeFilterSlug, setActiveFilterSlug] = React.useState<string>("active");

  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgDriversQueryParams, setOrgDriversQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: ""
  });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgDriversQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  const {
    data: dataOrgDrivers,
    isFetching: isFetchingOrgDrivers,
    error
  } =
    useOrganizationDriversQuery(orgDriversQueryParams);
  const { count, next, previous, results } = dataOrgDrivers || {};

  const tableData: TAdminTableRowData[] = !!results
    ? (results || [] as OrganizationDriver[]).map((item: OrganizationDriver, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.drivers}/${item.id}`,
        cellData: [
          index + 1, // "Sr. No",
          item?.name, // "Driver Id",
          "-", // "Description",
          item?.phone ?? "-", // "Phone",
          item?.email ?? "-", // "Email",
          item?.badge_employee_id ?? "-", // "Badge/Employee ID",
          item?.card_id ?? "-", // "Card ID"
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
            dispatch(setModalsData({ ...modalsState, showCreateDriver: true }))
          }}
        />
        <ListingTableHeader
          heading={t("listing_heading")}
          searchBoxPlaceholder={t("search_placeholder")}
          searchBoxOnChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
          filters={filters}
          activeFilterSlug={activeFilterSlug}
          handleFilterChange={(slug) => setActiveFilterSlug(slug)}
        />
        <div className="py-4 mt-4">
          <AdminTable
            columns={columns}
            data={tableData}
            isLoading={isFetchingOrgDrivers}
          />
          {!isFetchingOrgDrivers && (
            <Pagination
              pageSize={orgDriversQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                setOrgDriversQueryParams((prev) => { return {
                  ...prev,
                  page: 1,
                  page_size: parseInt(`${e?.value}`)
                }})
              }}
              totalPages={count ? Math.ceil(count / orgDriversQueryParams.page_size) : 1}
              forcePage={orgDriversQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                setOrgDriversQueryParams((prev) => { return {
                  ...prev,
                  page: data?.selected + 1
                }})
              }}
            />
          )}
        </div>
      </div>
      <AdminsDriversCreateNew />
    </>
  );
};

export default ScreenDashboardAdminDrivers;
