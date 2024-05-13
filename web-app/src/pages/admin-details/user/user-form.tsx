import { FC } from "react";

import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";

interface UserGeneralDetailFormProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: (event: React.ChangeEvent<any>) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  userCanEdit: boolean;
}

export const UserGeneralDetailForm: FC<UserGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  userCanEdit,
}) => {
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldInput
        label="User ID"
        type="text"
        id="user_id"
        name="user_id"
        value={values.user_id}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.user_id}
        error={errors.user_id}
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
        touched={touched.password}
        error={errors.password}
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
          touched={touched.user_description}
          error={errors.user_description}
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
          touched={touched.is_active}
          error={errors.is_active}
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
          touched={touched.use_two_factor}
          error={errors.use_two_factor}
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
          touched={touched.use_geozone_labels}
          error={errors.use_geozone_labels}
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
        touched={touched.contact_name}
        error={errors.contact_name}
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
        touched={touched.contact_phone_number}
        error={errors.contact_phone_number}
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
        touched={touched.contact_email}
        error={errors.contact_email}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label="Timezone"
        id="timezone"
        name="timezone"
        value={values.timezone}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.timezone}
        error={errors.timezone}
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
          touched={touched.enable_sso_to_visatracks}
          error={errors.enable_sso_to_visatracks}
          disabled={!userCanEdit}
        />
      </div>

      <AdminFormFieldDropdown
        label="Default Overlay"
        id="default_overlay"
        name="default_overlay"
        value={values.default_overlay}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.default_overlay}
        error={errors.default_overlay}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label="User State"
        id="user_state"
        name="user_state"
        value={values.user_state}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.user_state}
        error={errors.user_state}
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
        touched={touched.session_timeout}
        error={errors.session_timeout}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label="First Login Page"
        id="first_login_page"
        name="first_login_page"
        value={values.first_login_page}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.first_login_page}
        error={errors.first_login_page}
        disabled={!userCanEdit}
      />
    </div>
  );
};

export const UserAuthorizedGroupsForm: FC<UserGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  userCanEdit,
}) => {
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldDropdown
        label="Authorized Group No.1"
        id="authorized_group_1"
        name="authorized_group_1"
        value={values.authorized_group_1}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.authorized_group_1}
        error={errors.authorized_group_1}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label="Authorized Group.2"
        id="authorized_group_2"
        name="authorized_group_2"
        value={values.authorized_group_2}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.authorized_group_2}
        error={errors.authorized_group_2}
        disabled={!userCanEdit}
      />
    </div>
  );
};

export const UserAccessControlForm: FC<UserGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  userCanEdit,
}) => {
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldDropdown
        label="Default ACL Role"
        id="default_acl_role"
        name="default_acl_role"
        value={values.default_acl_role}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.default_acl_role}
        error={errors.default_acl_role}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label="Maximum Access Level"
        id="maximum_access_level"
        name="maximum_access_level"
        value={values.maximum_access_level}
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.maximum_access_level}
        error={errors.maximum_access_level}
        disabled={!userCanEdit}
      />
    </div>
  );
};
