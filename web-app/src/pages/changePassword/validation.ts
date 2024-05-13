import * as Yup from "yup";
import { APP_CONFIG } from "../../constants/constants";

export type TFormFieldNames = "current_password" | "new_password" | "confirm_new_password";
export const formInitialValues = {
  current_password: "",
  new_password: "",
  confirm_new_password: "",
};

export const YupValidationSchema = Yup.object().shape({
  current_password: Yup.string()
    .required("Current password is required")
    .min(APP_CONFIG.PASSWORD.MIN_LENGTH, `Password is too short - should be minimum ${APP_CONFIG.PASSWORD.MIN_LENGTH} chars`),

  new_password: Yup.string()
    .required("New password is required")
    .min(APP_CONFIG.PASSWORD.MIN_LENGTH, `Password is too short - should be minimum ${APP_CONFIG.PASSWORD.MIN_LENGTH} chars`),

  confirm_new_password: Yup.string()
    .required("Please enter your new password again to confirm it")
    .oneOf([Yup.ref('new_password')], 'Passwords must match'),

});