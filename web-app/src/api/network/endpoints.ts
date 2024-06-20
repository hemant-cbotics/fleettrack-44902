import { BingLocationAddress } from "../types/Map";

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
  LOGIN: `/legacy${API_VERSION_SUFFIX}/login/`,
  VERIFY_EMAIL_OTP: `/legacy${API_VERSION_SUFFIX}/verify-email-otp/`,
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
    ORGANIZATION_USERS: (organization_id: string) => `/organization/organization-users/${organization_id}/`,
    SINGLE_ORGANIZATION_USER: (user_id: number) => `/organization/organization-user/${user_id}/`,
    EDIT_ORGANIZATION_USER: `/organization/edit-user/`,

    ORGANIZATION_VEHICLES: `/vehicle/ap1/v1/`,
    SINGLE_ORGANIZATION_VEHICLE: (vehicle_id: string) => `/vehicle/ap1/v1/${vehicle_id}/`,
    EDIT_ORGANIZATION_VEHICLE: (vehicle_id: string) => `/vehicle/ap1/v1/${vehicle_id}/`,

    ORGANIZATION_DRIVERS: `/driver/ap1/v1/`,
    SINGLE_ORGANIZATION_DRIVER: (driver_id: number) => `/driver/ap1/v1/${driver_id}/`,
    EDIT_ORGANIZATION_DRIVER: (driver_id: number) => `/driver/ap1/v1/${driver_id}/`,

    ORGANIZATION_GROUPS: `/group/ap1/v1/`,
    SINGLE_ORGANIZATION_GROUP: (group_id: number) => `/group/ap1/v1/${group_id}/`,
    EDIT_ORGANIZATION_GROUP: (group_id: number) => `/group/ap1/v1/${group_id}/`,

    EDIT_ORGANIZATION_ACCOUNT: (account_id: string) => `/users/api/v1/account/${account_id}/`,

    ORGANIZATION_FLEETTAGS: `/fleet-tag/ap1/v1/`,
    SINGLE_ORGANIZATION_FLEETTAG: (fleettags_id: number) => `/fleet-tag/ap1/v1/${fleettags_id}/`,
    EDIT_ORGANIZATION_FLEETTAG: (fleettags_id: number) => `/fleet-tag/ap1/v1/${fleettags_id}/`,

    ORGANIZATION_GEOZONES: `/geozone/ap1/v1/`,
    SINGLE_ORGANIZATION_GEOZONE: (geozone_id: number) => `/geozone/ap1/v1/${geozone_id}/`,
    EDIT_ORGANIZATION_GEOZONE: (geozone_id: number) => `/geozone/ap1/v1/${geozone_id}/`,
  }
}

export const BINGMAPS_ENDPOINTS = {
  AUTOSUGGEST:
    (query: string) =>
      'https://dev.virtualearth.net/REST/v1/Autosuggest' +
      `?query=${encodeURIComponent(query)}` +
      // '&userLocation=47.668697,-122.376373,5' +
      // '&includeEntityTypes=Business' +
      `&key=${process.env.REACT_APP_BING_MAPS_API_KEY}`,

  GEOCODE:
    (address: BingLocationAddress) => {
      type TAddress = keyof typeof address;
      return 'https://dev.virtualearth.net/REST/v1/Locations?' +
      Object.keys(address).map(
        (key: string) => `${key}=${address[key as TAddress]}`
      ).join('&') +
      // `&userLocation={userLocation}&userIp={userIp}&usermapView={usermapView}&includeNeighborhood={includeNeighborhood}` +
      `&maxResults=5` +
      `&key=${process.env.REACT_APP_BING_MAPS_API_KEY}`
    }

};