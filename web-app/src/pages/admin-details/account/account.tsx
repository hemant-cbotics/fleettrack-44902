import { useFormik } from "formik";
import Accordian from "../../../components/accordian";
import HeaderView from "../../../components/admin/headerView";
import { APP_CONFIG } from "../../../constants/constants";
import { AccountGeneralDetailForm } from "./account-form";
import {
  accountGeneralDetailsInitialValues,
  accountGeneralDetailsYupValidationSchema,
} from "./validation";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";

const ScreenAdminDetailAccount = () => {
  const [userCanEdit, setUserCanEdit] = useState(false);
  const { t: tmain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'dashboard.profile.account' });
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: accountGeneralDetailsInitialValues,
    validationSchema: accountGeneralDetailsYupValidationSchema,
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
  }

  return (
    <>
      <HeaderView title={t("heading")} showBackButton={true} backButtonCallback={() => navigate(routeUrls.dashboard)} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center font-semibold text-blue-900 text-lg leading-6">
          {t("sub_heading")}
        </div>
        <div className="px-4">
          <div className="flex justify-end space-x-4">
            <button className="rounded-full bg-blue-200 px-6 py-2 font-medium text-lg leading-6 text-blue-900" onClick={handleEditInformation}>
              {userCanEdit ? tmain("update") : tmain("edit")}
            </button>
          </div>
          <div className="rounded-lg mt-2 bg-blue-200">
            <form onSubmit={handleSubmit}>
              <Accordian title={t("accord_general_details")} openByDefault={true}>
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
              <Accordian title={t("accord_maintainance_interval_labels")}>
                <p className="px-5 pt-4 pb-8 bg-gray-100">Information not available</p>
              </Accordian>
              <Accordian title={t("accord_scorecard_weight_factors")}>
                <p className="px-5 pt-4 pb-8 bg-gray-100">Information not available</p>
              </Accordian>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenAdminDetailAccount;
