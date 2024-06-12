/**
 * -----------------------------------------------------------------------------
 * User Detail Page
 * -----------------------------------------------------------------------------
 * This page is used to show the details of a single user of the organization.
 */

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
  TFormFieldNames,
  userDetailsInitialValues,
  userDetailsYupValidationSchema,
} from "./validation";
import { routeUrls } from "../../../navigation/routeUrls";
import { useLoggedInUserData } from "../../../utils/user";
import { useDebouncedCallback } from "use-debounce";
import AppSearchBox from "../../../components/searchBox";
import { AdminFormFieldSubmit, TSelectboxOption } from "../../../components/admin/formFields";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { TListingQueryParams, TModalsState, setListingQueryParams, setModalsData } from "../../../api/store/commonSlice";
import DeleteConfirmation from "../../../components/admin/deleteConfirmation";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import AdminListingColumnItem from "../../../components/adminListingColumnItem";
import Pagination, { TPaginationSelected } from "../../admins/components/pagination";

const ScreenAdminDetailUser = () => {
  const { userId } = useParams<{ userId: any }>();
  const { state: locationState } = useLocation(); // OrganizationEntityListingPayload | { new: true }
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.users" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.users.detailsPage" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const listingQueryParams: TListingQueryParams = useSelector((state: any) => state.commonReducer.listingQueryParams);
  const { users: orgUsersQueryParams } = listingQueryParams;
  
  // flag to idenfiy if user is coming from create new user popup
  const isNewEntity = React.useRef<boolean>(!!locationState?.new);

  // flag to enable edit mode
  const [userCanEdit, setUserCanEdit] = useState<boolean>(!!isNewEntity?.current);
  
  // prepare query params for fetching organization users
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    dispatch(setListingQueryParams({ ...listingQueryParams, users: { ...orgUsersQueryParams, page: 1, search: value }}));
  }, 500);

  // fetch organization users
  const {
    data: dataOrgUsers,
    isFetching: isFetchingOrgUsers,
    error
  } = useOrganizationUsersQuery(orgUsersQueryParams);

  // fetch single user details
  const {
    data: dataSingleUser,
    isFetching: isFetchingSingleUser,
    error: errorSingleUser,
  } = useSingleOrganizationUserQuery({ user_id: parseInt(userId) },{ skip: !userId });

  // user mutations
  const [ editOrganizationUserApiTrigger, { isLoading: isLoadingEditUser }] = useEditOrganizationUserMutation();
  const [ deleteSingleUserApiTrigger, { isLoading: isLoadingDeleteUser }] = useDeleteSingleUserMutation();
  const { results, count } = dataOrgUsers || {};

  // formik
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

      // prepare payload
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

      // call api for updating user
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

  // pre-fill formik values
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
      setUserCanEdit(!!isNewEntity?.current);
      setTimeout(() => { setFormikValuesReady(true); }, 200); // simulate render delay for select pre-selected values
    }
  }, [dataSingleUser, userId]);

  // prepare list data for user list
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

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, dirty } = formik;

  const invalidFields =
    Object.keys(errors)
      .filter(key => !!errors[key as TFormFieldNames]);
  const isFormValid = invalidFields.length === 0 && dirty;

  // handle edit user
  const handleEditUser = () => {
    if(userCanEdit) {
      formik.handleSubmit();
    }
  }

  // handle delete user
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
              value={orgUsersQueryParams.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
              onClear={() => {
                debouncedSetSearchKeyword("")
              }}
            />
            <div className="max-h-[calc(100vh-150px)] overflow-y-auto">
              {listData?.map((item: any, index: number) => (
                <AdminListingColumnItem
                  key={index}
                  selected={parseInt(userId) === item.user_id}
                  onClick={() =>
                    navigate(
                      `${routeUrls.dashboardChildren.adminChildren.users}/${item.user_id}`
                    )
                  }
                  title={item.user_name}
                  description={item.user_description}
                  asideText={item.user_role}
                  bottomText={item.user_email}
                />
              ))}
            </div>
            {!isFetchingOrgUsers && (
            <Pagination
              pageSize={orgUsersQueryParams.page_size}
              handlePageSizeChange={(e: TSelectboxOption | null) => {
                  dispatch(setListingQueryParams({ ...listingQueryParams, users: { ...orgUsersQueryParams, page: 1, page_size: parseInt(`${e?.value}`) }}));
                }}
              totalPages={count ? Math.ceil(count / orgUsersQueryParams.page_size) : 1}
              forcePage={orgUsersQueryParams.page - 1}
              handlePageClick={(data: TPaginationSelected) => {
                dispatch(setListingQueryParams({ ...listingQueryParams, users: { ...orgUsersQueryParams, page: data?.selected + 1 }}));
              }}
              onlyPageChange={true}
              size={1}
            />
          )}
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
                      disabled={isLoadingEditUser || !!Object.keys(errors).length}
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
                      disabled={isLoadingEditUser || (userCanEdit && !!Object.keys(errors).length)}
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
