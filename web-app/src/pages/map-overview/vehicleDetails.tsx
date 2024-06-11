import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import CloseIcon from "../../assets/svg/close-icon.svg";
import VideoCameraIcon from "../../assets/svg/video-camera-icon.svg";
import { AdminFormFieldSubmit } from "../../components/admin/formFields";

const listData = [
  {
    name: "Date/Time",
    value: "2021-09-01 12:00:00"
  },
  {
    name: "Status",
    value: "Active"
  },
  {
    name: "Latitiude/Longitude",
    value: "37.7749° N, 122.4194° W"
  },
  {
    name: "Speed",
    value: "45 km/h"
  },
  {
    name: "Heading",
    value: "North"
  },
  {
    name: "Address",
    value: "San Francisco, California"
  },
  {
    name: "Driver",
    value: "John Doe"
  },
  {
    name: "Driver Phone",
    value: "+1 123 456 7890"
  },
  {
    name: "Speed Limit",
    value: "50 km/h"
  },
  {
    name: "First Ignition",
    value: "2021-09-01 12:00:00"
  },
  {
    name: "Groups",
    value: "Group 1, Group 2"
  },
  {
    name: "Asset",
    value: "Asset 1"
  },
  {
    name: "Last Valid Event",
    value: "2021-09-01 12:00:00"
  },
  {
    name: "Has Impact",
    value: "Yes"
  },
  {
    name: "Has Fleettag",
    value: "Yes"
  },
  {
    name: "Incidient",
    value: "Sample Incident"
  }
]

const VehicleDetails = () => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "mapOverview.details",
  });

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showVehicleDetails: false }));
  };

  if (modalsState.showVehicleDetails === false) return null;

  return (
    <>
      {/* <div className="justify-center items-start flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"> */}
        {/* <div className="fixed w-full h-screen bg-modal-overlay z-overlay"></div> */}
        <div className="absolute mx-auto max-w-[calc(100vw-4rem)] w-[330px] z-modal top-1 right-1 bg-white">
          <div className="p-6 rounded-3xl shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-base font-semibold leading-6 text-heading-black">
                {t("heading")}
              </h2>
              <img src={CloseIcon} alt="close-icon" className="p-1 bg-blue-200 rounded-full cursor-pointer" onClick={hideModal}/>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-semibold leading-6 text-blue-700">Chevrolet Silverado</p>
                <p className="text-sm font-medium leading-6 text-gray-500">10022</p>
              </div>
              <img src={VideoCameraIcon} alt="video-camera-icon" className="p-3 rounded-full bg-blue-200"/>
            </div>
            <div className="flex gap-4">
              <div className="w-32">
                <AdminFormFieldSubmit
                  label={t("message")}
                  type="button"
                  variant="primary"
                  onClick={() => {}}
                />
              </div>
              {/* <div className="flex-grow"></div> */}
              <div className="w-34">
                <AdminFormFieldSubmit
                  label={t("send_location")}
                  type="button"
                  variant="primary"
                  onClick={() => {}}
                />
              </div>
            </div>
            <div className="space-y-6 max-h-[280px] overflow-y-auto">
              {listData?.map((item, index) => (
                <div key={index}>
                  <p className="text-xs font-normal leading-5 tracking-tighter text-gray-400">{item.name}</p>
                  <p className="text-sm font-medium leading-5 tracking-tighter">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-4">
              <div className="w-32">
                <AdminFormFieldSubmit
                  label={t("street_view")}
                  type="button"
                  variant="primary"
                  onClick={() => {}}
                />
              </div>
              {/* <div className="flex-grow"></div> */}
              <div className="w-32">
                <AdminFormFieldSubmit
                  label={t("forecast")}
                  type="button"
                  variant="primary"
                  onClick={() => {}}
                />
              </div>
            </div>
            <AdminFormFieldSubmit
              label={t("vehicle_map_view")}
              type="button"
              variant="primary"
              onClick={() => {}} 
            />
          </div>
        </div>
      {/* </div> */}
    </>
  )
}

export default VehicleDetails;