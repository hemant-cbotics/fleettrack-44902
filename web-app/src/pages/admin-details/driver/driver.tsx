/**
 * -----------------------------------------------------------------------------
 * Driver Detail Page
 * -----------------------------------------------------------------------------
 * This page is used to show the details of a single driver of the organization.
 */

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLoggedInUserData } from "../../../utils/user";
import HeaderView from "../../../components/admin/headerView";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { useDebouncedCallback } from "use-debounce";
import { OrganizationEntityListingPayload } from "../../../api/types/Admin";
import { routeUrls } from "../../../navigation/routeUrls";
import Accordian from "../../../components/accordian";
import { useFormik } from "formik";
import {
  driverDetailsInitialValues,
  driverDetailsYupValidationSchema,
} from "./validation";
import {
  DriverGeneralDetailForm,
  DriverLicenseDetailForm,
  DriverMedicalDetailForm,
} from "./driver-form";
import { useDeleteSingleDriverMutation, useEditOrganizationDriverMutation, useOrganizationDriversQuery, useSingleOrganizationDriverQuery } from "../../../api/network/adminApiServices";
import { TListData } from "./type";
import { OrganizationDriver } from "../../../api/types/Driver";
import { AdminFormFieldSubmit, TSelectboxOption } from "../../../components/admin/formFields";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import DeleteConfirmation from "../../../components/admin/deleteConfirmation";
import { useDispatch, useSelector } from "react-redux";
import { TListingQueryParams, TModalsState, setListingQueryParams, setModalsData } from "../../../api/store/commonSlice";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import AdminListingColumnItem from "../../../components/adminListingColumnItem";
import Pagination, { TPaginationSelected } from "../../admins/components/pagination";

const ScreenAdminDetailDriver = () => {
  const { driverId } = useParams<{ driverId: any }>();
  const { state: locationState } = useLocation();  // OrganizationEntityListingPayload | { new: true }
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.drivers" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.drivers.detailsPage" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const listingQueryParams: TListingQueryParams = useSelector((state: any) => state.commonReducer.listingQueryParams);
  const { drivers: orgDriversQueryParams } = listingQueryParams;

  // flag to idenfiy if driver is coming from create new driver popup
  const isNewEntity = useRef<boolean>(!!locationState?.new);

  // flag to enable edit mode
  const [userCanEdit, setUserCanEdit] = useState<boolean>(!!isNewEntity?.current);

  // prepare query params for fetching organization drivers
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");

  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    dispatch(setListingQueryParams({ ...listingQueryParams, drivers: { ...orgDriversQueryParams, search: value } }));
  }, 500);

  // fetch organization drivers
  const {
    data: dataOrgDrivers,
    isFetching: isFetchingOrgDrivers,
    error,
  } = useOrganizationDriversQuery(orgDriversQueryParams);
  const { results, count } = dataOrgDrivers || {};

  // fetch single driver details
  const { data: dataSingleDriver, isFetching: isFetchingSingleDriver } = useSingleOrganizationDriverQuery( { organization_id: thisUserOrganizationId, driver_id: parseInt(driverId) }, { skip: !driverId });

  // driver mutations
  const [ editOrganizationDriverApiTrigger , {isLoading: isLoadingEditDriver}] = useEditOrganizationDriverMutation();
  const [ deleteSingleDriverApiTrigger, {isLoading: isLoadingDeleteDriver}] = useDeleteSingleDriverMutation()

  // prepare list data for driver list
  const listData: TListData[] = !!results
    ? (results || ([] as OrganizationDriver[])).map(
        (item: OrganizationDriver, index: number) => ({
          id: item?.id,
          name: item?.name,
          badge_employee_id: item?.badge_employee_id || "-",
          email: item?.email,
          phone: item?.phone,
        })
      )
    : [];

    // formik
  const [formikValuesReady, setFormikValuesReady] = useState<boolean>(false);
  useEffect(() => {
    if(isFetchingSingleDriver) {
      setFormikValuesReady(false);
    }
  }, [isFetchingSingleDriver]);
  const formik = useFormik({
    initialValues: driverDetailsInitialValues,
    validationSchema: driverDetailsYupValidationSchema,
    onSubmit: (values) => {

      // prepare payload
      const data = {
        id: values.driver_id,
        address: values.address,
        badge_employee_id: values.badge_employee_id,
        card_id: values.card_id,
        email: values.contact_email,
        is_active: values.is_active,
        is_hazmat_certified: values.hazmat_certified,
        licence_expiry: values.license_expiry_date ? new Date(values.license_expiry_date).toISOString() : null,
        licence_number: values.license_number,
        licence_state: values.license_state,
        licence_status: values.license_status,
        licence_type: values.license_type,
        medical_card_expiry: values.medical_card_expiry_date ? new Date(values.medical_card_expiry_date).toISOString() : null,
        medical_card_no: values.medical_card_no,
        name: values.driver_name,
        nick_name: values.nick_name,
        phone: values.contact_phone,
        twic: values.twic,
        twic_expiry: values.twic_expiry_date ? new Date(values.twic_expiry_date).toISOString() : null,
        vehicle_assigned: values.vehicle_id,
      };

      // call api for updating driver
      editOrganizationDriverApiTrigger({organization_id: thisUserOrganizationId, driver_id: parseInt(driverId), data: data})
      .unwrap()
      .then(() => {
        toast.success(t("toast.driver_updated"));
        navigate(routeUrls.dashboardChildren.adminChildren.drivers);
      })
      .catch((error) => {
        const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.updation_failed')];
        toast.error(errors?.join(' '));
      });
    },
  });

  // pre-fill formik values
  useEffect(() => {
    if (dataSingleDriver) {
      setFormikValuesReady(false); // simulate render delay for select pre-selected values
      formik.setValues({
        driver_id: dataSingleDriver?.id,
        driver_name: dataSingleDriver?.name,
        nick_name: dataSingleDriver?.nick_name || "",
        contact_phone: dataSingleDriver?.phone,
        contact_email: dataSingleDriver?.email,
        badge_employee_id: dataSingleDriver?.badge_employee_id || "",
        card_id: dataSingleDriver?.card_id || "",
        is_active: dataSingleDriver?.is_active || false,
        license_type: dataSingleDriver?.licence_type || "",
        license_state: dataSingleDriver?.licence_state || "",
        license_number: dataSingleDriver?.licence_number || "",
        license_expiry_date: dataSingleDriver?.licence_expiry || "",
        license_status: dataSingleDriver?.licence_status || "",
        medical_card_no: dataSingleDriver?.medical_card_no || "",
        medical_card_expiry_date: dataSingleDriver?.medical_card_expiry || "",
        hazmat_certified: dataSingleDriver?.is_hazmat_certified || false,
        twic: dataSingleDriver?.twic || "",
        twic_expiry_date: dataSingleDriver?.twic_expiry || "",
        address: dataSingleDriver?.address || "",
        vehicle_id: dataSingleDriver?.vehicle_assigned || "",
      });
      setUserCanEdit(!!isNewEntity?.current);
      setTimeout(() => { setFormikValuesReady(true); }, 200); // simulate render delay for select pre-selected values
    }
  }, [dataSingleDriver, driverId])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  // handle delete driver
  const handleDeleteDriver = () => {
    deleteSingleDriverApiTrigger({organization_id: thisUserOrganizationId, driver_id: parseInt(driverId)})
    .unwrap()
    .then(() => {
      toast.success(t("toast.driver_deleted"));
      navigate(routeUrls.dashboardChildren.adminChildren.drivers);
    })
    .catch((error) => {
      const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.deletion_failed')];
      toast.error(errors?.join(' '));
    });
  };

  // handle edit driver
  const handleEditDriver = () => {
    if(userCanEdit){
      formik.handleSubmit();
    }
  };

  return (
    <>
      <HeaderView
        title={t("heading")}
        showBackButton={true}
        backButtonCallback={() =>
          navigate(routeUrls.dashboardChildren.adminChildren.drivers)
        }
      />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            {t("sub_heading")}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
          <div className={`hidden xl:block lg:col-span-3 space-y-4${isFetchingOrgDrivers ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' xl:hidden' : ''}`}>
            <div className="font-bold text-lg leading-6 mt-2 mb-3">{t("listing_heading")}</div>
            <AppSearchBox
              placeholder={tAdmin("search_placeholder")}
              value={orgDriversQueryParams?.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedSetSearchKeyword(e.target.value)
              }
              onClear={() => {
                debouncedSetSearchKeyword("")
              }}
            />
            <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
              {listData?.map((item: any, index: number) => (
                <AdminListingColumnItem
                  key={index}
                  selected={parseInt(driverId) === item.id}
                  onClick={() =>
                    navigate(
                      `${routeUrls.dashboardChildren.adminChildren.drivers}/${item.id}`
                    )
                  }
                  title={item.name}
                  description={item.badge_employee_id}
                  asideText={item.phone}
                  bottomText={item.email}
                />
              ))}
            </div>
            {!isFetchingOrgDrivers && (
              <Pagination
                pageSize={orgDriversQueryParams.page_size}
                handlePageSizeChange={(e: TSelectboxOption | null) => {
                  dispatch(setListingQueryParams({ ...listingQueryParams, drivers: { ...orgDriversQueryParams, page: 1, page_size: parseInt(`${e?.value}`) }}));
                }}
                totalPages={count ? Math.ceil(count / orgDriversQueryParams.page_size) : 1}
                forcePage={orgDriversQueryParams.page - 1}
                handlePageClick={(data: TPaginationSelected) => {
                  dispatch(setListingQueryParams({ ...listingQueryParams, drivers: { ...orgDriversQueryParams, page: data?.selected + 1 }}));
                }}
                onlyPageChange={true}
                size={1}
              />
            )}
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
                      onClick={handleEditDriver}
                      disabled={isLoadingEditDriver || !!Object.keys(errors).length}
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
                      disabled={isLoadingEditDriver}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={userCanEdit ? tMain("update") : tMain("edit")}
                      onClick={userCanEdit ? handleEditDriver : () => setUserCanEdit(!userCanEdit)}
                      disabled={isLoadingEditDriver || (userCanEdit && !!Object.keys(errors).length)}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={`rounded-lg mt-2 bg-blue-200 transition ${isFetchingSingleDriver || isLoadingEditDriver || isLoadingDeleteDriver ? 'opacity-40' : ''}`}>
              <form onSubmit={handleSubmit}>
                <Accordian title={t("accord_details")} openByDefault={true}>
                  <DriverGeneralDetailForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    formikSetValue={formik.setFieldValue}
                    handleBlur={handleBlur}
                    formikSetTouched={formik.setFieldTouched}
                    userCanEdit={userCanEdit}
                    loadingData={isFetchingSingleDriver || !formikValuesReady}
                  />
                </Accordian>
                <Accordian title={t("accord_license_details")} >
                  <DriverLicenseDetailForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    formikSetValue={formik.setFieldValue}
                    handleBlur={handleBlur}
                    formikSetTouched={formik.setFieldTouched}
                    userCanEdit={userCanEdit}
                    loadingData={isFetchingSingleDriver || !formikValuesReady}
                  />
                </Accordian>
                <Accordian title={t("accord_medical_and_other_details")} >
                  <DriverMedicalDetailForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    formikSetValue={formik.setFieldValue}
                    handleBlur={handleBlur}
                    formikSetTouched={formik.setFieldTouched}
                    userCanEdit={userCanEdit}
                    loadingData={isFetchingSingleDriver || !formikValuesReady}
                  />
                </Accordian>
              </form>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmation handleDeleteAdmin={handleDeleteDriver}/>
    </>
  );
};

export default ScreenAdminDetailDriver;
