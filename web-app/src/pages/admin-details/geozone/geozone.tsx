/**
 * -----------------------------------------------------------------------------
 * Geozone Detail Page
 * -----------------------------------------------------------------------------
 * This page is used to show the details of a single geozone of the organization.
 */

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLoggedInUserData } from "../../../utils/user";
import { OrganizationEntityListingPayload } from "../../../api/types/Admin";
import { useDebouncedCallback } from "use-debounce";
import HeaderView from "../../../components/admin/headerView";
import { routeUrls } from "../../../navigation/routeUrls";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";
import { useFormik } from "formik";
import Accordian from "../../../components/accordian";
import { geozoneDetailsInitialValues, geozoneDetailsYupValidationSchema } from "./validation";
import { GeozoneDetailForm } from "./geozone-form";
import { TModalsState, setModalsData, setMapStateData } from "../../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteSingleGeozoneMutation, useEditOrganizationGeozoneMutation, useOrganizationGeozonesQuery, useSingleOrganizationGeozoneQuery } from "../../../api/network/adminApiServices";
import { TListData } from "./type";
import { OrganizationGeozone } from "../../../api/types/Geozone";
import { toast } from "react-toastify";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import DeleteConfirmation from "../../../components/admin/deleteConfirmation";
import { geozoneDescriptionDisplayText } from "../../admins/geozones/geozones";
import { TMapState } from "../../../types/map";

const ScreenAdminDetailGeozone = () => {
  const { geozoneId } = useParams<{ geozoneId: any }>();
  const { state: locationState } = useLocation(); // OrganizationEntityListingPayload | { new: true }
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.geozones" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.geozones.detailsPage" });
  const navigate = useNavigate();

  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();
  // clear map state on unmount
  useEffect(() => {
    return () => {
      dispatch(setMapStateData({
        ...mapState,
        pageMapLoaded: false,
      }));
    };
  }, []);

  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);

  // flag to idenfiy if user is coming from create new geozone popup
  const isNewEntity = useRef<boolean>(!!locationState?.new);

  // flag to enable edit mode
  const [userCanEdit, setUserCanEdit] = useState<boolean>(!!isNewEntity?.current);

  // prepare query params for fetching organization geozones
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgGeozonesQueryParams, setOrgGeozonesQueryParams] = useState<
    OrganizationEntityListingPayload
  >(
    (!!(locationState as OrganizationEntityListingPayload)?.organization_id
      ? locationState
      : {
          organization_id: thisUserOrganizationId,
          page: 1,
          page_size: 10,
          search: "",
        }) as OrganizationEntityListingPayload
  );

  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgGeozonesQueryParams((prev) => {
      return { ...prev, page: 1, search: value };
    });
  }, 500);

  // fetch organization geozones
  const {
    data: dataOrgGeozones,
    isFetching: isFetchingOrgGeozones,
    error,
  } = useOrganizationGeozonesQuery(orgGeozonesQueryParams);
  const { results } = dataOrgGeozones || {};

  // fetch single geozone details
  const { data: dataSingleGeozone, isFetching: isFetchingSingleGeozone } = useSingleOrganizationGeozoneQuery( { organization_id: thisUserOrganizationId, geozone_id: parseInt(geozoneId) }, { skip: !geozoneId });

  // geozone mutations
  const [ editOrganizationGeozoneApiTrigger , {isLoading: isLoadingEditGeozone}] = useEditOrganizationGeozoneMutation();
  const [ deleteSingleGeozoneApiTrigger, {isLoading: isLoadingDeleteGeozone}] = useDeleteSingleGeozoneMutation();

  // prepare list data for geozone list
  const listData: TListData[] = !!results
    ? (results || ([] as OrganizationGeozone[])).map(
        (item: OrganizationGeozone, index: number) => ({
          id: item?.id,
          zone_id: item?.zone_id || "-",
          zone_type: item?.zone_type || "-",
          description: item?.description || "-",
          radius: item?.radius || "-",
        })
      )
    : [];

  // formik
  const [formikValuesReady, setFormikValuesReady] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: geozoneDetailsInitialValues,
    validationSchema: geozoneDetailsYupValidationSchema,
    onSubmit: (values) => {

      // prepare payload
      const data = {
        properties: mapState?.mapDataForAPIs ?? values.properties,
        zone_type: values.zone_type,
        city: values.city,
        description: values.description,
        geocode: values.geocode,
        lat_lng: values.lat_lng,
        overlap_priority: values.overlap_priority,
        reverse_geocode: values.reverse_geocode,
        arrival_geozone: values.arrival_geozone,
        departure_zone: values.departure_zone,
        zone_color: values.zone_color,
        speed_limit: values.speed_limit,
        group_ids: values.assign_group?.map((item: any) => parseInt(item.id)).join(','),
      }

      // call api for updating geozone
      editOrganizationGeozoneApiTrigger({organization_id: thisUserOrganizationId, geozone_id: parseInt(geozoneId), data: data})
        .unwrap()
        .then(() => {
          toast.success(t("toast.geozone_updated"));
          navigate(routeUrls.dashboardChildren.adminChildren.geozones);
        })
        .catch((error) => {
          const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.updation_failed')];
          toast.error(errors?.join(' '));
        });
    }
  });

  // pre-fill formik values
  useEffect(() => {
    if(isFetchingSingleGeozone) {
      setFormikValuesReady(false);
    } else if(!!dataSingleGeozone) {
      setFormikValuesReady(false); // simulate render delay for select pre-selected values
      formik.setValues({
        properties: dataSingleGeozone?.properties || [],
        description: dataSingleGeozone?.description || "",
        city: dataSingleGeozone?.city || "",
        zone_type: dataSingleGeozone?.zone_type || "",
        geocode: dataSingleGeozone?.geocode || "",
        lat_lng: dataSingleGeozone?.lat_lng || "",
        overlap_priority: dataSingleGeozone?.overlap_priority || 0,
        assign_group: dataSingleGeozone?.groups || [],
        reverse_geocode: dataSingleGeozone?.reverse_geocode || false,
        arrival_geozone: dataSingleGeozone?.arrival_geozone || false,
        departure_zone: dataSingleGeozone?.departure_zone || false,
        zone_color: dataSingleGeozone?.zone_color || "",
        speed_limit: dataSingleGeozone?.speed_limit || "",
      });
      setTimeout(() => { setFormikValuesReady(true); }, 200); // simulate render delay for select pre-selected values
    }
  }, [isFetchingSingleGeozone, dataSingleGeozone, geozoneId])

  // handle edit geozone
  const handleEditGeozone = () => {
    if(userCanEdit) {
      formik.handleSubmit();
    }
  }

  // handle delete geozone
  const handleDeleteGeozone = () => {
    deleteSingleGeozoneApiTrigger({organization_id: thisUserOrganizationId, geozone_id: parseInt(geozoneId)})
    .unwrap()
    .then(() => {
      toast.success(t("toast.geozone_deleted"));
      navigate(routeUrls.dashboardChildren.adminChildren.geozones);
    })
    .catch((error) => {
      const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.deletion_failed')];
      toast.error(errors?.join(' '));
    });
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;
  
  return (
      <>
        <HeaderView
          title={`${t("heading")}: ${dataSingleGeozone?.zone_id || geozoneId}`}
          showBackButton={true}
          backButtonCallback={() =>
            navigate(routeUrls.dashboardChildren.adminChildren.geozones)
          }
        />
        <div className="grid grid-cols-12 gap-4 p-4 text-sm">
          <div className="col col-span-3 max-h-60 overflow-auto"><h3><strong>values.properties</strong></h3><pre>{JSON.stringify(values.properties, undefined, 2)}</pre></div>
          <div className="col col-span-3 max-h-60 overflow-auto"><h3><strong>Map Center</strong></h3><pre>{JSON.stringify(mapState?.mapCenter, undefined, 2)}</pre></div>
          <div className="col col-span-3 max-h-60 overflow-auto"><h3><strong>Map Data</strong></h3><pre>{JSON.stringify(mapState?.mapData, undefined, 2)}</pre></div>
          <div className="col col-span-3 max-h-60 overflow-auto"><h3><strong>Map Data For APIs</strong></h3><pre>{JSON.stringify(mapState?.mapDataForAPIs, undefined, 2)}</pre></div>
        </div>
        <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
          <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
            <div className={`hidden xl:block lg:col-span-3 space-y-4${isFetchingOrgGeozones ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' xl:hidden' : ''}`}>
              <div className="font-bold text-lg leading-6 mt-2 mb-3">{t("listing_heading")}</div>
              <AppSearchBox
                placeholder={tAdmin("search_placeholder")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  debouncedSetSearchKeyword(e.target.value)
                }
              />
              <div>
                {listData?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                      parseInt(geozoneId) === item.id ? "bg-blue-200" : ""
                    }`}
                    onClick={() =>
                      navigate(
                        `${routeUrls.dashboardChildren.adminChildren.geozones}/${item.id}`
                      )
                    }
                  >
                    <div className="grid grid-cols-4">
                      <div className="col-span-3">
                        <p className="font-semibold text-sm leading-6 text-blue-900">
                          {item.zone_id}
                        </p>
                        <p className="font-normal text-xs leading-6 text-gray-500">
                          {item.zone_type}
                        </p>
                      </div>
                      <div className="col-span-1 font-bold text-xs leading-4 text-right">
                        {item.radius}
                      </div>
                    </div>
                    <p className="font-normal text-base leading-6 text-gray-700">
                      {geozoneDescriptionDisplayText(item.description, "-")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${isNewEntity?.current ? 'lg:col-span-12' : 'col-span-12 xl:col-span-9'}`}>
              <div className="flex items-center gap-4">
                { isNewEntity?.current ? (
                  <>
                    <p className="font-semibold text-blue-900 text-base leading-6">
                      {tMain("admins.completeCreation")}
                    </p>
                    <div className="flex-grow"></div>
                    <div className="w-24">
                      <AdminFormFieldSubmit
                        type="submit"
                        variant="success"
                        label={tMain("save")}
                        onClick={handleEditGeozone}
                        disabled={isLoadingEditGeozone}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-grow"></div>
                    <div className="w-24">
                      <AdminFormFieldSubmit
                        type="button"
                        variant="danger"
                        label={tMain("delete")}
                        onClick={() => {dispatch(setModalsData({ ...modalsState, showDeleteConfirmation: true }))}}
                        disabled={isLoadingEditGeozone}
                      />
                    </div>
                    <div className="w-24">
                      <AdminFormFieldSubmit
                        type="button"
                        variant="primary"
                        label={userCanEdit ? tMain("update") : tMain("edit")}
                        onClick={userCanEdit ? handleEditGeozone : () => setUserCanEdit(!userCanEdit)}
                        disabled={isLoadingEditGeozone}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className={`rounded-lg mt-2 bg-blue-200 transition ${isFetchingSingleGeozone || isLoadingEditGeozone || isLoadingDeleteGeozone ? 'opacity-40' : ''}`}>
                <form onSubmit={handleSubmit}>
                  <Accordian title={t("accord_details")} openByDefault={true} collapsible={false}>
                    <GeozoneDetailForm
                      values={values}
                      errors={errors}
                      touched={touched}
                      handleChange={handleChange}
                      formikSetValue={formik.setFieldValue}
                      handleBlur={handleBlur}
                      formikSetTouched={formik.setFieldTouched}
                      userCanEdit={userCanEdit}
                      loadingData={isFetchingSingleGeozone || !formikValuesReady}
                    />
                  </Accordian>
                </form>
              </div>
            </div>
          </div>
        </div>
        <DeleteConfirmation handleDeleteAdmin={handleDeleteGeozone} />
      </>
  );
}

export default ScreenAdminDetailGeozone;