/**
 * -----------------------------------------------------------------------------
 * Fleettag Detail Page
 * -----------------------------------------------------------------------------
 * This page is used to show the details of a single fleettag of the organization.
 */

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLoggedInUserData } from "../../../utils/user";
import { OrganizationEntityListingPayload } from "../../../api/types/Admin";
import { useDebouncedCallback } from "use-debounce";
import { useFormik } from "formik";
import { fleettagDetailsInitialValues, fleettagDetailsYupValidationSchema } from "./validation";
import HeaderView from "../../../components/admin/headerView";
import { routeUrls } from "../../../navigation/routeUrls";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";
import Accordian from "../../../components/accordian";
import FleettagDetailForm from "./fleettag-form";
import { useDeleteSingleFleettagMutation, useEditOrganizationFleettagMutation, useOrganizationFleettagsQuery, useSingleOrganizationFleettagQuery } from "../../../api/network/adminApiServices";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import DeleteConfirmation from "../../../components/admin/deleteConfirmation";
import { TListData } from "./type";
import { OrganizationFleettag } from "../../../api/types/Fleettag";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import AdminListingColumnItem from "../../../components/adminListingColumnItem";

const ScreenAdminDetailFleettag = () => {
  const { fleettagId } = useParams<{ fleettagId: any }>();
  const { state: locationState } = useLocation(); // OrganizationEntityListingPayload | { new: true }
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.fleettags" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.fleettags.detailsPage" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);

  // flag to idenfiy if fleettag is coming from create new fleettag popup
  const isNewEntity = useRef<boolean>(!!locationState?.new);

  // flag to enable edit mode
  const [userCanEdit, setUserCanEdit] = useState<boolean>(!!isNewEntity?.current);

  // prepare query params for fetching organization fleettags
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgFleettagsQueryParams, setOrgFleettagsQueryParams] = useState<OrganizationEntityListingPayload>(
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
    setOrgFleettagsQueryParams((prev) => {
      return { ...prev, page: 1, search: value };
    });
  }, 500);

  // fetch organization fleettags
  const {
    data: dataOrgFleettags,
    isFetching: isFetchingOrgFleettags,
    error,
  } = useOrganizationFleettagsQuery(orgFleettagsQueryParams);
  const { results } = dataOrgFleettags || {};

  // fetch single fleettag details
  const { data: dataSingleFleettag, isFetching: isFetchingSingleFleettag } = useSingleOrganizationFleettagQuery( { organization_id: thisUserOrganizationId, fleettag_id: parseInt(fleettagId) }, { skip: !fleettagId });

  // fleettag mutations
  const [ editOrganizationFleettagApiTrigger , {isLoading: isLoadingEditFleettag}] = useEditOrganizationFleettagMutation();
  const [ deleteSingleFleettagApiTrigger, {isLoading: isLoadingDeleteFleettag}] = useDeleteSingleFleettagMutation();

  // prepare list data for fleettag list
  const listData: TListData[] = !!results
    ? (results || ([] as OrganizationFleettag[])).map(
        (item: OrganizationFleettag, index: number) => ({
          id: item?.id,
          fleettag_id: item?.fleet_tag_id || "-",
          name: item?.fleet_tag_name || "-",
          last_address: item?.last_address || "-",
          in_range: item?.in_range ? "Yes" : "No",
        })
      )
    : [];

  // formik
  const formik = useFormik({
    initialValues: fleettagDetailsInitialValues,
    validationSchema: fleettagDetailsYupValidationSchema,
    onSubmit: (values) => {

      // prepare payload
      const data = {
          fleet_tag_id: values.fleet_tag_id,
          fleet_tag_name: values.fleet_tag_name,
          last_event_time: values.last_event_time ? new Date(values.last_event_time).toISOString() : null,
          last_event_code: values.last_status_code,
          in_range: values.in_range === "Yes" ? true : false,
          in_range_device_id: values.in_range_device_id,
          last_location: values.last_location,
          last_address: values.last_address,
          last_altitude: values.last_altitude,
          distance_traveled: values.distance_travelled,
          tag_signal_strength: values.tag_signal_strength,
          tag_battery_level: values.tag_battery_level,
          temperature: values.temprature,
      }

      // call api for updating fleettag
      editOrganizationFleettagApiTrigger({organization_id: thisUserOrganizationId, fleettag_id: parseInt(fleettagId), data: data})
        .unwrap()
        .then(() => {
          toast.success(t("toast.fleettag_updated"));
          navigate(routeUrls.dashboardChildren.adminChildren.fleettags);
        })
        .catch((error) => {
          const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.update_failed')];
          toast.error(errors?.join(' '));
        });
    }
  });

  // pre-fill formik values
  useEffect(() => {
    if(dataSingleFleettag){
      formik.setValues({
        fleet_tag_id: dataSingleFleettag?.fleet_tag_id || "",
        fleet_tag_name: dataSingleFleettag?.fleet_tag_name || "",
        last_event_time: dataSingleFleettag?.last_event_time || "",
        last_status_code: dataSingleFleettag?.last_event_code || "",
        in_range: dataSingleFleettag?.in_range ? "Yes" : "No",
        in_range_device_id: dataSingleFleettag?.in_range_device_id || "",
        last_location: dataSingleFleettag?.last_location || "",
        last_address: dataSingleFleettag?.last_address || "",
        last_altitude: dataSingleFleettag?.last_altitude || 0,
        distance_travelled: dataSingleFleettag?.distance_traveled || "",
        tag_signal_strength: dataSingleFleettag?.tag_signal_strength || "",
        tag_battery_level: dataSingleFleettag?.tag_battery_level || "",
        temprature: dataSingleFleettag?.temperature || "",
      });
      setUserCanEdit(!!isNewEntity?.current);
    }
  }, [dataSingleFleettag,fleettagId]);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  // handle edit fleettag
  const handleEditFleettag = () => {
    if(userCanEdit){
      formik.handleSubmit();
    }
  }

  // handle delete fleettag
  const handleDeleteFleettag = () => {
    deleteSingleFleettagApiTrigger({organization_id: thisUserOrganizationId, fleettag_id: parseInt(fleettagId)})
    .unwrap()
    .then(() => {
      toast.success(t("toast.fleettag_deleted"));
      navigate(routeUrls.dashboardChildren.adminChildren.fleettags);
    })
    .catch((error) => {
      const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.deletion_failed')];
      toast.error(errors?.join(' '));
    });
  }

  return (
    <>
      <HeaderView
        title={t("heading")}
        showBackButton={true}
        backButtonCallback={() =>
          navigate(routeUrls.dashboardChildren.adminChildren.fleettags)
        }
      />
      <div  className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
          <div className={`hidden xl:block lg:col-span-3 space-y-4${isFetchingOrgFleettags ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' xl:hidden' : ''}`}>
            <div className="font-bold text-lg leading-6 mt-2 mb-3">{t("listing_heading")}</div>
            <AppSearchBox
              placeholder={tAdmin("search_placeholder")}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedSetSearchKeyword(e.target.value)
              }
            />
            <div>
              {listData?.map((item: any, index: number) => (
                <AdminListingColumnItem
                  key={index}
                  selected={fleettagId === item.id}
                  onClick={() =>
                    navigate(
                      `${routeUrls.dashboardChildren.adminChildren.fleettags}/${item.id}`
                    )
                  }
                  title={item.fleettag_id}
                  description={item.last_address}
                  asideText={item.in_range}
                  bottomText={item.name}
                />
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
                      onClick={handleEditFleettag}
                      disabled={isLoadingEditFleettag || !!Object.keys(errors).length}
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
                      disabled={isLoadingEditFleettag}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={userCanEdit ? tMain("update") : tMain("edit")}
                      onClick={userCanEdit ? handleEditFleettag : () => setUserCanEdit(!userCanEdit)}
                      disabled={isLoadingEditFleettag || (userCanEdit && !!Object.keys(errors).length)}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={`rounded-lg mt-2 bg-blue-200 transition ${isFetchingSingleFleettag || isLoadingEditFleettag || isLoadingDeleteFleettag ? 'opacity-40' : ''}`}>
              <form onSubmit={handleSubmit}>
                <Accordian title={t("accord_details")} openByDefault={true}>
                  <FleettagDetailForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    formikSetValue={formik.setFieldValue}
                    handleBlur={handleBlur}
                    formikSetTouched={formik.setFieldTouched}
                    userCanEdit={userCanEdit}
                  />
                </Accordian>
              </form>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmation handleDeleteAdmin={handleDeleteFleettag} />
    </>
  );
}

export default ScreenAdminDetailFleettag;