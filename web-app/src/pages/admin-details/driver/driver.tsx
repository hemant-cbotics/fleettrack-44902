import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLoggedInUserData } from "../../../utils/user";
import HeaderView from "../../../components/admin/headerView";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { useDebouncedCallback } from "use-debounce";
import { OrganizationEntityListingPayload } from "../../../api/types/Admin";
import { routeUrls } from "../../../navigation/routeUrls";
import Accordian from "../../../components/accordian";
import { useFormik } from "formik";
import {
  driverDetailsInitialValues,
  driverDetailsYupValidationSchema,
} from "./validation";
import {
  DriverGeneralDetailForm,
  DriverLicenseDetailForm,
  DriverMedicalDetailForm,
} from "./driver-form";
import { useOrganizationDriversQuery, useSingleOrganizationDriverQuery } from "../../../api/network/adminApiServices";
import { TListData } from "./type";
import { OrganizationDriver } from "../../../api/types/Driver";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";

const listData = [
  {
    driver_id: 1,
    driver_description: "Driver 1",
    driver_role: "Driver",
    driver_email: "abc@gmail.com",
  },
  {
    driver_id: 2,
    driver_description: "Driver 2",
    driver_role: "Driver",
    driver_email: "abc@gmail.com",
  },
];

const ScreenAdminDetailDriver = () => {
  const { driverId } = useParams<{ driverId: any }>();
  const { state: locationState } = useLocation();
  const navigate = useNavigate();

  const [userCanEdit, setUserCanEdit] = useState<boolean>(false);
  const isNewEntity = useRef<boolean>(!!locationState?.new);
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgDriversQueryParams, setOrgDriversQueryParams] = useState<
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
    setOrgDriversQueryParams((prev) => {
      return { ...prev, page: 1, search: value };
    });
  }, 500);

  const {
    data: dataOrgDrivers,
    isFetching: isFetchingOrgDrivers,
    error,
  } = useOrganizationDriversQuery(orgDriversQueryParams);
  const { results } = dataOrgDrivers || {};

  const { data: dataSingleDriver, isFetching: isFetchingSingleDriver } = useSingleOrganizationDriverQuery( { driver_id: parseInt(driverId) }, { skip: !driverId });

  const listData: TListData[] = !!results
    ? (results || ([] as OrganizationDriver[])).map(
        (item: OrganizationDriver, index: number) => ({
          id: item?.id,
          name: item?.name,
          badge_employee_id: item?.badge_employee_id || "Not available",
          email: item?.email,
          phone: item?.phone,
        })
      )
    : [];

  const formik = useFormik({
    initialValues: driverDetailsInitialValues,
    validationSchema: driverDetailsYupValidationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    if (dataSingleDriver) {
      formik.setValues({
        driver_id: dataSingleDriver?.id,
        driver_name: dataSingleDriver?.name,
        nick_name: dataSingleDriver?.nick_name || "",
        contact_phone: dataSingleDriver?.phone,
        contact_email: dataSingleDriver?.email,
        badge_employee_id: dataSingleDriver?.badge_employee_id || "",
        card_id: dataSingleDriver?.card_id || "",
        is_active: dataSingleDriver?.is_active || false,
        license_type: dataSingleDriver?.licence_type || "",
        license_state: dataSingleDriver?.licence_state || "",
        license_number: dataSingleDriver?.licence_number || "",
        license_expiration: dataSingleDriver?.licence_expiry || "",
        license_status: dataSingleDriver?.licence_status || "",
        medical_card_no: dataSingleDriver?.medical_card_no || "",
        medical_card_expiration: dataSingleDriver?.medical_card_expiry || "",
        hazmat_certified: dataSingleDriver?.is_hazmat_certified || false,
        twic: dataSingleDriver?.twic || "",
        twic_expiration: dataSingleDriver?.twic_expiry || "",
        address: dataSingleDriver?.address || "",
        vehicle_id: dataSingleDriver?.vehicle_assigned || "",
      });
    }
  }, [dataSingleDriver, driverId])

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleDeleteUser = () => {
    console.log("Delete User");
  };

  const handleEditUser = () => {
    setUserCanEdit(!userCanEdit);
  };

  const isLoadingEditUser = isFetchingSingleDriver;
  const isLoadingDeleteUser = isFetchingSingleDriver;

  return (
    <>
      <HeaderView
        title="Driver Specific View"
        showBackButton={true}
        backButtonCallback={() =>
          navigate(routeUrls.dashboardChildren.adminChildren.drivers)
        }
      />
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex items-center">
          <p className="font-semibold text-blue-900 text-lg leading-6">
            Add and Delete driver information
          </p>
        </div>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
          <div className={`lg:col-span-3 space-y-4${isFetchingOrgDrivers ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' hidden' : ''}`}>
            <div className="font-bold text-lg leading-6">Drivers</div>
            <AppSearchBox
              placeholder="Search Driver here"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                debouncedSetSearchKeyword(e.target.value)
              }
            />
            <div>
              {listData?.map((item: any, index: number) => (
                <div
                  key={index}
                  className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                    parseInt(driverId) === item.id ? "bg-blue-200" : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `${routeUrls.dashboardChildren.adminChildren.drivers}/${item.id}`
                    )
                  }
                >
                  <div className="grid grid-cols-4">
                    <div className="col-span-3">
                      <p className="font-semibold text-sm leading-6 text-blue-900">
                        {item.name}
                      </p>
                      <p className="font-normal text-xs leading-6 text-gray-500">
                        {item.badge_employee_id}
                      </p>
                    </div>
                    <div className="col-span-1 font-bold text-xs leading-4 text-right">
                      {item.phone}
                    </div>
                  </div>
                  <p className="font-normal text-base leading-6 text-gray-700">
                    {item.email}
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
                    Complete the form below to add a new driver
                  </p>
                  <div className="flex-grow"></div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="submit"
                      variant="success"
                      label={"Save"}
                      onClick={handleEditUser}
                      disabled={isLoadingEditUser}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-grow"></div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="danger"
                      label={"Delete"}
                      onClick={handleDeleteUser}
                      disabled={isLoadingEditUser}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={userCanEdit ? "Update" : "Edit"}
                      onClick={userCanEdit ? handleEditUser : () => setUserCanEdit(!userCanEdit)}
                      disabled={isLoadingEditUser}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={`rounded-lg mt-2 bg-blue-200 transition ${isFetchingSingleDriver || isLoadingEditUser || isLoadingDeleteUser ? 'opacity-40' : ''}`}>
              <form onSubmit={handleSubmit}>
                <Accordian title="Details" openByDefault={true}>
                  <DriverGeneralDetailForm
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
                <Accordian title="License Details">
                  <DriverLicenseDetailForm
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
                <Accordian title="Medical and Other Details">
                  <DriverMedicalDetailForm
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
      </div>
    </>
  );
};

export default ScreenAdminDetailDriver;
