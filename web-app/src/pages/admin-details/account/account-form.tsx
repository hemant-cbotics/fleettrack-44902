/**
 * -----------------------------------------------------------------------------
 * Account Edit Form
 * -----------------------------------------------------------------------------
 * These components are used to render the form for editing the account details.
 */

import { FC } from "react";
import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";
import { useTranslation } from "react-i18next";
import { DEFAULT_OVERLAY_OPTIONS, DISTANCE_UNITS_OPTIONS, ECONOMY_UNITS_OPTIONS, ENABLE_MAP_CLUSTERING_OPTIONS, LATITUDE_LONGITUDE_FORMAT_OPTIONS, PRESSURE_UNITS_OPTIONS, ROUTE_LINE_THICKNESS_OPTIONS, SCORECARD_WEIGHT_FACTOR_OPTIONS, SPEED_UNITS_OPTIONS, TEMPRATURE_UNITS_OPTIONS, TIMEZONE_OPTIONS, VOLUME_UNITS_OPTIONS } from "./constants";

interface AccountGeneralDetailFormProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: (event: React.ChangeEvent<any>) => void;
  formikSetValue: (field: string, value: any, shouldValidate?: boolean) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  formikSetTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  userCanEdit: boolean;
  loadingData: boolean;
}

export const AccountGeneralDetailForm: FC<AccountGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
  loadingData,
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.profile.account.form",
  });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label={t("account_id")}
        type="text"
        id="account_id"
        name="account_id"
        value={values.account_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.account_id}
        touched={touched.account_id}
        disabled={!userCanEdit}
        detailsFormField={true}
        readOnly={true}
      />
      <AdminFormFieldInput
        label={t("account_description")}
        type="text"
        id="account_description"
        name="account_description"
        value={values.account_description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.account_description}
        touched={touched.account_description}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
      <AdminFormFieldInput
        label={t("contact_name")}
        type="text"
        id="contact_name"
        name="contact_name"
        value={values.contact_name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.contact_name}
        touched={touched.contact_name}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldInput
        label={t("contact_phone_number")}
        type="text"
        id="contact_phone_number"
        name="contact_phone_number"
        value={values.contact_phone_number}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.contact_phone_number}
        touched={touched.contact_phone_number}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldInput
        label={t("contact_email")}
        type="email"
        id="contact_email"
        name="contact_email"
        value={values.contact_email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.contact_email}
        touched={touched.contact_email}
        disabled={!userCanEdit}
        detailsFormField={true}
        readOnly={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldInput
        label={t("private_cost")}
        type="text"
        id="private_cost"
        name="private_cost"
        value={values.private_cost}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.private_cost}
        touched={touched.private_cost}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldInput
        label={t("idle_gas_usage")}
        type="text"
        id="idle_gas_usage"
        name="idle_gas_usage"
        value={values.idle_gas_usage}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.idle_gas_usage}
        touched={touched.idle_gas_usage}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldInput
        label={t("distance_gas_usage")}
        type="text"
        id="distance_gas_usage"
        name="distance_gas_usage"
        value={values.distance_gas_usage}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.distance_gas_usage}
        touched={touched.distance_gas_usage}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />

      <div className="col-span-12 grid grid-cols-12">
        <AdminFormFieldInput
          label={t("auto_update_interval_for_maps")}
          type="text"
          id="auto_update_interval_for_maps"
          name="auto_update_interval_for_maps"
          value={values.auto_update_interval_for_maps}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.auto_update_interval_for_maps}
          touched={touched.auto_update_interval_for_maps}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>

      <div className="col-span-12 grid grid-cols-8">
        <AdminFormFieldCheckbox
          label={t("drivers_assigned_to_devices")}
          id="drivers_assigned_to_devices"
          type="checkbox"
          name="drivers_assigned_to_devices"
          checked={values.drivers_assigned_to_devices}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.drivers_assigned_to_devices}
          error={errors.drivers_assigned_to_devices}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>

      <div className="col-span-12 grid grid-cols-12">
        <AdminFormFieldDropdown
          loadingData={loadingData}
          label={t("enable_map_clustering")}
          id="enable_map_clustering"
          name="enable_map_clustering"
          value={values.enable_map_clustering}
          options={ENABLE_MAP_CLUSTERING_OPTIONS}
          onChange={(e) => {
            formikSetValue("enable_map_clustering", e?.value);
          }}
          onBlur={(e) => {
            formikSetTouched("enable_map_clustering", true);
            handleBlur(e);
          }}
          touched={touched.enable_map_clustering}
          error={errors.enable_map_clustering}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>

      <div className="col-span-12 grid grid-cols-8 gap-4">
        <AdminFormFieldCheckbox
          label={t("open_reports_in_new_tab")}
          id="open_reports_in_new_tab"
          type="checkbox"
          name="open_reports_in_new_tab"
          checked={values.open_reports_in_new_tab}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.open_reports_in_new_tab}
          error={errors.open_reports_in_new_tab}
          disabled={!userCanEdit}
          detailsFormField={true}
        />

        <AdminFormFieldCheckbox
          label={t("sync_driverId_from_driver_admin")}
          id="sync_driverId_from_driver_admin"
          type="checkbox"
          name="sync_driverId_from_driver_admin"
          checked={values.sync_driverId_from_driver_admin}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.sync_driverId_from_driver_admin}
          error={errors.sync_driverId_from_driver_admin}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>
      <div className="col-span-12 grid grid-cols-8 gap-4">
        <AdminFormFieldCheckbox
          label={t("has_snowplows")}
          id="has_snowplows"
          type="checkbox"
          name="has_snowplows"
          checked={values.has_snowplows}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.has_snowplows}
          error={errors.has_snowplows}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
        <AdminFormFieldCheckbox
          label={t("hide_total_rows_in_csv")}
          id="hide_total_rows_in_csv"
          type="checkbox"
          name="hide_total_rows_in_csv"
          checked={values.hide_total_rows_in_csv}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.hide_total_rows_in_csv}
          error={errors.hide_total_rows_in_csv}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("timezone")}
        id="timezone"
        name="timezone"
        value={values.timezone}
        options={TIMEZONE_OPTIONS}
        onChange={(e) => {
          formikSetValue("timezone", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("timezone", true);
          handleBlur(e);
        }}
        touched={touched.timezone}
        error={errors.timezone}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("speed_units")}
        id="speed_units"
        name="speed_units"
        value={values.speed_units}
        options={SPEED_UNITS_OPTIONS}
        onChange={(e) => {
          formikSetValue("speed_units", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("speed_units", true);
          handleBlur(e);
        }}
        touched={touched.speed_units}
        error={errors.speed_units}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("distance_units")}
        id="distance_units"
        name="distance_units"
        value={values.distance_units}
        options={DISTANCE_UNITS_OPTIONS}
        onChange={(e) => {
          formikSetValue("distance_units", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("distance_units", true);
          handleBlur(e);
        }}
        touched={touched.distance_units}
        error={errors.distance_units}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("volume_units")}
        id="volume_units"
        name="volume_units"
        value={values.volume_units}
        options={VOLUME_UNITS_OPTIONS}
        onChange={(e) => {
          formikSetValue("volume_units", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("volume_units", true);
          handleBlur(e);
        }}
        touched={touched.volume_units}
        error={errors.volume_units}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("economy_units")}
        id="economy_units"
        name="economy_units"
        value={values.economy_units}
        options={ECONOMY_UNITS_OPTIONS}
        onChange={(e) => {
          formikSetValue("economy_units", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("economy_units", true);
          handleBlur(e);
        }}
        touched={touched.economy_units}
        error={errors.economy_units}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("pressure_units")}
        id="pressure_units"
        name="pressure_units"
        value={values.pressure_units}
        options={PRESSURE_UNITS_OPTIONS}
        onChange={(e) => {
          formikSetValue("pressure_units", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("pressure_units", true);
          handleBlur(e);
        }}
        touched={touched.pressure_units}
        error={errors.pressure_units}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("temperature_units")}
        id="temperature_units"
        name="temperature_units"
        value={values.temperature_units}
        options={TEMPRATURE_UNITS_OPTIONS}
        onChange={(e) => {
          formikSetValue("temperature_units", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("temperature_units", true);
          handleBlur(e);
        }}
        touched={touched.temperature_units}
        error={errors.temperature_units}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("latitude_longitude_format")}
        id="latitude_longitude_format"
        name="latitude_longitude_format"
        value={values.latitude_longitude_format}
        options={LATITUDE_LONGITUDE_FORMAT_OPTIONS}
        onChange={(e) => {
          formikSetValue("latitude_longitude_format", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("latitude_longitude_format", true);
          handleBlur(e);
        }}
        touched={touched.latitude_longitude_format}
        error={errors.latitude_longitude_format}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <div className="col-span-12 grid grid-cols-6">
        <AdminFormFieldInput
          label={t("route_segment_color_rule")}
          type="text"
          id="route_segment_color_rule"
          name="route_segment_color_rule"
          value={values.route_segment_color_rule}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.route_segment_color_rule}
          touched={touched.route_segment_color_rule}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("route_line_thickness")}
        id="route_line_thickness"
        name="route_line_thickness"
        value={values.route_line_thickness}
        options={ROUTE_LINE_THICKNESS_OPTIONS}
        onChange={(e) => {
          formikSetValue("route_line_thickness", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("route_line_thickness", true);
          handleBlur(e);
        }}
        touched={touched.route_line_thickness}
        error={errors.route_line_thickness}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("multi_vehicle_map_name")}
        type="text"
        id="multi_vehicle_map_name"
        name="multi_vehicle_map_name"
        value={values.multi_vehicle_map_name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.multi_vehicle_map_name}
        touched={touched.multi_vehicle_map_name}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("device_title")}
        type="text"
        id="device_title"
        name="device_title"
        value={values.device_title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.device_title}
        touched={touched.device_title}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("device_title_plural")}
        type="text"
        id="device_title_plural"
        name="device_title_plural"
        value={values.device_title_plural}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.device_title_plural}
        touched={touched.device_title_plural}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("device_group_title")}
        type="text"
        id="device_group_title"
        name="device_group_title"
        value={values.device_group_title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.device_group_title}
        touched={touched.device_group_title}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("device_group_title_plural")}
        type="text"
        id="device_group_title_plural"
        name="device_group_title_plural"
        value={values.device_group_title_plural}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.device_group_title_plural}
        touched={touched.device_group_title_plural}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("address_title")}
        type="text"
        id="address_title"
        name="address_title"
        value={values.address_title}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.address_title}
        touched={touched.address_title}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("address_title_plural")}
        type="text"
        id="address_title_plural"
        name="address_title_plural"
        value={values.address_title_plural}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.address_title_plural}
        touched={touched.address_title_plural}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("default_login_userId")}
        type="text"
        id="default_login_userId"
        name="default_login_userId"
        value={values.default_login_userId}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.default_login_userId}
        touched={touched.default_login_userId}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("default_overlay")}
        id="default_overlay"
        name="default_overlay"
        value={values.default_overlay}
        options={DEFAULT_OVERLAY_OPTIONS}
        onChange={(e) => {
          formikSetValue("default_overlay", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("default_overlay", true);
          handleBlur(e);
        }}
        touched={touched.default_overlay}
        error={errors.default_overlay}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
    </div>
  );
};

export const AccountMaintenanceIntervalLabelForm: FC<AccountGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.profile.account.form",
  });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label={t("last_maintenance_1")}
        type="text"
        id="last_maintenance_1"
        name="last_maintenance_1"
        value={values.last_maintenance_1}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_1}
        touched={touched.last_maintenance_1}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_2")}
        type="text"
        id="last_maintenance_2"
        name="last_maintenance_2"
        value={values.last_maintenance_2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_2}
        touched={touched.last_maintenance_2}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_3")}
        type="text"
        id="last_maintenance_3"
        name="last_maintenance_3"
        value={values.last_maintenance_3}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_3}
        touched={touched.last_maintenance_3}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_4")}
        type="text"
        id="last_maintenance_4"
        name="last_maintenance_4"
        value={values.last_maintenance_4}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_4}
        touched={touched.last_maintenance_4}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_5")}
        type="text"
        id="last_maintenance_5"
        name="last_maintenance_5"
        value={values.last_maintenance_5}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_5}
        touched={touched.last_maintenance_5}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_6")}
        type="text"
        id="last_maintenance_6"
        name="last_maintenance_6"
        value={values.last_maintenance_6}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_6}
        touched={touched.last_maintenance_6}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_7")}
        type="text"
        id="last_maintenance_7"
        name="last_maintenance_7"
        value={values.last_maintenance_7}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_7}
        touched={touched.last_maintenance_7}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_8")}
        type="text"
        id="last_maintenance_8"
        name="last_maintenance_8"
        value={values.last_maintenance_8}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_8}
        touched={touched.last_maintenance_8}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_9")}
        type="text"
        id="last_maintenance_9"
        name="last_maintenance_9"
        value={values.last_maintenance_9}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_9}
        touched={touched.last_maintenance_9}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_maintenance_10")}
        type="text"
        id="last_maintenance_10"
        name="last_maintenance_10"
        value={values.last_maintenance_10}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_maintenance_10}
        touched={touched.last_maintenance_10}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <div className="col-span-12 pt-6"></div>

      <AdminFormFieldInput
        label={t("last_eng_hours_maint_1")}
        type="text"
        id="last_eng_hours_maint_1"
        name="last_eng_hours_maint_1"
        value={values.last_eng_hours_maint_1}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_eng_hours_maint_1}
        touched={touched.last_eng_hours_maint_1}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_eng_hours_maint_2")}
        type="text"
        id="last_eng_hours_maint_2"
        name="last_eng_hours_maint_2"
        value={values.last_eng_hours_maint_2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_eng_hours_maint_2}
        touched={touched.last_eng_hours_maint_2}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_eng_hours_maint_3")}
        type="text"
        id="last_eng_hours_maint_3"
        name="last_eng_hours_maint_3"
        value={values.last_eng_hours_maint_3}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_eng_hours_maint_3}
        touched={touched.last_eng_hours_maint_3}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_eng_hours_maint_4")}
        type="text"
        id="last_eng_hours_maint_4"
        name="last_eng_hours_maint_4"
        value={values.last_eng_hours_maint_4}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_eng_hours_maint_4}
        touched={touched.last_eng_hours_maint_4}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <AdminFormFieldInput
          label={t("last_eng_hours_maint_5")}
          type="text"
          id="last_eng_hours_maint_5"
          name="last_eng_hours_maint_5"
          value={values.last_eng_hours_maint_5}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.last_eng_hours_maint_5}
          touched={touched.last_eng_hours_maint_5}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>

      <div className="col-span-12 pt-6"></div>

      <AdminFormFieldInput
        label={t("last_service_time_1")}
        type="text"
        id="last_service_time_1"
        name="last_service_time_1"
        value={values.last_service_time_1}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_service_time_1}
        touched={touched.last_service_time_1}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_service_time_2")}
        type="text"
        id="last_service_time_2"
        name="last_service_time_2"
        value={values.last_service_time_2}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_service_time_2}
        touched={touched.last_service_time_2}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_service_time_3")}
        type="text"
        id="last_service_time_3"
        name="last_service_time_3"
        value={values.last_service_time_3}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_service_time_3}
        touched={touched.last_service_time_3}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_service_time_4")}
        type="text"
        id="last_service_time_4"
        name="last_service_time_4"
        value={values.last_service_time_4}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_service_time_4}
        touched={touched.last_service_time_4}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("last_service_time_5")}
        type="text"
        id="last_service_time_5"
        name="last_service_time_5"
        value={values.last_service_time_5}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_service_time_5}
        touched={touched.last_service_time_5}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
    </div>
  );
};

export const AccountScorecardWeightFactorsForm: FC<AccountGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
  loadingData
}) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.profile.account.form",
  });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("harsh_braking")}
        id="harsh_braking"
        name="harsh_braking"
        value={values.harsh_braking}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("harsh_braking", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("harsh_braking", true);
          handleBlur(e);
        }}
        touched={touched.harsh_braking}
        error={errors.harsh_braking}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("harsh_acceleration")}
        id="harsh_acceleration"
        name="harsh_acceleration"
        value={values.harsh_acceleration}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("harsh_acceleration", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("harsh_acceleration", true);
          handleBlur(e);
        }}
        touched={touched.harsh_acceleration}
        error={errors.harsh_acceleration}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("speeding")}
        id="speeding"
        name="speeding"
        value={values.speeding}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("speeding", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("speeding", true);
          handleBlur(e);
        }}
        touched={touched.speeding}
        error={errors.speeding}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("reverse")}
        id="reverse"
        name="reverse"
        value={values.reverse}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("reverse", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("reverse", true);
          handleBlur(e);
        }}
        touched={touched.reverse}
        error={errors.reverse}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("seatbelt_off")}
        id="seatbelt_off"
        name="seatbelt_off"
        value={values.seatbelt_off}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("seatbelt_off", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("seatbelt_off", true);
          handleBlur(e);
        }}
        touched={touched.seatbelt_off}
        error={errors.seatbelt_off}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("harsh_cornering")}
        id="harsh_cornering"
        name="harsh_cornering"
        value={values.harsh_cornering}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("harsh_cornering", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("harsh_cornering", true);
          handleBlur(e);
        }}
        touched={touched.harsh_cornering}
        error={errors.harsh_cornering}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("idle_ratio")}
        id="idle_ratio"
        name="idle_ratio"
        value={values.idle_ratio}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("idle_ratio", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("idle_ratio", true);
          handleBlur(e);
        }}
        touched={touched.idle_ratio}
        error={errors.idle_ratio}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("impact_crash_ai")}
        id="impact_crash_ai"
        name="impact_crash_ai"
        value={values.impact_crash_ai}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("impact_crash_ai", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("impact_crash_ai", true);
          handleBlur(e);
        }}
        touched={touched.impact_crash_ai}
        error={errors.impact_crash_ai}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("cellphone_use_ai")}
        id="cellphone_use_ai"
        name="cellphone_use_ai"
        value={values.cellphone_use_ai}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("cellphone_use_ai", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("cellphone_use_ai", true);
          handleBlur(e);
        }}
        touched={touched.cellphone_use_ai}
        error={errors.cellphone_use_ai}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("distracted_driving_ai")}
        id="distracted_driving_ai"
        name="distracted_driving_ai"
        value={values.distracted_driving_ai}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("distracted_driving_ai", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("distracted_driving_ai", true);
          handleBlur(e);
        }}
        touched={touched.distracted_driving_ai}
        error={errors.distracted_driving_ai}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("drinking_eating_ai")}
        id="drinking_eating_ai"
        name="drinking_eating_ai"
        value={values.drinking_eating_ai}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("drinking_eating_ai", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("drinking_eating_ai", true);
          handleBlur(e);
        }}
        touched={touched.drinking_eating_ai}
        error={errors.drinking_eating_ai}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("smoking_ai")}
        id="smoking_ai"
        name="smoking_ai"
        value={values.smoking_ai}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("smoking_ai", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("smoking_ai", true);
          handleBlur(e);
        }}
        touched={touched.smoking_ai}
        error={errors.smoking_ai}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("possible_fatiuge_ai")}
        id="possible_fatiuge_ai"
        name="possible_fatiuge_ai"
        value={values.possible_fatiuge_ai}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("possible_fatiuge_ai", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("possible_fatiuge_ai", true);
          handleBlur(e);
        }}
        touched={touched.possible_fatiuge_ai}
        error={errors.possible_fatiuge_ai}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("obstructed_camera_ai")}
        id="obstructed_camera_ai"
        name="obstructed_camera_ai"
        value={values.obstructed_camera_ai}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("obstructed_camera_ai", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("obstructed_camera_ai", true);
          handleBlur(e);
        }}
        touched={touched.obstructed_camera_ai}
        error={errors.obstructed_camera_ai}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("tailgating_ai")}
        id="tailgating_ai"
        name="tailgating_ai"
        value={values.tailgating_ai}
        options={SCORECARD_WEIGHT_FACTOR_OPTIONS}
        onChange={(e) => {
          formikSetValue("tailgating_ai", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("tailgating_ai", true);
          handleBlur(e);
        }}
        touched={touched.tailgating_ai}
        error={errors.tailgating_ai}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
    </div>
  );
};
