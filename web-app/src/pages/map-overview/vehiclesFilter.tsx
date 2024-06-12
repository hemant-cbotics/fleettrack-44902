import { useTranslation } from "react-i18next";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { dateValidationSchema, dateInitialValues } from "./validation";
import {
  AdminFormFieldDropdown,
  AdminFormFieldInput,
  AdminFormFieldSubmit,
} from "../../components/admin/formFields";

const VehicleFilter = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "mapOverview.vehicleFilter",
  });

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );
  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showVehicleFilter: false }));
  };

  if (modalsState.showVehicleFilter === false) return null;
  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="fixed w-full h-screen bg-modal-overlay z-overlay"
          onClick={hideModal}
        ></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[480px] z-modal">
          <Formik
            initialValues={dateInitialValues}
            validationSchema={dateValidationSchema}
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
                  />

                  <AdminFormFieldDropdown 
                    label={t("timezone")}
                    id="timezone"
                    name="timezone"
                    value={values.timezone}
                    options={[
                      { value: "utc", label: "UTC" },
                      { value: "local", label: "Local" },
                    ]}
                    onChange={(e) => setFieldValue("timezone", e?.value)}
                    onBlur={(e) => {setFieldTouched("timezone", true); handleBlur(e);}}
                    error={errors.timezone}
                    touched={touched.timezone} 
                  />

                  <AdminFormFieldSubmit 
                    label={tMain("confirm")}
                    type="button"
                    variant="primary"
                    onClick={hideModal} 
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

export default VehicleFilter;
