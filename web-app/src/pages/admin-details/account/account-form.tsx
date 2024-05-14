import { Formik } from "formik";
import { FC, useState } from "react";
import {
  accountGeneralDetailsInitialValues,
  accountGeneralDetailsYupValidationSchema,
} from "./validation";
import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";
import { useTranslation } from "react-i18next";

interface AccountGeneralDetailFormProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: (event: React.ChangeEvent<any>) => void;
  formikSetValue: (field: string, value: any, shouldValidate?: boolean) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  formikSetTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
  userCanEdit: boolean;
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
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "dashboard.profile.account.form" });
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
        />
      </div>

      <div className="col-span-12 grid grid-cols-12">
        <AdminFormFieldDropdown
          label={t("enable_map_clustering")}
          id="enable_map_clustering"
          name="enable_map_clustering"
          value={values.enable_map_clustering}
          onChange={(e) => { formikSetValue("enable_map_clustering", e?.value); }}
          onBlur={(e) => { formikSetTouched("enable_map_clustering", true); handleBlur(e); }}
          touched={touched.enable_map_clustering}
          error={errors.enable_map_clustering}
          disabled={!userCanEdit}
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
        />
      </div>
      <AdminFormFieldDropdown
        label={t("timezone")}
        id="timezone"
        name="timezone"
        value={values.timezone}
        onChange={(e) => { formikSetValue("timezone", e?.value); }}
        onBlur={(e) => { formikSetTouched("timezone", true); handleBlur(e); }}
        touched={touched.timezone}
        error={errors.timezone}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        label={t("speed_units")}
        id="speed_units"
        name="speed_units"
        value={values.speed_units}
        onChange={(e) => { formikSetValue("speed_units", e?.value); }}
        onBlur={(e) => { formikSetTouched("speed_units", true); handleBlur(e); }}
        touched={touched.speed_units}
        error={errors.speed_units}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        label={t("distance_units")}
        id="distance_units"
        name="distance_units"
        value={values.distance_units}
        onChange={(e) => { formikSetValue("distance_units", e?.value); }}
        onBlur={(e) => { formikSetTouched("distance_units", true); handleBlur(e); }}
        touched={touched.distance_units}
        error={errors.distance_units}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        label={t("volume_units")}
        id="volume_units"
        name="volume_units"
        value={values.volume_units}
        onChange={(e) => { formikSetValue("volume_units", e?.value); }}
        onBlur={(e) => { formikSetTouched("volume_units", true); handleBlur(e); }}
        touched={touched.volume_units}
        error={errors.volume_units}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        label={t("economy_units")}
        id="economy_units"
        name="economy_units"
        value={values.economy_units}
        onChange={(e) => { formikSetValue("economy_units", e?.value); }}
        onBlur={(e) => { formikSetTouched("economy_units", true); handleBlur(e); }}
        touched={touched.economy_units}
        error={errors.economy_units}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        label={t("pressure_units")}
        id="pressure_units"
        name="pressure_units"
        value={values.pressure_units}
        onChange={(e) => { formikSetValue("pressure_units", e?.value); }}
        onBlur={(e) => { formikSetTouched("pressure_units", true); handleBlur(e); }}
        touched={touched.pressure_units}
        error={errors.pressure_units}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
      />
      <AdminFormFieldDropdown
        label={t("temperature_units")}
        id="temperature_units"
        name="temperature_units"
        value={values.temperature_units}
        onChange={(e) => { formikSetValue("temperature_units", e?.value); }}
        onBlur={(e) => { formikSetTouched("temperature_units", true); handleBlur(e); }}
        touched={touched.temperature_units}
        error={errors.temperature_units}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("latitude_longitude_format")}
        id="latitude_longitude_format"
        name="latitude_longitude_format"
        value={values.latitude_longitude_format}
        onChange={(e) => { formikSetValue("latitude_longitude_format", e?.value); }}
        onBlur={(e) => { formikSetTouched("latitude_longitude_format", true); handleBlur(e); }}
        touched={touched.latitude_longitude_format}
        error={errors.latitude_longitude_format}
        disabled={!userCanEdit}
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
        />
      </div>

      <AdminFormFieldDropdown
        label={t("route_line_thickness")}
        id="route_line_thickness"
        name="route_line_thickness"
        value={values.route_line_thickness}
        onChange={(e) => { formikSetValue("route_line_thickness", e?.value); }}
        onBlur={(e) => { formikSetTouched("route_line_thickness", true); handleBlur(e); }}
        touched={touched.route_line_thickness}
        error={errors.route_line_thickness}
        disabled={!userCanEdit}
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
      />
      <AdminFormFieldDropdown
        label={t("default_overlay")}
        id="default_overlay"
        name="default_overlay"
        value={values.default_overlay}
        onChange={(e) => { formikSetValue("default_overlay", e?.value); }}
        onBlur={(e) => { formikSetTouched("default_overlay", true); handleBlur(e); }}
        touched={touched.default_overlay}
        error={errors.default_overlay}
        disabled={!userCanEdit}
      />
    </div>
  );
};
