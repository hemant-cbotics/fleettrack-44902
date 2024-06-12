import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BINGMAPS_ENDPOINTS } from "./endpoints";
import { API_METHODS } from "./constants";
import { handleAuthErrorCode } from "./errorCodes";
import { BingAutosuggestResponse, BingGeocodeResponse, BingLocationAddress } from "../types/Map";

export enum MapApiTags {
  AUTOSUGGEST = 'AUTOSUGGEST',
}

export const MapAPIs = createApi({
  reducerPath: "mapAPI",
  tagTypes: [
    MapApiTags.AUTOSUGGEST,
  ],
  baseQuery: fetchBaseQuery({
    // baseUrl: API_SERVER_URL,
    prepareHeaders: async (headers) => headers,
  }),
  endpoints: (builder) => ({

    // autosuggest
    autosuggestAddress: builder.query<BingAutosuggestResponse, string>({
      query: (query: string) => {
        return {
          url: BINGMAPS_ENDPOINTS.AUTOSUGGEST(query),
          method: API_METHODS.GET,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: BingAutosuggestResponse) => {
        return response
      },
    }),

    // geocode
    geocode: builder.query<BingGeocodeResponse, BingLocationAddress>({
      query: (address: BingLocationAddress) => {
        return {
          url: BINGMAPS_ENDPOINTS.GEOCODE(address),
          method: API_METHODS.GET,
        };
      },
      transformErrorResponse(baseQueryReturnValue) {
        handleAuthErrorCode(baseQueryReturnValue);
        return baseQueryReturnValue;
      },
      transformResponse: (response: BingGeocodeResponse) => {
        return response
      },
    }),
    
  }),
});

export const {
  useLazyAutosuggestAddressQuery,
  useLazyGeocodeQuery,
} = MapAPIs;
