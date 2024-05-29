import * as Yup from "yup";

export type TFormFieldNames = "username" | "email" | "acl_role";
export const formInitialValues = {
  username: "",
  email: "",
  acl_role: "",
};

export const YupValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required("Please select the full name of the user"),

  email: Yup.string()
    .required("Email is required")
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address'),

  acl_role: Yup.string()
    .required("Please select a role"),
});