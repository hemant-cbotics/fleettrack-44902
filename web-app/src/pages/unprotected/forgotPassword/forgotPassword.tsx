import React from "react";
import { useNavigate } from "react-router-dom";
import LandingWrapper from "../../../components/landing/landing";
import { routeUrls } from "../../../navigation/routeUrls";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { formInitialValues, TFormFieldNames, YupValidationSchema } from "./validation";
import { LandingFormFieldInput, LandingFormFieldSubmit } from "../../../components/landing/formFields";
import { useForgotPasswordMutation } from "../../../api/network/authApiService";
import { APP_CONFIG } from "../../../constants/constants";
import { toast } from "react-toastify";
import { ForgotPasswordResponseSuccess } from "../../../api/types/Onboarding";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { useDispatch } from "react-redux";
import { setPreLoginUserData } from "../../../api/store/commonSlice";

const ScreenForgotPassword = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'forgotPasswordScreen' });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [forgotPasswordApiTrigger, { isLoading }] = useForgotPasswordMutation()

  return (
    <LandingWrapper>

      <Formik
        initialValues={formInitialValues}
        validationSchema={YupValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if(APP_CONFIG.TOASTS.INFO) toast.info(t('toast.sending_reset_code'));
          forgotPasswordApiTrigger({ email: values.email })
            .unwrap()
            .then((data) => {
              if((data as ForgotPasswordResponseSuccess)?.message) {
                dispatch(setPreLoginUserData({ email: values.email }));
                toast.success(t('toast.reset_code_sent'), { autoClose: 15000 });
                navigate(routeUrls.resetPassword);
              } else {
                toast.error(tMain('toast.general_error'));
              }
            })
            .catch((error) => {
              const errors = !!error?.data?.message ? serializeErrorKeyValues(error?.data?.message) : [t('toast.reset_code_failed')];
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

          <LandingFormFieldInput
            label={tMain('email_address')}
            type="email"
            id="Email"
            name="email"
            placeholder={tMain('email_address_placeholder')}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            touched={touched.email}
            error={errors.email} />
          
          <LandingFormFieldSubmit
            label={t('submit_button')}
            variant="primary"
            disabled={!isFormValid || isSubmitting} />
      
          <LandingFormFieldSubmit
            label={tMain('cancel')}
            type="button"
            variant="secondary"
            disabled={isSubmitting}
            onClick={() => navigate(routeUrls.loginPage)} />
            
        </form>
      )}}
      </Formik>
    </LandingWrapper>
  );
}
export default ScreenForgotPassword;