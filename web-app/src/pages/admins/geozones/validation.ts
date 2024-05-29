import * as Yup from "yup"

// form field names
export type TFormFieldNames = "id" | /* "city" | */ "type"

// initial values for the form
export const formInitialValues = {
  id: "",
  // city: "",
  type: ""
}

// validation schema for the form
export const YupValidationSchema = Yup.object().shape({
  id: Yup.string()
    .required("Please enter the id of the geozones"),

  // city: Yup.string()
  //   .required("Please select the city of the geozones"),

  type: Yup.string()
    .required("Please select the type of the geozones")
})