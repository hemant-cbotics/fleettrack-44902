import * as Yup from "yup";

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
  license_expiration: "",
  license_status: "",
  medical_card_no: "",
  medical_card_expiration: "",
  hazmat_certified: false,
  twic: "",
  twic_expiration: "",
  address: "",
  vehicle_id: "",
}

export const driverDetailsYupValidationSchema = Yup.object().shape({});
