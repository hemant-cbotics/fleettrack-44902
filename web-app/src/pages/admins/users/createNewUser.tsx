/**
 * -----------------------------------------------------------------------------
 * Popup - Create New User
 * -----------------------------------------------------------------------------
 * This popup is used for creating a new user in the organization.
 */

import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateOrganizationUserMutation, useOrganizationRolesPermissionsQuery } from "../../../api/network/adminApiServices";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import { TUserRole } from "../../../api/types/UserRole";
import { AdminFormFieldDropdown, AdminFormFieldInput, AdminFormFieldSubmit } from "../../../components/admin/formFields";
import { routeUrls } from "../../../navigation/routeUrls";
import { formInitialValues, TFormFieldNames, YupValidationSchema } from "./validation";

const AdminsUsersCreateNew = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.users.create_new'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetching roles and permissions
  const {
    data: dataOrgRolesPermissions,
    isFetching: isFetchingOrgRolesPermissions,
  } = useOrganizationRolesPermissionsQuery();
  
  // user mutation
  const [createOrgUserAPITrigger] = useCreateOrganizationUserMutation();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showCreateUser: false }));
  };

  if(modalsState.showCreateUser === false) return null;

  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-overlay outline-none focus:outline-none">
        <div className="fixed w-full h-screen bg-modal-overlay z-overlay" onClick={hideModal}></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[560px] z-modal">
          {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> */}
          <Formik
            initialValues={formInitialValues}
            validationSchema={YupValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // if(APP_CONFIG.TOASTS.INFO) toast.info(t('loginScreen.toast.logging_you_in'));
              createOrgUserAPITrigger({
                username: values.username,
                email: values.email,
                role: parseInt(values.acl_role),
              })
                .unwrap()
                .then((data) => {
                  if(!!data?.created_at) {
                    dispatch(setModalsData({ ...modalsState, showCreateUser: false }));
                    toast.success(t('create_success'), { autoClose: 10000 });
                    navigate(`${routeUrls.dashboardChildren.adminChildren.users}/${data?.user}`, { state: { new: true } });
                  } else {
                    toast.error(tMain('toast.general_error'));
                  }
                })
                .catch((error) => {
                  const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('create_failed')];
                  toast.error(errors?.join(' '));
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >{({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            dirty,
            setFieldValue,
          }) => {
            const invalidFields =
              Object.keys(errors)
                .filter(key => !!errors[key as TFormFieldNames]);
            const isFormValid = invalidFields.length === 0 && dirty;

            return (
              <form className="p-8 bg-white grid grid-cols-6 gap-6 rounded-3xl shadow-2xl" onSubmit={handleSubmit}>

                <h2 className="col-span-6 text-3xl font-bold text-heading-black">
                  {t("heading")}
                </h2>

                <p className="col-span-6 mt-0 leading-relaxed text-gray-500">
                  {t("sub_heading")}
                </p>

                <AdminFormFieldInput
                  label={t('user_name')}
                  type="text"
                  id="UserName"
                  name="username"
                  placeholder={t('user_name_placeholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  touched={touched.username}
                  error={errors.username} />

                <AdminFormFieldInput
                  label={t('email_address')}
                  type="email"
                  id="Email"
                  name="email"
                  placeholder={t('email_address_placeholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  touched={touched.email}
                  error={errors.email} />

                <AdminFormFieldDropdown
                  label={t('acl_role')}
                  id="ALCRole"
                  name="alc_role"
                  placeholder={t('acl_role_placeholder')}
                  onChange={e => {
                    setFieldValue('acl_role', `${e?.value}`)
                  }}
                  onBlur={handleBlur}
                  value={values.acl_role}
                  options={dataOrgRolesPermissions?.results?.map((item: TUserRole) => {
                    return { value: `${item.id}`, label: item.name }
                  }) || []}
                  touched={touched.acl_role}
                  error={errors.acl_role} />
                
                <AdminFormFieldSubmit
                  label={t('submit_button')}
                  variant="primary"
                  disabled={!isFormValid || isSubmitting || isFetchingOrgRolesPermissions /* || isLoading*/}
                />
              
                <AdminFormFieldSubmit
                  label={tMain('cancel')}
                  type="button"
                  variant="danger-transparent"
                  disabled={isSubmitting || isFetchingOrgRolesPermissions /* || isLoading*/}
                  onClick={hideModal}
                />

                <p className="col-span-6 mt-0 text-center text-sm leading-relaxed text-field-info-text">
                  {t("bottom_text_1")}{" "}
                  <Link to={routeUrls.dashboardChildren.adminChildren.roles} className="text-accent-blue-bright font-bold hover:underline">{t("bottom_text_click_here")}</Link>{" "}
                  {t("bottom_text_2")}
                </p>
              </form>
            )}}
          </Formik>
        </div>
      </div>
    </>
  )
};
export default AdminsUsersCreateNew;