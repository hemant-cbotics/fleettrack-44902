import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

export type TFormFieldNames = "verification_code" | "new_password" | "confirm_new_password";
export const formInitialValues = {
  verification_code: "",
  new_password: "",
  confirm_new_password: "",
};

export const YupValidationSchema = Yup.object().shape({
  verification_code: Yup.string()
    .required("Verification code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Verification code should be exactly 6 digits long")
    .max(6, "Verification code should be exactly 6 digits long"),

  new_password: Yup.string()
    .required("Password is required")
    .min(APP_CONFIG.PASSWORD.MIN_LENGTH, `Password is too short - should be minimum ${APP_CONFIG.PASSWORD.MIN_LENGTH} chars`),

  confirm_new_password: Yup.string()
    .required("Password is required")
    .oneOf([Yup.ref('new_password')], 'Passwords must match'),

});