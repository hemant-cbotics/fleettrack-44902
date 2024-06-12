import * as Yup from "yup"

// form field names
export type TFormFieldNames = "id" | "type"

// initial values for the form
export const formInitialValues = {
  id: "",
  type: "Circle"
}

// validation schema for the form
export const YupValidationSchema = Yup.object().shape({
  id: Yup.string()
    .required("Please enter the id of the geozones"),

  type: Yup.string()
    .required("Please select the type of the geozones")
})