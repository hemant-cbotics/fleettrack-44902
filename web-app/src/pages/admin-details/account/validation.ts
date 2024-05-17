import * as Yup from "yup";

export const accountDetailsInitialValues = {
  account_id: "",
  account_description: "",
  contact_name: "",
  contact_phone_number: "",
  contact_email: "",
  private_cost: "",
  idle_gas_usage: "",
  distance_gas_usage: "",
  auto_update_interval_for_maps: "",
  drivers_assigned_to_devices: "",
  enable_map_clustering: "",
  open_reports_in_new_tab: "",
  sync_driverId_from_driver_admin: "",
  has_snowplows: "",
  hide_total_rows_in_csv: "",
  timezone: "",
  speed_units: "",
  distance_units: "",
  volume_units: "",
  economy_units: "",
  pressure_units: "",
  temperature_units: "",
  latitude_longitude_format: "",
  route_segment_color_rule: "",
  route_line_thickness: "",
  multi_vehicle_map_name: "",
  device_title: "",
  device_title_plural: "",
  device_group_title: "",
  device_group_title_plural: "",
  address_title: "",
  address_title_plural: "",
  default_login_userId: "",
  default_overlay: "",
  last_maintenance_1: "",
  last_maintenance_2: "",
  last_maintenance_3: "",
  last_maintenance_4: "",
  last_maintenance_5: "",
  last_maintenance_6: "",
  last_maintenance_7: "",
  last_maintenance_8: "",
  last_maintenance_9: "",
  last_maintenance_10: "",
  last_eng_hours_maint_1: "",
  last_eng_hours_maint_2: "",
  last_eng_hours_maint_3: "",
  last_eng_hours_maint_4: "",
  last_eng_hours_maint_5: "",
  last_service_time_1: "",
  last_service_time_2: "",
  last_service_time_3: "",
  last_service_time_4: "",
  last_service_time_5: "",
  harsh_braking: "",
  harsh_acceleration: "",
  speeding: "",
  reverse: "",
  seatbelt_off: "",
  harsh_cornering: "",
  idle_ratio: "",
  impact_crash_ai: "",
  cellphone_use_ai: "",
  distracted_driving_ai: "",
  drinking_eating_ai: "",
  smoking_ai: "",
  possible_fatiuge_ai: "",
  obstructed_camera_ai: "",
  tailgating_ai: "",
}

export const accountDetailsYupValidationSchema = Yup.object().shape({});