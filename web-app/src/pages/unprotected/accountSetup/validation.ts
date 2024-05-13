import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

export type TFormFieldNames = "name" | "email" | "organization_name" | "role" | "new_password" | "confirm_new_password";
export const formInitialValues = {
  name: "",
  email: "",
  organization_name: "",
  role: "",
  new_password: "",
  confirm_new_password: "",
};

export const YupValidationSchema = Yup.object().shape({
  new_password: Yup.string()
    .required("Password is required")
    .min(APP_CONFIG.PASSWORD.MIN_LENGTH, `Password is too short - should be minimum ${APP_CONFIG.PASSWORD.MIN_LENGTH} chars`),

  confirm_new_password: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref('new_password')], 'Passwords must match'),

});