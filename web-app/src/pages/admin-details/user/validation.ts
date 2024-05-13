import * as Yup from "yup";

export const userGeneralDetailsInitialValues = {
  user_id: "",
  password: "",
  user_description: "",
  is_active: "",
  use_two_factor: "",
  use_geozone_labels: "",
  contact_name: "",
  contact_country_code: "",
  contact_phone_number: "",
  contact_email: "",
  timezone: "",
  enable_sso_to_visatracks: "",
  default_overlay: "",
  user_state: "",
  session_timeout: "",
  first_login_page: "",
}

export const userAuthorizedGroupsInitialValues = {
  authorized_group_1: "",
  authorized_group_2: "",
  authorized_group_3: "",
  authorized_group_4: "",
  authorized_group_5: "",
  authorized_group_6: "",
  authorized_group_7: "",
  authorized_group_8: "",
  authorized_group_9: "",
  authorized_group_10: "",
}

export const userAccessControlInitialValues = {
  maximum_access_level: "",
  default_acl_role: "",
  account_administratation: "",
  user_administration_current_user: "",
  user_administration_all_users: "",
  user_administration_acl_access: "",
  user_administration_group: "",
  user_administration_role: "",
  user_administration_preferred_deviceId: "",
  user_administration_notify_email: "",
  role_administration: "",
  device_administration: "",
}

export const generalDetailsYupValidationSchema = Yup.object().shape({});

export const authorizedGroupsYupValidationSchema = Yup.object().shape({});

export const accessControlYupValidationSchema = Yup.object().shape({});
