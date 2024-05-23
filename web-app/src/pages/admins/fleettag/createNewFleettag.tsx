import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateOrganizationFleettagMutation } from "../../../api/network/adminApiServices";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import { AdminFormFieldInput, AdminFormFieldSubmit } from "../../../components/admin/formFields";
import { routeUrls } from "../../../navigation/routeUrls";
import { useLoggedInUserData } from "../../../utils/user";
import { formInitialValues, TFormFieldNames, YupValidationSchema } from "./validation";

const AdminsFleetTagsCreateNew = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.fleettags.create_new'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  
  const [createOrgFleettagAPITrigger] = useCreateOrganizationFleettagMutation();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showCreateFleetTag: false }));
  };

  if(modalsState.showCreateFleetTag === false) return null;

  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="fixed w-full h-screen bg-modal-overlay z-overlay" onClick={hideModal}></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[560px] z-modal">
          {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> */}
          <Formik
            initialValues={formInitialValues}
            validationSchema={YupValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              createOrgFleettagAPITrigger({
                organization: thisUserOrganizationId ?? 0,
                fleet_tag_name: values.name,
              })
                .unwrap()
                .then((data) => {
                  if(!!data?.created_at) {
                    dispatch(setModalsData({ ...modalsState, showCreateFleetTag: false }));
                    toast.success(t('create_success'), { autoClose: 10000 });
                    navigate(`${routeUrls.dashboardChildren.adminChildren.fleettags}/${data?.id}`, { state: { new: true } });
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
                  label={t('name')}
                  type="text"
                  id="Name"
                  name="name"
                  placeholder={t('name_placeholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  touched={touched.name}
                  error={errors.name} />
                
                <AdminFormFieldSubmit
                  label={t('submit_button')}
                  variant="primary"
                  disabled={!isFormValid || isSubmitting /* || isLoading*/}
                />
              
                <AdminFormFieldSubmit
                  label={tMain('cancel')}
                  type="button"
                  variant="danger-transparent"
                  disabled={isSubmitting /* || isLoading*/}
                  onClick={hideModal}
                />
              </form>
            )}}
          </Formik>
        </div>
      </div>
    </>
  )
};
export default AdminsFleetTagsCreateNew;