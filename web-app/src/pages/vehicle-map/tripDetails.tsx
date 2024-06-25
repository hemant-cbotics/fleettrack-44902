import { FC, useState } from "react";
import StartLocation from "../../assets/svg/start-location.svg";
import EndLocation from "../../assets/svg/end-location.svg";
import { useTranslation } from "react-i18next";
import AcceleratedIcon from "../../assets/svg/accelerated-icon.svg";
import ButtonPressedIcon from "../../assets/svg/button-pressed-icon.svg";
import DeAcceleratedIcon from "../../assets/svg/de-accelerated-icon.svg";
import DistractedDrivingIcon from "../../assets/svg/distracted-driving-icon.svg";

const events = [
  {
    name: "Accelerated",
    icon: AcceleratedIcon,
    date: "May 07, 2024",
    time: "10:00 AM",
  },
  {
    name: "Button Pressed",
    icon: ButtonPressedIcon,
    date: "May 07, 2024",
    time: "10:00 AM",
  },
  {
    name: "De-Accelerated",
    icon: DeAcceleratedIcon,
    date: "May 07, 2024",
    time: "10:00 AM",
  },
  {
    name: "Distracted Driving",
    icon: DistractedDrivingIcon,
    date: "May 07, 2024",
    time: "10:00 AM",
  },
]

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
  wrapperClassName?: string;
  point: 'Start' | 'End';
  phone_no: string;
  address: string;
  time: string;
  dottedLine?: boolean;
};

const TripAddress: FC<TripAddressProps> = ({
  wrapperClassName = 'relative flex items-start',
  point,
  phone_no,
  address,
  time,
  dottedLine = false,
}) => (
  <div className={wrapperClassName}>
    {dottedLine && (
      <div className="absolute top-6 left-3 ml-[3px] w-0.5 h-[calc(100%-8px)] border border-dashed border-gray-400" />
    )}
    <img
      src={point === "Start" ? StartLocation : EndLocation}
      alt="location-icon" className="p-2" />
    <div className="font-medium space-y-1">
      <div className="text-[12px] leading-4 text-heading-gray444 pe-12">
        <p>{phone_no}</p>
        <p>{address}</p>
      </div>
      <p className="text-[10px] leading-3 text-heading-gray888">{time}</p>
    </div>
  </div>
);

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
            <p className="font-semibold text-base leading-6 text-accent-blue-dark">
              {tripData.trip_no}
            </p>
            <div className="text-end">
              <p className="font-bold text-[8px] leading-2">
                {t("duration")}: {tripData.duration}
              </p>
              <p className="font-bold text-[10px] leading-3 mt-1 text-heading-gray888">
                {tripData.distance}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <TripAddress
              point="Start"
              phone_no={tripData.phone_no}
              address={tripData.address}
              time={tripData.time}
              dottedLine={true}
            />
            <TripAddress
              point="End"
              phone_no={tripData.phone_no}
              address={tripData.address}
              time={tripData.time} 
            />
          </div>
          <div className="flex justify-between">
            <p className="font-semibold text-xs leading-6 text-heading-gray666">
              {t("total_events")}:{" "}
              <span className="text-heading-black">{tripData.totalEvents}</span>
            </p>
            {!showEvents && (
              <p
                className="font-medium text-sm leading-5 text-accent-blue-bright cursor-pointer"
                onClick={() => setShowEvents(true)}
              >
                {t("view_details")}
              </p>
            )}
          </div>
          {showEvents && (
            <div className="space-y-3" onClick={() => setShowEvents(false)}>
              {events.map((event, index) => (
                <div className="flex justify-between">
                  <div className="flex items-center gap-1">
                    <img src={event.icon} alt="icon"/>
                    <p className="font-medium text-sm leading-4">{event.name}</p>
                  </div>
                  <div className="space-y-1 text-right font-medium text-xs leading-3 text-gray-500">
                    <p>{event.date}</p>
                    <p>{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TripDetails;
