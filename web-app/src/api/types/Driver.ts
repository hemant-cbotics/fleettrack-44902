import { TUser } from "./User";
import { TUserProfile } from "./UserProfile";

export type OrganizationDriver = {
  id: number,
  added_by: TUser & {
    profile: TUserProfile,
    is_active: boolean
  },
  address: string | null,
  badge_employee_id: string | null,
  card_id: string | null,
  created_at: string,
  email: string,
  is_active: boolean,
  is_hazmat_certified: boolean,
  licence_expiry: string | null,
  licence_number: string | null,
  licence_state: string | null,
  licence_status: string | null,
  licence_type: string | null,
  medical_card_expiry: string | null,
  medical_card_no: string | null,
  name: string,
  nick_name: string | null,
  organization: number,
  phone: any,
  twic: string | null,
  twic_expiry: string | null,
  updated_at: string,
  vehicle_assigned: string | null,
}