// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ENDPOINTS, API_SERVER_URL } from './endpoints';
import { handleAuthErrorCode } from './errorCodes';
import { ChangePasswordPayload, ChangePasswordResponse } from '../types/User';
import { API_METHODS } from './constants';
import { sessionStorageKeys } from '../../utils/sessionStorageItems';

// Define a service using a base URL and expected endpoints
export const UserAPIs = createApi({
  reducerPath: 'userAPI',
  // tagTypes: [],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER_URL,
    prepareHeaders: async headers => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', `Token ${sessionStorage.getItem(sessionStorageKeys.accessToken)}`);
      return headers;
    },
  }),
  endpoints: builder => ({

    // change password
    changePassword: builder.mutation<ChangePasswordResponse, ChangePasswordPayload>({
      query: (params: ChangePasswordPayload) => {
        return {
          url: API_ENDPOINTS.USERS.CHANGE_PASSWORD,
          method: API_METHODS.POST,
          body: params,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: async (data: ChangePasswordResponse) => {
        return data;
      },
    }),

    // logout
    logout: builder.mutation<any, void>({
      query: () => {
        return {
          url: API_ENDPOINTS.USERS.LOGOUT,
          method: API_METHODS.POST,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: async (data: ChangePasswordResponse) => {
        return data;
      },
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useChangePasswordMutation,
  useLogoutMutation,
} = UserAPIs;
