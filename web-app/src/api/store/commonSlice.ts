import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import { VerifyEmailOtpResponseSuccess } from "../types/Onboarding"

export type TPreLoginUserData = {
  email?: string;
}

export type TModalsState = {
  showCreateUser: boolean;
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
    showCreateUser: false
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