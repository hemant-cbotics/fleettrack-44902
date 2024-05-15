import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { groupMembershipFormValidationSchema } from "./validation";
import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";
import { useTranslation } from "react-i18next";

interface VehicleDetailFormProps {
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

export const VehicleDetailForm: FC<VehicleDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "admins.vehicles.detailsPage.form" });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label={t("vehicle_id")}
        type="text"
        id="vehicle_id"
        name="vehicle_id"
        value={values.vehicle_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.vehicle_id}
        touched={touched.vehicle_id}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("creation_date")}
        type="datetime-local"
        id="creation_date"
        name="creation_date"
        value={values.creation_date}
        onChange={(e) => {
          formikSetValue("creation_date", e.target.value);
        }}
        onBlur={(e) => {
          formikSetTouched("creation_date", true);
          handleBlur(e);
        }}
        error={errors.creation_date}
        touched={touched.creation_date}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("server_id")}
        type="text"
        id="server_id"
        name="server_id"
        value={values.server_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.server_id}
        touched={touched.server_id}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("firmware_version")}
        type="text"
        id="firmware_version"
        name="firmware_version"
        value={values.firmware_version}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.firmware_version}
        touched={touched.firmware_version}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("unique_id")}
        type="text"
        id="unique_id"
        name="unique_id"
        value={values.unique_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.unique_id}
        touched={touched.unique_id}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("previous_unique_id")}
        type="text"
        id="previous_unique_id"
        name="previous_unique_id"
        value={values.previous_unique_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.previous_unique_id}
        touched={touched.previous_unique_id}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("unique_id_last_change")}
        type="date"
        id="unique_id_last_change"
        name="unique_id_last_change"
        value={values.unique_id_last_change}
        onChange={(e) => {
          formikSetValue("unique_id_last_change", e.target.value);
        }}
        onBlur={(e) => {
          formikSetTouched("unique_id_last_change", true);
          handleBlur(e);
        }}
        error={errors.unique_id_last_change}
        touched={touched.unique_id_last_change}
        disabled={!userCanEdit}
      />

      <div className="grid grid-cols-8 col-span-12">
        <AdminFormFieldCheckbox
          label={t("is_active")}
          id="is_active"
          type="checkbox"
          name="is_active"
          checked={!!values.is_active}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.is_active}
          touched={touched.is_active}
          disabled={!userCanEdit}
        />
      </div>

      <AdminFormFieldInput
        label={t("vehicle_description")}
        type="text"
        id="vehicle_description"
        name="vehicle_description"
        value={values.vehicle_description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.vehicle_description}
        touched={touched.vehicle_description}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("short_name")}
        type="text"
        id="short_name"
        name="short_name"
        value={values.short_name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.short_name}
        touched={touched.short_name}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("vin")}
        type="text"
        id="vin"
        name="vin"
        value={values.vin}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.vin}
        touched={touched.vin}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("vehicle_make")}
        type="text"
        id="vehicle_make"
        name="vehicle_make"
        value={values.vehicle_make}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.vehicle_make}
        touched={touched.vehicle_make}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("vehicle_model")}
        type="text"
        id="vehicle_model"
        name="vehicle_model"
        value={values.vehicle_model}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.vehicle_model}
        touched={touched.vehicle_model}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("license_plate")}
        type="text"
        id="license_plate"
        name="license_plate"
        value={values.license_plate}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.license_plate}
        touched={touched.license_plate}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("license_expiration")}
        type="date"
        id="license_expiration"
        name="license_expiration"
        value={values.license_expiration}
        onChange={(e) => {
          formikSetValue("license_expiration", e.target.value);
        }}
        onBlur={(e) => {
          formikSetTouched("license_expiration", true);
          handleBlur(e);
        }}
        error={errors.license_expiration}
        touched={touched.license_expiration}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("equipment_type")}
        type="text"
        id="equipment_type"
        name="equipment_type"
        value={values.equipment_type}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.equipment_type}
        touched={touched.equipment_type}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("equipment_status")}
        id="equipment_status"
        name="equipment_status"
        value={values.equipment_status}
        onChange={(e) => {
          formikSetValue("equipment_status", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("equipment_status", true);
          handleBlur(e);
        }}
        error={errors.equipment_status}
        touched={touched.equipment_status}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("asset_type")}
        id="asset_type"
        name="asset_type"
        value={values.asset_type}
        onChange={(e) => {
          formikSetValue("asset_type", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("asset_type", true);
          handleBlur(e);
        }}
        error={errors.asset_type}
        touched={touched.asset_type}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("vehicle_class")}
        id="vehicle_class"
        name="vehicle_class"
        value={values.vehicle_class}
        onChange={(e) => {
          formikSetValue("vehicle_class", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("vehicle_class", true);
          handleBlur(e);
        }}
        error={errors.vehicle_class}
        touched={touched.vehicle_class}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("imei_number")}
        type="text"
        id="imei_number"
        name="imei_number"
        value={values.imei_number}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.imei_number}
        touched={touched.imei_number}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("serial_number")}
        type="text"
        id="serial_number"
        name="serial_number"
        value={values.serial_number}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.serial_number}
        touched={touched.serial_number}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("phone_number")}
        type="text"
        id="phone_number"
        name="phone_number"
        value={values.phone_number}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.phone_number}
        touched={touched.phone_number}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("email")}
        type="email"
        id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("group_pushpin_id")}
        type="text"
        id="group_pushpin_id"
        name="group_pushpin_id"
        value={values.group_pushpin_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.group_pushpin_id}
        touched={touched.group_pushpin_id}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("map_route_color")}
        id="map_route_color"
        name="map_route_color"
        value={values.map_route_color}
        onChange={(e) => {
          formikSetValue("map_route_color", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("map_route_color", true);
          handleBlur(e);
        }}
        error={errors.map_route_color}
        touched={touched.map_route_color}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("ignition_input")}
        id="ignition_input"
        name="ignition_input"
        value={values.ignition_input}
        onChange={(e) => {
          formikSetValue("ignition_input", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("ignition_input", true);
          handleBlur(e);
        }}
        error={errors.ignition_input}
        touched={touched.ignition_input}
        disabled={!userCanEdit}
      />
      <div className="grid grid-cols-12 col-span-12">
        <AdminFormFieldInput
          label={t("maximum_speed")}
          type="text"
          id="maximum_speed"
          name="maximum_speed"
          value={values.maximum_speed}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.maximum_speed}
          touched={touched.maximum_speed}
          disabled={!userCanEdit}
        />
      </div>

      <div className="grid grid-cols-12 col-span-12">
        <AdminFormFieldInput
          label={t("driver_id")}
          type="text"
          id="driver_id"
          name="driver_id"
          value={values.driver_id}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.driver_id}
          touched={touched.driver_id}
          disabled={!userCanEdit}
        />
      </div>

      <AdminFormFieldInput
        label={t("driver_name")}
        type="text"
        id="driver_name"
        name="driver_name"
        value={values.driver_name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.driver_name}
        touched={touched.driver_name}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("driver_phone_number")}
        type="text"
        id="driver_phone_number"
        name="driver_phone_number"
        value={values.driver_phone_number}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.driver_phone_number}
        touched={touched.driver_phone_number}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("fuel_type")}
        id="fuel_type"
        name="fuel_type"
        value={values.fuel_type}
        onChange={(e) => {
          formikSetValue("fuel_type", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("fuel_type", true);
          handleBlur(e);
        }}
        error={errors.fuel_type}
        touched={touched.fuel_type}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("fuel_capacity")}
        type="text"
        id="fuel_capacity"
        name="fuel_capacity"
        value={values.fuel_capacity}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fuel_capacity}
        touched={touched.fuel_capacity}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("fuel_economy")}
        type="text"
        id="fuel_economy"
        name="fuel_economy"
        value={values.fuel_economy}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fuel_economy}
        touched={touched.fuel_economy}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("fuel_cost")}
        type="text"
        id="fuel_cost"
        name="fuel_cost"
        value={values.fuel_cost}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.fuel_cost}
        touched={touched.fuel_cost}
        disabled={!userCanEdit}
      />
    </div>
  );
};

export const VehicleCameraIdDetailForm: FC<VehicleDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "admins.vehicles.detailsPage.form" });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label={t("recorder_id")}
        type="text"
        id="recorder_id"
        name="recorder_id"
        value={values.recorder_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.recorder_id}
        touched={touched.recorder_id}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("recorder_on")}
        id="recorder_on"
        name="recorder_on"
        value={values.recorder_on}
        onChange={(e) => {
          formikSetValue("recorder_on", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("recorder_on", true);
          handleBlur(e);
        }}
        error={errors.recorder_on}
        touched={touched.recorder_on}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("recorder_type")}
        id="recorder_type"
        name="recorder_type"
        value={values.recorder_type}
        onChange={(e) => {
          formikSetValue("recorder_type", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("recorder_type", true);
          handleBlur(e);
        }}
        error={errors.recorder_type}
        touched={touched.recorder_type}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("previous_recorder_id")}
        type="text"
        id="previous_recorder_id"
        name="previous_recorder_id"
        value={values.previous_recorder_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.previous_recorder_id}
        touched={touched.previous_recorder_id}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("recorder_id_last_changed")}
        type="text"
        id="recorder_id_last_changed"
        name="recorder_id_last_changed"
        value={values.recorder_id_last_changed}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.recorder_id_last_changed}
        touched={touched.recorder_id_last_changed}
        disabled={!userCanEdit}
      />
    </div>
  );
};

export const VehicleGroupMembershipForm: FC<VehicleDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "admins.vehicles.detailsPage.form" });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <div className="grid grid-cols-8 col-span-12 gap-4">
        <AdminFormFieldCheckbox
          label={t("list_of_groups")}
          id="list_of_groups"
          type="checkbox"
          name="list_of_groups"
          checked={!!values.list_of_groups}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.list_of_groups}
          touched={touched.list_of_groups}
          disabled={!userCanEdit}
        />
        <AdminFormFieldCheckbox
          label={t("all_vehicles")}
          id="all_vehicles"
          type="checkbox"
          name="all_vehicles"
          checked={!!values.all_vehicles}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.all_vehicles}
          touched={touched.all_vehicles}
          disabled={!userCanEdit}
        />
      </div>
    </div>
  );
};
