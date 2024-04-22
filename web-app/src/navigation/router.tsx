import React, { ReactNode } from "react"
import { createBrowserRouter, RouteObject } from "react-router-dom"
import { routeUrls } from "./routeUrls"
import useAuth from "../utils/auth"

import ScreenLogin from "../pages/unprotected/login/login"
import ScreenTermsAndConditions from "../pages/unprotected/terms-and-conditions/terms-and-conditions"
import ScreenPrivacyPolicy from "../pages/unprotected/privacy-policy/privacy-policy"
import ScreenDashboard from "../pages/dashboard/dashboard"
import ScreenForgotPassword from "../pages/unprotected/forgotPassword/forgotPassword"
import ScreenResetPassword from "../pages/unprotected/resetPassword/resetPassword"

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isUserLoggedIn } = useAuth();
  const isLoggedIn = isUserLoggedIn()
  console.log("[ProtectedRoute] check isUserLoggedIn", isLoggedIn)
  if (isLoggedIn) {
    return element
  } else {
    return <ScreenLogin showSessionExpiredMessage={true} />
  }
}

const routes: RouteObject[] = [
  {
    path: routeUrls.landingPage,
    element: <ScreenLogin />
  },
  {
    path: routeUrls.loginPage,
    element: <ScreenLogin />
  },
  {
    path: routeUrls.dashboard,
    element: <ProtectedRoute element={<ScreenDashboard />} />
  },
  {
    path: routeUrls.forgotPassword,
    element: <ScreenForgotPassword />
  },
  {
    path: routeUrls.resetPassword,
    element: <ScreenResetPassword />
  },
  {
    path: routeUrls.termsAndConditions,
    element: <ScreenTermsAndConditions />
  },
  {
    path: routeUrls.privacyPolicy,
    element: <ScreenPrivacyPolicy />
  }
]

const router = createBrowserRouter(routes)

export default router
