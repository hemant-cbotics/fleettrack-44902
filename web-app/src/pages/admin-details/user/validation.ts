import * as Yup from "yup";

// initial values for the form
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
  authorized_groups: [{}],
  default_acl_role: "",
  maximum_access_level: "",
}

// validation schema for the form
export const userDetailsYupValidationSchema = Yup.object().shape({
  contact_name: Yup.string().required("Contact Name is required"),
});
