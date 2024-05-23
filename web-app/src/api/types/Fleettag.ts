export type OrganizationFleettag = {
  id: number;
  created_at: string;
  updated_at: string;
  fleet_tag_id: string | null;
  fleet_tag_name: string | null;
  last_event_time: string | null;
  last_event_code: string | null;
  in_range: boolean;
  in_range_device_id: string | null;
  last_location: string | null;
  last_address: string | null;
  last_altitude: number | null;
  distance_traveled: string | null;
  tag_signal_strength: string | null;
  tag_battery_level: string | null;
  temperature: string | null;
  is_active: boolean;
};
