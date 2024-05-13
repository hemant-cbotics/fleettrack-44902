import { APP_CONFIG } from "../constants/constants"
import { routeUrls } from "../navigation/routeUrls"
import { sessionStorageKeys } from "./sessionStorageItems"

export const sideEffectLogOut = (redirect = true) => {
  if (APP_CONFIG.DEBUG.ALL) console.log('[sideEffectLogOut] Logging the user out!')
  sessionStorage.removeItem(sessionStorageKeys.user)
  sessionStorage.removeItem(sessionStorageKeys.accessToken)
  sessionStorage.removeItem(sessionStorageKeys.ownerOrganization)
  if (redirect)
    window.location.href = routeUrls.landingPage
}
