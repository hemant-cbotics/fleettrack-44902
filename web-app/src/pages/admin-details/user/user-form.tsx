/**
 * -----------------------------------------------------------------------------
 * User Edit Form
 * -----------------------------------------------------------------------------
 * These components are used to render the form for editing the user details.
 */

import React, { FC, useEffect } from "react";

import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";
import CloseIcon from "../../../assets/svg/close-icon.svg";
import { DEFAULT_OVERLAY_OPTIONS, FIRST_LOGIN_PAGE_OPTIONS, TIMEZONE_OPTIONS, USER_STATE_OPTIONS } from "./constants";
import { useLoggedInUserData } from "../../../utils/user";
import { useOrganizationGroupsQuery } from "../../../api/network/adminApiServices";
import { OrganizationGroup } from "../../../api/types/Group";
import { useTranslation } from "react-i18next";

interface UserGeneralDetailFormProps {
  values: any;
  errors: any;
  touched: any;
  handleChange: (event: React.ChangeEvent<any>) => void;
  formikSetValue: (field: string, value: any, shouldValidate?: boolean) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  formikSetTouched: (field: string, isTouched?: boolean, shouldValidate?: boolean) => void;
  userCanEdit: boolean;
  loadingData: boolean;
}

export const UserGeneralDetailForm: FC<UserGeneralDetailFormProps> = ({
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
        readOnly={true}
        detailsFormField={true}
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
        detailsFormField={true}
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
          detailsFormField={true}
        />
      </div>
      <div className="col-span-12 grid grid-cols-12 gap-4">
        <AdminFormFieldCheckbox
          label="Active"
          id="is_active"
          type="checkbox"
          name="is_active"
          checked={values.is_active}
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
          checked={values.use_two_factor}
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
          checked={values.use_geozone_labels}
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
        detailsFormField={true}
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
        detailsFormField={true}
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
        readOnly={true}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label="Timezone"
        id="timezone"
        name="timezone"
        value={values.timezone}
        options={TIMEZONE_OPTIONS}
        onChange={(e: any) => { formikSetValue("timezone", e?.value); }}
        onBlur={(e: any) => { formikSetTouched("timezone", true); handleBlur(e); }}
        touched={touched.timezone}
        error={errors.timezone}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <div className="col-span-12 grid grid-cols-8">
        <AdminFormFieldCheckbox
          label="Enable SSO to Visatracks"
          id="enable_sso_to_visatracks"
          type="checkbox"
          name="enable_sso_to_visatracks"
          checked={values.enable_sso_to_visatracks}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.enable_sso_to_visatracks}
          error={errors.enable_sso_to_visatracks}
          disabled={!userCanEdit}
        />
      </div>

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label="Default Overlay"
        id="default_overlay"
        name="default_overlay"
        value={values.default_overlay}
        options={DEFAULT_OVERLAY_OPTIONS}
        onChange={(e) => { formikSetValue("default_overlay", e?.value); }}
        onBlur={(e) => { formikSetTouched("default_overlay", true); handleBlur(e); }}
        touched={touched.default_overlay}
        error={errors.default_overlay}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label="User State"
        id="user_state"
        name="user_state"
        value={values.user_state}
        options={USER_STATE_OPTIONS}
        onChange={(e) => { formikSetValue("user_state", e?.value); }}
        onBlur={(e) => { formikSetTouched("user_state", true); handleBlur(e); }}
        touched={touched.user_state}
        error={errors.user_state}
        disabled={!userCanEdit}
        detailsFormField={true}
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
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label="First Login Page"
        id="first_login_page"
        name="first_login_page"
        value={values.first_login_page}
        options={FIRST_LOGIN_PAGE_OPTIONS}
        onChange={(e) => { formikSetValue("first_login_page", e?.value); }}
        onBlur={(e) => { formikSetTouched("first_login_page", true); handleBlur(e); }}
        touched={touched.first_login_page}
        error={errors.first_login_page}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
    </div>
  );
};

export const UserAuthorizedGroupsForm: FC<UserGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
  loadingData,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "admins.users.detailsPage" });

  // selected groups mechanism
  const [selectedGroups, setSelectedGroups] = React.useState(values.authorized_groups);
  const [filteredGroupData, setFilteredGroupData] = React.useState<any[]>([]);

  // prepare group query params
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgGroupsQueryParams, setOrgGroupsQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: 100,
    search: ""
  });

  // fetch organization groups
  const {
    data: dataOrgGroups,
  } =
    useOrganizationGroupsQuery(orgGroupsQueryParams);

  // prepare group data for display
  const { results } = dataOrgGroups ?? {};
  const groupData = !!results
  ? (results || ([] as OrganizationGroup[])).map(
      (item: OrganizationGroup, index: number) => ({
        value: item?.id.toString(),
        label: item?.name,
      })
    )
  : [];

  // update selected groups
  useEffect(() => {
    setFilteredGroupData(groupData.filter((group) => !selectedGroups.some((selectedGroup:any) => selectedGroup.id === parseInt(group.value))))
    formikSetValue('authorized_groups', selectedGroups);
  }, [selectedGroups, dataOrgGroups])

  // handle group selection
  const handleChangeGroup = (e: any) => {
    if(e?.value){
      setSelectedGroups([...selectedGroups, {id: parseInt(e.value), name: e.label, organization: thisUserOrganizationId}]);
    }
  }

  // handle group removal
  const onRemoveFromGroup = (option: any) => {
    setSelectedGroups(selectedGroups.filter((selectedGroup:any) => selectedGroup !== option));
    formikSetValue('authorized_groups', selectedGroups);
  }

  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <div className={`col-span-12 p-3 gap-2 ${userCanEdit ? "bg-white" : "bg-gray-100"} border border-gray-300 rounded-lg flex items-start flex-wrap min-h-24`}>
        {selectedGroups?.map((option:any) => (
          <div className="flex items-center bg-gray-200 rounded-lg gap-3 py-1 px-2" key={option.id}>
            <span className="font-normal text-sm leading-4 tracking-tighter">{option.name}</span>
            {!!userCanEdit && (<img src={CloseIcon} alt={option.label} className="size-5 cursor-pointer" onClick={() => onRemoveFromGroup(option)}/>)}
          </div>
        ))}
      </div>
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("select_group_to_add")}
        id="authorized_groups"
        name="authorized_groups"
        value={filteredGroupData?.[0]?.value}
        options={filteredGroupData}
        onChange={handleChangeGroup}
        // onChange={(e) => {console.log(e?.value)}}
        onBlur={(e) => { formikSetTouched("authorized_groups", true); handleBlur(e); }}
        touched={touched.authorized_group_1}
        error={errors.authorized_group_1}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
    </div>
  );
};

export const UserAccessControlForm: FC<UserGeneralDetailFormProps> = ({
  values,
  errors,
  touched,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
  loadingData,
}) => {
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <AdminFormFieldDropdown
        loadingData={loadingData}
        label="Default ACL Role"
        id="default_acl_role"
        name="default_acl_role"
        value={values.default_acl_role}
        onChange={(e) => { formikSetValue('default_acl_role', e?.value); }}
        onBlur={(e) => { formikSetTouched("default_acl_role", true); handleBlur(e); }}
        touched={touched.default_acl_role}
        error={errors.default_acl_role}
        disabled={!userCanEdit}
        detailsFormField={true}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label="Maximum Access Level"
        id="maximum_access_level"
        name="maximum_access_level"
        value={values.maximum_access_level}
        onChange={(e) => { formikSetValue('maximum_access_level', e?.value); }}
        onBlur={(e) => { formikSetTouched("maximum_access_level", true); handleBlur(e); }}
        touched={touched.maximum_access_level}
        error={errors.maximum_access_level}
        disabled={!userCanEdit}
        detailsFormField={true}
      />
    </div>
  );
};
