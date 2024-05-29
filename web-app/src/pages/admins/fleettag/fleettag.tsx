/**
 * -----------------------------------------------------------------------------
 * Fleettags Listing Page
 * -----------------------------------------------------------------------------
 * This page is used to list all the fleettags of the organization.
 */

import React from "react";
import AdminTable from "../components/adminTable";
import Pagination, { TPaginationSelected } from "../components/pagination";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import HeaderView from "../../../components/admin/headerView";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import ListingTableHeader, { TListingFilters } from "../components/listingTableHeader";
import { useDebouncedCallback } from "use-debounce";
import { useOrganizationFleettagsQuery } from "../../../api/network/adminApiServices";
import { useLoggedInUserData } from "../../../utils/user";
import { TAdminTableRowData } from "../components/types";
import { routeUrls } from "../../../navigation/routeUrls";
import { TSelectboxOption } from "../../../components/admin/formFields";
import { setModalsData, TModalsState } from "../../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import AdminsFleetTagsCreateNew from "./createNewFleettag";
import { localStorageKeys, useLocalStorage } from "../../../utils/localStorageItems";
import { EditListingColumnsButton, EditListingColumnsModal, TListingColumn } from "../../../components/editListingColumns";
import { OrganizationFleettag } from "../../../api/types/Fleettag";

const all_columns = [
  "Fleet Tag ID",
  "Fleet Tag Name",
  "In Range",
  "Last Connected/Disconnected Address",
  "Timestamp",
  "Status",
  "Last Updated",
  "Last Location",
  "Vehicle Id"
]

const ScreenDashboardAdminFleetTags = () => {
  const { t: tMain } = useTranslation();
  const { t: tFilters } = useTranslation('translation', { keyPrefix: 'admins.filters'});
  const { t } = useTranslation('translation', { keyPrefix: 'admins.fleettags'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  // columns
  const { getLocalStorageItem } = useLocalStorage();
  const savedColumns = getLocalStorageItem(localStorageKeys.columns.Fleettags);
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
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgFleetTagsQueryParams, setOrgFleetTagsQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: ""
  });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgFleetTagsQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  // fetching fleettags data
  const {
    data: dataOrgFleetTags,
    isFetching: isFetchingOrgFleetTags,
    error
  } =
    useOrganizationFleettagsQuery(orgFleetTagsQueryParams);
  const { count, next, previous, results } = dataOrgFleetTags || {};

  // preparing table data
  const tableData: TAdminTableRowData[] = !!results
    ? (results || [] as OrganizationFleettag[]).map((item: OrganizationFleettag, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.fleettags}/${item.id}`,
        cellData: [
          item?.fleet_tag_id ?? '-', // "Fleet Tag ID",
          item?.fleet_tag_name ?? '-', // "Name",
          item?.in_range
            ? <span className="text-field-success">{tMain('yes')}</span>
            : <span className="text-field-error-dark">{tMain('no')}</span>, // "In Range",
          item?.last_address ?? '-', // "Last Connected/Disconnected Address",
          '-', // "Timestamp"
          '-', // "Status",
          item?.updated_at ?? '-', // "Last Updated",
          item?.last_location ?? '-', // "Geopoint",
          '-' // "Vehicle Id"
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
            dispatch(setModalsData({ ...modalsState, showCreateFleetTag: true }))
          }}
        />
        <ListingTableHeader
          heading={t("listing_heading")}
          searchBoxPlaceholder={t("search_placeholder")}
          searchBoxOnChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
        />
        <EditListingColumnsModal
          columns={columns}
          setColumns={setColumns}
          lsKey={localStorageKeys.columns.Fleettags}
        />
        <div className="py-4 mt-4 relative">
          <EditListingColumnsButton />
          <AdminTable
            columns={columns.filter(item => item.show).map((item) => item.name)}
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
