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
import { useLogoutMutation } from "../../api/network/userApiService";
import { sideEffectLogOut } from "../../utils/common";

interface IconWithCounterProps {
  src: string;
  alt: string;
  counter?: number;
}

const IconWithCounter: React.FC<IconWithCounterProps> = ({src, alt, counter = null}) => (
  <li className="relative cursor-pointer p-3">
    <img src={src} alt={alt} className={`block size-6 max-w-6${alt === 'chat-icon' ? ' translate-y-1' : ''}`} />
    {counter !== null && <span className="absolute top-0 right-0 bg-white rounded-full shadow-md size-5 text-xs flex items-center justify-center">
      {counter}
    </span>}
  </li>
);

const DashboardHeader = () => {
  const { t } = useTranslation();
  const { t: tTop } = useTranslation("translation", { keyPrefix: "dashboard.top" });
  const navigate = useNavigate();
  const { getSessionStorageItem } = useSessionStorage();

  const loggedInUserData: VerifyEmailOtpResponseSuccess = useSelector((state: any) => state.commonReducer.user);
  const loggedInUser: TUser = loggedInUserData?.user ?? getSessionStorageItem(sessionStorageKeys.user);

  const { pathname } = useLocation();
  const adminsMenuActive = pathname.indexOf(routeUrls.dashboardChildren.admins) > -1;

  const [logoutAPITrigger, { isLoading }] = useLogoutMutation()

  const handleLogout = () => {
    logoutAPITrigger()
      .then(() => {
        sideEffectLogOut()
      })
  }

  const [showProfileDropdown, setShowProfileDropdown] = React.useState(false)
  const handleClickProfileIcon = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  const handleNavigateTo = (page: 'account' | 'change_password') => {
    setShowProfileDropdown(false)
    switch(page) {
      case 'account':
        navigate(routeUrls.dashboardChildren.account)
        break;
      case 'change_password':
        navigate(routeUrls.changePassword)
        break;
    }
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
        <div className="ml-5">
          <ul className="flex items-center space-x-2">
            <IconWithCounter src={HelpIcon} alt="help-icon" />
            <IconWithCounter src={ChatIcon} alt="chat-icon" counter={4} />
            <IconWithCounter src={WarningIcon} alt="warning-icon" counter={5} />
            <IconWithCounter src={NotificationIcon} alt="notification-icon" counter={2} />
          </ul>
        </div>

        {/* Profile Icon */}
        <div className="relative select-none">
          <div className="flex items-center justify-center ml-5 cursor-pointer" onClick={handleClickProfileIcon}>
            <AppAvatar initials={getUserIntials(loggedInUser?.name ?? loggedInUser?.email)} />
          </div>
          <div
            className={`absolute end-0 z-10 mt-2 w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg${showProfileDropdown ? '' : ' hidden'}`}
            role="menu"
          >
            <div className="p-2">
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
                onClick={() => handleNavigateTo('account')}
              >
                {tTop("account")}
              </a>

              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                role="menuitem"
                onClick={() => handleNavigateTo('change_password')}
              >
                {tTop("change_password")}
              </a>
            </div>

            <div className="p-2">
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                role="menuitem"
                onClick={handleLogout}
              >
                {tTop("logout")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
