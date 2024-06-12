export const routeVariables = {
  invitationToken: "invitationToken",
}

export const routeUrls = {
  landingPage: "/",
  loginPage: "/", // This is the same as the landing page
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  twoFactorAuthentication: "/verification",

  organizationInvitation: `/organization/invitation/:${routeVariables.invitationToken}`, // this link is sent to the user's email

  termsAndConditions: "/terms-and-conditions",
  privacyPolicy: "/privacy-policy",

  changePassword: "/change-password",
  dashboard: "/dashboard",
  dashboardChildren: {
    overview: "/dashboard/overview",
    admins: "/dashboard/admins",
    adminChildren: {
      // following values are being used dynamically to render 'Admins' dropdown on the dashboard header, thus, add / remove with caution
      users: "/dashboard/admins/users", // additionally being used with details route (:userId)
      roles: "/dashboard/admins/roles",
      vehicles: "/dashboard/admins/vehicles", // additionally being used with details route (:vehicleId)
      groups: "/dashboard/admins/groups",
      fleettags: "/dashboard/admins/fleet-tags",
      drivers: "/dashboard/admins/drivers",
      geozones: "/dashboard/admins/geozones",
    },

    // under development
    map_overview: "/dashboard/map-overview",
    reports: "/dashboard/reports",
    manage_roles: "/dashboard/manage-roles",
    maintenance_admin: "/dashboard/maintenance-admin",
    group_admin: "/dashboard/group-admin",
    manage_rule_alert: "/dashboard/manage-rule-alert",
    camera_admin: "/dashboard/camera-admin",

    //profile
    account: "/dashboard/account",
  },
}
