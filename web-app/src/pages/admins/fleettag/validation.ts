import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

// form field names
export type TFormFieldNames = "name";

// initial values for the form
export const formInitialValues = {
  name: "",
};

// validation schema for the form
export const YupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please provide a name of the fleet tag"),
});