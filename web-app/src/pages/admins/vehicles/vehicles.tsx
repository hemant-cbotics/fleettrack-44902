import React from "react";
import AdminTable from "../components/adminTable";
import Pagination, { TPaginationSelected } from "../components/pagination";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import HeaderView from "../../../components/admin/headerView";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import ListingTableHeader, { TListingFilters } from "../components/listingTableHeader";
import { useDebouncedCallback } from "use-debounce";
import { useOrganizationVehiclesQuery } from "../../../api/network/adminApiServices";
import { useLoggedInUserData } from "../../../utils/user";
import { TAdminTableRowData } from "../components/types";
import { OrganizationVehicle } from "../../../api/types/Vehicle";
import { routeUrls } from "../../../navigation/routeUrls";
import { TSelectboxOption } from "../../../components/admin/formFields";
import AdminsVehiclesCreateNew from "./createNewVehicle";
import { setModalsData, TModalsState } from "../../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { localStorageKeys, useLocalStorage } from "../../../utils/localStorageItems";
import { EditListingColumnsButton, EditListingColumnsModal, TListingColumn } from "../../../components/editListingColumns";

const all_columns = [
  "Sr. No",
  "Vehicle Name",
  "Description",
  "Equipment Type (VIN)",
  "ECM VIN",
  "Server ID",
  "Active"
]

const ScreenDashboardAdminVehicles = () => {
  const { t: tFilters } = useTranslation('translation', { keyPrefix: 'admins.filters'});
  const { t } = useTranslation('translation', { keyPrefix: 'admins.vehicles'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();

  // columns
  const { getLocalStorageItem } = useLocalStorage();
  const savedColumns = getLocalStorageItem(localStorageKeys.columns.Vehicles);
  const [columns, setColumns] = React.useState<TListingColumn[]>(
    all_columns
      .map((colItem, _) => {
        return {
          name: colItem,
          show: !!savedColumns ? savedColumns.includes(colItem) : true
        }
      })
    );

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
  const [orgVehiclesQueryParams, setOrgVehiclesQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: ""
  });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgVehiclesQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  const {
    data: dataOrgVehicles,
    isFetching: isFetchingOrgVehicles,
    error
  } =
    useOrganizationVehiclesQuery(orgVehiclesQueryParams);
  const { count, next, previous, results } = dataOrgVehicles || {};

  const tableData: TAdminTableRowData[] = !!results
    ? (results || [] as OrganizationVehicle[]).map((item: OrganizationVehicle, index: number) => (
      {
        navLink: `${routeUrls.dashboardChildren.adminChildren.vehicles}/${item.id}`,
        cellData: [
          index + 1, // "Sr. No",
          item?.vehicle_model + " " + item?.vehicle_make ?? "-", // "Vehicle Id",
          item?.vehicle_description ?? "-", // "Description",
          item?.euipment_type ?? "-", // "Equipment Type (VIN)",
          item?.vin ?? "-", // "ECM VIN",
          item?.server_id ?? "-", // "Server ID",
          item?.is_active
            ? <span className="text-field-success">Yes</span>
            : <span className="text-field-error-dark">No</span>, // "Active"
        ].filter((_, index) => columns[index].show)
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
            dispatch(setModalsData({ ...modalsState, showCreateVehicle: true }))
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
          lsKey={localStorageKeys.columns.Vehicles}
        />
        <div className="py-4 mt-4 relative">
          <EditListingColumnsButton />
          <AdminTable
            columns={columns.filter(item => item.show).map((item) => item.name)}
            data={tableData}
            isLoading={isFetchingOrgVehicles}
          />
          {!isFetchingOrgVehicles && (
            <Pagination
              pageSize={orgVehiclesQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                  setOrgVehiclesQueryParams((prev) => { return {
                    ...prev,
                    page: 1,
                    page_size: parseInt(`${e?.value}`)
                  }})
                }}
              totalPages={count ? Math.ceil(count / orgVehiclesQueryParams.page_size) : 1}
              forcePage={orgVehiclesQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                setOrgVehiclesQueryParams((prev) => { return {
                  ...prev,
                  page: data?.selected + 1
                }})
              }}
            />
          )}
        </div>
      </div>
      <AdminsVehiclesCreateNew /> 
    </>
  );
};

export default ScreenDashboardAdminVehicles;
