import * as Yup from "yup";

export type TFormFieldNames = "email";
export const formInitialValues = {
  email: "",
};

export const YupValidationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .matches(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email address'),
});