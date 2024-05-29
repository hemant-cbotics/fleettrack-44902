import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

// form field names
export type TFormFieldNames = "name" | "description";

// initial values for the form
export const formInitialValues = {
  name: "",
  description: "",
};

// validation schema for the form
export const YupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please select the group name"),

  description: Yup.string()
    .required("Please enter the group description")
});