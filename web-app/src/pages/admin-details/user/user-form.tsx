import { Formik } from "formik";
import { FC, useState } from "react";
import {
  accessControlYupValidationSchema,
  generalDetailsYupValidationSchema,
  userAccessControlInitialValues,
  userAuthorizedGroupsInitialValues,
  userGeneralDetailsInitialValues,
} from "./validation";
import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";

interface UserGeneralDetailFormProps {
  user: any;
  onSubmit: (values: any) => void;
}

interface UserAuthorizedGroupsFormProps {
  groups: any;
  onSubmit: (values: any) => void;
}

interface UserAccessControlFormProps {
  access: any;
  onSubmit: (values: any) => void;
}

export const UserGeneralDetailForm: FC<UserGeneralDetailFormProps> = ({
  user,
  onSubmit,
}) => {
  const [userCanEdit, setUserCanEdit] = useState(true);
  return (
    <Formik
      initialValues={userGeneralDetailsInitialValues}
      validationSchema={generalDetailsYupValidationSchema}
      onSubmit={() => console.log("submit")}
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
                label="User ID"
                type="text"
                id="user_id"
                name="user_id"
                value={values.user_id}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Password"
                type="password"
                id="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />
              <div className="col-span-12">
                <AdminFormFieldInput
                  label="User Description"
                  type="text"
                  id="user_description"
                  name="user_description"
                  value={values.user_description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>
              <div className="col-span-12 grid grid-cols-12 gap-4">
                <AdminFormFieldCheckbox
                  label="Active"
                  id="is_active"
                  type="checkbox"
                  name="is_active"
                  value={values.is_active}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />

                <AdminFormFieldCheckbox
                  label="Use Two Factor"
                  id="use_two_factor"
                  type="checkbox"
                  name="use_two_factor"
                  value={values.use_two_factor}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />

                <AdminFormFieldCheckbox
                  label="Use Geozone Labels"
                  id="use_geozone_labels"
                  type="checkbox"
                  name="use_geozone_labels"
                  value={values.use_geozone_labels}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>

              <AdminFormFieldInput
                label="Contact Name"
                type="text"
                id="contact_name"
                name="contact_name"
                value={values.contact_name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Contact Phone Number"
                type="text"
                id="contact_phone_number"
                name="contact_phone_number"
                value={values.contact_phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Contact Email"
                type="email"
                id="contact_email"
                name="contact_email"
                value={values.contact_email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Timezone"
                id="timezone"
                name="timezone"
                value={values.timezone}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <div className="col-span-12 grid grid-cols-8">
                <AdminFormFieldCheckbox
                  label="Enable SSO to Visatracks"
                  id="enable_sso_to_visatracks"
                  type="checkbox"
                  name="enable_sso_to_visatracks"
                  value={values.enable_sso_to_visatracks}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>

              <AdminFormFieldDropdown
                label="Default Overlay"
                id="default_overlay"
                name="default_overlay"
                value={values.default_overlay}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="User State"
                id="user_state"
                name="user_state"
                value={values.user_state}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Session Timeout"
                type="text"
                id="session_timeout"
                name="session_timeout"
                value={values.session_timeout}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="First Login Page"
                id="first_login_page"
                name="first_login_page"
                value={values.first_login_page}
                onChange={handleChange}
                disabled={!userCanEdit}
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export const UserAuthorizedGroupsForm: FC<UserAuthorizedGroupsFormProps> = ({
  groups,
  onSubmit,
}) => {
  const [userCanEdit, setUserCanEdit] = useState(true);
  return (
    <Formik
      initialValues={userAuthorizedGroupsInitialValues}
      validationSchema={generalDetailsYupValidationSchema}
      onSubmit={() => console.log("submit")}
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
              <AdminFormFieldDropdown
                label="Authorized Group No.1"
                id="authorized_group_1"
                name="authorized_group_1"
                value={values.authorized_group_1}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.2"
                id="authorized_group_2"
                name="authorized_group_2"
                value={values.authorized_group_2}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.3"
                id="authorized_group_3"
                name="authorized_group_3"
                value={values.authorized_group_3}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.4"
                id="authorized_group_4"
                name="authorized_group_4"
                value={values.authorized_group_4}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.5"
                id="authorized_group_5"
                name="authorized_group_5"
                value={values.authorized_group_5}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.6"
                id="authorized_group_6"
                name="authorized_group_6"
                value={values.authorized_group_6}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.7"
                id="authorized_group_7"
                name="authorized_group_7"
                value={values.authorized_group_7}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.8"
                id="authorized_group_8"
                name="authorized_group_8"
                value={values.authorized_group_8}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.9"
                id="authorized_group_9"
                name="authorized_group_9"
                value={values.authorized_group_9}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Authorized Group.10"
                id="authorized_group_10"
                name="authorized_group_10"
                value={values.authorized_group_10}
                onChange={handleChange}
                disabled={!userCanEdit}
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export const UserAccessControlForm: FC<UserAccessControlFormProps> = ({
  access,
  onSubmit,
}) => {
  const [userCanEdit, setUserCanEdit] = useState(true);
  return (
    <Formik
      initialValues={userAccessControlInitialValues}
      validationSchema={accessControlYupValidationSchema}
      onSubmit={() => console.log("submit")}
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
              <AdminFormFieldDropdown
                label="Maximum Access Level"
                id="maximum_access_level"
                name="maximum_access_level"
                value={values.maximum_access_level}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Default ACL Role"
                id="default_acl_role"
                name="default_acl_role"
                value={values.default_acl_role}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Account Administration"
                id="account_administratation"
                name="account_administratation"
                value={values.account_administratation}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="User Administration (Current User)"
                id="user_administration_current_user"
                name="user_administration_current_user"
                value={values.user_administration_current_user}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="User Administration (All Users)"
                id="user_administration_all_users"
                name="user_administration_all_users"
                value={values.user_administration_all_users}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="User Administration (ACL Access)"
                id="user_administration_acl_access"
                name="user_administration_acl_access"
                value={values.user_administration_acl_access}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="User Administration (Group)"
                id="user_administration_group"
                name="user_administration_group"
                value={values.user_administration_group}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="User Administration (Role)"
                id="user_administration_role"
                name="user_administration_role"
                value={values.user_administration_role}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="User Administration (Preferred DeviceId)"
                id="user_administration_preferred_deviceId"
                name="user_administration_preferred_deviceId"
                value={values.user_administration_preferred_deviceId}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="User Administration (Notify Email)"
                id="user_administration_notify_email"
                name="user_administration_notify_email"
                value={values.user_administration_notify_email}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Role Administration"
                id="role_administration"
                name="role_administration"
                value={values.role_administration}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Device Administration"
                id="device_administration"
                name="device_administration"
                value={values.device_administration}
                onChange={handleChange}
                disabled={!userCanEdit}
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
