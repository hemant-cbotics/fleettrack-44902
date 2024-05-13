import HeaderView from "../../../components/admin/headerView";
import DashboardWrapper from "../../../components/dashboard";
import SearchIcon from "../../../assets/svg/search-icon.svg";
import Accordian from "../../../components/accordian";
import {
  UserAccessControlForm,
  UserAuthorizedGroupsForm,
  UserGeneralDetailForm,
} from "./user-form";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import { useOrganizationUsersQuery } from "../../../api/network/adminApiServices";
import {
  sessionStorageKeys,
  useSessionStorage,
} from "../../../utils/sessionStorageItems";
import {
  TLoggedInUser,
  TLoggedInUserOrganization,
} from "../../../api/types/User";
import { OrganizationUser } from "../../../api/types/Admin";
import { TListData } from "./type";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ScreenAdminDetailUser = () => {
  const { userId } = useParams<{ userId: any }>();
  const [currentUserId, setCurrentUserId] = useState<number>(parseInt(userId));
  const { t: tmain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "adminDetailScreen",
  });
  const { getSessionStorageItem } = useSessionStorage();

  const thisUser = {
    ownerOrganization: getSessionStorageItem(
      sessionStorageKeys.ownerOrganization
    ),
    user: getSessionStorageItem(sessionStorageKeys.user),
  };

  const thisUserOrganizationId = !!thisUser.ownerOrganization
    ? ((thisUser.ownerOrganization || {}) as TLoggedInUserOrganization)?.id
    : ((thisUser.user || {}) as TLoggedInUser)?.role_and_permission?.role
        ?.organization;

  const { data: dataOrgUsers, isLoading, error } = useOrganizationUsersQuery({
    organization_id: thisUserOrganizationId,
  });

  const { results } = dataOrgUsers || {};

  const listData: TListData[] = !!results
    ? (results || ([] as OrganizationUser[])).map(
        (item: OrganizationUser, index: number) => ({
          user_id: item?.user?.id,
          user_description: item?.profile?.description || "Not available",
          user_email: item?.user?.email,
          user_role: item?.user?.role_and_permission?.role?.name,
        })
      )
    : [];

  // const specificUserData = !!results ? (results || ([] as OrganizationUser[])).map((item: OrganizationUser, index: number) => ({

  // })
  const generalDetailData = !!results
    ? (results || ([] as OrganizationUser[])).map(
        (item: OrganizationUser, index: number) => ({
          user_id: item?.user?.id,
          password: "",
          user_description: item?.profile?.description,
          is_active: item?.user?.is_active,
          use_two_factor: item?.profile?.two_factor_auth,
          use_geozone_labels: item?.profile?.user_geozone_labels,
          contact_name: item?.user?.name,
          contact_phone_number: item?.profile?.mobile,
          contact_email: item?.user?.email,
          timezone: item?.profile?.timezone,
          enable_sso_to_visatracks: item?.profile?.enable_sso_vistrack,
          default_overlay: item?.profile?.default_overlay,
          user_state: item?.profile?.user_state,
          session_timeout: item?.profile?.session_timeout,
          first_login_page: item?.profile?.first_login_page,
        })
      )
    : [];

  return (
    <>
      <HeaderView title={t("user_specific_view")} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            {t("create_user_description")}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2">
          <div className="lg:col-span-3 space-y-4">
            <div className="font-bold text-lg leading-6">{t("users")}</div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search user here"
                className="w-full p-2 pl-10 rounded-md border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              <img
                src={SearchIcon}
                alt="search-icon"
                className="absolute left-2 top-1/2 transform -translate-y-1/2"
              />
            </div>
            <div>
              {listData?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                    currentUserId === item.user_id ? "bg-blue-200" : ""
                  }`}
                  onClick={() => setCurrentUserId(item.user_id)}
                >
                  <div className="grid grid-cols-4">
                    <div className="col-span-3">
                      <p className="font-semibold text-sm leading-6 text-blue-900">
                        {item.user_id}
                      </p>
                      <p className="font-normal text-xs leading-6 text-gray-500">
                        {item.user_description}
                      </p>
                    </div>
                    <div className="col-span-1 font-bold text-xs leading-4 text-right">
                      {item.user_role}
                    </div>
                  </div>
                  <p className="font-normal text-base leading-6 text-gray-700">
                    {item.user_email}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-9 px-4">
            <div className="flex justify-end space-x-4">
              <button className="rounded-full px-6 py-2 border border-red-500">
                <p className="font-medium text-lg leading-6 text-red-500">
                  {tmain("delete")}
                </p>
              </button>
              <button className="rounded-full bg-blue-200 px-6 py-2">
                <p className="font-medium text-lg leading-6 text-blue-900">
                  {tmain("edit")}
                </p>
              </button>
            </div>
            <div className="rounded-lg mt-2 bg-blue-200">
              <Accordian title={t("general_details")}>
                <UserGeneralDetailForm user={""} onSubmit={() => {}} />
              </Accordian>
              <Accordian title={t("authorized_groups")}>
                <UserAuthorizedGroupsForm groups={""} onSubmit={() => {}} />
              </Accordian>
              <Accordian title={t("user_access_control")}>
                <UserAccessControlForm access={""} onSubmit={() => {}} />
              </Accordian>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenAdminDetailUser;
