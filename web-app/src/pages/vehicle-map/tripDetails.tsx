import { FC, useState } from "react";
import StartLocation from "../../assets/svg/start-location.svg";
import EndLocation from "../../assets/svg/end-location.svg";
import { useTranslation } from "react-i18next";

type TripDetailsProps = {
  tripData: {
    trip_no: string;
    phone_no: string;
    address: string;
    duration: string;
    distance: string;
    time: string;
    totalEvents: number;
  };
  selected?: boolean;
  onClick: () => void;
};

type TripAddressProps = {
  point: string;
  phone_no: string;
  address: string;
  time: string;
};

const TripAddress: FC<TripAddressProps> = ({ point, phone_no, address, time }) => {
  
  return (
    <>
      <div className="flex items-start">
        <img src={ point === "Start" ? StartLocation : EndLocation} alt="location-icon" className="p-2"/>
        <div className="font-medium leading-4 space-y-3">
          <div className="text-sm">
            <p>{phone_no}</p>
            <p>{address}</p>
          </div>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
    </>
  );
};

const TripDetails: FC<TripDetailsProps> = ({
  tripData,
  selected = false,
  onClick,
}) => {
  const { t } = useTranslation("translation", { keyPrefix: "vehicleMap.tripDetails" });
  const [showEvents, setShowEvents] = useState(false);
  return (
    <>
      <div
        className={`border-b px-3 py-2 border-gray-200 ${
          selected
            ? "bg-accent-blue-paleO66"
            : "hover:bg-accent-blue-paleO66 cursor-pointer"
        }`}
        onClick={onClick}
      >
        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="font-semibold text-base leading-6 text-blue-800">
              {tripData.trip_no}
            </p>
            <div className="text-end">
              <p className="font-bold text-xs leading-3">
                {t("duration")}: {tripData.duration}
              </p>
              <p className="font-bold text-sm leading-4 text-gray-500">
                {tripData.distance}
              </p>
            </div>
          </div>
            <TripAddress
              point="Start"
              phone_no={tripData.phone_no}
              address={tripData.address}
              time={tripData.time}
            />
            <TripAddress
              point="End"
              phone_no={tripData.phone_no}
              address={tripData.address}
              time={tripData.time} 
            />
          <div className="flex justify-between">
            <p className="font-semibold text-sm leading-6">
              {t("total_events")}: {tripData.totalEvents}
            </p>
            {!showEvents && (
              <p
                className="font-medium text-base leading-5 text-blue-500 cursor-pointer"
                onClick={() => setShowEvents(true)}
              >
                {t("view_details")}
              </p>
            )}
          </div>
          {showEvents && (
            <p onClick={() => setShowEvents(false)}>Events...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TripDetails;
