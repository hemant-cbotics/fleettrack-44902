import { TLoggedInUser } from "./User";

export type OrganizationUser = {
  id: number;
  user: TLoggedInUser;
}

export type OrganizationUsersPayload = {
  organization_id: number;
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
  user_id: number;
  data: any;
}