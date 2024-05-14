import { FC } from "react";
import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";

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
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label="Driver ID"
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

      <AdminFormFieldInput
        label="Driver Name"
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
        label="Nickname"
        type="text"
        id="nick_name"
        name="nick_name"
        value={values.nick_name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.nick_name}
        touched={touched.nick_name}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label="Contact Phone"
        type="text"
        id="contact_phone"
        name="contact_phone"
        value={values.contact_phone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.contact_phone}
        touched={touched.contact_phone}
        disabled={!userCanEdit}
      />
      <AdminFormFieldInput
        label="Contact Email"
        type="text"
        id="contact_email"
        name="contact_email"
        value={values.contact_email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.contact_email}
        touched={touched.contact_email}
        disabled={!userCanEdit}
        customWrapperClass="col-span-12"
      />

      <AdminFormFieldInput
        label="Badge/Employee ID"
        type="text"
        id="badge_employee_id"
        name="badge_employee_id"
        value={values.badge_employee_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.badge_employee_id}
        touched={touched.badge_employee_id}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label="Card ID"
        type="text"
        id="card_id"
        name="card_id"
        value={values.card_id}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.card_id}
        touched={touched.card_id}
        disabled={!userCanEdit}
      />
      <div className="col-span-12 grid grid-cols-8">
        <AdminFormFieldCheckbox
          label="Is Active"
          id="is_active"
          type="checkbox"
          name="is_active"
          checked={values.is_active}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.is_active}
          touched={touched.is_active}
          disabled={!userCanEdit}
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
}) => {
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldDropdown
        label="License Type"
        id="license_type"
        name="license_type"
        value={values.license_type}
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
      />

      <AdminFormFieldDropdown
        label="License State"
        id="license_state"
        name="license_state"
        value={values.license_state}
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
      />

      <AdminFormFieldInput
        label="License Number"
        type="text"
        id="license_number"
        name="license_number"
        value={values.license_number}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.license_number}
        touched={touched.license_number}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label="License Expiration"
        type="date"
        id="license_expiry_date"
        name="license_expiry_date"
        value={values.license_expiry_date}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.license_expiry_date}
        touched={touched.license_expiry_date}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label="License Status"
        id="license_status"
        name="license_status"
        value={values.license_status}
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
}) => {
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label="Medical Card No"
        type="text"
        id="medical_card_no"
        name="medical_card_no"
        value={values.medical_card_no}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.medical_card_no}
        touched={touched.medical_card_no}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label="Medical Card Expiration"
        type="date"
        id="medical_card_expiry_date"
        name="medical_card_expiry_date"
        value={values.medical_card_expiry_date}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.medical_card_expiry_date}
        touched={touched.medical_card_expiry_date}
        disabled={!userCanEdit}
      />

      <div className="col-span-12 grid grid-cols-8">
        <AdminFormFieldCheckbox
          label="Hazmat Certified"
          id="hazmat_certified"
          type="checkbox"
          name="hazmat_certified"
          checked={values.hazmat_certified}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.hazmat_certified}
          touched={touched.hazmat_certified}
          disabled={!userCanEdit}
        />
      </div>

      <AdminFormFieldInput
        label="Trans Worker ID cred (TWIC)"
        type="text"
        id="twic"
        name="twic"
        value={values.twic}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.twic}
        touched={touched.twic}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label="TWIC Expiration"
        type="date"
        id="twic_expiry_date"
        name="twic_expiry_date"
        value={values.twic_expiry_date}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.twic_expiry_date}
        touched={touched.twic_expiry_date}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label="Address"
        type="text"
        id="address"
        name="address"
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.address}
        touched={touched.address}
        disabled={!userCanEdit}
        customWrapperClass="col-span-12"
      />

      <AdminFormFieldDropdown
        label="Vehicle ID"
        id="vehicle_id"
        name="vehicle_id"
        value={values.vehicle_id}
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
      />
    </div>
  );
};
