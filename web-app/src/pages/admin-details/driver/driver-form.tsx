/**
 * -----------------------------------------------------------------------------
 * Driver Edit Form
 * -----------------------------------------------------------------------------
 * These components are used to render the form for editing the driver details.
 */

import { FC } from "react";
import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";
import { useTranslation } from "react-i18next";
import { LICENSE_STATE_OPTIONS, LICENSE_STATUS_OPTIONS, LICENSE_TYPE_OPTIONS } from "./constants";
import { useLoggedInUserData } from "../../../utils/user";
import { useOrganizationVehiclesQuery } from "../../../api/network/adminApiServices";
import { OrganizationVehicle } from "../../../api/types/Vehicle";

interface DriverGeneralDetailFormProps {
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

export const DriverGeneralDetailForm: FC<DriverGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "admins.drivers.detailsPage.form" });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
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
        detailsFormField={true}
        readOnly={true}
      />

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
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("nick_name")}
        type="text"
        id="nick_name"
        name="nick_name"
        value={values.nick_name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.nick_name}
        touched={touched.nick_name}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("contact_phone")}
        type="text"
        id="contact_phone"
        name="contact_phone"
        value={values.contact_phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.contact_phone}
        touched={touched.contact_phone}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
      <AdminFormFieldInput
        label={t("contact_email")}
        type="text"
        id="contact_email"
        name="contact_email"
        value={values.contact_email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.contact_email}
        touched={touched.contact_email}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-12"
        readOnly={true}
      />

      <AdminFormFieldInput
        label={t("badge_employee_id")}
        type="text"
        id="badge_employee_id"
        name="badge_employee_id"
        value={values.badge_employee_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.badge_employee_id}
        touched={touched.badge_employee_id}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("card_id")}
        type="text"
        id="card_id"
        name="card_id"
        value={values.card_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.card_id}
        touched={touched.card_id}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
      <div className="col-span-12 grid grid-cols-8">
        <AdminFormFieldCheckbox
          label={t("is_active")}
          id="is_active"
          type="checkbox"
          name="is_active"
          checked={values.is_active}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.is_active}
          touched={touched.is_active}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>
    </div>
  );
};

export const DriverLicenseDetailForm: FC<DriverGeneralDetailFormProps> = ({
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
  const { t } = useTranslation("translation", { keyPrefix: "admins.drivers.detailsPage.form" });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("license_type")}
        id="license_type"
        name="license_type"
        value={values.license_type}
        options={LICENSE_TYPE_OPTIONS}
        onChange={(e) => {
          formikSetValue("license_type", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("license_type", true);
          handleBlur(e);
        }}
        error={errors.license_type}
        touched={touched.license_type}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("license_state")}
        id="license_state"
        name="license_state"
        value={values.license_state}
        options={LICENSE_STATE_OPTIONS}
        onChange={(e) => {
          formikSetValue("license_state", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("license_state", true);
          handleBlur(e);
        }}
        error={errors.license_state}
        touched={touched.license_state}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("license_number")}
        type="text"
        id="license_number"
        name="license_number"
        value={values.license_number}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.license_number}
        touched={touched.license_number}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("license_expiry_date")}
        type="date"
        id="license_expiry_date"
        name="license_expiry_date"
        value={values.license_expiry_date ? new Date(values.license_expiry_date).toISOString().slice(0, 10) : ""}
        onChange={(e) => {formikSetValue("license_expiry_date", e?.target?.value); }}
        onBlur={(e) => { formikSetTouched("license_expiry_date", true); handleBlur(e); }}
        error={errors.license_expiry_date}
        touched={touched.license_expiry_date}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("license_status")}
        id="license_status"
        name="license_status"
        value={values.license_status}
        options={LICENSE_STATUS_OPTIONS}
        onChange={(e) => {
          formikSetValue("license_status", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("license_status", true);
          handleBlur(e);
        }}
        error={errors.license_status}
        touched={touched.license_status}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
    </div>
  );
};

export const DriverMedicalDetailForm: FC<DriverGeneralDetailFormProps> = ({
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
  const { t } = useTranslation("translation", { keyPrefix: "admins.drivers.detailsPage.form" });
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const orgVehiclesQueryParams = {organization_id: `${thisUserOrganizationId}`, page: 1, page_size: 100};
  const {data: dataOrgVehicles} = useOrganizationVehiclesQuery(orgVehiclesQueryParams);
  const { results: allVehicles } = dataOrgVehicles ?? {};
  const allVehicleList = !!allVehicles
  ? (allVehicles || ([] as OrganizationVehicle[])).map(
      (item: OrganizationVehicle, index: number) => ({
        value: item?.id,
        label: item?.vehicle_model + " " + item?.vehicle_make,
      })
    )
  : [];

  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label={t("medical_card_no")}
        type="text"
        id="medical_card_no"
        name="medical_card_no"
        value={values.medical_card_no}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.medical_card_no}
        touched={touched.medical_card_no}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("medical_card_expiry_date")}
        type="date"
        id="medical_card_expiry_date"
        name="medical_card_expiry_date"
        value={values.medical_card_expiry_date ? new Date(values.medical_card_expiry_date).toISOString().slice(0, 10) : ""}
        onChange={(e) => {formikSetValue("medical_card_expiry_date", e?.target?.value); }}
        onBlur={(e) => { formikSetTouched("medical_card_expiry_date", true); handleBlur(e); }}
        error={errors.medical_card_expiry_date}
        touched={touched.medical_card_expiry_date}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <div className="col-span-12 grid grid-cols-8">
        <AdminFormFieldCheckbox
          label={t("hazmat_certified")}
          id="hazmat_certified"
          type="checkbox"
          name="hazmat_certified"
          checked={values.hazmat_certified}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.hazmat_certified}
          touched={touched.hazmat_certified}
          disabled={!userCanEdit}
          detailsFormField={true}
        />
      </div>

      <AdminFormFieldInput
        label={t("twic")}
        type="text"
        id="twic"
        name="twic"
        value={values.twic}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.twic}
        touched={touched.twic}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("twic_expiry_date")}
        type="date"
        id="twic_expiry_date"
        name="twic_expiry_date"
        value={values.twic_expiry_date ? new Date(values.twic_expiry_date).toISOString().slice(0, 10) : ""}
        onChange={(e) => {formikSetValue("twic_expiry_date", e?.target?.value); }}
        onBlur={(e) => { formikSetTouched("twic_expiry_date", true); handleBlur(e); }}
        error={errors.twic_expiry_date}
        touched={touched.twic_expiry_date}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldInput
        label={t("address")}
        type="text"
        id="address"
        name="address"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.address}
        touched={touched.address}
        disabled={!userCanEdit}
        detailsFormField={true}
        customWrapperClass="col-span-12"
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("vehicle_id")}
        id="vehicle_id"
        name="vehicle_id"
        value={values.vehicle_id}
        options={allVehicleList}
        onChange={(e) => {
          formikSetValue("vehicle_id", e?.value);
        }}
        onBlur={(e) => {
          formikSetTouched("vehicle_id", true);
          handleBlur(e);
        }}
        error={errors.vehicle_id}
        touched={touched.vehicle_id}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
    </div>
  );
};
