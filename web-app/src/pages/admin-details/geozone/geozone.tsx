import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLoggedInUserData } from "../../../utils/user";
import { OrganizationEntityListingPayload } from "../../../api/types/Admin";
import { useDebouncedCallback } from "use-debounce";
import HeaderView from "../../../components/admin/headerView";
import { routeUrls } from "../../../navigation/routeUrls";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";
import { useFormik } from "formik";
import Accordian from "../../../components/accordian";
import { geozoneDetailsInitialValues, geozoneDetailsYupValidationSchema } from "./validation";
import { GeozoneDetailForm } from "./geozone-form";

const listData = [
  {
    id: 1,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 2,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 3,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 4,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 5,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 6,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 7,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 8,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 9,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  },
  {
    id: 10,
    type: "Polygon",
    description: "Custom Zone 5100 popular",
    radius: "radius meter 100",
  }
]

const ScreenAdminDetailGeozone = () => {
  const { geozoneId } = useParams<{ geozoneId: any }>();
  const { state: locationState } = useLocation();
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.geozones" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.geozones.detailsPage" });
  const navigate = useNavigate();

  const isNewEntity = useRef<boolean>(!!locationState?.new);
  const [userCanEdit, setUserCanEdit] = useState<boolean>(!!isNewEntity?.current);

  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgGeozonesQueryParams, setOrgGeozonesQueryParams] = useState<
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
    setOrgGeozonesQueryParams((prev) => {
      return { ...prev, page: 1, search: value };
    });
  }, 500);

  const formik = useFormik({
    initialValues: geozoneDetailsInitialValues,
    validationSchema: geozoneDetailsYupValidationSchema,
    onSubmit: () => {console.log("Submit")}
  });

  const handleEditGeozone = () => {
    console.log("Edit Geozone");
  }

  const handleDeleteGeozone = () => {
    console.log("Delete Geozone");
  }

  const isFetchingOrgGeozones = false;
  const isLoadingEditGeozone = false;
  const isLoadingDeleteGeozone = false;
  const isFetchingSingleGeozone = false;

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;
  
  return (
      <>
        <HeaderView
          title={t("heading")}
          showBackButton={true}
          backButtonCallback={() =>
            navigate(routeUrls.dashboardChildren.adminChildren.geozones)
          }
        />
        <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
          <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
            <div className={`hidden xl:block lg:col-span-3 space-y-4${isFetchingOrgGeozones ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' hidden' : ''}`}>
              <div className="font-bold text-lg leading-6 mt-2 mb-3">{t("listing_heading")}</div>
              <AppSearchBox
                placeholder={tAdmin("search_placeholder")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  debouncedSetSearchKeyword(e.target.value)
                }
              />
              <div>
                {listData?.map((item: any, index: number) => (
                  <div
                    key={index}
                    className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                      parseInt(geozoneId) === item.id ? "bg-blue-200" : ""
                    }`}
                    onClick={() =>
                      navigate(
                        `${routeUrls.dashboardChildren.adminChildren.geozones}/${item.id}`
                      )
                    }
                  >
                    <div className="grid grid-cols-4">
                      <div className="col-span-3">
                        <p className="font-semibold text-sm leading-6 text-blue-900">
                          {item.id}
                        </p>
                        <p className="font-normal text-xs leading-6 text-gray-500">
                          {item.type}
                        </p>
                      </div>
                      <div className="col-span-1 font-bold text-xs leading-4 text-right">
                        {item.radius}
                      </div>
                    </div>
                    <p className="font-normal text-base leading-6 text-gray-700">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`${isNewEntity?.current ? 'lg:col-span-12' : 'col-span-12 xl:col-span-9'}`}>
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
                        onClick={handleEditGeozone}
                        disabled={isLoadingEditGeozone}
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
                        label={tMain("delete")}
                        onClick={handleDeleteGeozone}
                        disabled={isLoadingEditGeozone}
                      />
                    </div>
                    <div className="w-24">
                      <AdminFormFieldSubmit
                        type="button"
                        variant="primary"
                        label={userCanEdit ? tMain("update") : tMain("edit")}
                        onClick={userCanEdit ? handleEditGeozone : () => setUserCanEdit(!userCanEdit)}
                        disabled={isLoadingEditGeozone}
                      />
                    </div>
                  </>
                )}
              </div>
              <div className={`rounded-lg mt-2 bg-blue-200 transition ${isFetchingSingleGeozone || isLoadingEditGeozone || isLoadingDeleteGeozone ? 'opacity-40' : ''}`}>
                <form onSubmit={handleSubmit}>
                  <Accordian title={t("accord_details")} openByDefault={true}>
                    <GeozoneDetailForm
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
}

export default ScreenAdminDetailGeozone;