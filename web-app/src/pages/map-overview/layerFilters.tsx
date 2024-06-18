import { useTranslation } from "react-i18next";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "../../assets/svg/close-icon.svg";
import AppAvatar from "../../components/avatar";
import { getUserIntials } from "../../utils/string";
import { Formik } from "formik";
import { layerFilterInitialValues, LayerFilterValidationSchema } from "./validation";
import { AdminFormFieldCheckbox, AdminFormFieldSubmit } from "../../components/admin/formFields";
import RoadMapView from "../../assets/images/road-map-view.png"
import SatelliteMapView from "../../assets/images/satellite-map-view.png"
import OrdnanceMapView from "../../assets/images/ordnance-map-view.png"
import BirdsEyeMapView from "../../assets/images/birdseye-map-view.png"
import StreetsideMapView from "../../assets/images/streetside-map-view.png"
import ThreeDMapView from "../../assets/images/3d-map-view.png"
import { TMapLayerOptions, TMapState, TMapType } from "../../types/map";
import { FC } from "react";
import { routeUrls } from "../../navigation/routeUrls";

type TViewListItem = {
  id: number;
  name: string;
  src: string;
  mapType: TMapType;
}

const ViewList: TViewListItem[] = [
  {
    id: 1,
    name: "Road",
    src: RoadMapView,
    mapType: "road"
  },
  {
    id: 2,
    name: "Satellite",
    src: SatelliteMapView,
    mapType: "aerial"
  },
  {
    id: 3,
    name: "Ordnance",
    src: OrdnanceMapView,
    mapType: "ordnanceSurvey"
  },
  {
    id: 4,
    name: "Bird's Eye",
    src: BirdsEyeMapView,
    mapType: "birdseye"
  },
  {
    id: 5,
    name: "Streetside",
    src: StreetsideMapView,
    mapType: "streetside"
  },
  {
    id: 6,
    name: "3D",
    src: ThreeDMapView,
    mapType: "collinsBart" // TODO: need to confirm
  }
]

type TLayerFiltersProps = {
  onMapTypeChange: (mapType: TMapType) => void;
  onMapLayerChange: (mapLayerOptions: TMapLayerOptions) => void;
}

const LayerFilters: FC<TLayerFiltersProps> = ({ onMapTypeChange, onMapLayerChange }) => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "mapOverview.layerFilter",
  });

  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showLayerFilter: false }));
  };

  const handleClickManageGeozones = () => {
    navigate(routeUrls.dashboardChildren.adminChildren.geozones);
    hideModal();
  };

  const handleLayerOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if(!!name && typeof checked === 'boolean') {
      onMapLayerChange({
        ...mapState.mapLayerOptions,
        [name]: checked
      });
      setTimeout(() => hideModal(), 500); // just to give a feel of saving/processing and show toggle animation
    }
  }

  if (modalsState.showLayerFilter === false) return null;
  return (
    <>
      <div className="absolute p-6 rounded-lg gap-3 mx-auto max-w-[calc(100vw-4rem)] w-[588px] z-modal top-5 right-5 bg-gray-100">
        <Formik
          initialValues={layerFilterInitialValues}
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
                    <div key={index}
                      className={`group gap-2 items-center justify-center${item.mapType !== mapState?.mapType && " cursor-pointer"}`}
                      onClick={() => {
                        setFieldValue("view", item.name)
                        onMapTypeChange(item.mapType as TMapType)
                      }}>
                      <img src={item.src} alt="road-map-view"
                        className={`rounded-full border-2 ${item.mapType === mapState?.mapType ? "border-accent-blue-dark" : "group-hover:border-accent-blue-bright"} `} />
                      <p className={`font-semibold text-xs leading-10 text-center ${item.mapType === mapState?.mapType ? "text-accent-blue-dark" : "group-hover:text-accent-blue-bright text-gray-400"}`}>
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
                      checked={mapState.mapLayerOptions?.traffic}
                      onChange={handleLayerOptionChange}
                      onBlur={handleBlur}
                      touched={touched.traffic}
                      error={errors.traffic}
                    />

                    <AdminFormFieldCheckbox
                      label={t("weather")}
                      id="weather"
                      type="checkbox"
                      name="weather"
                      checked={mapState.mapLayerOptions?.weather}
                      onChange={handleLayerOptionChange}
                      onBlur={handleBlur}
                      touched={touched.weather}
                      error={errors.weather}
                      disabled={true}
                    />

                    <AdminFormFieldCheckbox
                      label={t("three_d_building")}
                      id="three_d_building"
                      type="checkbox"
                      name="three_d_building"
                      checked={mapState.mapLayerOptions?.three_d_building}
                      onChange={handleLayerOptionChange}
                      onBlur={handleBlur}
                      touched={touched.three_d_building}
                      error={errors.three_d_building}
                      disabled={true}
                    />

                    <AdminFormFieldCheckbox
                      label={t("clustering")}
                      id="clustering"
                      type="checkbox"
                      name="clustering"
                      checked={mapState.mapLayerOptions?.clustering}
                      onChange={handleLayerOptionChange}
                      onBlur={handleBlur}
                      touched={touched.clustering}
                      error={errors.clustering}
                    />

                    <AdminFormFieldCheckbox
                      label={t("hide_geozones")}
                      id="hide_geozones"
                      type="checkbox"
                      name="hide_geozones"
                      checked={mapState.mapLayerOptions?.hide_geozones}
                      onChange={handleLayerOptionChange}
                      onBlur={handleBlur}
                      touched={touched.hide_geozones}
                      error={errors.hide_geozones}
                      customWrapperClass="col-span-8"
                      disabled={true}
                    />
                    <div className="col-span-8">
                      <AdminFormFieldSubmit
                        label={t("manage_geozones")}
                        type="submit"
                        variant="primary"
                        onClick={handleClickManageGeozones}
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
