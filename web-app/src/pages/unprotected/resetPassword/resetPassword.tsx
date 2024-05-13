import React from "react";
import { useNavigate } from "react-router-dom";
import LandingWrapper from "../../../components/landing/landing";
import { routeUrls } from "../../../navigation/routeUrls";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { formInitialValues, TFormFieldNames, YupValidationSchema } from "./validation";
import { LandingFormFieldInput, LandingFormFieldSubmit } from "../../../components/landing/formFields";
import { useForgotPasswordVerifyOtpMutation } from "../../../api/network/authApiService";
import { TPreLoginUserData } from "../../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { ForgotPasswordVerifyOtpResponseSuccess } from "../../../api/types/Onboarding";
import { toast } from "react-toastify";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";

const ScreenResetPassword = () => {
  const {t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'resetPasswordScreen'});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const preLoginUserData: TPreLoginUserData = useSelector((state: any) => state.commonReducer.preLoginUserData);

  const [forgotPasswordVerifyOtpApiTrigger, { isLoading }] = useForgotPasswordVerifyOtpMutation()

  return (
    <LandingWrapper>

    <Formik
      initialValues={formInitialValues}
      validationSchema={YupValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        forgotPasswordVerifyOtpApiTrigger({
          email: `${preLoginUserData?.email}`,
          otp: values.verification_code,
          new_password: values.new_password,
          confirm_new_password: values.confirm_new_password
        })
          .unwrap()
          .then((data) => {
            if((data as ForgotPasswordVerifyOtpResponseSuccess)?.message) {
              toast.success(t('toast.code_verified'), { autoClose: 15000 });
              navigate(routeUrls.landingPage);
            } else {
              toast.error(tMain('toast.general_error'));
            }
          })
          .catch((error) => {
            const errors = !!error?.data?.message ? serializeErrorKeyValues(error?.data?.message) : [t('toast.code_verification_failed')];
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
            {t("sub_heading_1")}
          </p>

          <LandingFormFieldInput
            label={t('verification_code')}
            type="text"
            id="VerificationCode"
            name="verification_code"
            placeholder={t('verification_code_placeholder')}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.verification_code}
            touched={touched.verification_code}
            error={errors.verification_code}
            customInputClass="tracking-widest placeholder-tracking-normal" />

          <p className="col-span-6 mt-0 leading-relaxed text-gray-500">
            {t("sub_heading_2")}
          </p>

          <LandingFormFieldInput
            label={t('new_password')}
            type="password"
            id="NewPassword"
            name="new_password"
            placeholder={t('new_password_placeholder')}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.new_password}
            touched={touched.new_password}
            error={errors.new_password} />

          <LandingFormFieldInput
            label={t('confirm_new_password')}
            type="password"
            id="ConfirmNewPassword"
            name="confirm_new_password"
            placeholder={t('confirm_new_password_placeholder')}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirm_new_password}
            touched={touched.confirm_new_password}
            error={errors.confirm_new_password} />
          
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
export default ScreenResetPassword;