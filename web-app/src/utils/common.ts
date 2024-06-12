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

export const asyncLoadScript = (src: string, id: string, callback: () => void) => {
  const existingScript = document.getElementById(id)

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src
    script.id = id
    document.body.appendChild(script)

    script.onload = () => {
      if (callback) callback()
    }
  }

  if (existingScript && callback) callback()
}

export const removeScript = (id: string) => {
  const existingScript = document.getElementById(id)
  if (existingScript) existingScript.remove()
}
