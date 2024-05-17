import { useFormik } from "formik";
import Accordian from "../../../components/accordian";
import HeaderView from "../../../components/admin/headerView";
import { APP_CONFIG } from "../../../constants/constants";
import {
  AccountGeneralDetailForm,
  AccountMaintenanceIntervalLabelForm,
  AccountScorecardWeightFactorsForm,
} from "./account-form";
import {
  accountDetailsInitialValues,
  accountDetailsYupValidationSchema,
} from "./validation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";

const ScreenAdminDetailAccount = () => {
  const [userCanEdit, setUserCanEdit] = useState(false);
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "dashboard.profile.account",
  });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: accountDetailsInitialValues,
    validationSchema: accountDetailsYupValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleEditInformation = () => {
    setUserCanEdit(!userCanEdit);
  };

  const isLoadingEditAccount = false;

  return (
    <>
      <HeaderView
        title={t("heading")}
        showBackButton={true}
        backButtonCallback={() => navigate(routeUrls.dashboard)}
      />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center font-semibold text-blue-900 text-lg leading-6">
          {t("sub_heading")}
        </div>
        <div className="px-4">
          <div className="flex items-center gap-4">
            <div className="flex-grow"></div>
            <div className="w-24">
              <AdminFormFieldSubmit
                type="button"
                variant="primary"
                label={userCanEdit ? tMain("update") : tMain("edit")}
                onClick={
                  userCanEdit
                    ? handleEditInformation
                    : () => setUserCanEdit(!userCanEdit)
                }
                disabled={isLoadingEditAccount}
              />
            </div>
          </div>
          <div className="rounded-lg mt-2 bg-blue-200">
            <form onSubmit={handleSubmit}>
              <Accordian
                title={t("accord_general_details")}
                openByDefault={true}
              >
                <AccountGeneralDetailForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                />
              </Accordian>
              <Accordian title={t("accord_maintenance_interval_labels")}>
                <AccountMaintenanceIntervalLabelForm
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                />
              </Accordian>
              <Accordian title={t("accord_scorecard_weight_factors")}>
                <AccountScorecardWeightFactorsForm 
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  formikSetValue={formik.setFieldValue}
                  handleBlur={handleBlur}
                  formikSetTouched={formik.setFieldTouched}
                  userCanEdit={userCanEdit}
                />
              </Accordian>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenAdminDetailAccount;
