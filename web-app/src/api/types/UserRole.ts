import { TUserPermission } from "./Permissions"

export type TUserRole = {
  id: number,
  organization_data: {
    id: number,
    owner: number,
    name: string,
    is_active: boolean,
    email_sent: boolean,
    is_owner: boolean
  },
  created_at: string,
  updated_at: string,
  name: string,
  default_permissions: TUserPermission,
  is_active: boolean,
  organization: number
}