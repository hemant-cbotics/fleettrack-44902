import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useLoggedInUserData } from "../../../utils/user";
import { OrganizationEntityListingPayload } from "../../../api/types/Admin";
import { useDebouncedCallback } from "use-debounce";
import { useFormik } from "formik";
import { fleettagDetailsInitialValues, fleettagDetailsYupValidationSchema } from "./validation";
import HeaderView from "../../../components/admin/headerView";
import { routeUrls } from "../../../navigation/routeUrls";
import { APP_CONFIG } from "../../../constants/constants";
import AppSearchBox from "../../../components/searchBox";
import { AdminFormFieldSubmit } from "../../../components/admin/formFields";
import Accordian from "../../../components/accordian";
import FleettagDetailForm from "./fleettag-form";

const listData = [
  {
    id: 1,
    fleettag_id: "FT/ID/001.02",
    last_address: "1234, 5th Avenue, New York, NY",
    description: "Fleet tag description",
    in_range: "Yes",
  },
  {
    id: 2,
    fleettag_id: "FT/ID/001.02",
    last_address: "1234, 5th Avenue, New York, NY",
    description: "Fleet tag description",
    in_range: "Yes",
  },
  {
    id: 3,
    fleettag_id: "FT/ID/001.02",
    last_address: "1234, 5th Avenue, New York, NY",
    description: "Fleet tag description",
    in_range: "Yes",
  },
  {
    id: 4,
    fleettag_id: "FT/ID/001.02",
    last_address: "1234, 5th Avenue, New York, NY",
    description: "Fleet tag description",
    in_range: "Yes",
  },
  {
    id: 5,
    fleettag_id: "FT/ID/001.02",
    last_address: "1234, 5th Avenue, New York, NY",
    description: "Fleet tag description",
    in_range: "Yes",
  },
  {
    id: 6,
    fleettag_id: "FT/ID/001.02",
    last_address: "1234, 5th Avenue, New York, NY",
    description: "Fleet tag description",
    in_range: "Yes",
  },
  {
    id: 7,
    fleettag_id: "FT/ID/001.02",
    last_address: "1234, 5th Avenue, New York, NY",
    description: "Fleet tag description",
    in_range: "Yes",
  },
  {
    id: 8,
    fleettag_id: "FT/ID/001.02",
    last_address: "1234, 5th Avenue, New York, NY",
    description: "Fleet tag description",
    in_range: "Yes",
  }

]

const ScreenAdminDetailFleettag = () => {
  const { fleettagId } = useParams<{ fleettagId: any }>();
  const { state: locationState } = useLocation();
  const { t: tMain } = useTranslation();
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "admins.fleettags" });
  const { t } = useTranslation("translation", { keyPrefix: "admins.fleettags.detailsPage" });
  const navigate = useNavigate();

  const isNewEntity = useRef<boolean>(!!locationState?.new);
  const [userCanEdit, setUserCanEdit] = useState<boolean>(!!isNewEntity?.current);

  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const [orgFleettagsQueryParams, setOrgFleettagsQueryParams] = useState<OrganizationEntityListingPayload>(
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
    setOrgFleettagsQueryParams((prev) => {
      return { ...prev, page: 1, search: value };
    });
  }, 500);


  const formik = useFormik({
    initialValues: fleettagDetailsInitialValues,
    validationSchema: fleettagDetailsYupValidationSchema,
    onSubmit: () => {console.log("Submit")}
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  const handleEditFleettag = () => {
    console.log("Edit Fleettag");
  }

  const handleDeleteFleettag = () => {
    console.log("Delete Fleettag");
  }

  const isFetchingOrgFleettags = false;
  const isLoadingEditFleettag = false;
  const isLoadingDeleteFleettag = false;
  const isFetchingSingleFleettag = false;

  return (
    <>
      <HeaderView
        title={t("heading")}
        showBackButton={true}
        backButtonCallback={() =>
          navigate(routeUrls.dashboardChildren.adminChildren.fleettags)
        }
      />
      <div  className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="lg:grid lg:grid-cols-12 mt-8 py-2 gap-4">
          <div className={`lg:col-span-3 space-y-4${isFetchingOrgFleettags ? ' opacity-40 pointer-events-none' : ''}${isNewEntity?.current ? ' hidden' : ''}`}>
            <div className="font-bold text-lg leading-6">{t("listing_heading")}</div>
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
                    parseInt(fleettagId) === item.id ? "bg-blue-200" : ""
                  }`}
                  onClick={() =>
                    navigate(
                      `${routeUrls.dashboardChildren.adminChildren.fleettags}/${item.id}`
                    )
                  }
                >
                  <div className="grid grid-cols-4">
                    <div className="col-span-3">
                      <p className="font-semibold text-sm leading-6 text-blue-900">
                        {item.fleettag_id}
                      </p>
                      <p className="font-normal text-xs leading-6 text-gray-500">
                        {item.last_address}
                      </p>
                    </div>
                    <div className="col-span-1 font-bold text-xs leading-4 text-right">
                      {item.in_range}
                    </div>
                  </div>
                  <p className="font-normal text-base leading-6 text-gray-700">
                    {item.description}
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
                      onClick={handleEditFleettag}
                      disabled={isLoadingEditFleettag}
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
                      onClick={handleDeleteFleettag}
                      disabled={isLoadingEditFleettag}
                    />
                  </div>
                  <div className="w-24">
                    <AdminFormFieldSubmit
                      type="button"
                      variant="primary"
                      label={userCanEdit ? tMain("update") : tMain("edit")}
                      onClick={userCanEdit ? handleEditFleettag : () => setUserCanEdit(!userCanEdit)}
                      disabled={isLoadingEditFleettag}
                    />
                  </div>
                </>
              )}
            </div>
            <div className={`rounded-lg mt-2 bg-blue-200 transition ${isFetchingSingleFleettag || isLoadingEditFleettag || isLoadingDeleteFleettag ? 'opacity-40' : ''}`}>
              <form onSubmit={handleSubmit}>
                <Accordian title={t("accord_details")} openByDefault={true}>
                  <FleettagDetailForm
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

export default ScreenAdminDetailFleettag;