import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LandingWrapper from "../../../components/landing/landing";
import { routeUrls, routeVariables } from "../../../navigation/routeUrls";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import { formInitialValues, TFormFieldNames, YupValidationSchema } from "./validation";
import { LandingFormFieldInput, LandingFormFieldSubmit } from "../../../components/landing/formFields";
import { useLazyOrganizationShowInviteUserQuery, useOnboardInvitedUserMutation } from "../../../api/network/authApiService";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { toast } from "react-toastify";

const ScreenAccountSetup = () => {
  const {t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'accountSetupScreen'});
  const navigate = useNavigate();
  const routeParams = useParams();
  const invitationToken = routeParams?.[routeVariables.invitationToken];

  const [
    organizationShowInviteUserAPITrigger,
    {
      data: dataOrganizationShowInviteUser,
      isLoading: isLoadingOrganizationShowInviteUser,
      isError: isErrorOrganizationShowInviteUser,
    }
  ] = useLazyOrganizationShowInviteUserQuery();

  useEffect(() => {
    if(invitationToken) {
      organizationShowInviteUserAPITrigger({ invitation_token: invitationToken })
    }
  }, [])

  const [onboardInvitedUserAPITrigger] = useOnboardInvitedUserMutation();

  return (
    <LandingWrapper>

      <Formik
        initialValues={formInitialValues}
        validationSchema={YupValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          onboardInvitedUserAPITrigger({
            id: `${invitationToken}`,
            password: values.new_password,
            confirm_password: values.confirm_new_password,
          })
            .unwrap()
            .then((data) => {
              console.log('>>> onboardInvitedUserAPITrigger data:', data);
              if(!!data?.message) {
                toast.success(t('toast.onboarded'), { autoClose: 15000 });
                navigate(routeUrls.landingPage);
              } else {
                toast.error(tMain('toast.general_error'));
              }
            })
            .catch((error) => {
              const errors = !!error?.data?.message ? serializeErrorKeyValues(error?.data?.message) : [t('toast.onboarding_failed')];
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
              label={t('name')}
              type="text"
              id="Name"
              name="name"
              value={dataOrganizationShowInviteUser?.username || '-'}
              readonly={true} />

            <LandingFormFieldInput
              label={t('email')}
              type="email"
              id="Email"
              name="email"
              value={dataOrganizationShowInviteUser?.email || '-'}
              readonly={true} />

            <LandingFormFieldInput
              label={t('organization_name')}
              type="text"
              id="OrganizationName"
              name="organization_name"
              value={`${dataOrganizationShowInviteUser?.role?.organization_data?.name || '-'}`}
              readonly={true} />

            <LandingFormFieldInput
              label={t('role')}
              type="text"
              id="Role"
              name="role"
              value={`${dataOrganizationShowInviteUser?.role?.name}`}
              readonly={true} />

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
export default ScreenAccountSetup;