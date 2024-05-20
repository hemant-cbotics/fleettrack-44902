import { useDispatch, useSelector } from "react-redux";
import HeaderView from "../../../components/admin/headerView";
import { APP_CONFIG } from "../../../constants/constants";
import ListingPageSubHeader from "../components/listingPageSubHeader";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import ListingTableHeader from "../components/listingTableHeader";
import { useDebouncedCallback } from "use-debounce";
import { useState } from "react";
import { useLoggedInUserData } from "../../../utils/user";
import AdminTable from "../components/adminTable";
import Pagination, { TPaginationSelected } from "../components/pagination";
import { TSelectboxOption } from "../../../components/admin/formFields";
import { useTranslation } from "react-i18next";
import AdminsGeozonesCreateNew from "./createNewGeozone";


const columns = [
  "Geozone Id",
  "Description",
  "Overlap Priority",
  "Reverse Geocode",
  "Arrival Zone",
  "Departure Zone",
  "Radius",
]

const ScreenDashboardAdminGeozones = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'admins.geozones'});
  const dispatch = useDispatch();
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);

  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgGeozonesQueryParams, setOrgGeozonesQueryParams] = useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: ""
  });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgGeozonesQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  const isFetchingOrgGeozones = false;
  const count = 10;
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
          searchBoxOnChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
        />
        <div className="py-4 mt-4">
          <AdminTable
            columns={columns}
            data={[]}
            isLoading={isFetchingOrgGeozones}
          />
          {!isFetchingOrgGeozones && (
            <Pagination
              pageSize={orgGeozonesQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                setOrgGeozonesQueryParams((prev) => { return {
                  ...prev,
                  page: 1,
                  page_size: parseInt(`${e?.value}`)
                }})
              }}
              totalPages={count ? Math.ceil(count / orgGeozonesQueryParams.page_size) : 1}
              forcePage={orgGeozonesQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                setOrgGeozonesQueryParams((prev) => { return {
                  ...prev,
                  page: data?.selected + 1
                }})
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