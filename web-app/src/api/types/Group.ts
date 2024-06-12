import { TUser } from "./User";
import { TUserProfile } from "./UserProfile";
import { OrganizationVehicle } from "./Vehicle";

export type OrganizationGroup = {
  id: number;
  created_by: TUser & {
    profile: TUserProfile;
    is_active: boolean;
  };
  vehicles: OrganizationVehicle[];
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
  is_active: boolean;
  organization: number;
};
