import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_ENDPOINTS, API_SERVER_URL } from "./endpoints";
import {
  CreateOrganizationUserPayload,
  CreateOrganizationUserResponse,
  CreateOrganizationVehiclePayload,
  EditOrganizationUserPayload,
  OrganizationEntityListingPayload,
  OrganizationUser,
  SingleOrganizationUserPayload,
} from "../types/Admin";
import { API_METHODS } from "./constants";
import { handleAuthErrorCode } from "./errorCodes";
import { sessionStorageKeys } from "../../utils/sessionStorageItems";
import { ListingResponse } from "../types/Listing";
import { TUserRole } from "../types/UserRole";
import { TLoggedInUser } from "../types/User";
import { OrganizationVehicle } from "../types/Vehicle";
import { OrganizationDriver } from "../types/Drivers";

export enum AdminApiTags {
  USER_CREATED = 'USER_CREATED',
  USER_MODIFIED = 'USER_MODIFIED',
  USER_DELETED = 'USER_DELETED',
  USER_SINGLE = 'USER_SINGLE',

  VEHICLE_CREATED = 'VEHICLE_CREATED',
  VEHICLE_MODIFIED = 'VEHICLE_MODIFIED',
  VEHICLE_DELETED = 'VEHICLE_DELETED',

  DRIVER_CREATED = 'DRIVER_CREATED',
  DRIVER_MODIFIED = 'DRIVER_MODIFIED',
  DRIVER_DELETED = 'DRIVER_DELETED',
}

export const AdminAPIs = createApi({
  reducerPath: "adminAPI",
  tagTypes: [
    AdminApiTags.USER_CREATED,
    AdminApiTags.USER_MODIFIED,
    AdminApiTags.USER_DELETED,
    AdminApiTags.USER_SINGLE,

    AdminApiTags.VEHICLE_CREATED,
    AdminApiTags.VEHICLE_MODIFIED,
    AdminApiTags.VEHICLE_DELETED,

    AdminApiTags.DRIVER_CREATED,
    AdminApiTags.DRIVER_MODIFIED,
    AdminApiTags.DRIVER_DELETED,
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
    organizationUsers: builder.query<ListingResponse<OrganizationUser[]>, OrganizationEntityListingPayload>({
      query: ({ organization_id, page, page_size, search }) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_USERS(organization_id),
          params: {
            page,
            page_size,
            search
          },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.USER_CREATED, AdminApiTags.USER_MODIFIED, AdminApiTags.USER_DELETED],
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
      providesTags: [AdminApiTags.USER_SINGLE],
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
          url: API_ENDPOINTS.ADMINS.EDIT_ORGANIZATION_USER,
          method: API_METHODS.PATCH,
          body: params.data
        }
      },
      invalidatesTags: [AdminApiTags.USER_MODIFIED, AdminApiTags.USER_SINGLE],
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
      invalidatesTags: [AdminApiTags.USER_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: void) => {
        return response;
      },
    }),

    // organization vehicles
    organizationVehicles: builder.query<ListingResponse<OrganizationVehicle[]>, OrganizationEntityListingPayload>({ // TODO: change the type
      query: ({ organization_id, page, page_size, search }) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_VEHICLES,
          params: {
            organization_id,
            page,
            page_size,
            search
          },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.VEHICLE_CREATED, AdminApiTags.VEHICLE_MODIFIED, AdminApiTags.VEHICLE_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<OrganizationVehicle[]>) => {
        return response;
      },
    }),

    // create organization vehicle
    createOrganizationVehicle: builder.mutation<OrganizationVehicle, CreateOrganizationVehiclePayload>({
      query: (params: CreateOrganizationVehiclePayload) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_VEHICLES,
          method: API_METHODS.POST,
          body: params
        }
      },
      invalidatesTags: [AdminApiTags.VEHICLE_CREATED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: OrganizationVehicle) => {
        return response;
      },
    }),

    // organization drivers
    organizationDrivers: builder.query<ListingResponse<OrganizationDriver[]>, OrganizationEntityListingPayload>({ // TODO: change the type
      query: ({ organization_id, page, page_size, search }) => {
        return {
          url: API_ENDPOINTS.ADMINS.ORGANIZATION_DRIVERS,
          params: {
            organization_id,
            page,
            page_size,
            search
          },
          method: API_METHODS.GET,
        };
      },
      providesTags: [AdminApiTags.DRIVER_CREATED, AdminApiTags.DRIVER_MODIFIED, AdminApiTags.DRIVER_DELETED],
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: ListingResponse<OrganizationDriver[]>) => {
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
  useOrganizationVehiclesQuery,
  useCreateOrganizationVehicleMutation,
  useOrganizationDriversQuery,
} = AdminAPIs;
