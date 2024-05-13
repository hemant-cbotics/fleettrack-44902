import React from "react";
import Logo from "../assets/svg/logo-fleettrack.svg";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { routeUrls } from "../navigation/routeUrls";
import { useLogoutMutation } from "../api/network/userApiService";
import { sideEffectLogOut } from "../utils/common";
import { dashboardAdminsMenuItems, dashboardMenuItems, TDashboardMenuItem } from "../navigation/dashboardSideMenu";
import LeftArrowIcon from "../assets/svg/left-arrow-icon.svg";

type TDashboardMenuListItemProps = {
  dashboardMenuItem: TDashboardMenuItem;
}

const DashboardMenuListItem: React.FC<TDashboardMenuListItemProps> = ({ dashboardMenuItem }) => {
  const { t } = useTranslation("translation", { keyPrefix: "dashboard.sidemenu" });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const handleClick = (path: string) => {
    navigate(path);
  };
  const active = pathname === dashboardMenuItem.path;
  const title = t(dashboardMenuItem.slug);
  return (
    <li
      className={`px-3 py-2 rounded-lg ${active ? "bg-accent-blue-pale" : "hover:bg-gray-300 cursor-pointer"}`}
      onClick={() => handleClick(dashboardMenuItem.path)}>
      <span className="flex items-center gap-2">
        <img src={dashboardMenuItem.icon} alt={title} />
        <p className={`font-bold text-xs ${active ? "text-accent-blue-dark" : "text-gray-500"}`}>{title}</p>
      </span>
    </li>
  )
};

const Sidemenu = () => {
  const { t } = useTranslation("translation", { keyPrefix: "dashboard.sidemenu" });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const adminsMenuActive = pathname.indexOf(routeUrls.dashboardChildren.admins) > -1;

  const [logoutAPITrigger, { isLoading }] = useLogoutMutation()

  const handleLogout = () => {
    logoutAPITrigger()
      .then(() => {
        sideEffectLogOut()
      })
  }

  const backToMainMenu = () => {
    navigate(routeUrls.dashboardChildren.overview)
  }

  return (
    <div className="flex flex-col bg-gray-100 px-8 py-6 h-full gap-6">
      <Link to={routeUrls.dashboardChildren.overview}>
        <img src={Logo} alt="fleet-track-logo" />
      </Link>
      {adminsMenuActive ? (
        <>
          <button
            className="flex items-center justify-center bg-blue-200 text-blue-800 font-medium text-base leading-6 rounded-full w-full"
            onClick={backToMainMenu}>
            <img
              src={LeftArrowIcon}
              alt="left-arrow-icon"
              className="p-2 bg-blue-200 rounded-full pointer-events-none -ml-4"
            />
            {t("main_menu")}
          </button>
          <ul className="space-y-4 flex-grow overflow-auto">
            {dashboardAdminsMenuItems.map((item, index) => (
              <DashboardMenuListItem
                key={index}
                dashboardMenuItem={{ ...item, slug: `admins.${item.slug}` }}
              />
            ))}
          </ul>
        </>
      ) : (
        <ul className="space-y-4 flex-grow overflow-auto">
          {dashboardMenuItems.map((item, index) => (
            <DashboardMenuListItem
              key={index}
              dashboardMenuItem={item}
            />
          ))}
        </ul>
      )}
      <button
        className="bg-blue-200 text-blue-800 font-medium text-base leading-6 py-2 px-2 rounded-full w-full"
        disabled={isLoading}
        onClick={handleLogout}>
        {t("logout")}
      </button>
    </div>
  );
};

export default Sidemenu;
