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
  const active =
    pathname === dashboardMenuItem.path ||
    (pathname.includes(routeUrls.dashboardChildren.admins) && pathname.includes(dashboardMenuItem.path));
  const title = t(dashboardMenuItem.slug);
  return (
    <li
      className={`px-3 py-2 rounded-lg ${active ? "bg-gray-300" : "hover:bg-gray-300 cursor-pointer"}`}
      onClick={() => handleClick(dashboardMenuItem.path)}>
      <span className="flex items-center gap-3">
        <img src={dashboardMenuItem.icon} alt={title} />
        <p className={`text-xs ${active ? "font-bold text-sidemenu-text-active" : "font-semibold text-sidemenu-text"}`}>{title}</p>
      </span>
    </li>
  )
};

const Sidemenu = () => {
  const { t } = useTranslation("translation", { keyPrefix: "dashboard.sidemenu" });
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const adminsMenuActive = pathname.indexOf(routeUrls.dashboardChildren.admins) > -1;

  const backToMainMenu = () => {
    navigate(routeUrls.dashboardChildren.overview)
  }

  return (
    <div className="flex flex-col bg-gray-100 px-6 py-4 h-full gap-6">
      <Link to={routeUrls.dashboardChildren.overview}>
        <img src={Logo} alt="fleet-track-logo" />
      </Link>
      {adminsMenuActive ? (
        <>
          <button
            className="flex items-center justify-center bg-accent-blue-pale hover:bg-accent-blue-paleO66 text-sidemenu-text-active font-medium text-base leading-6 py-1 rounded-lg w-full"
            onClick={backToMainMenu}>
            <img
              src={LeftArrowIcon}
              alt="left-arrow-icon"
              className="size-10 p-2 rounded-full pointer-events-none -ml-4"
            />
            {t("main_menu")}
          </button>
          <p className="text-sidemenu-text-active text-sm font-bold uppercase leading-6 tracking-wider text-center">{t('administration')}</p>
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
    </div>
  );
};

export default Sidemenu;
