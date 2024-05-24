import * as Yup from "yup";

export const vehicleFormInitialValues = {
  vehicle_id: "",
  creation_date: "",
  server_id: "",
  firmware_version: "",
  unique_id: "",
  is_active: false,
  vehicle_description: "",
  short_name: "",
  vin: "",
  vehicle_make: "",
  vehicle_model: 0,
  license_plate: "",
  license_expiration: "",
  equipment_type: "",
  equipment_status: "",
  asset_type: "",
  vehicle_class: "",
  imei_number: 0,
  serial_number: 0,
  email: "",
  group_pushpin_id: 0,
  map_route_color: "",
  ignition_input: "",
  maximum_speed: 0,
  driver_id: 0,
  driver_name: "",
  driver_phone_number: "",
  fuel_type: "",
  fuel_capacity: 0,
  fuel_economy: 0,
  fuel_cost: 0,
  recorder_id: "",
  recorder_on: "",
  recorder_type: "",
  previous_recorder_id: "",
  recorder_id_last_changed: "",
  list_of_groups: [{}],
  all_vehicles: false,
}

const currentYear = new Date().getFullYear();

export const vehicleFormValidationSchema = Yup.object().shape({
  vehicle_model: Yup.number().max(currentYear, "Vehicle model cannot be in the future"),
});

export const groupMembershipFormValidationSchema = Yup.object().shape({});