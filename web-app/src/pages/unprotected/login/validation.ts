import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

export type TFormFieldNames = "email" | "password";
export const formInitialValues = {
  email: "",
  password: "",
};

export const YupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address'),

  password: Yup.string()
    .required("Password is required")
    .min(APP_CONFIG.PASSWORD.MIN_LENGTH, `Password is too short - should be minimum ${APP_CONFIG.PASSWORD.MIN_LENGTH} chars`),
});