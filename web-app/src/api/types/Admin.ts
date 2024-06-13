import { TLoggedInUser } from "./User";

export type OrganizationUser = {
  id: number;
  user: TLoggedInUser;
};

export type FilterType = "active" | "inactive" | "both";

export type OrganizationEntityListingPayload = {
  organization_id: number;
  page: number;
  page_size: number;
  search?: string;
  is_active?: FilterType;
};

export type CreateOrganizationUserPayload = {
  username: string;
  email: string;
  role: number;
};

export type CreateOrganizationUserResponse = {
  created_at: string;
  email: string;
  email_sent: boolean;
  id: string;
  invited_by: number;
  is_accepted: boolean;
  organization: number;
  role: number;
  updated_at: string;
  user: number;
  username: string;
};

export type SingleOrganizationUserPayload = {
  user_id: number;
};

export type EditOrganizationUserPayload = {
  data: any;
};

export type TEditOrganizationUserPayloadData = {
  user: {
    id: number;
    name: string;
    is_active: boolean;
  };
  profile: {
    id: number;
    group_ids: number[];
    description: string;
    mobile: string;
    timezone: string;
    enable_sso_vistrack: boolean;
    default_overlay: string;
    user_state: string;
    session_timeout: number;
    first_login_page: string;
    two_factor_auth: boolean;
    user_geozone_labels: boolean;
  };
  role_and_permission: {
    id: number;
    role: number;
  };
};

export type CreateOrganizationVehiclePayload = {
  organization: number;
  vehicle_make: string;
  vehicle_model: string;
  vin: string;
  licence_plate: string; // should be license_plate
};

export type CreateOrganizationDriverPayload = {
  organization: number;
  name: string;
  email: string;
  phone: string;
};

export type SingleOrganizationDriverPayload = {
  organization_id: number | null;
  driver_id: number;
};

export type EditOrganizationDriverPayload = {
  organization_id: number | null;
  driver_id: number;
  data: any;
};

export type SingleOrganizationVehiclePayload = {
  organization_id: number | null;
  vehicle_id: string;
};

export type EditOrganizationVehiclePayload = {
  organization_id: number | null;
  vehicle_id: string;
  data: any;
};

export type CreateOrganizationGroupPayload = {
  organization: number | null;
  name: string;
  description: string;
};

export type SingleOrganizationGroupPayload = {
  organization_id: number | null;
  group_id: number;
};

export type EditOrganizationGroupPayload = {
  organization_id: number | null;
  group_id: number;
  data: any;
};

export type TEditOrganizationVehiclePayloadData = {
  id: string;
  asset_type: string;
  created_at: string;
  email: string;
  equipment_status: string;
  euipment_type: string;
  firmware_version: string;
  fuel_capacity: number;
  fuel_cost: number;
  fuel_economy: number;
  fuel_type: string;
  group_pushin_id: number;
  ignition_input: string;
  imei_or_esn_number: number;
  is_active: boolean;
  licence_expiry: string | null;
  licence_plate: string;
  map_route_color: string;
  maximum_speed: number;
  prev_recorder_id: string;
  recorder_id: string;
  recorder_id_last_changed: string | null;
  recorder_on: string;
  recorder_type: string;
  serial_number: number;
  server_id: string;
  short_name: string;
  unique_id: string;
  vehicle_class: string;
  vehicle_description: string;
  vehicle_make: string;
  vehicle_model: number;
  vin: string;
  group_ids: string; // comma separated numeric ids
  all_vehicles: boolean;
  driver: number;
};

export type EditOrganizationAccountPayload = {
  account_id: number;
  data: any;
};

export type CreateOrganizationFleettagPayload = {
  organization: number | null;
  fleet_tag_name: string;
};

export type SingleOrganizationFleettagPayload = {
  organization_id: number | null;
  fleettag_id: number;
};

export type EditOrganizationFleettagPayload = {
  organization_id: number | null;
  fleettag_id: number;
  data: any;
};

export type CreateOrganizationGeozonePayload = {
  organization: number | null;
  zone_id: string;
  zone_type: string;
};

export type SingleOrganizationGeozonePayload = {
  organization_id: number | null;
  geozone_id: number;
};


export type EditOrganizationGeozonePayload = {
  organization_id: number | null;
  geozone_id: number;
  data: any;
};
