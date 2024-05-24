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
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import DeleteConfirmation from "../../../components/admin/deleteConfirmation";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";

const ScreenAdminDetailUser = () => {
  const { userId } = useParams<{ userId: any }>();
  const { state: locationState } = useLocation(); // OrganizationEntityListingPayload | { new: true }
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.users" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.users.detailsPage" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);

  const isNewEntity = React.useRef<boolean>(!!locationState?.new); // TODO: remove true
  const [userCanEdit, setUserCanEdit] = useState<boolean>(!!isNewEntity?.current);
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgUsersQueryParams, setOrgUsersQueryParams] = React.useState<OrganizationEntityListingPayload>(
    (!!(locationState as OrganizationEntityListingPayload)?.organization_id
      ? locationState
      : {
        organization_id: thisUserOrganizationId,
        page: 1,
        page_size: 10,
        search: "",
      }) as OrganizationEntityListingPayload);
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgUsersQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  const {
    data: dataOrgUsers,
    isFetching: isFetchingOrgUsers,
    error
  } = useOrganizationUsersQuery(orgUsersQueryParams);

  const {
    data: dataSingleUser,
    isFetching: isFetchingSingleUser,
    error: errorSingleUser,
  } = useSingleOrganizationUserQuery({ user_id: parseInt(userId) },{ skip: !userId });

  const [ editOrganizationUserApiTrigger, { isLoading: isLoadingEditUser }] = useEditOrganizationUserMutation();
  const [ deleteSingleUserApiTrigger, { isLoading: isLoadingDeleteUser }] = useDeleteSingleUserMutation();
  const { results } = dataOrgUsers || {};

  const [formikValuesReady, setFormikValuesReady] = useState<boolean>(false);
  useEffect(() => {
    if(isFetchingSingleUser) {
      setFormikValuesReady(false);
    }
  }, [isFetchingSingleUser]);
  const formik = useFormik({
    initialValues: userDetailsInitialValues,
    validationSchema: userDetailsYupValidationSchema,
    onSubmit: (values) => {
      const data: TEditOrganizationUserPayloadData = {
        user: {
          id: values.user_id,
          name: values.contact_name,
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
          group_ids: values.authorized_groups?.map((item: any) => item.id) || [],
        },
        role_and_permission: {
          id: dataSingleUser?.role_and_permission?.id || 0,
          role: dataSingleUser?.role_and_permission?.role?.id || 0,
        }
      }
      editOrganizationUserApiTrigger({data})
        .unwrap()
        .then(() => {
          toast.success(t("toast.user_updated"));
          navigate(routeUrls.dashboardChildren.adminChildren.users);
        })
        .catch((error) => {
          const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.updation_failed')];
          toast.error(errors?.join(' '));
        });
    },
  });

  useEffect(() => {
    if (dataSingleUser) {
      setFormikValuesReady(false); // simulate render delay for select pre-selected values
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
        authorized_groups: dataSingleUser?.profile?.groups || [{}],
        default_acl_role: "",
        maximum_access_level: "",
      });
      setTimeout(() => { setFormikValuesReady(true); }, 200); // simulate render delay for select pre-selected values
    }
  }, [dataSingleUser, userId]);

  const listData: TListData[] = !!results
    ? (results || ([] as OrganizationUser[])).map(
        (item: OrganizationUser, index: number) => ({
          user_id: item?.user?.id,
          user_name: item?.user?.name || "-",
          user_description: item?.user?.profile?.description || "-",
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
    deleteSingleUserApiTrigger({user_id: parseInt(userId)})
    .unwrap()
    .then(() => {
      toast.success(t("toast.user_deleted"));
      navigate(routeUrls.dashboardChildren.adminChildren.users);
    })
    .catch((error) => {
      const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('toast.deletion_failed')];
      toast.error(errors?.join(' '));
    });
  }
  return (
    <>
      <HeaderView title={t("heading")} showBackButton={true} backButtonCallback={() => navigate(routeUrls.dashboardChildren.adminChildren.users)} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            {t("sub_heading")}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
          <div className={`hidden xl:block lg:col-span-3 space-y-4${isFetchingOrgUsers ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' xl:hidden' : ''}`}>
            <div className="font-bold text-lg leading-6 mt-2 mb-3">{t("listing_heading")}</div>
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
                        {item.user_name}
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
          <div className={`${isNewEntity?.current ? 'lg:col-span-12' : 'col-span-12 xl:col-span-9'}`}>
            <div className="flex items-center gap-4">
              {isNewEntity?.current ? (
                <>
                  <p className="font-semibold text-blue-900 text-base leading-6">
                    {tMain('admins.completeCreation')}
                  </p>
                  <div className="flex-grow"></div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="submit"
                      variant="success"
                      label={tMain("save")}
                      onClick={handleEditUser}
                      disabled={isLoadingEditUser}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-grow"></div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="danger"
                      label={tMain("delete")}
                      onClick={() => {dispatch(setModalsData({ ...modalsState, showDeleteConfirmation: true }))}}
                      disabled={isLoadingEditUser}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={userCanEdit ? tMain("update") : tMain("edit")}
                      onClick={userCanEdit ? handleEditUser : () => setUserCanEdit(!userCanEdit)}
                      disabled={isLoadingEditUser}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={`rounded-lg mt-2 bg-blue-200 transition ${isFetchingSingleUser || isLoadingEditUser || isLoadingDeleteUser ? 'opacity-40' : ''}`}>
              <form onSubmit={handleSubmit}>
                <Accordian title={t("accord_general_details")} openByDefault={true}>
                  <UserGeneralDetailForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    formikSetValue={formik.setFieldValue}
                    handleBlur={handleBlur}
                    formikSetTouched={formik.setFieldTouched}
                    userCanEdit={userCanEdit}
                    loadingData={isFetchingSingleUser || !formikValuesReady}
                  />
                </Accordian>
                <Accordian title={t("accord_authorized_groups")}>
                  <UserAuthorizedGroupsForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    formikSetValue={formik.setFieldValue}
                    handleBlur={handleBlur}
                    formikSetTouched={formik.setFieldTouched}
                    userCanEdit={userCanEdit}
                    loadingData={isFetchingSingleUser || !formikValuesReady}
                  />
                </Accordian>
                <Accordian title={t("accord_user_access_control")}>
                  <UserAccessControlForm
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    formikSetValue={formik.setFieldValue}
                    handleBlur={handleBlur}
                    formikSetTouched={formik.setFieldTouched}
                    userCanEdit={userCanEdit}
                    loadingData={isFetchingSingleUser || !formikValuesReady}
                  />
                </Accordian>
              </form>
            </div>
          </div>
        </div>
      </div>
      <DeleteConfirmation handleDeleteAdmin={handleDeleteUser} />
    </>
  );
};

export default ScreenAdminDetailUser;
