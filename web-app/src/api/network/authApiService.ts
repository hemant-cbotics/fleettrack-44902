// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, API_SERVER_URL } from './endpoints';
import { handleAuthErrorCode } from './errorCodes';
import { ForgotPasswordPayload, ForgotPasswordResponse, LoginPayload, LoginResponse, ResendEmailOtpPayload, ResendEmailOtpResponse, ForgotPasswordVerifyOtpPayload, ForgotPasswordVerifyOtpResponse, VerifyEmailOtpPayload, LegacyVerifyEmailOtpResponse, OrganizationInvitationPayload, OrganizationInvitationResponseSuccess, OnboardInvitedUserPayload, OnboardInvitedUserResponse } from '../types/Onboarding';
import { API_METHODS } from './constants';

// Define a service using a base URL and expected endpoints
export const AuthAPIs = createApi({
  reducerPath: 'authAPI',
  // tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER_URL,
    prepareHeaders: async headers => {
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: builder => ({
    // login
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (params: LoginPayload) => {
        return {
          url: API_ENDPOINTS.LOGIN,
          method: API_METHODS.POST,
          body: params,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: async (data: LoginResponse) => {
        return data;
      },
    }),

    // resend email otp
    resendEmailOtp: builder.mutation<ResendEmailOtpResponse, ResendEmailOtpPayload>({
      query: (params: ResendEmailOtpPayload) => {
        return {
          url: API_ENDPOINTS.RESEND_EMAIL_OTP,
          method: API_METHODS.POST,
          body: params,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: async (data: ResendEmailOtpResponse) => {
        return data;
      },
    }),

    // verify email otp
    verifyEmailOtp: builder.mutation<LegacyVerifyEmailOtpResponse, VerifyEmailOtpPayload>({
      query: (params: VerifyEmailOtpPayload) => {
        return {
          url: API_ENDPOINTS.VERIFY_EMAIL_OTP,
          method: API_METHODS.POST,
          body: params,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: async (data: LegacyVerifyEmailOtpResponse) => {
        return data;
      },
    }),

    // forgot password
    forgotPassword: builder.mutation<ForgotPasswordResponse, ForgotPasswordPayload>({
      query: (params: ForgotPasswordPayload) => {
        console.log(params);
        return {
          url: API_ENDPOINTS.FORGOT_PASSWORD,
          method: API_METHODS.POST,
          body: params,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: async (data: ForgotPasswordResponse) => {
        return data;
      },
    }),

    // forgot password verify otp (i.e. reset password)
    forgotPasswordVerifyOtp: builder.mutation<ForgotPasswordVerifyOtpResponse, ForgotPasswordVerifyOtpPayload>({
      query: (params: ForgotPasswordVerifyOtpPayload) => {
        return {
          url: API_ENDPOINTS.FORGOT_PASSWORD_VERIFY_OTP,
          method: API_METHODS.POST,
          body: params,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: async (data: ForgotPasswordVerifyOtpResponse) => {
        return data;
      },
    }),

    // show invite user
    organizationShowInviteUser: builder.query<OrganizationInvitationResponseSuccess, OrganizationInvitationPayload>({
      query: ({ invitation_token }) => {
        return {
          url: API_ENDPOINTS.ORGANIZATION.SHOW_INVITE_USER(invitation_token),
          method: API_METHODS.GET,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationInvitationResponseSuccess) => {
        return response
      },
    }),

    // onboard invited user
    onboardInvitedUser: builder.mutation<OnboardInvitedUserResponse, OnboardInvitedUserPayload>({
      query: (params: OnboardInvitedUserPayload) => {
        return {
          url: API_ENDPOINTS.ORGANIZATION.ONBOARD_INVITED_USER,
          method: API_METHODS.POST,
          body: params,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: async (data: OnboardInvitedUserResponse) => {
        return data;
      },
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useResendEmailOtpMutation,
  useVerifyEmailOtpMutation,
  useForgotPasswordMutation,
  useForgotPasswordVerifyOtpMutation,
  useLazyOrganizationShowInviteUserQuery,
  useOnboardInvitedUserMutation,
} = AuthAPIs;
