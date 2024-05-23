import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { VerifyEmailOtpResponseSuccess } from "../types/Onboarding"

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
}

export type TAppCommonState = {
  preLoginUserData?: TPreLoginUserData;
  user?: VerifyEmailOtpResponseSuccess;
  modals: TModalsState;
}

const initialState: TAppCommonState = {
  preLoginUserData: undefined,
  user: undefined,
  modals: {
    showCreateUser: false,
    showEditColumns: false,
    showAdminsDropdown: false,
    showCreateVehicle: false,
    showCreateDriver: false,
    showCreateGroup: false,
    showCreateFleetTag: false,
    showCreateGeozone: false,
    showDeleteConfirmation: false
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
    setModalsData: (state, action: PayloadAction<TModalsState>) => {
      state.modals = { ...(state.modals || {}), ...action?.payload }
    }
  }
})

export const { setPreLoginUserData, setUserData, setModalsData } = commonSlice.actions

export default commonSlice.reducer
