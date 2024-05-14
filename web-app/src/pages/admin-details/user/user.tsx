import React from "react";
import HeaderView from "../../../components/admin/headerView";
import Accordian from "../../../components/accordian";
import {
  UserAccessControlForm,
  UserAuthorizedGroupsForm,
  UserGeneralDetailForm,
} from "./user-form";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import {
  useDeleteSingleUserMutation,
  useEditOrganizationUserMutation,
  useOrganizationUsersQuery,
  useSingleOrganizationUserQuery,
} from "../../../api/network/adminApiServices";
import { OrganizationEntityListingPayload, OrganizationUser, TEditOrganizationUserPayloadData } from "../../../api/types/Admin";
import { TListData } from "./type";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import {
  userDetailsInitialValues,
  userDetailsYupValidationSchema,
} from "./validation";
import { routeUrls } from "../../../navigation/routeUrls";
import { useLoggedInUserData } from "../../../utils/user";
import { useDebouncedCallback } from "use-debounce";
import AppSearchBox from "../../../components/searchBox";

const ScreenAdminDetailUser = () => {
  const [userCanEdit, setUserCanEdit] = useState<boolean>(false);
  const { userId } = useParams<{ userId: any }>();
  const { state: locationState } = useLocation();
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.users" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.users.detailsPage" });
  const navigate = useNavigate();

  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgUsersQueryParams, setOrgUsersQueryParams] = React.useState<OrganizationEntityListingPayload>(
    (locationState as OrganizationEntityListingPayload)
    ?? {
      organization_id: thisUserOrganizationId,
      page: 1,
      page_size: 10,
      search: "",
    });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgUsersQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  const { data: dataOrgUsers, isLoading, error } = useOrganizationUsersQuery(orgUsersQueryParams);

  const {
    data: dataSingleUser,
    isLoading: isLoadingSingleUser,
    error: errorSingleUser,
  } = useSingleOrganizationUserQuery({ user_id: parseInt(userId) },{ skip: !userId });

  const [ editOrganizationUserApiTrigger , {isLoading : isLoadingEditUser } ] = useEditOrganizationUserMutation();
  const [ deleteSingleUserApiTrigger, {isLoading: isLoadingDeleteUser}] = useDeleteSingleUserMutation();
  const { results } = dataOrgUsers || {};

  const formik = useFormik({
    initialValues: userDetailsInitialValues,
    validationSchema: userDetailsYupValidationSchema,
    onSubmit: (values) => {
      const data: TEditOrganizationUserPayloadData = {
        user: {
          id: values.user_id,
          is_active: values.is_active,
        },
        profile: {
          id: dataSingleUser?.profile?.id || 0,
          description: values.user_description,
          two_factor_auth: values.use_two_factor,
          user_geozone_labels: values.use_geozone_labels,
          mobile: values.contact_phone_number,
          timezone: values.timezone,
          enable_sso_vistrack: values.enable_sso_to_visatracks,
          default_overlay: values.default_overlay,
          user_state: values.user_state,
          session_timeout: values.session_timeout,
          first_login_page: values.first_login_page,
        },
        role_and_permission: {
          id: dataSingleUser?.role_and_permission?.id || 0,
          role: dataSingleUser?.role_and_permission?.role?.id || 0,
        }
      }
      editOrganizationUserApiTrigger({data})
    },
  });

  useEffect(() => {
    if (dataSingleUser) {
      formik.setValues({
        user_id: dataSingleUser?.id,
        password: "",
        user_description: dataSingleUser?.profile?.description || "",
        is_active: dataSingleUser?.is_active || false,
        use_two_factor: dataSingleUser?.profile?.two_factor_auth || false,
        use_geozone_labels: dataSingleUser?.profile?.user_geozone_labels || false,
        contact_name: dataSingleUser?.name || "",
        contact_phone_number: dataSingleUser?.profile?.mobile || "",
        contact_email: dataSingleUser?.email || "",
        timezone: dataSingleUser?.profile?.timezone || "",
        enable_sso_to_visatracks: dataSingleUser?.profile?.enable_sso_vistrack || false,
        default_overlay: dataSingleUser?.profile?.default_overlay || "",
        user_state: dataSingleUser?.profile?.user_state || "",
        session_timeout: dataSingleUser?.profile?.session_timeout || 0,
        first_login_page: dataSingleUser?.profile?.first_login_page || "",
        authorized_group_1: "",
        authorized_group_2: "",
        default_acl_role: "",
        maximum_access_level: "",
      });
    }
  }, [dataSingleUser, userId]);

  const listData: TListData[] = !!results
    ? (results || ([] as OrganizationUser[])).map(
        (item: OrganizationUser, index: number) => ({
          user_id: item?.user?.id,
          user_description: item?.user?.profile?.description || "Not available",
          user_email: item?.user?.email,
          user_role: item?.user?.role_and_permission?.role?.name,
        })
      )
    : [];

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } = formik;

  const handleEditUser = () => {
    if(userCanEdit) {
      formik.handleSubmit();
    }
  }

  const handleDeleteUser = () => {
    deleteSingleUserApiTrigger({user_id: parseInt(userId)});
  }
  return (
    <>
      <HeaderView title={t("heading")} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            {t("sub_heading")}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2">
          <div className="lg:col-span-3 space-y-4">
            <div className="font-bold text-lg leading-6">{t("listing_heading")}</div>
            <AppSearchBox
              placeholder={tAdmin('search_placeholder')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
            />
            <div>
              {listData?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                    parseInt(userId) === item.user_id ? "bg-blue-200" : ""
                  }`}
                  onClick={() => navigate(`${routeUrls.dashboardChildren.adminChildren.users}/${item.user_id}`)}
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
                <p className="font-medium text-lg leading-6 text-red-500" onClick={handleDeleteUser}>
                  {tMain("delete")}
                </p>
              </button>
              <button className="rounded-full bg-blue-200 px-6 py-2" onClick={() => setUserCanEdit(!userCanEdit)}>
                <p className="font-medium text-lg leading-6 text-blue-900" onClick={handleEditUser}>
                  {userCanEdit ? tMain("update") : tMain("edit")}
                </p>
              </button>
            </div>
            <div className="rounded-lg mt-2 bg-blue-200">
              <form onSubmit={handleSubmit}>
                <Accordian title={t("accord_general_details")}>
                  <UserGeneralDetailForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    userCanEdit={userCanEdit}
                  />
                </Accordian>
                <Accordian title={t("accord_authorized_groups")}>
                  <UserAuthorizedGroupsForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    userCanEdit={userCanEdit}
                  />
                </Accordian>
                <Accordian title={t("accord_user_access_control")}>
                  <UserAccessControlForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    userCanEdit={userCanEdit}
                  />
                </Accordian>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenAdminDetailUser;
