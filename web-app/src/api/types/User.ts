import { OrganizationAccount } from "./Account"
import { TUserProfile } from "./UserProfile"
import { TUserRole } from "./UserRole"

export type TUser = {
  id: string,
  email: string,
  name: string | null,
  role_and_permission: {
    assigned_role: TUserRole,
    assigned_permissions: string[]
  },
  account: OrganizationAccount,
}

export type TLegacyUser = {
  accountid: string,
  contactemail: string,
  contactname: string,
  contactphone: string,
  creationtime: number,
  dashboardtiles: null,
  defaultoverlay: null,
  description: string,
  displayname: string,
  enablegeozonelabels: 0 | 1,
  expirationtime: number,
  firstloginpageid: "menu.top",
  gender: 0, // need all possible values
  isactive: 0 | 1,
  lastiplogin: string,
  lastlogintime: number,
  lastpasswords: string | null,
  lastupdatetime: number,
  maxaccesslevel: number, // need all possible values
  notes: string,
  notifyemail: string,
  passwdchangetime: number,
  passwdquerytime: number,
  pinnedgroups: null, // need possible data structure
  preferreddeviceid: string,
  requiretwofactor: 0 | 1,
  roleid: string, // : "!sysadmin" // need all possible values
  sessionexpire: number | null,
  snowdashtiles: string | null,
  suspenduntiltime: number,
  temppassword: string | null,
  timezone: string,
  tomcattimeout: number,
  userid: string,
  usertype: number, // need all possible values
  usesso: number,
  welcomesettings: number,
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
  profile: TUserProfile
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
