import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useLazyOrganizationVehiclesQuery, useOrganizationVehiclesQuery, useSingleOrganizationVehicleQuery } from "../../api/network/adminApiServices";
import { setMapStateData, setModalsData, TModalsState } from "../../api/store/commonSlice";
import { OrganizationEntityListingPayload } from "../../api/types/Admin";
import { OrganizationVehicle } from "../../api/types/Vehicle";
import FilterIcon from "../../assets/svg/filter-icon.svg";
import MapLayersIcon from "../../assets/svg/map-layers.svg";
import SortIcon from "../../assets/svg/sort-icon.svg";
import { AdminFormFieldAsyncDropdown, PseudoSelect, TSelectboxOption } from "../../components/admin/formFields";
import BasicMap, { MapLoadingAnimation } from "../../components/maps/basicMap";
import SortingFilter from "../../components/sortingFilter";
import { APP_CONFIG } from "../../constants/constants";
import { routeUrls } from "../../navigation/routeUrls";
import { TLatLng, TMapLayerOptions, TMapState, TMapType } from "../../types/map";
import { useLoggedInUserData } from "../../utils/user";
import { mapVehicleDisplayTitle } from "../map-overview/common";
import { dummyCoords } from "../map-overview/dummyData";
import { dummyVehicleData } from "./dummyData";
import LayerFilters from "../map-overview/layerFilters";
import VehicleDetails from "../map-overview/vehicleDetails";
import VehicleFilter from "../map-overview/vehicleFilters";
import EventFilter from "./eventFilter";
import TripDetails from "./tripDetails";
import { TMapData, TMapRef, TMemoizedMapOperationsProps, TVehicleDataPoint } from "./type";
import { mapOperations } from "./map";

const tripsData = [
  {
    trip_no: "Trip 1",
    phone_no: "(215) 248-13378205",
    address: "25 Gilbert St, Philadelphia, Pennsylvania (PA), 19150",
    duration: "4hrs",
    distance: "10 miles",
    time: "May 07, 2024 - 10:00 AM",
    totalEvents: 5,
  },
  {
    trip_no: "Trip 2",
    phone_no: "(248) 133-78205",
    address: "14 Haines St, Philadelphia, Pennsylvania (PA), 19118",
    duration: "3hrs",
    distance: "8 miles",
    time: "May 09, 2024 - 11:00 AM",
    totalEvents: 2,
  },
  {
    trip_no: "Trip 3",
    phone_no: "(610) 433-78205",
    address: "5 E Gravers Ln, Miami, Florida (FL), 33133",
    duration: "16hrs",
    distance: "24 miles",
    time: "May 12, 2024 - 09:00 AM",
    totalEvents: 9,
  },
  {
    trip_no: "Trip 4",
    phone_no: "(208) 548-78205",
    address: "91 W Allens Ln, Kansas City, Missouri (MO), 64114",
    duration: "10hrs",
    distance: "16 miles",
    time: "May 25, 2024 - 08:00 AM",
    totalEvents: 6,
  },
]

const ScreenVehicleMap = () => {
  const { vehicleId } = useParams<{ vehicleId: any }>();
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState("Latest First");
  const { t } = useTranslation("translation", { keyPrefix: "vehicleMap" });
  const navigate = useNavigate();
  
  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );

  // fetch single vehicle details
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const {
    data: dataSingleVehicle,
    isFetching: isFetchingSingleVehicle
  } = useSingleOrganizationVehicleQuery(
    {
      organization_id: thisUserOrganizationId,
      vehicle_id: vehicleId
    },
    { skip: !vehicleId }
  );

  // preparing query params
  const [orgVehiclesQueryParams, setOrgVehiclesQueryParams] = React.useState<OrganizationEntityListingPayload>({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: "",
    is_active: "active",
  });

  const {
    data: dataOrgVehicles,
    isFetching: isFetchingOrgVehicles,
    error
  } =
    useOrganizationVehiclesQuery(orgVehiclesQueryParams, { skip: !mapState?.mapScriptLoaded });
  
  // common map ref to be used for various map operations
  const mapRef = React.useRef<TMapRef>({
    map: null,
    objects: {
      mPushpins: [],
      mClusterLayer: null,
    },
  });

  const [mapStateTransitionInProgress, setMapStateTransitionInProgress] = useState(false);

  const [filteredDataPoints, setFilteredDataPoints] = useState<TVehicleDataPoint[]>([]);

  const loadResetMapDataWithInitialValues = () => {
    console.log('[loadResetMapDataWithInitialValues]');
    setMapStateTransitionInProgress(true)
    const newMapState: TMapState = {
      ...mapState,
      mapCenter: APP_CONFIG.MAPS.DEFAULTS.CENTER,
      mapData: {
        centerPosition: APP_CONFIG.MAPS.DEFAULTS.CENTER,
        ready: true,
      },
    }
    console.log('newMapState', newMapState)
    setTimeout(() => {
      dispatch(setMapStateData(newMapState));
      setMapStateTransitionInProgress(false);
    }, 200);
  }

  // set map data on page load
  useEffect(() => {
    if(!!dataSingleVehicle && !isFetchingSingleVehicle) {
      const randomVehicleCoords = dummyCoords[Math.floor(Math.random() * 10)];
      const randomDataPoints = dummyVehicleData({ latitude: randomVehicleCoords[0], longitude: randomVehicleCoords[1] } as TLatLng)
      setDataPoints(randomDataPoints);
      setFilteredDataPoints(randomDataPoints); // TODO: update / filter data points based on selected filters
      loadResetMapDataWithInitialValues();
    }
  }, [dataSingleVehicle, isFetchingSingleVehicle]);

  const [dataPoints, setDataPoints] = useState<TVehicleDataPoint[]>([]);

  // helper function to get map operations props
  const getMapOpsProps: TMemoizedMapOperationsProps = useCallback(() => {
    return {
      mapRef,
      mapState,
      mapData: { ...mapState?.mapData } as TMapData,
      mapLayerOptions: mapState?.mapLayerOptions as TMapLayerOptions,
      setMapData: () => {},
      dataPoints,
      // onViewChangeEnd: (center, zoom) => {
      //   if(APP_CONFIG.DEBUG.MAPS) console.log("onViewChangeEnd", center, zoom);
      //   dispatch(setMapStateData({
      //     ...mapState,
      //     mapCenter: center,
      //     mapZoom: zoom,
      //     mapData: {
      //       ...mapState.mapData,
      //       centerPosition: center
      //     }
      //   }));
      // },
    };
  }, [mapState, dataPoints]);

  // carry out map operations on map ready
  const handleMapReady =
  useCallback(
  () => {
    mapOperations(
      {
        ...getMapOpsProps(),
        // onDataPointPushpinClick: (dataPoint: TVehicleDataPoint) => {
        //   selectMapVehicle(
        //     selectedVehicle === dataPoint.id
        //     ? null
        //     : dataPoint.id
        //   );
        // }
      },
      filteredDataPoints
    );
  }, [mapState, dataPoints, filteredDataPoints]); // instead of [mapState?.mapData]

  const [searchedVehiclesQuery, { isFetching: isFetchingSearchedVehicles }] = useLazyOrganizationVehiclesQuery()

  const vehicleDropdownOption = (vehicleItem: OrganizationVehicle) => {
    const labelText = mapVehicleDisplayTitle(vehicleItem);
    return {
      value: vehicleItem.id,
      label: labelText,
    } as TSelectboxOption
  }

  const loadOptionsHandlerAutosuggest =
  // TODO: enable debouncing, currently causing issues with autosuggest
  // useDebouncedCallback(
    async (inputValue: string) => {
      console.log('>>>', inputValue)
      if(inputValue.length < 3) return dataOrgVehicles?.results?.map(
        (vehicleItem) => vehicleDropdownOption(vehicleItem)
      );
      const searchedVehiclesResponse = await searchedVehiclesQuery({
        ...orgVehiclesQueryParams,
        search: inputValue,
        is_active: "both",
      });
      if(APP_CONFIG.DEBUG.ALL) console.log('searchedVehiclesResponse', searchedVehiclesResponse)
      const { data } = searchedVehiclesResponse;
      const options = !!data?.results.length
        ? data?.results?.map(
            (searchedVehicleItem) =>
              vehicleDropdownOption(searchedVehicleItem)
          )
        : [];
      return options;
    }
  // , 500);

  const handleSelectedVehicleChange = (selectedOption: TSelectboxOption | null) => {
    if(APP_CONFIG.DEBUG.ALL) console.log('handleSelectedVehicleChange', selectedOption)
    navigate(`${routeUrls.dashboardChildren.mapsChildren.vehicle}/${selectedOption?.value}`)
  }

  const handleMapTypeChange = (mapType: TMapType) => {
    dispatch(setMapStateData({
      ...mapState,
      mapType,
    }));
    setMapStateTransitionInProgress(true);
    setTimeout(() => {
      setMapStateTransitionInProgress(false);
    }, 100);
  }

  const handleMapLayerChange = (mapLayerOptions: TMapLayerOptions) => {
    setMapStateTransitionInProgress(true);
    setTimeout(() => {
      dispatch(setMapStateData({
        ...mapState,
        mapLayerOptions,
      }));
      setMapStateTransitionInProgress(false);
    }, 100);
  }

  return (
    <>
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex rounded-lg h-[calc(100vh-7rem)] overflow-hidden relative">
          <div className={`flex flex-col w-72${ // hidden xl:block
            isFetchingOrgVehicles ? " opacity-40 pointer-events-none" : ""
            } bg-gray-100`}>

            {/* Vehicle selection */}
            <div className="px-4 mt-4">
              {/* <pre className="text-xs h-24 overflow-auto">
                {JSON.stringify(dataSingleVehicle, null, 2)}
              </pre> */}
              {isFetchingOrgVehicles
              || isFetchingSingleVehicle
              || mapStateTransitionInProgress
              || !dataSingleVehicle ? (
                <PseudoSelect label={t('selected_vehicle')} />
              ) : (
                <AdminFormFieldAsyncDropdown 
                  loadingData={isFetchingSearchedVehicles}
                  label={t('selected_vehicle')}
                  id="selected_vehicle"
                  name="selected_vehicle"
                  noOptionsMessage={() => t('selected_vehicle_no_options')}
                  defaultOption={vehicleDropdownOption(dataSingleVehicle as OrganizationVehicle)}
                  defaultOptions={dataOrgVehicles?.results?.map(
                    (vehicleItem) => vehicleDropdownOption(vehicleItem)
                  )}
                  loadOptions={loadOptionsHandlerAutosuggest}
                  onChange={handleSelectedVehicleChange}
                  detailsFormField={true}
                />
              )}
            </div>

            {/* Filters section */}
            <div className="flex justify-between px-4 pt-4 items-center">
              <p className="font-medium text-lg leading-6">Trips</p>
              <div className="flex gap-6 relative">
                <img src={FilterIcon} alt="filter-icon" className="cursor-pointer" onClick={() => {dispatch(setModalsData({ ...modalsState, showVehicleFilter: true }));}}/>
                {/* <img src={SortIcon} alt="sort-icon" className="cursor-pointer" onClick={() => {dispatch(setModalsData({ ...modalsState, showEventFilter: true }));}}/> */}
                <button className={`p-1 cursor-pointer${showSortingDropdown && " bg-white rounded-lg relative z-modal"}`}>
                  <img src={SortIcon} alt="sort-icon" className=""
                    onClick={() => setShowSortingDropdown(!showSortingDropdown)}
                  />
                </button>
                <SortingFilter
                  showSortingDropdown={showSortingDropdown}
                  setShowSortingDropdown={setShowSortingDropdown}
                  selectedSorting={selectedSorting}
                  setSelectedSorting={(item) => setSelectedSorting(item)}
                />
              </div>
            </div>
            <VehicleFilter />
            <EventFilter />

            {/* Trips list */}
            <div className="mt-4 flex-grow overflow-auto">
              {tripsData.map((trip, index) => (
                <TripDetails key={index} tripData={trip} onClick={() => {dispatch(setModalsData({ ...modalsState, showVehicleDetails: true }));}} />
              ))}
            </div>

          </div>
          <div className="flex-grow relative vehicle-map-wrapper">
            {!isFetchingOrgVehicles && !mapStateTransitionInProgress ? (
              <BasicMap
                className="bg-gray-200 h-full w-full"
                mapRef={mapRef}
                mapData={mapState?.mapData}
                // setMapData={() => {}}
                onMapReady={handleMapReady}
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
            )}
            <VehicleDetails vehicleId="4e025c2-0025-4982-ae76-e33643354caa"/> {/* TODO: this needs to be made dynamic */}
            {!!mapState?.mapData?.ready && (<div className={`absolute flex gap-2 top-5 right-5 z-[${APP_CONFIG.MAPS.CONTROL_BUTTONS_ZINDEX}]`}>
              <button
                className="bg-white hover:bg-gray-100 flex items-center justify-center w-8 h-8 rounded-md shadow-md"
                type="button"
                onClick={() => {
                  dispatch(setModalsData({
                    ...modalsState,
                    showGroupSelector: false,
                    showVehicleFilter: false,
                    showVehicleDetails: false,
                    showLayerFilter: true
                  }));
                }}>
                <img className="size-[22px] grayscale opacity-70 translate-y-[1px]" src={MapLayersIcon} alt="" />
              </button>
            </div>)}
            <LayerFilters
              onMapTypeChange={handleMapTypeChange}
              onMapLayerChange={handleMapLayerChange}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ScreenVehicleMap;