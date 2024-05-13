import { TUser } from "./User";
import { TUserProfile } from "./UserProfile";

export type OrganizationUser = {
  id: number;
  user: TUser;
  role: number;
  profile: TUserProfile;
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