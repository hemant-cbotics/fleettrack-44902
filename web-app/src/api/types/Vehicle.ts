import { TUser } from "./User";
import { TUserProfile } from "./UserProfile";

export type OrganizationVehicle = {
  id: string;
  added_by: TUser & {
    profile: TUserProfile;
    is_active: boolean;
  };
  asset_type: string | null;
  country_code: string | null;
  created_at: string;
  email: string | null;
  equipment_status: string | null;
  euipment_type: string | null;
  firmware_version: string | null;
  fuel_capacity: number | null;
  fuel_cost: number | null;
  fuel_economy: number | null;
  fuel_type: string | null;
  group_pushin_id: number | null;
  ignition_input: string | null;
  imei_or_esn_number: number | null;
  is_active: boolean;
  licence_expiry: string | null;
  licence_plate: string;
  map_route_color: string | null;
  maximum_speed: number | null;
  organization: number;
  phone: number | null;
  prev_recorder_id: string | null;
  prev_unique_id: string | null;
  recorder_id: string | null;
  recorder_id_last_changed: string | null;
  recorder_on: string | null;
  recorder_type: string | null;
  serial_number: number | null;
  server_id: string | null;
  short_name: string | null;
  unique_id: string | null;
  unique_id_last_change: string | null;
  updated_at: string;
  vehicle_class: string | null;
  vehicle_description: string | null;
  vehicle_make: string;
  vehicle_model: number;
  vin: string;
  groups: any[];
  all_vehicles: boolean;
  driver: {
    id: number;
    name: string;
    phone: string;
  }
};
