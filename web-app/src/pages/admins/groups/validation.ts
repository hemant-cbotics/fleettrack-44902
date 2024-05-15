import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

export type TFormFieldNames = "name" | "description";
export const formInitialValues = {
  name: "",
  description: "",
};

export const YupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please select the group name"),

  description: Yup.string()
    .required("Please enter the group description")
});