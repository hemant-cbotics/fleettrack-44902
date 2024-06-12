import * as Yup from "yup";

export type TFormFieldNames = "verification_code";
export const formInitialValues = {
  verification_code: "",
};

export const YupValidationSchema = Yup.object().shape({
  verification_code: Yup.string()
    .required("Verification code is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(6, "Verification code should be exactly 6 digits long")
    .max(6, "Verification code should be exactly 6 digits long"),
});