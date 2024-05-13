
export type TUserProfile = {
  id: number;
  created_at: string;
  updated_at: string;
  description: string;
  country_code: string;
  mobile: string;
  profile_picture: string;
  is_active: boolean;
  two_factor_auth: boolean;
  user_geozone_labels: boolean;
  enable_sso_vistrack: boolean;
  is_email_verified: boolean;
  is_phone_verified: boolean;
  timezone: string;
  default_overlay: string;
  user_state: string;
  session_timeout: number;
  first_login_page: string;
  user: number;
}