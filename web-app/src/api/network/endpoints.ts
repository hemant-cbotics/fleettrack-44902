type TAppEnv = "staging" | "prod";

export const APP_ENV: TAppEnv
  = window.location.hostname.includes('staging') || window.location.hostname.includes('localhost')
    ? "staging"
    : "prod";

let _API_SERVER_URL = "";
switch (APP_ENV as TAppEnv) {
  case "staging":
    _API_SERVER_URL = localStorage.getItem('TEMP_API_SERVER') || "https://fleettrack-44902-staging.botics.co";
    break;
  case "prod":
  default:
    _API_SERVER_URL = localStorage.getItem('TEMP_API_SERVER') || "https://fleettrack-44902.botics.co";
    break;
}

export const API_SERVER_URL = _API_SERVER_URL;
export const API_VERSION_SUFFIX = "/api/v1";

export const API_ENDPOINTS = {
  LOGIN: `${API_VERSION_SUFFIX}/login/`,
  VERIFY_EMAIL_OTP: `${API_VERSION_SUFFIX}/verify-email-otp/`,
  RESEND_EMAIL_OTP: `${API_VERSION_SUFFIX}/resend-email-otp/`,
  FORGOT_PASSWORD: `${API_VERSION_SUFFIX}/forgot-password/`,
  RESEND_FORGOT_PASSWORD: `${API_VERSION_SUFFIX}/resend-forgot-password/`,
  FORGOT_PASSWORD_VERIFY_OTP: `${API_VERSION_SUFFIX}/forgot-password-verify-otp/`,

  ORGANIZATION: {
    SHOW_INVITE_USER: (invitationToken: string) => `/organization/show-invite-user/${invitationToken}/`,
    ROLES_PERMISSIONS: `/organization/roles-permission/`,
    INVITE_USER: `/organization/invite-user/`,
    ONBOARD_INVITED_USER: `/organization/onboard-invited-user/`,
  },

  USERS: {
    CHANGE_PASSWORD: `/users${API_VERSION_SUFFIX}/change-password/`,
    LOGOUT: `/users${API_VERSION_SUFFIX}/logout/`,
  },

  ADMINS: {
    ORGANIZATION_USERS: (organization_id: number) => `/organization/organization-users/${organization_id}/`,
    SINGLE_ORGANIZATION_USER: (user_id: number) => `/organization/organization-user/${user_id}/`,
    EDIT_ORGANIZATION_USER: `/organization/edit-user/`,

    ORGANIZATION_VEHICLES: `/vehicle/ap1/v1/`,

    ORGANIZATION_DRIVERS: `/driver/ap1/v1/`,
    SINGLE_ORGANIZATION_DRIVER: (driver_id: number) => `/driver/ap1/v1/${driver_id}/`,
  }
}