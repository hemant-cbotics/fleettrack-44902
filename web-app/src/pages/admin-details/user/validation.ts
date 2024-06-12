import * as Yup from "yup";

// form field names
export type TFormFieldNames = "user_id" | "password" | "user_description" |
  "is_active" | "use_two_factor" | "use_geozone_labels" | "contact_name" |
  "contact_phone_number" | "contact_email" | "timezone" |
  "enable_sso_to_visatracks" | "default_overlay" | "user_state" |
  "session_timeout" | "first_login_page" | "authorized_groups" |
  "default_acl_role" | "maximum_access_level";

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
  user_id: Yup.number().required("User ID is required"),
  user_description: Yup.string().required("User Description is required"),
  timezone: Yup.string().required("Timezone is required"),
  is_active: Yup.boolean().required("Is Active is required"),
  use_geozone_labels: Yup.boolean().required("Use Geozone Labels is required"),
  session_timeout: Yup.number().required("Session Timeout is required"),
  first_login_page: Yup.string().required("First Login Page is required"),

  // TODO role feature is not implemented yet
});
