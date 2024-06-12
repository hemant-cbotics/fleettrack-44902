import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LandingWrapper from "../../../components/landing/landing";
import { routeUrls } from "../../../navigation/routeUrls";
import { useTranslation } from "react-i18next";
import { LandingFormFieldInput, LandingFormFieldSubmit } from "../../../components/landing/formFields";
import { Formik } from "formik";

import './login.scss';
import { formInitialValues, TFormFieldNames, YupValidationSchema } from "./validation";
import { useLoginMutation } from "../../../api/network/authApiService";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { LoginResponseSuccess } from "../../../api/types/Onboarding";
import { useDispatch } from "react-redux";
import { setPreLoginUserData } from "../../../api/store/commonSlice";
import { APP_CONFIG } from "../../../constants/constants";

interface ScreenLoginProps {
  showSessionExpiredMessage?: boolean;
}

const ScreenLogin: FC<ScreenLoginProps> = ({ showSessionExpiredMessage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginApiTrigger, { isLoading }] = useLoginMutation()

  useEffect(() => {
    if (showSessionExpiredMessage) {
      toast.error(t('loginScreen.toast.session_expired'));
    }
  }, [showSessionExpiredMessage]);

  return (
    <LandingWrapper>

      <Formik
        initialValues={formInitialValues}
        validationSchema={YupValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if(APP_CONFIG.TOASTS.INFO) toast.info(t('loginScreen.toast.logging_you_in'));
          loginApiTrigger({ email: values.email, password: values.password })
            .unwrap()
            .then((data) => {
              if((data as LoginResponseSuccess)?.status === 1) {
                dispatch(setPreLoginUserData({ email: values.email }));
                toast.success(t('loginScreen.toast.check_email_for_code'), { autoClose: 10000 });
                navigate(routeUrls.twoFactorAuthentication);
              } else {
                toast.error(t('toast.general_error'));
              }
            })
            .catch((error) => {
              const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('loginScreen.toast.login_failed')];
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

          <h2 className="col-span-6 text-3xl font-bold text-heading-black">{t("login")}</h2>

          <LandingFormFieldInput
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

          <LandingFormFieldInput
            label={t('password')}
            type="password"
            id="Password"
            name="password"
            placeholder={t('password_placeholder')}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            touched={touched.password}
            error={errors.password} />

          <div className="col-span-6">
            <p className="flex justify-end mt-4 text-sm sm:mt-0">
              <Link to={routeUrls.forgotPassword} className="font-display font-semibold text-accent-blue-bright">{t("forgot_your_password")}</Link>
            </p>
          </div>
          
          <LandingFormFieldSubmit
            label={t('login')}
            variant="primary"
            disabled={!isFormValid || isSubmitting || isLoading} />
        </form>
      )}}
      </Formik>
    </LandingWrapper>
  );
}
export default ScreenLogin;