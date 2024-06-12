import { Link, useNavigate } from "react-router-dom";
import LandingWrapper from "../../../components/landing/landing";
import { routeUrls } from "../../../navigation/routeUrls";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { formInitialValues, TFormFieldNames, YupValidationSchema } from "./validation";
import { LandingFormFieldInput, LandingFormFieldSubmit } from "../../../components/landing/formFields";
import { ResendCode } from "./resend-code";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setListingQueryParams, setUserData, TListingQueryParams, TPreLoginUserData } from "../../../api/store/commonSlice";
import { useResendEmailOtpMutation, useVerifyEmailOtpMutation } from "../../../api/network/authApiService";
import { useEffect } from "react";
import { VerifyEmailOtpResponseSuccess } from "../../../api/types/Onboarding";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { sessionStorageKeys, useSessionStorage } from "../../../utils/sessionStorageItems";
import { APP_CONFIG } from "../../../constants/constants";


const ScreenTwoFactorAuthentication = () => {
  const {t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'twoFactorAuthenticationScreen'});
  const navigate = useNavigate();
  const listingQueryParams: TListingQueryParams = useSelector((state: any) => state.commonReducer.listingQueryParams);
  const dispatch = useDispatch();
  const { setSessionStorageItem } = useSessionStorage();

  const preLoginUserData: TPreLoginUserData = useSelector((state: any) => state.commonReducer.preLoginUserData);
  useEffect(() => {
    if(!preLoginUserData?.email) {
      toast.error(t('toast.no_email'));
      navigate(routeUrls.loginPage);
    }
  }, [])

  const [resendEmailOtpApiTrigger, { isLoading: isLoadingResendEmailOtp }] = useResendEmailOtpMutation()
  const [verifyEmailOtpApiTrigger, { isLoading: isLoadingVerifyEmailOtp }] = useVerifyEmailOtpMutation()

  const handleResendCode = (successCallback: any, errorCallback: any) => {
    if(APP_CONFIG.TOASTS.INFO) toast.info(t('toast.resending_code'));
    resendEmailOtpApiTrigger({ email: preLoginUserData?.email || "" })
      .unwrap()
      .then(() => { successCallback?.(); })
      .catch(() => { errorCallback?.(); });
  }

  const resendSuccessCallback = (callback: any) => {
    toast.success(t('toast.code_sent'));
    callback?.();
  }

  const resendErrorCallback = (callback: any) => {
    toast.error(t('toast.code_send_failed'));
    callback?.();
  }

  return (
    <LandingWrapper>

    <Formik
      initialValues={formInitialValues}
      validationSchema={YupValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        if(APP_CONFIG.TOASTS.INFO) toast.info(t('toast.verifying_code'));
        verifyEmailOtpApiTrigger({
          email: preLoginUserData?.email || "",
          email_otp: values.verification_code
        })
          .unwrap()
          .then((data) => {
            if(!!(data as VerifyEmailOtpResponseSuccess)?.token) {
              dispatch(setUserData(data as VerifyEmailOtpResponseSuccess));
              setSessionStorageItem(sessionStorageKeys.user, (data as VerifyEmailOtpResponseSuccess)?.user);
              setSessionStorageItem(sessionStorageKeys.accessToken, (data as VerifyEmailOtpResponseSuccess).token);
              setSessionStorageItem(sessionStorageKeys.ownerOrganization, (data as VerifyEmailOtpResponseSuccess).owner_organization);
              dispatch(setListingQueryParams({
                ...listingQueryParams,
                users: { ...listingQueryParams.users, organization_id: (data as VerifyEmailOtpResponseSuccess).owner_organization.id },
                vehicles: { ...listingQueryParams.vehicles, organization_id: (data as VerifyEmailOtpResponseSuccess).owner_organization.id },
                drivers: { ...listingQueryParams.drivers, organization_id: (data as VerifyEmailOtpResponseSuccess).owner_organization.id },
                groups: { ...listingQueryParams.groups, organization_id: (data as VerifyEmailOtpResponseSuccess).owner_organization.id },
                fleetTags: { ...listingQueryParams.fleetTags, organization_id: (data as VerifyEmailOtpResponseSuccess).owner_organization.id },
                geoZones: { ...listingQueryParams.geoZones, organization_id: (data as VerifyEmailOtpResponseSuccess).owner_organization.id }
              }));
              toast.success(t('toast.code_verified'));
              navigate(routeUrls.dashboard);
            } else {
              toast.error(t('toast.code_verification_failed'), { autoClose: 10000 });
            }
          })
          .catch((error) => {
            const errors = !!error?.data ? serializeErrorKeyValues(error?.data?.message) : [t('loginScreen.toast.login_failed')];
            const error_message = errors.join(' ');
            toast.error(
              error_message.toLowerCase().indexOf('invalid') > -1
              ? t('toast.code_invalid')
              : errors?.join(' '),
              { autoClose: 10000 }
            );
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
            {t("sub_heading_1")}{" "}
            <span className="font-semibold text-gray-600">{preLoginUserData?.email || ""}</span>
            {t("sub_heading_2")}
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

          <LandingFormFieldSubmit
            label={t('submit_button')}
            variant="primary"
            disabled={!isFormValid || isSubmitting} />

          <ResendCode
            isLoading={isLoadingResendEmailOtp}
            onResendCode={handleResendCode}
            resendSuccessCallback={resendSuccessCallback}
            resendErrorCallback={resendErrorCallback} />
        </form>
        )}}
      </Formik>
    </LandingWrapper>
  )
}

export default ScreenTwoFactorAuthentication
