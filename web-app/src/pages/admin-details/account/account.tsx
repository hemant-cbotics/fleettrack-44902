/**
 * -----------------------------------------------------------------------------
 * Account Detail Page
 * -----------------------------------------------------------------------------
 * This page is used to show the details of an account of the user.
 */

import { useFormik } from "formik";
import Accordian from "../../../components/accordian";
import HeaderView from "../../../components/admin/headerView";
import { APP_CONFIG } from "../../../constants/constants";
import {
  AccountGeneralDetailForm,
  AccountMaintenanceIntervalLabelForm,
  AccountScorecardWeightFactorsForm,
} from "./account-form";
import {
  accountDetailsInitialValues,
  accountDetailsYupValidationSchema,
} from "./validation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";
import {
  sessionStorageKeys,
  useSessionStorage,
} from "../../../utils/sessionStorageItems";
import { VerifyEmailOtpResponseSuccess } from "../../../api/types/Onboarding";
import { useSelector } from "react-redux";
import { TUser } from "../../../api/types/User";
import { useEditOrganizationAccountMutation } from "../../../api/network/adminApiServices";
import { toast } from "react-toastify";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";

const ScreenAdminDetailAccount = () => {

  // flag to enable edit mode
  const [userCanEdit, setUserCanEdit] = useState(false);
  
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.profile.account",
  });
  const navigate = useNavigate();
  const { getSessionStorageItem, setSessionStorageItem } = useSessionStorage();

  // get account details from session storage
  const loggedInUserData: VerifyEmailOtpResponseSuccess = useSelector(
    (state: any) => state.commonReducer.user
  );
  const loggedInUser: TUser =
    loggedInUserData?.user ?? getSessionStorageItem(sessionStorageKeys.user);
  const { account } = loggedInUser;

  // account mutations
  const [
    editOrganizationAccountApiTrigger,
    { isLoading: isLoadingEditAccount },
  ] = useEditOrganizationAccountMutation();

  // formik
  const [formikValuesReady, setFormikValuesReady] = useState<boolean>(false);
  const formik = useFormik({
    initialValues: accountDetailsInitialValues,
    validationSchema: accountDetailsYupValidationSchema,
    onSubmit: (values) => {

      // prepare payload
      const data = {
        id: values.account_id,
        description: values.account_description,
        contact_name: values.contact_name,
        contact_phone: values.contact_phone_number,
        private_cost: values.private_cost,
        idle_gas_usage: values.idle_gas_usage,
        distance_gas_usage: values.distance_gas_usage,
        auto_update_interval_for_maps: values.auto_update_interval_for_maps,
        drivers_assigned_to_devices: values.drivers_assigned_to_devices,
        enable_map_clustering: values.enable_map_clustering,
        open_reports_in_new_tab: values.open_reports_in_new_tab,
        sync_driver_id_from_driver_admin: values.sync_driverId_from_driver_admin,
        has_snowplows: values.has_snowplows,
        hide_total_rows_in_csv: values.hide_total_rows_in_csv,
        timezone: values.timezone,
        speed_units: values.speed_units,
        distance_units: values.distance_units,
        volume_units: values.volume_units,
        economy_units: values.economy_units,
        pressure_units: values.pressure_units,
        temperature_units: values.temperature_units,
        lat_lan_format: values.latitude_longitude_format,
        route_segment_color_rule: values.route_segment_color_rule,
        route_line_thickness: values.route_line_thickness,
        multi_vehicle_map_name: values.multi_vehicle_map_name,
        device_title: values.device_title,
        device_title_plural: values.device_title_plural,
        device_group_title: values.device_group_title,
        device_group_title_plural: values.device_group_title_plural,
        address_title: values.address_title,
        address_title_plural: values.address_title_plural,
        default_login_user_id: values.default_login_userId,
        default_overlay: values.default_overlay,
        maintenance_intervals: {
          last_maintenance_1: values.last_maintenance_1,
          last_maintenance_2: values.last_maintenance_2,
          last_maintenance_3: values.last_maintenance_3,
          last_maintenance_4: values.last_maintenance_4,
          last_maintenance_5: values.last_maintenance_5,
          last_maintenance_6: values.last_maintenance_6,
          last_maintenance_7: values.last_maintenance_7,
          last_maintenance_8: values.last_maintenance_8,
          last_maintenance_9: values.last_maintenance_9,
          last_maintenance_10: values.last_maintenance_10,
          last_eng_hours_maint_1: values.last_eng_hours_maint_1,
          last_eng_hours_maint_2: values.last_eng_hours_maint_2,
          last_eng_hours_maint_3: values.last_eng_hours_maint_3,
          last_eng_hours_maint_4: values.last_eng_hours_maint_4,
          last_eng_hours_maint_5: values.last_eng_hours_maint_5,
          last_service_time_1: values.last_service_time_1,
          last_service_time_2: values.last_service_time_2,
          last_service_time_3: values.last_service_time_3,
          last_service_time_4: values.last_service_time_4,
          last_service_time_5: values.last_service_time_5,
        },
        harsh_braking: values.harsh_braking,
        harsh_acceleration: values.harsh_acceleration,
        speeding: values.speeding,
        reverse: values.reverse,
        seatbelt_off: values.seatbelt_off,
        harsh_cornering: values.harsh_cornering,
        idle_ratio: values.idle_ratio,
        impact_crash_ai: values.impact_crash_ai,
        cellphone_use_ai: values.cellphone_use_ai,
        distracted_driving_ai: values.distracted_driving_ai,
        drinking_eating_ai: values.drinking_eating_ai,
        smoking_ai: values.smoking_ai,
        possible_fatiuge_ai: values.possible_fatiuge_ai,
        obstructed_camera_ai: values.obstructed_camera_ai,
        tailgating_ai: values.tailgating_ai,
      };

      // call api for account update
      editOrganizationAccountApiTrigger({account_id: values.account_id, data: data})
      .unwrap()
      .then((data) => {
        toast.success(t("toast.account_updated"));
        if(!!data){
          const user = {...loggedInUser};
          user.account = data;
          setSessionStorageItem(sessionStorageKeys.user, user);
        }
        navigate(routeUrls.dashboard);
      })
      .catch((error) => {
        const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.updation_failed')];
        toast.error(errors?.join(' '));
      });
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  // pre-fill formik values
  useEffect(() => {
    if (account) {
      setFormikValuesReady(false); // simulate render delay for select pre-selected values
      formik.setValues({
        account_id: account.id,
        account_description: account.description ?? "",
        contact_name: account.contact_name ?? "",
        contact_phone_number: account.contact_phone ?? "",
        contact_email: loggedInUser.email ?? "",
        private_cost: account.private_cost ?? 0.0,
        idle_gas_usage: account.idle_gas_usage ?? 0.0,
        distance_gas_usage: account.distance_gas_usage ?? 0.0,
        auto_update_interval_for_maps:
          account.auto_update_interval_for_maps ?? 0,
        drivers_assigned_to_devices:
          account.drivers_assigned_to_devices ?? false,
        enable_map_clustering: account.enable_map_clustering ?? "",
        open_reports_in_new_tab: account.open_reports_in_new_tab ?? false,
        sync_driverId_from_driver_admin:
          account.sync_driver_id_from_driver_admin ?? false,
        has_snowplows: account.has_snowplows ?? false,
        hide_total_rows_in_csv: account.hide_total_rows_in_csv ?? false,
        timezone: account.timezone ?? "",
        speed_units: account.speed_units ?? "",
        distance_units: account.distance_units ?? "",
        volume_units: account.volume_units ?? "",
        economy_units: account.economy_units ?? "",
        pressure_units: account.pressure_units ?? "",
        temperature_units: account.temperature_units ?? "",
        latitude_longitude_format: account.lat_lan_format ?? "",
        route_segment_color_rule: account.route_segment_color_rule ?? "",
        route_line_thickness: account.route_line_thickness ?? "",
        multi_vehicle_map_name: account.multi_vehicle_map_name ?? "",
        device_title: account.device_title ?? "",
        device_title_plural: account.device_title_plural ?? "",
        device_group_title: account.device_group_title ?? "",
        device_group_title_plural: account.device_group_title_plural ?? "",
        address_title: account.address_title ?? "",
        address_title_plural: account.address_title_plural ?? "",
        default_login_userId: account.default_login_user_id ?? "",
        default_overlay: account.default_overlay ?? "",
        last_maintenance_1: account.maintenance_intervals.last_maintenance_1 ?? 0,
        last_maintenance_2: account.maintenance_intervals.last_maintenance_2 ?? 0,
        last_maintenance_3: account.maintenance_intervals.last_maintenance_3 ?? 0,
        last_maintenance_4: account.maintenance_intervals.last_maintenance_4 ?? 0,
        last_maintenance_5: account.maintenance_intervals.last_maintenance_5 ?? 0,
        last_maintenance_6: account.maintenance_intervals.last_maintenance_6 ?? 0,
        last_maintenance_7: account.maintenance_intervals.last_maintenance_7 ?? 0,
        last_maintenance_8: account.maintenance_intervals.last_maintenance_8 ?? 0,
        last_maintenance_9: account.maintenance_intervals.last_maintenance_9 ?? 0,
        last_maintenance_10: account.maintenance_intervals.last_maintenance_10 ?? 0,
        last_eng_hours_maint_1: account.maintenance_intervals.last_eng_hours_maintenance_1 ?? 0,
        last_eng_hours_maint_2: account.maintenance_intervals.last_eng_hours_maintenance_2 ?? 0,
        last_eng_hours_maint_3: account.maintenance_intervals.last_eng_hours_maintenance_3 ?? 0,
        last_eng_hours_maint_4: account.maintenance_intervals.last_eng_hours_maintenance_4 ?? 0,
        last_eng_hours_maint_5: account.maintenance_intervals.last_eng_hours_maintenance_5 ?? 0,
        last_service_time_1: account.maintenance_intervals.last_service_time_1 ?? 0,
        last_service_time_2: account.maintenance_intervals.last_service_time_2 ?? 0,
        last_service_time_3: account.maintenance_intervals.last_service_time_3 ?? 0,
        last_service_time_4: account.maintenance_intervals.last_service_time_4 ?? 0,
        last_service_time_5: account.maintenance_intervals.last_service_time_5 ?? 0,
        harsh_braking: account.harsh_braking ?? "",
        harsh_acceleration: account.harsh_acceleration ?? "",
        speeding: account.speeding ?? "",
        reverse: account.reverse ?? "",
        seatbelt_off: account.seatbelt_off ?? "",
        harsh_cornering: account.harsh_cornering ?? "",
        idle_ratio: account.idle_ratio ?? "",
        impact_crash_ai: account.impact_crash_ai ?? "",
        cellphone_use_ai: account.cellphone_use_ai ?? "",
        distracted_driving_ai: account.distracted_driving_ai ?? "",
        drinking_eating_ai: account.drinking_eating_ai ?? "",
        smoking_ai: account.smoking_ai ?? "",
        possible_fatiuge_ai: account.possible_fatigue_ai ?? "",
        obstructed_camera_ai: account.obstructed_camera_ai ?? "",
        tailgating_ai: account.tailgating_ai ?? "",
      });
      setTimeout(() => { setFormikValuesReady(true); }, 200);
    }
  }, []);

  // handle edit information
  const handleEditInformation = () => {
    if (userCanEdit) {
      formik.handleSubmit();
    }
  };

  return (
    <>
      <HeaderView
        title={t("heading")}
        showBackButton={true}
        backButtonCallback={() => navigate(routeUrls.dashboard)}
      />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center font-semibold text-blue-900 text-lg leading-6">
          {t("sub_heading")}
        </div>
        <div className="px-4">
          <div className="flex items-center gap-4">
            <div className="flex-grow"></div>
            <div className="w-24">
              <AdminFormFieldSubmit
                type="button"
                variant="primary"
                label={userCanEdit ? tMain("update") : tMain("edit")}
                onClick={
                  userCanEdit
                    ? handleEditInformation
                    : () => setUserCanEdit(!userCanEdit)
                }
                disabled={isLoadingEditAccount || (userCanEdit && !!Object.keys(errors).length)}
              />
            </div>
          </div>
          <div className="rounded-lg mt-2 bg-blue-200">
            <form onSubmit={handleSubmit}>
              <Accordian
                title={t("accord_general_details")}
                openByDefault={true}
              >
                <AccountGeneralDetailForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                  loadingData={!formikValuesReady}
                />
              </Accordian>
              <Accordian title={t("accord_maintenance_interval_labels")}>
                <AccountMaintenanceIntervalLabelForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                  loadingData={!formikValuesReady}
                />
              </Accordian>
              <Accordian title={t("accord_scorecard_weight_factors")}>
                <AccountScorecardWeightFactorsForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                  loadingData={!formikValuesReady}
                />
              </Accordian>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenAdminDetailAccount;
