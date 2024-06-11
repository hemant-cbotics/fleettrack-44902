/**
 * -----------------------------------------------------------------------------
 * Geozones Listing Page
 * -----------------------------------------------------------------------------
 * This page is used to list all the geozones of the organization.
 */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import HeaderView from "../../../components/admin/headerView";
import { APP_CONFIG } from "../../../constants/constants";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import { TListingQueryParams, TModalsState, setListingQueryParams, setModalsData } from "../../../api/store/commonSlice";
import ListingTableHeader from "../components/listingTableHeader";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useLoggedInUserData } from "../../../utils/user";
import AdminTable from "../components/adminTable";
import Pagination, { TPaginationSelected } from "../components/pagination";
import { TSelectboxOption } from "../../../components/admin/formFields";
import { useTranslation } from "react-i18next";
import AdminsGeozonesCreateNew from "./createNewGeozone";
import { localStorageKeys, useLocalStorage } from "../../../utils/localStorageItems";
import { EditListingColumnsButton, EditListingColumnsModal, TListingColumn } from "../../../components/editListingColumns";
import { useOrganizationGeozonesQuery } from "../../../api/network/adminApiServices";
import { TAdminTableRowData } from "../components/types";
import { OrganizationGeozone } from "../../../api/types/Geozone";
import { routeUrls } from "../../../navigation/routeUrls";
import { TAutosuggestOptionValue } from "../../admin-details/geozone/type";
import { TMapState } from "../../../types/map";
import { getGeozoneShapeDescription } from "../../../utils/geozone";

const all_columns = [
  "Geozone Id",
  "Description",
  "Overlap Priority",
  "Zone Type",
  "Reverse Geocode",
  "Arrival Zone",
  "Departure Zone",
  "Shape Details",
  "Center",
]

export const geozoneDescriptionDisplayText = (description: string | null, defaultText: string) => {
  let displayText = defaultText;
  try {
    if(description && description !== "null") {
      const descriptionObj: TAutosuggestOptionValue = JSON.parse(description);
      displayText = descriptionObj.labelText;
    }
    return displayText ?? description ?? defaultText;
  }
  catch (e) {
    return description ?? defaultText;
  }
}

const ScreenDashboardAdminGeozones = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.geozones'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const listingQueryParams: TListingQueryParams = useSelector((state: any) => state.commonReducer.listingQueryParams);
  const { geoZones: orgGeozonesQueryParams } = listingQueryParams;
  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();

  // columns
  const { getLocalStorageItem } = useLocalStorage();
  const savedColumns = getLocalStorageItem(localStorageKeys.columns.Geozones);
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
    dispatch(setListingQueryParams({ ...listingQueryParams, geoZones: { ...orgGeozonesQueryParams, page: 1, search: value }}));
  }, 500);

  // fetch geozones data
  const {
    data: dataOrgGeozones,
    isFetching: isFetchingOrgGeozones,
    error
  } =
    useOrganizationGeozonesQuery(orgGeozonesQueryParams, { skip: !mapState?.mapScriptLoaded });
  const { count, next, previous, results } = dataOrgGeozones || {};

  // preparing table data
  const tableData: TAdminTableRowData[] = !!results
    ? (results || [] as OrganizationGeozone[]).map((item: OrganizationGeozone, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.geozones}/${item.id}`,
        cellData: [
          item?.zone_id ?? "-", // Geozone Id
          geozoneDescriptionDisplayText(item?.description, "-"), // Description
          item?.overlap_priority ?? "-", // Overlap Priority
          item?.zone_type ?? "-", // Zone Type
          item?.reverse_geocode 
          ? <span className="text-field-success">{tMain('yes')}</span>
          : <span className="text-field-error-dark">{tMain('no')}</span>, // Reverse Geocode
          item?.arrival_geozone 
          ? <span className="text-field-success">{tMain('yes')}</span>
          : <span className="text-field-error-dark">{tMain('no')}</span>, // Arrival Zone
          item?.departure_zone
          ? <span className="text-field-success">{tMain('yes')}</span>
          : <span className="text-field-error-dark">{tMain('no')}</span>, // Departure Zone
          getGeozoneShapeDescription(item) ?? "-", // Radius
          item?.lat_lng ?? "-", // Center
        ].filter((_, index) => columns[index].show)
      }))
    : [];
  
  // rendering
  return (
    <>
      <HeaderView title={t("heading")} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} pt-4`}>
        <ListingPageSubHeader
          heading={t("sub_heading")}
          buttonText={t("add_new")}
          buttonCallback={() => {
            dispatch(setModalsData({ ...modalsState, showCreateGeozone: true }))
          }}
        />
        <ListingTableHeader
          heading={t("listing_heading")}
          searchBoxPlaceholder={t("search_placeholder")}
          searchBoxValue={orgGeozonesQueryParams.search}
          searchBoxOnChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
        />
        <EditListingColumnsModal
          columns={columns}
          setColumns={setColumns}
          lsKey={localStorageKeys.columns.Geozones}
        />
        <div className="py-4 mt-4 relative">
          <EditListingColumnsButton />
          <AdminTable
            columns={columns.filter(item => item.show).map((item) => item.name)}
            data={tableData}
            isLoading={isFetchingOrgGeozones || !mapState?.mapScriptLoaded}
          />
          {!isFetchingOrgGeozones && (
            <Pagination
              pageSize={orgGeozonesQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                dispatch(setListingQueryParams({ ...listingQueryParams, geoZones: { ...orgGeozonesQueryParams, page_size: parseInt(`${e?.value}`) }}));
              }}
              totalPages={count ? Math.ceil(count / orgGeozonesQueryParams.page_size) : 1}
              forcePage={orgGeozonesQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                dispatch(setListingQueryParams({ ...listingQueryParams, geoZones: { ...orgGeozonesQueryParams, page: data?.selected + 1 }}));
              }}
            />
          )}
        </div>
      </div>
      <AdminsGeozonesCreateNew />
    </>
  )
}

export default ScreenDashboardAdminGeozones;