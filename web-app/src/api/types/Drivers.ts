import { TUser } from "./User";
import { TUserProfile } from "./UserProfile";

export type OrganizationDriver = {
  id: number;
  added_by: TUser & {
    profile: TUserProfile;
    is_active: boolean;
  };
  created_at: string;
  updated_at: string;
  name: string;
  nick_name: string | null;
  email: string;
  phone: string;
  badge_employee_id: string;
  card_id: string;
  is_active: boolean;
  licence_type: string | null;
  licence_state: string | null;
  licence_number: string | null;
  licence_expiry: string | null;
  licence_status: string | null;
  medical_card_no: string | null;
  medical_card_expiry: string | null;
  is_hazmat_certified: boolean;
  twic: string | null;
  twic_expiry: string | null;
  address: string;
  vehicle_assigned: string | null;
  organization: number;
};
