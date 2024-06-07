import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { VerifyEmailOtpResponseSuccess } from "../types/Onboarding"
import { TLatLng } from "../../types/map";
import { TMapState } from "../../types/map";
import { APP_CONFIG } from "../../constants/constants";
import { FilterType } from "../types/Admin";


export type TPreLoginUserData = {
  email?: string;
}

export type TModalsState = {
  showAdminsDropdown: boolean;
  showEditColumns: boolean;
  showCreateUser: boolean;
  showCreateVehicle: boolean;
  showCreateDriver: boolean;
  showCreateGroup: boolean;
  showCreateFleetTag: boolean;
  showCreateGeozone: boolean;
  showDeleteConfirmation: boolean;
  showMapFilter: boolean;
  showGroupSelector: boolean;
  showDeviceReport: boolean;
}
const ownerOrganization = sessionStorage.getItem("ownerOrganization")

export type TQueryParams = {
  organization_id: number;
  page: number;
  page_size: number;
  search: string;
}

export type TListingQueryParams = {
  users: TQueryParams;
  vehicles: TQueryParams & { is_active: FilterType };
  drivers: TQueryParams & { is_active: FilterType };
  groups: TQueryParams;
  fleetTags: TQueryParams;
  geoZones: TQueryParams;
}

export type TAppCommonState = {
  preLoginUserData?: TPreLoginUserData;
  user?: VerifyEmailOtpResponseSuccess;
  userCurrPos?: TLatLng;
  mapState?: TMapState;
  modals: TModalsState;
  listingQueryParams: TListingQueryParams;
}

const initialState: TAppCommonState = {
  preLoginUserData: undefined,
  user: undefined,
  userCurrPos: undefined,
  mapState: undefined,
  modals: {
    showCreateUser: false,
    showEditColumns: false,
    showAdminsDropdown: false,
    showCreateVehicle: false,
    showCreateDriver: false,
    showCreateGroup: false,
    showCreateFleetTag: false,
    showCreateGeozone: false,
    showDeleteConfirmation: false,
    showMapFilter: false,
    showGroupSelector: false,
    showDeviceReport: false,
  },
  listingQueryParams: {
    users: {
      organization_id: ownerOrganization ? JSON.parse(ownerOrganization).id : 0,
      page: 1,
      page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
      search: ""
    },
    vehicles: {
      organization_id: ownerOrganization ? JSON.parse(ownerOrganization).id : 0,
      page: 1,
      page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
      search: "",
      is_active: "active"
    },
    drivers: {
      organization_id: ownerOrganization ? JSON.parse(ownerOrganization).id : 0,
      page: 1,
      page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
      search: "",
      is_active: "active"
    },
    groups: {
      organization_id: ownerOrganization ? JSON.parse(ownerOrganization).id : 0,
      page: 1,
      page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
      search: ""
    },
    fleetTags: {
      organization_id: ownerOrganization ? JSON.parse(ownerOrganization).id : 0,
      page: 1,
      page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
      search: ""
    },
    geoZones: {
      organization_id: ownerOrganization ? JSON.parse(ownerOrganization).id : 0,
      page: 1,
      page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
      search: ""
    }
  }
}

export const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    setPreLoginUserData: (state, action: PayloadAction<TPreLoginUserData>) => {
      if (action?.payload) {
        state.preLoginUserData = { ...(state.preLoginUserData || {}), ...action?.payload }
      }
    },
    setUserData: (state, action: PayloadAction<VerifyEmailOtpResponseSuccess>) => {
      state.user = action?.payload
    },
    setUserCurrPosData: (state, action: PayloadAction<TLatLng>) => {
      state.userCurrPos = action?.payload
    },
    setMapStateData: (state, action: PayloadAction<TMapState>) => {
      state.mapState = action?.payload
    },
    setModalsData: (state, action: PayloadAction<TModalsState>) => {
      state.modals = { ...(state.modals || {}), ...action?.payload }
    },
    setListingQueryParams: (state, action: PayloadAction<TListingQueryParams>) => {
      state.listingQueryParams = { ...(state.listingQueryParams || {}), ...action?.payload }
    }
  }
})

export const {
  setPreLoginUserData,
  setUserData,
  setUserCurrPosData,
  setMapStateData,
  setModalsData,
  setListingQueryParams
} = commonSlice.actions

export default commonSlice.reducer
