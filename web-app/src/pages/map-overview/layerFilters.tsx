import { useTranslation } from "react-i18next";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../assets/svg/close-icon.svg";
import AppAvatar from "../../components/avatar";
import { getUserIntials } from "../../utils/string";
import { Formik } from "formik";
import { LayerFilterInitialValues, LayerFilterValidationSchema } from "./validation";
import { AdminFormFieldCheckbox, AdminFormFieldSubmit } from "../../components/admin/formFields";
import RoadMapView from "../../assets/images/road-map-view.png"
import SatelliteMapView from "../../assets/images/satellite-map-view.png"
import OrdnanceMapView from "../../assets/images/ordnance-map-view.png"
import BirdsEyeMapView from "../../assets/images/birdseye-map-view.png"
import StreetsideMapView from "../../assets/images/streetside-map-view.png"
import ThreeDMapView from "../../assets/images/3d-map-view.png"


const ViewList = [
  {
    id: 1,
    name: "Road",
    src: RoadMapView
  },
  {
    id: 2,
    name: "Satellite",
    src: SatelliteMapView
  },
  {
    id: 3,
    name: "Ordnance",
    src: OrdnanceMapView
  },
  {
    id: 4,
    name: "Bird's Eye",
    src: BirdsEyeMapView
  },
  {
    id: 5,
    name: "Streetside",
    src: StreetsideMapView
  },
  {
    id: 6,
    name: "3D",
    src: ThreeDMapView
  }
]

const LayerFilters = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "mapOverview.layerFilter",
  });

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showLayerFilter: false }));
  };

  if (modalsState.showLayerFilter === false) return null;
  return (
    <>
      <div className="absolute p-6 rounded-lg gap-3 mx-auto max-w-[calc(100vw-4rem)] w-[588px] z-modal top-5 right-5 bg-gray-100">
          <Formik
            initialValues={LayerFilterInitialValues}
            validationSchema={LayerFilterValidationSchema}
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
                <form className="gap-5">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold leading-6 text-heading-black">
                      {t("heading")}
                    </h2>
                    <img
                      src={CloseIcon}
                      alt="close-icon"
                      className="cursor-pointer"
                      onClick={hideModal}
                    />
                  </div>
                  <div className="p-4 flex justify-between">
                      {ViewList?.map((item, index) => (
                        <div key={index} className="gap-2 cursor-pointer items-center justify-center" onClick={() => setFieldValue("view", item.name)}>
                          <img src={item.src} alt="road-map-view" className={`rounded-full border-2 ${item.name === values.view ? "border-accent-blue-dark" : ""} `} />
                          <p className={`font-semibold text-xs leading-10 text-center ${item.name === values.view ? "text-accent-blue-dark" : ""}`}>
                            {item.name}
                          </p>
                        </div>
                      ))}
                  </div>
                  <div className="space-y-4">
                    <p className="font-semibold text-lg leading-5">{t("additional_filters")}</p>
                    <div className="grid grid-col-8 gap-4">
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
                      />

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
                      />

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
                        customWrapperClass="col-span-8"
                      />
                      <div className="col-span-8">
                        <AdminFormFieldSubmit
                          label={t("manage_geozones")}
                          type="submit"
                          variant="primary"
                          onClick={hideModal}
                          disabled={isSubmitting} 
                        />
                      </div>
                    </div>
                  </div>
                </form>
              );
            }}
          </Formik>
      </div>
    </>
  );
};

export default LayerFilters;
