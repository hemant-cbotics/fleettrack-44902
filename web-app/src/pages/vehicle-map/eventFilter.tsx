import { useTranslation } from "react-i18next";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { formInitialValues, formValidationSchema } from "./validation";
import Accordian from "../../components/accordian";
import { AdminFormFieldCheckbox, AdminFormFieldSubmit } from "../../components/admin/formFields";
import AllEventIcon from "../../assets/svg/all-event-icon.svg";
import AcceleratedIcon from "../../assets/svg/accelerated-icon.svg";
import ButtonPressedIcon from "../../assets/svg/button-pressed-icon.svg";
import DeAcceleratedIcon from "../../assets/svg/de-accelerated-icon.svg";
import DistractedDrivingIcon from "../../assets/svg/distracted-driving-icon.svg";
import CheckInIcon from "../../assets/svg/check-in-icon.svg";
import CheckOutIcon from "../../assets/svg/check-out-icon.svg";
import DriverUnbeltIcon from "../../assets/svg/driver-unbelt-icon.svg"

const EventFilter = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "vehicleMap.eventFilter",
  });

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );
  const dispatch = useDispatch();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showEventFilter: false }));
  };

  if (modalsState.showEventFilter === false) return null;
  return (
    <>
      <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div
          className="fixed w-full h-screen bg-modal-overlay z-overlay"
          onClick={hideModal}
        ></div>
        <div className="relative my-6 mx-auto max-w-[calc(100vw-4rem)] w-[416px] z-modal">
          <Formik
            initialValues={formInitialValues}
            validationSchema={formValidationSchema}
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
                  <div className="col-span-6">
                    <Accordian title="Exception Event" openByDefault={true} hasDetailsPage={false}>
                      <div className="col-span-6 space-y-3">
                        <AdminFormFieldCheckbox 
                          label={t("all_event")}
                          id="all_event"
                          type="checkbox"
                          name="all_event"
                          checked={values.all_event}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          icon={AllEventIcon}
                        />

                        <AdminFormFieldCheckbox 
                          label={t("accelerated")}
                          id="accelerated"
                          type="checkbox"
                          name="accelerated"
                          checked={values.accelerated}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          icon={AcceleratedIcon}
                        />

                        <AdminFormFieldCheckbox 
                          label={t("button_pressed")}
                          id="button_pressed"
                          type="checkbox"
                          name="button_pressed"
                          checked={values.button_pressed}
                          onChange={handleChange}
                          onBlur={handleBlur} 
                          icon={ButtonPressedIcon}
                        />

                        <AdminFormFieldCheckbox 
                          label={t("d_accelerated")}
                          id="d_accelerated"
                          type="checkbox"
                          name="d_accelerated"
                          checked={values.d_accelerated}
                          onChange={handleChange}
                          onBlur={handleBlur} 
                          icon={DeAcceleratedIcon}
                        />

                        <AdminFormFieldCheckbox 
                          label={t("distracted_driving")}
                          id="distracted_driving"
                          type="checkbox"
                          name="distracted_driving"
                          checked={values.distracted_driving}
                          onChange={handleChange}
                          onBlur={handleBlur} 
                          icon={DistractedDrivingIcon}
                        />

                        <AdminFormFieldCheckbox 
                          label={t("driver_check_in")}
                          id="driver_check_in"
                          type="checkbox"
                          name="driver_check_in"
                          checked={values.driver_check_in}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          icon={CheckInIcon}
                        />

                        <AdminFormFieldCheckbox 
                          label={t("driver_check_out")}
                          id="driver_check_out"
                          type="checkbox"
                          name="driver_check_out"
                          checked={values.driver_check_out}
                          onChange={handleChange}
                          onBlur={handleBlur} 
                          icon={CheckOutIcon}
                        />

                        <AdminFormFieldCheckbox 
                          label={t("driver_unbelted")}
                          id="driver_unbelted"
                          type="checkbox"
                          name="driver_unbelted"
                          checked={values.driver_unbelted}
                          onChange={handleChange}
                          onBlur={handleBlur} 
                          icon={DriverUnbeltIcon}
                        />
                      </div>
                    </Accordian>

                    <Accordian title="Specific Events" hasDetailsPage={false}>
                      <p>Not Available</p>
                    </Accordian>
                  </div>

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

export default EventFilter;
