import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS, API_SERVER_URL } from "./endpoints";
import {
  CreateOrganizationUserPayload,
  CreateOrganizationUserResponse,
  EditOrganizationUserPayload,
  OrganizationUser,
  OrganizationUsersPayload,
  SingleOrganizationUserPayload,
} from "../types/Admin";
import { API_METHODS } from "./constants";
import { handleAuthErrorCode } from "./errorCodes";
import { sessionStorageKeys } from "../../utils/sessionStorageItems";
import { ListingResponse } from "../types/Listing";
import { TUserRole } from "../types/UserRole";
import { TLoggedInUser } from "../types/User";

export enum AdminApiTags {
  USER_CREATED = 'USER_CREATED',
}

export const AdminAPIs = createApi({
  reducerPath: "adminAPI",
  tagTypes: [
    AdminApiTags.USER_CREATED,
  ],
  baseQuery: fetchBaseQuery({
    baseUrl: API_SERVER_URL,
    prepareHeaders: async (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set('Authorization', `Token ${sessionStorage.getItem(sessionStorageKeys.accessToken)}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({

    // roles and permissions
    organizationRolesPermissions: builder.query<ListingResponse<TUserRole[]>, void>({
      query: () => {
        return {
          url: API_ENDPOINTS.ORGANIZATION.ROLES_PERMISSIONS,
          method: API_METHODS.GET,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<TUserRole[]>) => {
        return response
      },
    }),

    // create organization user
    createOrganizationUser: builder.mutation<CreateOrganizationUserResponse, CreateOrganizationUserPayload>({
      query: (params: CreateOrganizationUserPayload) => {
        return {
          url: API_ENDPOINTS.ORGANIZATION.INVITE_USER,
          method: API_METHODS.POST,
          body: params
        }
      },
      invalidatesTags: [AdminApiTags.USER_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: CreateOrganizationUserResponse) => {
        return response;
      },
    }),

    // organization users
    organizationUsers: builder.query<ListingResponse<OrganizationUser[]>, OrganizationUsersPayload>({
      query: ({ organization_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_USERS(organization_id),
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.USER_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<OrganizationUser[]>) => {
        return response;
      },
    }),

    // single organization user
    singleOrganizationUser: builder.query<TLoggedInUser, SingleOrganizationUserPayload>({
      query: ({ user_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_USER(user_id),
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.USER_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: TLoggedInUser) => {
        return response;
      },
    }),

    // edit organization user
    editOrganizationUser: builder.mutation<OrganizationUser, EditOrganizationUserPayload>({
      query: (params: EditOrganizationUserPayload) => {
        return {
          url: API_ENDPOINTS.ADMINS.EDIT_ORGANIZATION_USER(params.user_id),
          method: API_METHODS.PATCH,
          body: params.data
        }
      },
      invalidatesTags: [AdminApiTags.USER_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationUser) => {
        return response;
      },
    }),

    // delete single user
    deleteSingleUser: builder.mutation<void, SingleOrganizationUserPayload>({
      query: ({ user_id }) => {
        return {
          url: API_ENDPOINTS.ADMINS.SINGLE_ORGANIZATION_USER(user_id),
          method: API_METHODS.DELETE,
        };
      },
      invalidatesTags: [AdminApiTags.USER_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: void) => {
        return response;
      },
    }),

  }),
});

export const {
  useOrganizationRolesPermissionsQuery,
  useCreateOrganizationUserMutation,
  useOrganizationUsersQuery,
  useSingleOrganizationUserQuery,
  useEditOrganizationUserMutation,
  useDeleteSingleUserMutation,
} = AdminAPIs;
