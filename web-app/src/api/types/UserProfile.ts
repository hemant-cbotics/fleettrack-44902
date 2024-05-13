
export type TUserProfile = {
  id: number;
  created_at: string;
  updated_at: string;
  description: string | null;
  country_code: string | null;
  mobile: string | null;
  profile_picture: string | null;
  is_active: boolean;
  two_factor_auth: boolean;
  user_geozone_labels: boolean;
  enable_sso_vistrack: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  timezone: string | null;
  default_overlay: string | null;
  user_state: string | null;
  session_timeout: string | null;
  first_login_page: string | null;
  user: number;
}