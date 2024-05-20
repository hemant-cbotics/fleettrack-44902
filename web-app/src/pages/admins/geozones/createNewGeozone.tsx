import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoggedInUserData } from "../../../utils/user";
import { TModalsState, setModalsData } from "../../../api/store/commonSlice";
import { Formik } from "formik";
import { TFormFieldNames, YupValidationSchema, formInitialValues } from "./validation";
import { AdminFormFieldDropdown, AdminFormFieldInput, AdminFormFieldSubmit } from "../../../components/admin/formFields";

const AdminsGeozonesCreateNew = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation('translation', { keyPrefix: 'admins.geozones.create_new'});
  const modalsState: TModalsState = useSelector((state: any) => state.commonReducer.modals);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showCreateGeozone: false }));
  };

  if(modalsState.showCreateGeozone === false) return null;

  return (
    <>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="absolute w-full h-screen z-[9980]" onClick={hideModal}></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[560px] z-[9990]">
          <Formik 
            initialValues={formInitialValues}
            validationSchema={YupValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log('>>>', values);
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
                  label={t("city")}
                  id="city"
                  name="city"
                  value={values.city}
                  onChange={(e) => setFieldValue("city", e)}
                  onBlur={(e) => {setTouched({city: true}); handleBlur(e)}}
                  error={errors.city}
                  touched={touched.city}
                />

                <AdminFormFieldDropdown
                  label={t("type")}
                  id="type"
                  name="type"
                  value={values.type}
                  onChange={(e) => setFieldValue("type", e)}
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