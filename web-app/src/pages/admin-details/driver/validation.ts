import * as Yup from "yup";

// initial values for the form
export const driverDetailsInitialValues = {
  driver_id: 0,
  driver_name: "",
  nick_name: "",
  contact_phone: "",
  contact_email: "",
  badge_employee_id: "",
  card_id: "",
  is_active: false,
  license_type: "",
  license_state: "",
  license_number: "",
  license_expiry_date: "",
  license_status: "",
  medical_card_no: "",
  medical_card_expiry_date: "",
  hazmat_certified: false,
  twic: "",
  twic_expiry_date: "",
  address: "",
  vehicle_id: "",
}

// validation schema for the form
export const driverDetailsYupValidationSchema = Yup.object().shape({});
