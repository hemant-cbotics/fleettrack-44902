import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

export type TFormFieldNames = "name";
export const formInitialValues = {
  name: "",
};

export const YupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please provide a name of the fleet tag"),
});