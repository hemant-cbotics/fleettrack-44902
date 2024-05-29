/**
 * -----------------------------------------------------------------------------
 * Drivers Listing Page
 * -----------------------------------------------------------------------------
 * This page is used to list all the drivers of the organization.
 */

import React, { useEffect } from "react";
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
import { localStorageKeys, useLocalStorage } from "../../../utils/localStorageItems";
import { EditListingColumnsButton, EditListingColumnsModal, TListingColumn } from "../../../components/editListingColumns";
import { FilterType } from "../../../api/types/Admin";

const all_columns = [
  "Driver Id",
  "Driver Name",
  "Badge/Employee ID",
  "Card ID",
  "License Number",
  "License Type",
  "License Expiry",
  "Hazmat Certified",
  "Active",
]

const ScreenDashboardAdminDrivers = () => {
  const { t: tMain } = useTranslation();
  const { t: tFilters } = useTranslation('translation', { keyPrefix: 'admins.filters'});
  const { t } = useTranslation('translation', { keyPrefix: 'admins.drivers'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  // columns
  const { getLocalStorageItem } = useLocalStorage();
  const savedColumns = getLocalStorageItem(localStorageKeys.columns.Drivers);
  const [columns, setColumns] = React.useState<TListingColumn[]>(
    all_columns
      .map((colItem, _) => {
        return {
          name: colItem,
          show: !!savedColumns ? savedColumns.includes(colItem) : true
        }
      })
    );

  // filters
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

  // filter mechainism
  const [activeFilterSlug, setActiveFilterSlug] = React.useState<FilterType>("active");
  
  // updating query params on filter change
  useEffect(() => {
    setOrgDriversQueryParams((prev) => { return { ...prev,page: 1, is_active: activeFilterSlug }});
  }, [activeFilterSlug])

  // preparing query params
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgDriversQueryParams, setOrgDriversQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: "",
    is_active: activeFilterSlug,
  });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgDriversQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  // fetching driver data
  const {
    data: dataOrgDrivers,
    isFetching: isFetchingOrgDrivers,
    error
  } =
    useOrganizationDriversQuery(orgDriversQueryParams);
  const { count, next, previous, results } = dataOrgDrivers || {};

  // preparing table data
  const tableData: TAdminTableRowData[] = !!results
    ? (results || [] as OrganizationDriver[]).map((item: OrganizationDriver, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.drivers}/${item.id}`,
        cellData: [
          item?.id, // "Driver Id",
          item?.name, // "Driver Name",
          item?.badge_employee_id ?? "-", // "Badge/Employee ID",
          item?.card_id ?? "-", // "Card Id",
          item?.licence_number ?? "-", // "License Number",
          item?.licence_type ?? "-", // "License Type",
          item?.licence_expiry?.slice(0,10) ?? "-", // "License Expiry",
          item?.is_hazmat_certified
            ? <span className="text-field-success">{tMain('yes')}</span>
            : <span className="text-field-error-dark">{tMain('no')}</span>, // "Hazmat Certified",
          item?.is_active
            ? <span className="text-field-success">{tMain('yes')}</span>
            : <span className="text-field-error-dark">{tMain('no')}</span>, // "Active"
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
        <EditListingColumnsModal
          columns={columns}
          setColumns={setColumns}
          lsKey={localStorageKeys.columns.Drivers}
        />
        <div className="py-4 mt-4 relative">
          <EditListingColumnsButton />
          <AdminTable
            columns={columns.filter(item => item.show).map((item) => item.name)}
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
