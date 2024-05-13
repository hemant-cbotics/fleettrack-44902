import React from "react";
import SearchIcon from "../assets/svg/search-icon.svg";
import HelpIcon from "../assets/svg/help-icon.svg";
import NotificationIcon from "../assets/svg/notification-icon.svg";
import ChatIcon from "../assets/svg/chat-icon.svg";
import WarningIcon from "../assets/svg/warning-icon.svg";
import UserIcon from "../assets/svg/user-icon.svg";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../constants/constants";
import { AdminFormFieldDropdown } from "./admin/formFields";
import { routeUrls } from "../navigation/routeUrls";
import { useNavigate } from "react-router-dom";

interface IconWithCounterProps {
  src: string;
  alt: string;
  counter?: number;
}

const IconWithCounter: React.FC<IconWithCounterProps> = ({src, alt, counter = null}) => (
  <li className="relative cursor-pointer p-3">
    <img src={src} alt={alt} className={`block size-8 max-w-8${alt === 'chat-icon' ? ' translate-y-1' : ''}`} />
    {counter !== null && <span className="absolute top-0 right-0 bg-white rounded-full shadow-md size-5 text-xs flex items-center justify-center">
      {counter}
    </span>}
  </li>
);

const DashboardHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleClickProfileIcon = () => {
    // TODO: Implement the logic to open the profile dropdown
    // Temporary redirect to change password page
    navigate(routeUrls.changePassword);
  }

  return (
    <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-4 lg:grid lg:grid-cols-12`}>
      <div className="relative lg:col-span-4 flex items-center">
        <input
          type="text"
          id="search"
          placeholder={t("type_here_to_search")}
          className="w-full p-2 pl-10 rounded-md border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
        <img
          src={SearchIcon}
          alt="search-icon"
          className="absolute size-5 left-3 top-1/2 transform -translate-y-1/2"
        />
      </div>
      <div className="lg:col-span-8 flex justify-end">
        <AdminFormFieldDropdown
          label={false}
          id="admins"
          name="admins"
          value=""
          options={[
            { value: "", label: t("dashboard.top.admins") },
            ...(Object.keys(routeUrls.dashboardChildren.adminChildren)
            .map(item => {
              return {
                value: item,
                label: t(`dashboard.sidemenu.admins.${item}`)
              };
            }))
          ]}
          onChange={(e) => {
            const routeSlug = e.target.value;
            if(routeSlug)
              navigate(routeUrls.dashboardChildren.adminChildren
                ?.[routeSlug as 'users']
              );
          }}
          customSelectboxClass={`h-10 mt-2 self-center`}
        />
        <div className="ml-5">
          <ul className="flex items-center space-x-2">
            <IconWithCounter src={HelpIcon} alt="help-icon" />
            <IconWithCounter src={ChatIcon} alt="chat-icon" counter={4} />
            <IconWithCounter src={WarningIcon} alt="warning-icon" counter={5} />
            <IconWithCounter src={NotificationIcon} alt="notification-icon" counter={2} />
          </ul>
        </div>
        <div className="flex items-center justify-center ml-5 cursor-pointer" onClick={handleClickProfileIcon}>
          <img src={UserIcon} alt="user-icon" className="size-8 max-w-8" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;