import HeaderView from "../../../components/admin/headerView";
import { FC, useRef, useState } from "react";
import Accordian from "../../../components/accordian";
import { VehicleCameraIdDetailForm, VehicleDetailForm, VehicleGroupMembershipForm } from "./vehicle-form";
import { useTranslation } from "react-i18next";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routeUrls } from "../../../navigation/routeUrls";
import { useFormik } from "formik";
import { vehicleFormInitialValues, vehicleFormValidationSchema } from "./validation";
import { useLoggedInUserData } from "../../../utils/user";
import { OrganizationEntityListingPayload } from "../../../api/types/Admin";
import { useDebouncedCallback } from "use-debounce";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";

const data = [
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
  {
    vehicle_id: "1010101010",
    description: "10022 Cheery Covalt",
    vin: "2G1WB5EK5A1196138",
    equipment_type: "Car Compact",
  },
];

interface ActionButtonProps {
  text: string;
}

const ScreenAdminDetailVehicle = () => {
  const { vehicleId } = useParams<{ vehicleId: any }>();
  const { state: locationState } = useLocation();
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.vehicles" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.vehicles.detailsPage" });
  const navigate = useNavigate();

  const isNewEntity = useRef<boolean>(!!locationState?.new);
  const [userCanEdit, setUserCanEdit] = useState<boolean>(!!isNewEntity?.current);
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgVehiclesQueryParams, setOrgVehiclesQueryParams] = useState<
    OrganizationEntityListingPayload
  >(
    (!!(locationState as OrganizationEntityListingPayload)?.organization_id
      ? locationState
      : {
          organization_id: thisUserOrganizationId,
          page: 1,
          page_size: 10,
          search: "",
        }) as OrganizationEntityListingPayload
  );

  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgVehiclesQueryParams((prev) => {
      return { ...prev, page: 1, search: value };
    });
  }, 500);

  const formik = useFormik({
    initialValues: vehicleFormInitialValues,
    validationSchema: vehicleFormValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  })
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleEditVehicle = () => {
    console.log("Edit Vehicle");
  }

  const handleSmsVehicle = () => {
    console.log("SMS Vehicle");
  }

  const handleCommandVehicle = () => {
    console.log("Command Vehicle");
  }
  const isLoadingEditVehicle = false;
  const isFetchingSingleVehicle = false;
  const isFetchingOrgVehicles = false;
  return (
    <>
      <HeaderView title={t("heading")} showBackButton={true} backButtonCallback={() => navigate(routeUrls.dashboardChildren.adminChildren.vehicles)} />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            {t("sub_heading")}
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
          <div className={`lg:col-span-3 space-y-4${isFetchingOrgVehicles ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' hidden' : ''}`}>
            <div className="font-bold text-lg leading-6">{t("listing_heading")}</div>
            <AppSearchBox
              placeholder={tAdmin('search_placeholder')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => debouncedSetSearchKeyword(e.target.value)}
            />
            <div>
              {data.map((item: any, index: number) => (
                <div key={index} className="border-b px-3 py-2 border-gray-200">
                  <div className="grid grid-cols-4">
                    <div className="col-span-3">
                      <p className="font-semibold text-sm leading-6 text-blue-900">
                        {item.vehicle_id}
                      </p>
                      <p className="font-normal text-xs leading-6 text-gray-500">
                        {item.description}
                      </p>
                    </div>
                    <div className="col-span-1 font-bold text-xs leading-4 text-right">
                      {item.equipment_type}
                    </div>
                  </div>
                  <p className="font-normal text-base leading-6 text-gray-700">
                    {item.vin}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className={`${isNewEntity?.current ? 'lg:col-span-12' : 'lg:col-span-9'}`}>
            <div className="flex items-center gap-4">
              { isNewEntity?.current ? (
                <>
                  <p className="font-semibold text-blue-900 text-base leading-6">
                    {tMain("admins.completeCreation")}
                  </p>
                  <div className="flex-grow"></div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="submit"
                      variant="success"
                      label={tMain("save")}
                      onClick={handleEditVehicle}
                      disabled={isLoadingEditVehicle}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-grow"></div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={userCanEdit ? tMain("update") : tMain("edit")}
                      onClick={userCanEdit ? handleEditVehicle : () => setUserCanEdit(!userCanEdit)}
                      disabled={isLoadingEditVehicle}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={tMain("sms")}
                      onClick={handleSmsVehicle}
                      disabled={isLoadingEditVehicle}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={tMain("command")}
                      onClick={handleCommandVehicle}
                      disabled={isLoadingEditVehicle}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={`rounded-lg mt-2 bg-blue-200 transition ${isFetchingSingleVehicle || isLoadingEditVehicle ? 'opacity-40' : ''}`}>
              <Accordian title={t("accord_details")} openByDefault={true}>
                <VehicleDetailForm  
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
              <Accordian title={t("accord_camera_id")}>
                <VehicleCameraIdDetailForm 
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
              <Accordian title={t("accord_group_membership")}>
                <VehicleGroupMembershipForm
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScreenAdminDetailVehicle;
