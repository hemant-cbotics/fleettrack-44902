import React from "react";
import SearchIcon from "../../assets/svg/search-icon.svg";
import HelpIcon from "../../assets/svg/help-icon.svg";
import NotificationIcon from "../../assets/svg/notification-icon.svg";
import ChatIcon from "../../assets/svg/chat-icon.svg";
import WarningIcon from "../../assets/svg/warning-icon.svg";
import UserIcon from "../../assets/svg/user-icon.svg";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../constants/constants";
import { AdminFormFieldDropdown } from "../admin/formFields";
import { routeUrls } from "../../navigation/routeUrls";
import { useLocation, useNavigate } from "react-router-dom";
import AppAvatar from "../avatar";
import { getUserIntials } from "../../utils/string";
import { useSelector } from "react-redux";
import { VerifyEmailOtpResponseSuccess } from "../../api/types/Onboarding";
import AdminsDropdown from "./adminsDropdown";
import { sessionStorageKeys, useSessionStorage } from "../../utils/sessionStorageItems";
import { TUser } from "../../api/types/User";
import AppSearchBox from "../searchBox";

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
  const { getSessionStorageItem } = useSessionStorage();

  const loggedInUserData: VerifyEmailOtpResponseSuccess = useSelector((state: any) => state.commonReducer.user);
  const loggedInUser: TUser = loggedInUserData?.user ?? getSessionStorageItem(sessionStorageKeys.user);

  const { pathname } = useLocation();
  const adminsMenuActive = pathname.indexOf(routeUrls.dashboardChildren.admins) > -1;

  const handleClickProfileIcon = () => {
    // TODO: Implement the logic to open the profile dropdown
    // Temporary redirect to change password page
    navigate(routeUrls.changePassword);
  }

  return (
    <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-4 lg:grid lg:grid-cols-12`}>
      <div className="lg:col-span-4 flex items-center">
        <AppSearchBox
          wrapperClassName="w-64 max-w-full"
          placeholder={t("type_here_to_search")}
          onChange={() => {}}
        />
      </div>
      <div className="lg:col-span-8 flex justify-end">
        {!adminsMenuActive && <AdminsDropdown />}
        {/* <AdminFormFieldDropdown
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
        /> */}
        <div className="ml-5">
          <ul className="flex items-center space-x-2">
            <IconWithCounter src={HelpIcon} alt="help-icon" />
            <IconWithCounter src={ChatIcon} alt="chat-icon" counter={4} />
            <IconWithCounter src={WarningIcon} alt="warning-icon" counter={5} />
            <IconWithCounter src={NotificationIcon} alt="notification-icon" counter={2} />
          </ul>
        </div>
        <div className="flex items-center justify-center ml-5 cursor-pointer" onClick={handleClickProfileIcon}>
          <AppAvatar initials={getUserIntials(loggedInUser?.name ?? loggedInUser?.email)} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
