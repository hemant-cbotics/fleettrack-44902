import * as Yup from 'yup';

// initial values for the form
export const fleettagDetailsInitialValues = {
  fleet_tag_id: "",
  fleet_tag_name: "",
  last_event_time: "",
  last_status_code: "",
  in_range: "",
  in_range_device_id: "",
  last_location: "",
  last_address: "",
  last_altitude: 0,
  distance_travelled: "",
  tag_signal_strength: "",
  tag_battery_level: "",
  temprature: "",
}

// validation schema for the form
export const fleettagDetailsYupValidationSchema = Yup.object().shape({});