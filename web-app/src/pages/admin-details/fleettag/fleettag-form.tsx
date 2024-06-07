/**
 * -----------------------------------------------------------------------------
 * Fleettag Edit Form
 * -----------------------------------------------------------------------------
 * These components are used to render the form for editing the fleettag details.
 */

import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AdminFormFieldInput } from "../../../components/admin/formFields";

interface FleettagDetailFormProps {
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
}

export const FleettagDetailForm: FC<FleettagDetailFormProps> = ({
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
    keyPrefix: "admins.fleettags.detailsPage.form",
  });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label={t("fleet_tag_id")}
        type="text"
        id="fleet_tag_id"
        name="fleet_tag_id"
        value={values.fleet_tag_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fleet_tag_id}
        touched={touched.fleet_tag_id}
        disabled={!userCanEdit}
      />
      <AdminFormFieldInput
        label={t("fleet_tag_name")}
        type="text"
        id="fleet_tag_name"
        name="fleet_tag_name"
        value={values.fleet_tag_name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fleet_tag_name}
        touched={touched.fleet_tag_name}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("last_event_time")}
        type="datetime-local"
        id="last_event_time"
        name="last_event_time"
        value={values.last_event_time ? new Date(values.last_event_time).toISOString().slice(0, 16) : ""}
        onChange={(e) => {formikSetValue("last_event_time", e.target.value)}}
        onBlur={(e) => {formikSetTouched("last_event_time", true); handleBlur(e)}}
        error={errors.last_event_time}
        touched={touched.last_event_time}
        disabled={!userCanEdit}
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("last_status_code")}
        type="text"
        id="last_status_code"
        name="last_status_code"
        value={values.last_status_code}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_status_code}
        touched={touched.last_status_code}
        disabled={!userCanEdit}
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("in_range")}
        type="text"
        id="in_range"
        name="in_range"
        value={values.in_range}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.in_range}
        touched={touched.in_range}
        disabled={!userCanEdit}
        customInputClass={values.in_range === "Yes" ? "text-green-500" : "text-red-500"}
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("in_range_device_id")}
        type="text"
        id="in_range_device_id"
        name="in_range_device_id"
        value={values.in_range_device_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.in_range_device_id}
        touched={touched.in_range_device_id}
        disabled={!userCanEdit}
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("last_location")}
        type="text"
        id="last_location"
        name="last_location"
        value={values.last_location}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_location}
        touched={touched.last_location}
        disabled={!userCanEdit}
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("last_address")}
        type="text"
        id="last_address"
        name="last_address"
        value={values.last_address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_address}
        touched={touched.last_address}
        disabled={!userCanEdit}
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("last_altitude")}
        type="text"
        id="last_altitude"
        name="last_altitude"
        value={values.last_altitude}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.last_altitude}
        touched={touched.last_altitude}
        disabled={!userCanEdit}
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("distance_travelled")}
        type="text"
        id="distance_travelled"
        name="distance_travelled"
        value={values.distance_travelled}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.distance_travelled}
        touched={touched.distance_travelled}
        disabled={!userCanEdit}
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("tag_signal_strength")}
        type="text"
        id="tag_signal_strength"
        name="tag_signal_strength"
        value={values.tag_signal_strength}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.tag_signal_strength}
        touched={touched.tag_signal_strength}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("tag_battery_level")}
        type="text"
        id="tag_battery_level"
        name="tag_battery_level"
        value={values.tag_battery_level}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.tag_battery_level}
        touched={touched.tag_battery_level}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("temprature")}
        type="text"
        id="temprature"
        name="temprature"
        value={values.temprature}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.temprature}
        touched={touched.temprature}
        disabled={!userCanEdit}
        customWrapperClass="col-span-4"
        readOnly={true}
      />
    </div>
  );
};

export default FleettagDetailForm;
