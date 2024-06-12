// ---------------
// Login API types
// ---------------

import { TUser } from "./User"
import { TUserRole } from "./UserRole"

// --------------------------
// Login API types
// --------------------------

export type LoginPayload = {
  email: string,
  password: string,
}

export type LoginResponseError = {
  data: {
    non_field_errors: string[]
  },
  status: number
}
export type LoginResponseSuccess = {
  message: string,
  status: number,
}
export type LoginResponse = LoginResponseSuccess | LoginResponseError;

// --------------------------
// Resend Email OTP API types
// --------------------------

export type ResendEmailOtpPayload = {
  email: string,
}

export type ResendEmailOtpResponseError = {
}

export type ResendEmailOtpResponseSuccess = {
  data: string[];
  message: string;
}

export type ResendEmailOtpResponse = ResendEmailOtpResponseSuccess | ResendEmailOtpResponseError;

// ----------------------
// Verification API types
// ----------------------

export type VerifyEmailOtpPayload = {
  email: string,
  email_otp: string,
}

export type VerifyEmailOtpResponseError = {
}

export type VerifyEmailOtpResponseSuccess = {
  owner_organization: any;
  token: string;
  user: TUser;
}

export type VerifyEmailOtpResponse = VerifyEmailOtpResponseSuccess | VerifyEmailOtpResponseError;

// -------------------------
// Forgot Password API types
// -------------------------

export type ForgotPasswordPayload = {
  email: string,
}

export type ForgotPasswordResponseError = {
}

export type ForgotPasswordResponseSuccess = {
  data: any;
  message: string;
}

export type ForgotPasswordResponse = ForgotPasswordResponseSuccess | ForgotPasswordResponseError;

// -----------------------------------------------------
// Forgot Password Verify OTP / Reset Password API types
// -----------------------------------------------------

export type ForgotPasswordVerifyOtpPayload = {
  email: string,
  otp: string,
  new_password: string,
  confirm_new_password: string,
}

export type ForgotPasswordVerifyOtpResponseError = {
}

export type ForgotPasswordVerifyOtpResponseSuccess = {
  data: any;
  message: string;
}

export type ForgotPasswordVerifyOtpResponse = ForgotPasswordVerifyOtpResponseSuccess | ForgotPasswordVerifyOtpResponseError;

// ---------------------------------
// Organization Invitation API types
// ---------------------------------

export type OrganizationInvitationPayload = {
  invitation_token: string,
}

export type OrganizationInvitationResponseError = {
}

export type OrganizationInvitationResponseSuccess = {
  id: string,
  role: TUserRole,
  created_at: string,
  updated_at: string,
  username: string,
  email: string,
  is_accepted: boolean,
  email_sent: boolean,
  organization: number,
  invited_by: number
}

export type OrganizationInvitationResponse = OrganizationInvitationResponseSuccess | OrganizationInvitationResponseError;

// -------------------------------
// Onbooard Invited User API types
// -------------------------------

export type OnboardInvitedUserPayload = {
  id: string,
  password: string,
  confirm_password: string,
}

export type OnboardInvitedUserResponse = {
  message: string;
}
