/**
 * -----------------------------------------------------------------------------
 * Popup - Create New Geozone
 * -----------------------------------------------------------------------------
 * This popup is used for creating a new geozone in the organization.
 */

import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoggedInUserData } from "../../../utils/user";
import { TModalsState, setModalsData, setMapStateData } from "../../../api/store/commonSlice";
import { Formik } from "formik";
import { TFormFieldNames, YupValidationSchema, formInitialValues } from "./validation";
import { AdminFormFieldDropdown, AdminFormFieldInput, AdminFormFieldSubmit } from "../../../components/admin/formFields";
import { useCreateOrganizationGeozoneMutation } from "../../../api/network/adminApiServices";
import { toast } from "react-toastify";
import { routeUrls } from "../../../navigation/routeUrls";
import { serializeErrorKeyValues } from "../../../api/network/errorCodes";
import { ZONE_TYPES_OPTIONS } from "./constants";
import { geozonePrepareMapState } from "../../admin-details/geozone/util";
import { TMapState } from "../../../types/map";
import { GeozoneType } from "../../../api/types/Geozone";
import { APP_CONFIG } from "../../../constants/constants";

const AdminsGeozonesCreateNew = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.geozones.create_new'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");

  // geozone mutation
  const [createOrgGeozoneAPITrigger] = useCreateOrganizationGeozoneMutation();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showCreateGeozone: false }));
  };

  if(modalsState.showCreateGeozone === false) return null;

  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-overlay outline-none focus:outline-none">
        <div className="fixed w-full h-screen bg-modal-overlay z-overlay" onClick={hideModal}></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[560px] z-modal">
          <Formik 
            initialValues={formInitialValues}
            validationSchema={YupValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              // clear previous mapState
              if(APP_CONFIG.DEBUG.GEOZONES) console.log('[D] DISPATCH TO CLEAR MAP STATE DATA BEFORE NAVIGATING TO NEW GEOZONE PAGE');
              dispatch(setMapStateData(
                geozonePrepareMapState({
                  seedMapState: mapState,
                  shapeType: ZONE_TYPES_OPTIONS[2].value as GeozoneType,
                  seedMapData: undefined,
                  locs: [],
                })
              ));
              // api call
              createOrgGeozoneAPITrigger({
                organization: `${thisUserOrganizationId}`,
                zone_id: values.id,
                zone_type: values.type
              })
                .unwrap()
                .then((data) => {
                  if(!!data?.created_at) {
                    dispatch(setModalsData({ ...modalsState, showCreateGeozone: false }));
                    toast.success(t('create_success'), { autoClose: 10000 });
                    navigate(`${routeUrls.dashboardChildren.adminChildren.geozones}/${data?.id}`, { state: { new: true } });
                  } else {
                    toast.error(tMain('toast.general_error'));
                  }
                })
                .catch((error) => {
                  const errors = !!error?.data ? serializeErrorKeyValues(error?.data) : [t('create_failed')];
                  toast.error(errors?.join(' '));
                })
                .finally(() => {
                  setSubmitting(false);
                });
            }}
          >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            dirty,
            setFieldValue,
            setTouched
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

                <AdminFormFieldInput
                  label={t("id")}
                  type="text"
                  id="Id"
                  name="id"
                  placeholder={t("id_placeholder")}
                  value={values.id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.id}
                  touched={touched.id}
                />

                <AdminFormFieldDropdown
                  label={t("type")}
                  id="type"
                  name="type"
                  value={values.type}
                  options={ZONE_TYPES_OPTIONS}
                  onChange={(e) => setFieldValue("type", e?.value)}
                  onBlur={(e) => {setTouched({type: true}); handleBlur(e)}}
                  error={errors.type}
                  touched={touched.type}
                />

                <AdminFormFieldSubmit
                  label={t('submit_button')}
                  variant="primary"
                  disabled={!isFormValid || isSubmitting /* || isLoading*/}
                />

                <AdminFormFieldSubmit
                  label={tMain('cancel')}
                  type="button"
                  variant="danger-transparent"
                  disabled={isSubmitting /* || isLoading*/}
                  onClick={hideModal}
                />
              </form>
            )}}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default AdminsGeozonesCreateNew;