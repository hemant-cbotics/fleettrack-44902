import { TUserRole } from "./UserRole"

export type TUser = {
  id: string,
  email: string,
  name: string | null,
  role_and_permission: {
    assigned_role: TUserRole,
    assigned_permissions: string[]
  }
}

export type TLoggedInUserOrganization = {
  id: number,
  owner: number,
  name: string,
  is_active: boolean,
  email_sent: boolean,
  is_owner: boolean
}

export type TLoggedInUser = {
  id: number,
  email: string,
  name: string,
  role_and_permission: {
    role: {
      id: number,
      organization_data: {
        id: 2,
        owner: 4,
        name: string,
        is_active: boolean,
        email_sent: boolean,
        is_owner: boolean
      },
      created_at: string,
      updated_at: string,
      name: string,
      default_permissions: [],
      is_active: boolean,
      organization: number
    },
    custom_permissions: {},
    id: number
  },
  is_active: boolean
}

// --------------------------
// Change Password API types
// --------------------------

export type ChangePasswordPayload = {
  old_password: string,
  new_password: string,
}

export type ChangePasswordResponseError = {
  data: {
    non_field_errors: string[]
  },
  status: number
}
export type ChangePasswordResponseSuccess = {
  message: string,
  status: number,
}
export type ChangePasswordResponse = ChangePasswordResponseSuccess | ChangePasswordResponseError;
