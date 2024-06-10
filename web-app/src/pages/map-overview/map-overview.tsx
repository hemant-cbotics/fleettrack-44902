import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useOrganizationVehiclesQuery } from "../../api/network/adminApiServices";
import { setMapStateData, setModalsData, TModalsState } from "../../api/store/commonSlice";
import { OrganizationEntityListingPayload } from "../../api/types/Admin";
import AdminListingColumnItem from "../../components/adminListingColumnItem";
import BasicMap, { MapLoadingAnimation } from "../../components/maps/basicMap";
import AppSearchBox from "../../components/searchBox";
import { APP_CONFIG } from "../../constants/constants";
import { TMapState } from "../../types/map";
import { useLoggedInUserData } from "../../utils/user";
import { dummyCoords } from "./dummyData";
import GroupList from "./groupList";
import { mapOperations } from "./map";
import MapFilter from "./mapFilter";
import { TDataPoint, TMapData, TMapRef } from "./type";

const ScreenMapOverview = () => {
  const { deviceId } = useParams<{ deviceId: any }>();
  const { t } = useTranslation("translation", { keyPrefix: "mapOverview" });
  const [selectedGroups, setSelectedGroups] = useState<string>();
  const navigate = useNavigate();

  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );

  // preparing query params
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgVehiclesQueryParams, setOrgVehiclesQueryParams] = React.useState<OrganizationEntityListingPayload>({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: 30, // APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: "",
    is_active: "active"
  });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgVehiclesQueryParams((prev) => { return { ...prev, page: 1, search: value }});
  }, 500);

  const {
    data: dataOrgVehicles,
    isFetching: isFetchingOrgVehicles,
    error
  } =
    useOrganizationVehiclesQuery(orgVehiclesQueryParams, { skip: !mapState?.mapScriptLoaded });
  
  const [dataPoints, setDataPoints] = useState<TDataPoint[]>([]);

  // common map ref to be used for various map operations
  const mapRef = React.useRef<TMapRef>({
    map: null,
    objects: {
      mPushpins: [],
    },
  });

  const [mapStateTransitionInProgress, setMapStateTransitionInProgress] = useState(false);

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
    if(!!dataOrgVehicles && !isFetchingOrgVehicles) {
      setDataPoints(
        dataOrgVehicles?.results
          ?.map((vehicleItem, index: number) => ({
            ...vehicleItem,
            coords: dummyCoords?.[index] ?? dummyCoords[0],
          }))
      );
      loadResetMapDataWithInitialValues();
    }
  }, [dataOrgVehicles, isFetchingOrgVehicles]);

  // carry out map operations on map ready
  const handleMapReady =
  useCallback(
  () => {
    mapOperations({
      mapRef,
      mapData: { ...mapState?.mapData } as TMapData,
      setMapData: () => {},
      dataPoints,
    })
    // if(mapState?.mapData?.centerPosition?.latitude === 0) {
    //   console.error('MAP DATA ISSUE - lat = 0')
    // } else {
    //   console.log('>> sending map operations', JSON.stringify({ ...mapState?.mapData }))
    //   const applicableMapOperations =
    //     values.zone_type === 'Route'
    //       ? mapOperationsRoute
    //     : values.zone_type === 'Polygon'
    //       ? mapOperationsPolygon
    //       : mapOperationsCircle;
    //   applicableMapOperations({
    //     mapRef,
    //     mapData: { ...mapState?.mapData },
    //     setMapData: (newMapData: TGeozoneMapData) => {
    //       const mapDataToSave = { ...newMapData } as TGeozoneMapData;
    //       delete mapDataToSave.ready;
    //       delete mapDataToSave.editable;
    //       console.log('[setMapData] via handleMapReady - dispatch(setMapStateData({...', JSON.stringify(mapState))
    //       dispatch(setMapStateData({
    //         ...mapState,
    //         mapData: {
    //           ...mapState?.mapData,
    //           ...newMapData,
    //         },
    //         mapDataForAPIs: { ...mapDataToSave } as TGeozoneMapDataForAPIs,
    //       }));
    //     },
    //   })
    // }
  }, [mapState?.mapData]);

  return (
    <>
      {/* <HeaderView
        title={t("heading")}
        filterChange={() => {
          dispatch(setModalsData({ ...modalsState, showMapFilter: true }));
        }}
        groupSelectorCallback={() => {
          dispatch(setModalsData({ ...modalsState, showGroupSelector: true }));
        }}
      /> */}
      {/* <GroupSelectorModal filteredGroupData={filteredGroupData} setFilteredGroupData={setFilteredGroupData} /> */}
      <div className={`${APP_CONFIG.DES.DASH.P_HORIZ} py-2`}>
        <div className="flex rounded-lg h-[calc(100vh-7rem)] overflow-hidden relative">
          <div
            className={`flex flex-col w-72${ // hidden xl:block
              isFetchingOrgVehicles ? " opacity-40 pointer-events-none" : ""
              } bg-gray-100`}
          >
            <div className="px-4 mt-4">
              <AppSearchBox
                placeholder={t("search_placeholder")}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  debouncedSetSearchKeyword(e.target.value)
                }
                onClear={() => {
                  debouncedSetSearchKeyword("")
                }}
              />
            </div>
            {/* <div className="px-3 font-bold text-lg leading-6">
              {t("listing_heading")}
            </div> */}
            <div className="mt-4 flex-grow overflow-auto">
              {dataPoints
                ?.map((vehicleItem, index: number) => (
                <AdminListingColumnItem
                  key={index}
                  onClick={() => {}}
                  title={`${vehicleItem.vehicle_model} ${vehicleItem.vehicle_make}`}
                  description={vehicleItem.vin}
                  asideText={'Driving'}
                  bottomText={`${vehicleItem.licence_plate}`}
                />
                // <GroupList
                //   key={index}
                //   name={item.name}
                //   color="red"
                //   noOfVehicles={item.listOfVehicles.length}
                //   openByDefault={index === 0 ? true : false}
                // >
                //   {item.listOfVehicles
                //     ?.map((vehicle: any, index: number) => (
                //       <div
                //         key={index}
                //         className={`border-b px-3 py-2 border-gray-200 cursor-pointer ${
                //           deviceId === vehicle.id ? "bg-blue-200" : ""
                //           }`}
                //         onClick={() => { dispatch(setModalsData({ ...modalsState, showDeviceReport: true })); }}>
                //         <div className="grid grid-cols-4">
                //           <div className="col-span-3 flex space-x-2">
                //             <div className="flex items-center">
                //               {/* <img src={DeviceIcon} alt={`device-img${vehicle.id}`} className="p-2 bg-gray-200 rounded-full"/> */}
                //               <input
                //                 type="checkbox"
                //                 className="size-4 rounded border-gray-300 disabled:bg-gray-200 disabled:border-gray-300"
                //                 id={vehicle.id}
                //                 onChange={() => { }}
                //               />
                //             </div>
                //             <div>
                //               <p className="font-semibold text-sm leading-6 text-blue-900">
                //                 {vehicle.name}
                //               </p>
                //               <p className="font-normal text-xs leading-6 text-gray-500">
                //                 {vehicle.description}
                //               </p>
                //               <p className="font-normal text-base leading-6 text-gray-700">
                //                 {vehicle.vin}
                //               </p>
                //             </div>
                //           </div>
                //           <div className="col-span-1 font-bold text-xs leading-4 text-right text-green-700 space-y-1">
                //             {vehicle.is_active ? "Active" : "Inactive"}
                //           </div>
                //         </div>
                //       </div>
                //     ))
                //   }
                // </GroupList>
              ))}
            </div>
          </div>
          <div className="flex-grow relative">
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
          </div>
        </div>
      </div>
      <MapFilter />
    </>
  );
};

export default ScreenMapOverview;
