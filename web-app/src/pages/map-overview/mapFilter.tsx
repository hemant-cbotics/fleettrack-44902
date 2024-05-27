import { useTranslation } from "react-i18next";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { YupValidationSchema, formInitialValues } from "./validation";
import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
  AdminFormFieldSubmit,
} from "../../components/admin/formFields";

const MapFilter = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "mapOverview.filter",
  });

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showMapFilter: false }));
  };

  if (modalsState.showMapFilter === false) return null;
  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="fixed w-full h-screen bg-modal-overlay z-overlay"
          onClick={hideModal}
        ></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[798px] z-modal">
          <Formik
            initialValues={formInitialValues}
            validationSchema={YupValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
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
              setFieldTouched,
            }) => {
              return (
                <form
                  className="p-8 bg-gray-100 grid grid-cols-6 gap-6 rounded-3xl shadow-2xl"
                  onSubmit={handleSubmit}
                >
                  <h2 className="col-span-6 text-2xl font-bold">
                    {t("heading")}
                  </h2>
                <div className="col-span-6 grid grid-cols-6 space-x-6 items-end">
                  <AdminFormFieldInput
                    label={t("address")}
                    type="text"
                    id="address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.address}
                    touched={touched.address}
                    customWrapperClass="col-span-4"
                  />

                  <AdminFormFieldSubmit
                    label={t("address")}
                    variant="primary"
                    customWrapperClass="col-span-2"
                  />
                </div>
                  <AdminFormFieldCheckbox
                    label={t("traffic")}
                    id="traffic"
                    type="checkbox"
                    name="traffic"
                    checked={values.traffic}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.traffic}
                    error={errors.traffic}
                    customWrapperClass="col-span-3"
                  />

                  <AdminFormFieldCheckbox
                    label={t("weather")}
                    id="weather"
                    type="checkbox"
                    name="weather"
                    checked={values.weather}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.weather}
                    error={errors.weather}
                    customWrapperClass="col-span-3"
                  />
                  <AdminFormFieldCheckbox
                    label={t("street_view")}
                    id="street_view"
                    type="checkbox"
                    name="street_view"
                    checked={values.street_view}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.street_view}
                    error={errors.street_view}
                    customWrapperClass="col-span-3"
                  />

                  <AdminFormFieldCheckbox
                    label={t("three_d_building")}
                    id="three_d_building"
                    type="checkbox"
                    name="three_d_building"
                    checked={values.three_d_building}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.three_d_building}
                    error={errors.three_d_building}
                    customWrapperClass="col-span-3"
                  />

                  <AdminFormFieldDropdown
                    label={t("attribute_filtering")}
                    id="attribute_filtering"
                    name="attribute_filtering"
                    options={[]}
                    value={values.attribute_filtering}
                    onChange={(e) =>
                      setFieldValue("attribute_filtering", e?.value)
                    }
                    onBlur={(e) => {
                      setFieldTouched("attribute_filtering", true);
                      handleBlur(e);
                    }}
                    touched={touched.attribute_filtering}
                    error={errors.attribute_filtering}
                    customWrapperClass="col-span-2"
                  />

                  <AdminFormFieldDropdown
                    label={t("spatial_filtering")}
                    id="spatial_filtering"
                    name="spatial_filtering"
                    options={[]}
                    value={values.spatial_filtering}
                    onChange={(e) =>
                      setFieldValue("spatial_filtering", e?.value)
                    }
                    onBlur={(e) => {
                      setFieldTouched("spatial_filtering", true);
                      handleBlur(e);
                    }}
                    touched={touched.spatial_filtering}
                    error={errors.spatial_filtering}
                    customWrapperClass="col-span-2"
                  />

                  <AdminFormFieldDropdown
                    label={t("temporal_filtering")}
                    id="temporal_filtering"
                    name="temporal_filtering"
                    options={[]}
                    value={values.temporal_filtering}
                    onChange={(e) =>
                      setFieldValue("temporal_filtering", e?.value)
                    }
                    onBlur={(e) => {
                      setFieldTouched("temporal_filtering", true);
                      handleBlur(e);
                    }}
                    touched={touched.temporal_filtering}
                    error={errors.temporal_filtering}
                    customWrapperClass="col-span-2"
                  />
                <div className="col-span-6 grid grid-cols-6 space-x-6 items-end">
                  <AdminFormFieldCheckbox
                    label={t("hide_geozones")}
                    id="hide_geozones"
                    type="checkbox"
                    name="hide_geozones"
                    checked={values.hide_geozones}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.hide_geozones}
                    error={errors.hide_geozones}
                    customWrapperClass="col-span-4"
                  />

                  <AdminFormFieldSubmit
                    label={t("manage_geozones")}
                    variant="primary"
                    customWrapperClass="col-span-2"
                  />
                </div>
                  <AdminFormFieldCheckbox
                    label={t("clustering")}
                    id="clustering"
                    type="checkbox"
                    name="clustering"
                    checked={values.clustering}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    touched={touched.clustering}
                    error={errors.clustering}
                    customWrapperClass="col-span-6"
                  />

                  <AdminFormFieldInput
                    label={t("date")}
                    type="date"
                    id="date"
                    name="date"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.date}
                    touched={touched.date}
                    customWrapperClass="col-span-2"
                  />

                  <AdminFormFieldInput
                    label={t("time")}
                    type="time"
                    id="time"
                    name="time"
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.time}
                    touched={touched.time}
                    customWrapperClass="col-span-2"
                  />

                  <AdminFormFieldDropdown 
                    label={t("timezone")}
                    id="timezone"
                    name="timezone"
                    options={[]}
                    value={values.timezone}
                    onChange={(e) => setFieldValue("timezone", e?.value)}
                    onBlur={(e) => {
                      setFieldTouched("timezone", true);
                      handleBlur(e);
                    }}
                    touched={touched.timezone}
                    error={errors.timezone}
                    customWrapperClass="col-span-2"
                  />

                  <AdminFormFieldDropdown
                    label={t("auto_refresh_timer")}
                    id="auto_refresh_timer"
                    name="auto_refresh_timer"
                    options={[]}
                    value={values.auto_refresh_timer}
                    onChange={(e) =>
                      setFieldValue("auto_refresh_timer", e?.value)
                    }
                    onBlur={(e) => {
                      setFieldTouched("auto_refresh_timer", true);
                      handleBlur(e);
                    }}
                    touched={touched.auto_refresh_timer}
                    error={errors.auto_refresh_timer}
                    customWrapperClass="col-span-6"
                  />

                  <AdminFormFieldSubmit
                    label={tMain("confirm")}
                    variant="primary"
                  />

                  <AdminFormFieldSubmit
                    label={tMain("cancel")}
                    type="button"
                    variant="danger-transparent"
                    onClick={hideModal} 
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default MapFilter;
