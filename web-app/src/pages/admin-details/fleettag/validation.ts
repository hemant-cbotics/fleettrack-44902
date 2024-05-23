import * as Yup from 'yup';

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

export const fleettagDetailsYupValidationSchema = Yup.object().shape({});