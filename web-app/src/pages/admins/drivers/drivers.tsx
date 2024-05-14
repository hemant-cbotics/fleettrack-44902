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
import { OrganizationVehicle } from "../../../api/types/Vehicle";
import { routeUrls } from "../../../navigation/routeUrls";
import { TSelectboxOption } from "../../../components/admin/formFields";

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
    ? (results || [] as OrganizationVehicle[]).map((item: OrganizationVehicle, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.drivers}/${item.id}`,
        cellData: [
          index + 1, // "Sr. No",
          "-", // "Vehicle Id",
          "-", // "Description",
          "-", // "Equipment Type (VIN)",
          "-", // "ECM VIN",
          "-", // "Server ID",
          "-", // "Active"
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
          buttonCallback={() => console.log("Add new button clicked")}
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
    </>
  );
};

export default ScreenDashboardAdminDrivers;
