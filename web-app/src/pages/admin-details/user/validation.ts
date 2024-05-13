import * as Yup from "yup";

export const userDetailsInitialValues = {
  user_id: 0,
  password: "",
  user_description: "",
  is_active: false,
  use_two_factor: false,
  use_geozone_labels: false,
  contact_name: "",
  contact_phone_number: "",
  contact_email: "",
  timezone: "",
  enable_sso_to_visatracks: false,
  default_overlay: "",
  user_state: "",
  session_timeout: 0,
  first_login_page: "",
  authorized_group_1: "",
  authorized_group_2: "",
  default_acl_role: "",
  maximum_access_level: "",
}

export const userDetailsYupValidationSchema = Yup.object().shape({});
