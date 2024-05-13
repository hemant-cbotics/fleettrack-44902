import dashboardMenuIcons from "../assets/svg/dashboardMenuIcons";
import { routeUrls } from "./routeUrls";

export type TDashboardMenuItem = {
  slug: string;
  icon: string;
  path: string;
};

export const dashboardMenuItemSlugs = [
  "dashboard",
  "map_overview",
  "reports",
  "manage_roles",
  "maintenance_admin",
  "group_admin",
  "administrators",
  "manage_rule_alert",
  "camera_admin",
];

export const dashboardMenuItems: TDashboardMenuItem[] = [
  {
    slug: dashboardMenuItemSlugs[0],
    icon: dashboardMenuIcons.dashboard,
    path: routeUrls.dashboardChildren.overview,
  },
  {
    slug: dashboardMenuItemSlugs[1],
    icon: dashboardMenuIcons.map_overview,
    path: routeUrls.dashboardChildren.map_overview,
  },
  {
    slug: dashboardMenuItemSlugs[2],
    icon: dashboardMenuIcons.reports,
    path: routeUrls.dashboardChildren.reports,
  },
  {
    slug: dashboardMenuItemSlugs[3],
    icon: dashboardMenuIcons.manage_roles,
    path: routeUrls.dashboardChildren.manage_roles,
  },
  {
    slug: dashboardMenuItemSlugs[4],
    icon: dashboardMenuIcons.maintenance_admin,
    path: routeUrls.dashboardChildren.maintenance_admin,
  },
  {
    slug: dashboardMenuItemSlugs[5],
    icon: dashboardMenuIcons.group_admin,
    path: routeUrls.dashboardChildren.group_admin,
  },
  // {
  //   slug: dashboardMenuItemSlugs[6],
  //   icon: dashboardMenuIcons.administrators,
  //   path: routeUrls.dashboardChildren.admins,
  // },
  {
    slug: dashboardMenuItemSlugs[7],
    icon: dashboardMenuIcons.manage_rule_alert,
    path: routeUrls.dashboardChildren.manage_rule_alert,
  },
  {
    slug: dashboardMenuItemSlugs[8],
    icon: dashboardMenuIcons.camera_admin,
    path: routeUrls.dashboardChildren.camera_admin,
  },
];

export const dashboardAdminsMenuItemSlugs = [
  "users",
  "roles",
  "vehicles",
  "groups",
  "fleettags",
  "drivers",
  "geozones",
];

export const dashboardAdminsMenuItems: TDashboardMenuItem[] = [
  {
    slug: dashboardAdminsMenuItemSlugs[0],
    icon: dashboardMenuIcons.admins.user,
    path: routeUrls.dashboardChildren.adminChildren.users,
  },
  {
    slug: dashboardAdminsMenuItemSlugs[1],
    icon: dashboardMenuIcons.admins.users,
    path: routeUrls.dashboardChildren.adminChildren.roles,
  },
  {
    slug: dashboardAdminsMenuItemSlugs[2],
    icon: dashboardMenuIcons.admins.vehicle,
    path: routeUrls.dashboardChildren.adminChildren.vehicles,
  },
  {
    slug: dashboardAdminsMenuItemSlugs[3],
    icon: dashboardMenuIcons.admins.vehicle,
    path: routeUrls.dashboardChildren.adminChildren.groups,
  },
  {
    slug: dashboardAdminsMenuItemSlugs[4],
    icon: dashboardMenuIcons.admins.truck,
    path: routeUrls.dashboardChildren.adminChildren.fleettags,
  },
  {
    slug: dashboardAdminsMenuItemSlugs[5],
    icon: dashboardMenuIcons.admins.users,
    path: routeUrls.dashboardChildren.adminChildren.drivers,
  },
  {
    slug: dashboardAdminsMenuItemSlugs[6],
    icon: dashboardMenuIcons.admins.geozone,
    path: routeUrls.dashboardChildren.adminChildren.geozones,
  }
];
