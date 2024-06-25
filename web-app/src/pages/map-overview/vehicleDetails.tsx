import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import CloseIcon from "../../assets/svg/close-icon.svg";
import VideoCameraIcon from "../../assets/svg/video-camera-icon.svg";
import { AdminFormFieldSubmit } from "../../components/admin/formFields";
import { FC, useEffect, useState } from "react";
import { useSingleOrganizationVehicleQuery } from "../../api/network/adminApiServices";
import { useLoggedInUserData } from "../../utils/user";
import { formattedDateTime } from "../../utils/dateTime";
import LoadingAnimation from "../../assets/svg/loadingAnimation.svg";
import { TDataPoint } from "./type";
import { mapVehicleDisplayTitle } from "./common";
import { routeUrls } from "../../navigation/routeUrls";

type VehicleDetailsProps = {
  vehicleId?: any;
  vehicleData?: TDataPoint;
}

const VehicleDetails:FC<VehicleDetailsProps> = ({ vehicleId, vehicleData }) => {
  const { t: tMain } = useTranslation();
  const { t } = useTranslation("translation", {
    keyPrefix: "mapOverview.details",
  });

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetch single vehicle details
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId");
  const {
    data: dataSingleVehicle,
    isFetching: isFetchingSingleVehicle
  } = useSingleOrganizationVehicleQuery(
    {
      organization_id: thisUserOrganizationId,
      vehicle_id: vehicleId
    },
    { skip: !vehicleId || !!vehicleData }
  );

  const vehicleDataToUse: TDataPoint = vehicleData as TDataPoint || dataSingleVehicle;

  const [listData, setListData] = useState<any[]>([]);
  
  useEffect(() => {
    if (vehicleDataToUse) {
      setListData([
        {
          name: "Current Ignition Status",
          value: vehicleDataToUse?.ignition_input
        },
        {
          name: "Date/Time",
          value: vehicleDataToUse?.created_at
            ? formattedDateTime(vehicleDataToUse?.created_at)
            : '-'
        },
        {
          name: "GPS",
          value: "Not Available"
        },
        {
          name: "Speed",
          value: "Not Available"
        },
        {
          name: "Speed Limit",
          value: "Not Available"
        },
        {
          name: "Status",
          value:
            <span className="font-bold uppercase">
              {vehicleDataToUse?.is_active
              ? <span className="text-field-success">{tMain('active')}</span>
              : <span className="text-field-error-dark">{tMain('inactive')}</span>}
            </span>,
        },
        {
          name: "Latitude/Longitude",
          value: "Not Available"
        },
        {
          name: "Address",
          value: "Not Available"
        },
        {
          name: "Driver",
          value: vehicleDataToUse?.driver?.name
        },
        {
          name: "Driver Phone",
          value: vehicleDataToUse?.driver?.phone
        },
        {
          name: "First Ignition",
          value: "Not Available"
        },
        {
          name: "Groups",
          value: vehicleDataToUse?.groups?.map((group: any) => group.name).join(", ")
        },
        {
          name: "Last Valid Event",
          value: "Not Available"
        },
        {
          name: "Has Impact",
          value: "Not Available"
        },
        {
          name: "Has Fleettag",
          value: "Not Available"
        },
      ]);
    }
  }, [vehicleDataToUse]);

  const hideModal = () => {
    dispatch(setModalsData({ ...modalsState, showVehicleDetails: false }));
  };

  if (modalsState.showVehicleDetails === false || !vehicleId) return null;

  const wrapperClass = `absolute flex flex-col gap-6 px-4 p-4 mx-auto max-w-[calc(100vw-4rem)] w-[330px] z-map-popup top-2 right-2 bottom-2 bg-white shadow-2xl rounded-lg overflow-hidden`;

  if(isFetchingSingleVehicle) return (
    <div className={wrapperClass}>
      <div className="flex justify-between items-center">
        <div className={`absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50`}>
          <img src={LoadingAnimation} alt="Loading animation" className="w-12 h-12" />
        </div>
      </div>
    </div>
  )

  return (
    <div className={wrapperClass}>
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold leading-6 text-heading-black">
          {t("heading")}
        </h2>
        <img src={CloseIcon} alt="close-icon" className="p-1 rounded-full cursor-pointer" onClick={hideModal}/>
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-base font-semibold leading-6 text-accent-blue-dark">{mapVehicleDisplayTitle(vehicleDataToUse)}</p>
          <p className="text-sm font-medium leading-6 text-gray-400">{vehicleDataToUse?.licence_plate}</p>
        </div>
        <img src={VideoCameraIcon} alt="video-camera-icon" className="p-3 rounded-full bg-accent-blue-pale"/>
      </div>
      <div className="flex gap-4">
        <AdminFormFieldSubmit
          customWrapperClass="flex-1"
          label={t("message")}
          type="button"
          variant="primary"
          onClick={() => {}}
        />
        <AdminFormFieldSubmit
          customWrapperClass="flex-1"
          label={t("send_location")}
          type="button"
          variant="primary"
          onClick={() => {}}
        />
      </div>
      <div className="space-y-6 flex-grow overflow-y-auto">
        {listData?.map((item, index) => (
          <div key={index}>
            <p className="text-xs font-normal leading-5 Xtracking-tighter text-gray-400">{item.name}</p>
            <p className="text-sm font-medium leading-5 Xtracking-tighter">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4">
        <AdminFormFieldSubmit
          customWrapperClass="flex-1"
          label={t("street_view")}
          type="button"
          variant="primary"
          onClick={() => {}}
        />
        <AdminFormFieldSubmit
          customWrapperClass="flex-1"
          label={t("forecast")}
          type="button"
          variant="primary"
          onClick={() => {}}
        />
      </div>
      <AdminFormFieldSubmit
        label={t("vehicle_map_view")}
        type="button"
        variant="primary"
        onClick={() => {
          hideModal();
          navigate(`${routeUrls.dashboardChildren.mapsChildren.vehicle}/${vehicleId}`)
        }}
      />
    </div>
  )
}

export default VehicleDetails;