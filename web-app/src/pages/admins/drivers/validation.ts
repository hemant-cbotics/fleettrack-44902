import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

export type TFormFieldNames = "name" | "email" | "phone";
export const formInitialValues = {
  name: "",
  email: "",
  phone: "",
};

export const YupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please select the full name of the driver"),

  email: Yup.string()
    .required("Email is required")
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address'),

  phone: Yup.string()
    .required("Please enter the phone number")
    .matches(APP_CONFIG.REGEX.PHONE_NUMBER, 'Please enter a valid phone number')
});