import * as Yup from "yup";
import { APP_CONFIG } from "../../../constants/constants";

export type TFormFieldNames = "make" | "model" | "vin" | "license_plate";
export const formInitialValues = {
  make: "",
  model: "",
  vin: "",
  license_plate: "",
};

export const YupValidationSchema = Yup.object().shape({
  make: Yup.string()
    .required("Please enter the vehicle make"),

  model: Yup.string()
    .required("Please enter the year of the vehicle")
    .matches(
      APP_CONFIG.REGEX.YEAR,
      "Please enter a valid year"
    ),

  vin: Yup.string()
    .required("Please enter the vehicle VIN")
    .matches(
      APP_CONFIG.REGEX.VIN,
      "Please enter a valid VIN e.g. 1HGBH41JXMN109186"
    ),

  license_plate: Yup.string()
    .required("Please enter the vehicle license plate")
    .matches(
      APP_CONFIG.REGEX.LICENSE_PLATE,
      "Please enter a valid license plate"
    ),
});