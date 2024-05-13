import { TLoggedInUser } from "./User";

export type OrganizationUser = {
  id: number;
  user: TLoggedInUser;
}

export type OrganizationUsersPayload = {
  organization_id: number;
  page: number;
  page_size: number;
  search?: string;
}

export type CreateOrganizationUserPayload = {
  username: string;
  email: string;
  role: number;
}

export type CreateOrganizationUserResponse = {
  created_at: string,
  email: string,
  email_sent: boolean,
  id: string,
  invited_by: number,
  is_accepted: boolean,
  organization: number,
  role: number,
  updated_at: string,
  user: number,
  username: string
}

export type SingleOrganizationUserPayload = {
  user_id: number;
}

export type EditOrganizationUserPayload = {
  data: any;
}

export type TEditOrganizationUserPayloadData = {
  user : {
    id: number;
    is_active: boolean;
  }
  profile: {
    id: number;
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
  },
  role_and_permission: {
    id: number;
    role: number;
  }
}

export type OrganizationVehiclesPayload = {
  organization_id: number;
  page: number;
  page_size: number;
  search?: string;
}

export type OrganizationVehicle = any;