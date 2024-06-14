import { AdminFormFieldDropdown } from "../../components/admin/formFields";
import { APP_CONFIG } from "../../constants/constants";
import FilterIcon from "../../assets/svg/filter-icon.svg";
import SortIcon from "../../assets/svg/sort-icon.svg";
import VehicleFilter from "../map-overview/vehiclesFilter";
import { useDispatch, useSelector } from "react-redux";
import { TModalsState, setModalsData } from "../../api/store/commonSlice";
import TripDetails from "./tripDetails";
import BasicMap, { MapLoadingAnimation } from "../../components/maps/basicMap";
import VehicleDetails from "../map-overview/vehicleDetails";
import { useTranslation } from "react-i18next";
import EventFilter from "./eventFilter";
import { useState } from "react";
import SortingFilter from "../../components/sortingFilter";

const tripsData = [
  {
    trip_no: "TRIP 1",
    phone_no: "1234567890",
    address: "123, ABC Street, XYZ City",
    duration: "4hrs",
    distance: "10 miles",
    time: "May 07, 2024 - 10:00 AM",
    totalEvents: 5,
  },
  {
    trip_no: "TRIP 2",
    phone_no: "1234567890",
    address: "123, ABC Street, XYZ City",
    duration: "4hrs",
    distance: "10 miles",
    time: "May 07, 2024 - 10:00 AM",
    totalEvents: 5,
  },
  {
    trip_no: "TRIP 3",
    phone_no: "1234567890",
    address: "123, ABC Street, XYZ City",
    duration: "4hrs",
    distance: "10 miles",
    time: "May 07, 2024 - 10:00 AM",
    totalEvents: 5,
  },
  {
    trip_no: "TRIP 4",
    phone_no: "1234567890",
    address: "123, ABC Street, XYZ City",
    duration: "4hrs",
    distance: "10 miles",
    time: "May 07, 2024 - 10:00 AM",
    totalEvents: 5,
  },
  {
    trip_no: "TRIP 5",
    phone_no: "1234567890",
    address: "123, ABC Street, XYZ City",
    duration: "4hrs",
    distance: "10 miles",
    time: "May 07, 2024 - 10:00 AM",
    totalEvents: 5,
  },
  {
    trip_no: "TRIP 6",
    phone_no: "1234567890",
    address: "123, ABC Street, XYZ City",
    duration: "4hrs",
    distance: "10 miles",
    time: "May 07, 2024 - 10:00 AM",
    totalEvents: 5,
  },
  {
    trip_no: "TRIP 7",
    phone_no: "1234567890",
    address: "123, ABC Street, XYZ City",
    duration: "4hrs",
    distance: "10 miles",
    time: "May 07, 2024 - 10:00 AM",
    totalEvents: 5,
  },
]

const ScreenVehicleMap = () => {

  const [showSortingDropdown, setShowSortingDropdown] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState("Latest First");
  const { t } = useTranslation("translation", { keyPrefix: "vehicleMap" });
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );

  const isFetchingOrgVehicles = false;
  return (
    <>
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex rounded-lg h-[calc(100vh-7rem)] overflow-hidden relative">
        <div
            className={`flex flex-col w-72${ // hidden xl:block
              isFetchingOrgVehicles ? " opacity-40 pointer-events-none" : ""
              } bg-gray-100`}
          >
            <div className="px-4 mt-4">
              <AdminFormFieldDropdown 
                label={t('selected_vehicle')}
                id="vehicleId"
                name="vehicleId"
                options={[]}
                value={""}
                onChange={() => {}}
              />
            </div>
              <div className="flex justify-between p-4 items-center">
                <p className="font-medium text-lg leading-6">Trips</p>
                <div className="flex gap-6 relative">
                  <img src={FilterIcon} alt="filter-icon" className="cursor-pointer" onClick={() => {dispatch(setModalsData({ ...modalsState, showVehicleFilter: true }));}}/>
                  {/* <img src={SortIcon} alt="sort-icon" className="cursor-pointer" onClick={() => {dispatch(setModalsData({ ...modalsState, showEventFilter: true }));}}/> */}
                  <img src={SortIcon} alt="sort-icon" className="cursor-pointer" onClick={() => setShowSortingDropdown(!showSortingDropdown)}/>
                  <SortingFilter showSortingDropdown={showSortingDropdown} selectedSorting={selectedSorting} setSelectedSorting={(item) => setSelectedSorting(item)}/>
                </div>
              </div>
              <VehicleFilter />
              <EventFilter />
              <div className="mt-4 flex-grow overflow-auto">
                {tripsData.map((trip, index) => (
                  <TripDetails key={index} tripData={trip} onClick={() => {dispatch(setModalsData({ ...modalsState, showVehicleDetails: true }));}}/>
                ))}
              </div>
            </div>
            <div className="flex-grow relative">
            {/* {!isFetchingOrgVehicles && !mapStateTransitionInProgress ? (
              <BasicMap
                className="bg-gray-200 h-full w-full"
                mapRef={mapRef}
                mapData={mapState?.mapData}
                // setMapData={() => {}}
                onMapReady={() => {}}
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center relative">
                <MapLoadingAnimation
                  bgClassName="bg-gray-200"
                  bgOpacityClassName="bg-opacity-100"
                />
                {APP_CONFIG.DEBUG.MAPS && (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-8">
                  <h4 className="font-bold text-lg text-black">{!mapState?.mapData || Object.keys(mapState?.mapData).length < 2 ? 'Map data not received' : ''}</h4>
                </div>)}
              </div>
            )} */}
            <VehicleDetails vehicleId="4e025c2-0025-4982-ae76-e33643354caa"/> // TODO implement API's for this
            </div>
        </div>
      </div>
    </>
  );
}

export default ScreenVehicleMap;