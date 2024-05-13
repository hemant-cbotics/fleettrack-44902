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

interface AccountGeneralDetailFormProps {
  detail: any;
  onSubmit: (values: any) => void;
}

export const AccountGeneralDetailForm: FC<AccountGeneralDetailFormProps> = () => {
  const [userCanEdit, setUserCanEdit] = useState(true);
  return (
    <Formik
      initialValues={accountGeneralDetailsInitialValues}
      validationSchema={accountGeneralDetailsYupValidationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <form className="px-5 pt-4 pb-8 bg-gray-100" onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4">
              <AdminFormFieldInput
                label="Account ID"
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
                label="Account Description"
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
                label="Contact Name"
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
                label="Contact Phone Number"
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
                label="Contact Email"
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
                label="Private Cost"
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
                label="Idle Gas Usage"
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
                label="Distance Gas Usage"
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
                  label="Auto-Update Interval for Maps"
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
                  label="Drivers Assigned to Devices"
                  id="drivers_assigned_to_devices"
                  type="checkbox"
                  name="drivers_assigned_to_devices"
                  value={values.drivers_assigned_to_devices}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>

              <div className="col-span-12 grid grid-cols-12">
                <AdminFormFieldDropdown
                  label="Enable Map Clustering?"
                  id="enable_map_clustering"
                  name="enable_map_clustering"
                  value={values.enable_map_clustering}
                  onChange={handleChange}
                  disabled={!userCanEdit}
                />
              </div>

              <div className="col-span-12 grid grid-cols-8 gap-4">
                <AdminFormFieldCheckbox
                  label="Open Reports in New Tab"
                  id="open_reports_in_new_tab"
                  type="checkbox"
                  name="open_reports_in_new_tab"
                  value={values.open_reports_in_new_tab}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />

                <AdminFormFieldCheckbox
                  label="Sync Driver ID from Driver Admin"
                  id="sync_driverId_from_driver_admin"
                  type="checkbox"
                  name="sync_driverId_from_driver_admin"
                  value={values.sync_driverId_from_driver_admin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>
              <div className="col-span-12 grid grid-cols-8 gap-4">
                <AdminFormFieldCheckbox
                  label="Has Snowplows"
                  id="has_snowplows"
                  type="checkbox"
                  name="has_snowplows"
                  value={values.has_snowplows}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
                <AdminFormFieldCheckbox
                  label="Hide Total Rows in CSV"
                  id="hide_total_rows_in_csv"
                  type="checkbox"
                  name="hide_total_rows_in_csv"
                  value={values.hide_total_rows_in_csv}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>
              
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
