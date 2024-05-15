import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useCreateOrganizationVehicleMutation } from "../../../api/network/adminApiServices";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import { AdminFormFieldInput, AdminFormFieldSubmit } from "../../../components/admin/formFields";
import { useLoggedInUserData } from "../../../utils/user";
import { formInitialValues, TFormFieldNames, YupValidationSchema } from "./validation";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";

const AdminsVehiclesCreateNew = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.vehicles.create_new'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  
  const [createOrgVehicleAPITrigger] = useCreateOrganizationVehicleMutation();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showCreateVehicle: false }));
  };

  if(modalsState.showCreateVehicle === false) return null;

  return (
    <>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute w-full h-screen z-[9980]" onClick={hideModal}></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[560px] z-[9990]">
          {/* <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none"> */}
          <Formik
            initialValues={formInitialValues}
            validationSchema={YupValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // if(APP_CONFIG.TOASTS.INFO) toast.info(t('loginScreen.toast.logging_you_in'));
              createOrgVehicleAPITrigger({
                organization: thisUserOrganizationId ?? 0,
                vehicle_make: values.make,
                vehicle_model: values.model,
                vin: values.vin,
                licence_plate: values.license_plate,
              })
                .unwrap()
                .then((data) => {
                  if(!!data?.id && !!data?.organization) {
                    dispatch(setModalsData({ ...modalsState, showCreateVehicle: false }));
                    toast.success(t('create_success'), { autoClose: 10000 });
                    navigate(`${routeUrls.dashboardChildren.adminChildren.vehicles}/${data?.id}`, { state: { new: true } });
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
                  label={t('make')}
                  type="text"
                  id="Make"
                  name="make"
                  placeholder={t('make_placeholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.make}
                  touched={touched.make}
                  error={errors.make} />

                <AdminFormFieldInput
                  label={t('model')}
                  type="text"
                  id="Model"
                  name="model"
                  placeholder={t('model_placeholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.model}
                  touched={touched.model}
                  error={errors.model} />

                <AdminFormFieldInput
                  label={t('vin')}
                  type="text"
                  id="Vin"
                  name="vin"
                  placeholder={t('vin_placeholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.vin}
                  touched={touched.vin}
                  error={errors.vin} />

                <AdminFormFieldInput
                  label={t('license_plate')}
                  type="text"
                  id="LicensePlate"
                  name="license_plate"
                  placeholder={t('license_plate_placeholder')}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.license_plate}
                  touched={touched.license_plate}
                  error={errors.license_plate} />
                
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
export default AdminsVehiclesCreateNew;