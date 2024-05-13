export type TListData = {
  user_id: number;
  user_description: string;
  user_role: string;
  user_email: string;
};

export type TGeneralDetailUserdata = {
  user_id: number,
  password: string,
  user_description: string,
  is_active: boolean,
  use_two_factor: boolean,
  use_geozone_labels: boolean,
  contact_name: string,
  contact_phone_number: string,
  contact_email: string,
  timezone: string,
  enable_sso_to_visatracks: boolean,
  default_overlay: string,
  user_state: string,
  session_timeout: string,
  first_login_page: string,
};
