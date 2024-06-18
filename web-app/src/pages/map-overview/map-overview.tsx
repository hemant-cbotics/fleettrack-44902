import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useOrganizationVehiclesQuery } from "../../api/network/adminApiServices";
import { setMapStateData, setModalsData, TModalsState } from "../../api/store/commonSlice";
import { OrganizationEntityListingPayload } from "../../api/types/Admin";
import FilterIcon from "../../assets/svg/filter-icon.svg";
import GroupFilterIcon from "../../assets/svg/group-filter-icon.svg";
import SortIcon from "../../assets/svg/sort-icon.svg";
import { mapVehicleIconWrapped } from "../../assets/svg/vehicle-wrapped";
import BasicMap, { MapLoadingAnimation } from "../../components/maps/basicMap";
import MapVehicleListingColumnItem from "../../components/mapVehicleListingColumnItem";
import AppSearchBox from "../../components/searchBox";
import TickCheckbox from "../../components/tickCheckbox";
import { APP_CONFIG } from "../../constants/constants";
import { TMapLayerOptions, TMapState, TMapType } from "../../types/map";
import { useLoggedInUserData } from "../../utils/user";
import { mapVehicleDisplayTitle } from "./common";
import { dummyCoords } from "./dummyData";
import { mapOperations, mapUpdatesHandler, mapVehicleStateIconSlug } from "./map";
import MapFilter from "./mapFilter";
import { TDataPoint, TMapData, TMapRef } from "./type";
import VehicleDetails from "./vehicleDetails";
import VehicleFilter from "./vehiclesFilter";
import SearchIcon from "../../assets/svg/search-icon.svg";
import MapLayersIcon from "../../assets/svg/map-layers.svg";
import LayerFilters from "./layerFilters";
import SortingFilter from "../../components/sortingFilter";
import { AdminFormFieldAsyncDropdown, TSelectboxOption } from "../../components/admin/formFields";
import { useLazyAutosuggestAddressQuery, useLazyGeocodeQuery } from "../../api/network/mapApiServices";
import { TAutosuggestOptionValue } from "./type";

const ScreenMapOverview = () => {
  const { deviceId } = useParams<{ deviceId: any }>();
  const { t } = useTranslation("translation", { keyPrefix: "mapOverview" });
  const { t: tAdmin } = useTranslation("translation", { keyPrefix: "dashboard.sidemenu.admins" });
  const { t: tMain } = useTranslation();
  const [selectedGroups, setSelectedGroups] = useState<string>();
  const navigate = useNavigate();
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);
  const [selectedSorting, setSelectedSorting] = useState("Latest First");

  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();

  const modalsState: TModalsState = useSelector(
    (state: any) => state.commonReducer.modals
  );

  const [selectedVehicle, setSelectedVehicle] = useState<string | null>();
  const [checkedVehicles, setCheckedVehicles] = useState<string[]>([]);

  // update map data on checked vehicles change
  useEffect(() => {
    mapUpdatesHandler(
      getMapOpsProps(),
      'checkedUpdated',
      checkedVehicles
    );
  }, [checkedVehicles]);

  // handle vehicle selection
  const selectMapVehicle = (vehicleId: string | null) => {
    // center map to all selected vehicles
    if(vehicleId === null) {
      mapUpdatesHandler(
        getMapOpsProps(),
        'centerToPushpin',
        checkedVehicles
      );
    }
    // center map to selected vehicle and update the vehicle icon to focussed state
    setSelectedVehicle(prevVehicleId => {
      mapUpdatesHandler(
        getMapOpsProps(),
        'focusPushpin',
        { id: prevVehicleId ?? selectedVehicle, focus: false }
      );
      if (prevVehicleId === vehicleId) {
        dispatch(setModalsData({ ...modalsState, showVehicleDetails: false }))
        return null;
      }
      return vehicleId;
    });
  }

  // update map view on vehicle selection
  useEffect(() => {
    if (!!selectedVehicle) {
      dispatch(setModalsData({
        ...modalsState,
        showLayerFilter: false,
        showVehicleFilter: false,
        showVehicleDetails: true
      }))
      mapUpdatesHandler(
        getMapOpsProps(),
        'focusPushpin',
        { id: selectedVehicle, focus: true }
      );
    }
  }, [selectedVehicle]);

  // reset selectedVehicle state on modal close
  useEffect(() => {
    if (!modalsState.showVehicleDetails) {
      selectMapVehicle(null);
    }
  }, [modalsState.showVehicleDetails]);

  // preparing query params
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgVehiclesQueryParams, setOrgVehiclesQueryParams] = React.useState<OrganizationEntityListingPayload>({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: 30, // APP_CONFIG.LISTINGS.DEFAULT_PAGE_SIZE,
    search: "",
    is_active: "both",
  });
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setOrgVehiclesQueryParams((prev) => { return { ...prev, page: 1, search: value }});
    selectMapVehicle(null);
  }, 500);

  const {
    data: dataOrgVehicles,
    isFetching: isFetchingOrgVehicles,
    error
  } =
    useOrganizationVehiclesQuery(orgVehiclesQueryParams, { skip: !mapState?.mapScriptLoaded });
  
  const [dataPoints, setDataPoints] = useState<TDataPoint[]>([]);

  // helper function to get map operations props
  const getMapOpsProps = useCallback(() => {
    return {
      mapRef,
      mapData: { ...mapState?.mapData } as TMapData,
      mapLayerOptions: mapState?.mapLayerOptions as TMapLayerOptions,
      setMapData: () => {},
      dataPoints,
    };
  }, [mapState, dataPoints]);

  // show address searchbox
  const [showAddressSearchbox, setShowAddressSearchbox] = useState(false);
  const debouncedSetSearchAddress = useDebouncedCallback((value: string) => {
    // setOrgVehiclesQueryParams((prev) => { return { ...prev, page: 1, search: value }});
    // selectMapVehicle(null);
  }, 500);
  const [autosuggestQuery, { isFetching: isFetchingAutosuggest }] = useLazyAutosuggestAddressQuery()

  const loadOptionsHandlerAutosuggest =
  // TODO: enable debouncing, currently causing issues with autosuggest
  // useDebouncedCallback(
    async (inputValue: string) => {
      const autosuggestResponse = await autosuggestQuery(inputValue)
      if(APP_CONFIG.DEBUG.MAPS) console.log('autosuggestResponse', autosuggestResponse)
      const { data } = autosuggestResponse;
      const firstResultSet = data?.resourceSets?.[0];
      const options = !!firstResultSet?.estimatedTotal && firstResultSet?.estimatedTotal > 0
        ? firstResultSet?.resources?.[0]?.value?.map((item) => {
            const labelText = item?.name ?? `${item?.address?.formattedAddress} - ${item?.address?.countryRegion}`; // TODO: standardize
            return {
              value: JSON.stringify({ labelText, itemJSON: item } as TAutosuggestOptionValue),
              label: labelText, // to show icon, add ${item.__type === 'LocalBusiness' ? '💲' : '📍'}
            } as TSelectboxOption
          })
        : [];
      const newAutosuggestResults = firstResultSet?.resources?.[0]?.value ?? [];
      if(APP_CONFIG.DEBUG.MAPS) console.log('newAutosuggestResults', newAutosuggestResults)
      return options;
    }
  // , 500);

  const [geocodeQuery, { isFetching: isFetchingGeocode }] = useLazyGeocodeQuery();

  const handleAutosuggestChange = async (e: any) => {
    const newlySelectedLocation = e?.value;
    if(!!!newlySelectedLocation) return;
    const newlySelectedLocationJSON = JSON.parse(e.value) as TAutosuggestOptionValue;
    if(APP_CONFIG.DEBUG.MAPS) console.log('newlySelectedLocation', newlySelectedLocation);
    if(APP_CONFIG.DEBUG.MAPS) console.log('newlySelectedLocationJSON', newlySelectedLocationJSON);
    const geocodeResponse = await geocodeQuery(
      newlySelectedLocationJSON.itemJSON.address
    );
    if(APP_CONFIG.DEBUG.MAPS) console.log('geocodeResponse', geocodeResponse);
    const newlySelectedLocationCoords = geocodeResponse.data?.resourceSets?.[0]?.resources?.[0]?.point?.coordinates;
    if(APP_CONFIG.DEBUG.MAPS) console.log('newlySelectedLocationCoords', newlySelectedLocationCoords);
    if(!!newlySelectedLocationCoords?.[0] && !!newlySelectedLocationCoords?.[1]) {

      // center map to newly selected location
      mapUpdatesHandler(
        getMapOpsProps(),
        'centerToCoords',
        {
          center: newlySelectedLocationCoords,
          zoom: 6,
        }
      );

    } else {
      console.error('GEOCODE RESPONSE ISSUE - no coordinates')
    }
  }

  // common map ref to be used for various map operations
  const mapRef = React.useRef<TMapRef>({
    map: null,
    objects: {
      mPushpins: [],
      mClusterLayer: null,
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
      setCheckedVehicles(dataOrgVehicles?.results?.map((item) => item.id) ?? []);
      loadResetMapDataWithInitialValues();
    }
  }, [dataOrgVehicles, isFetchingOrgVehicles]);

  // carry out map operations on map ready
  const handleMapReady =
  useCallback(
  () => {
    mapOperations(
      {
        ...getMapOpsProps(),
        onDataPointPushpinClick: (dataPoint: TDataPoint) => {
          selectMapVehicle(
            selectedVehicle === dataPoint.id
            ? null
            : dataPoint.id
          );
        }
      },
      checkedVehicles
    );
  }, [mapState, dataPoints, checkedVehicles, selectedVehicle]); // instead of [mapState?.mapData]

  const handleChangeCheckAllVehicles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedVehicles(dataPoints.map((item) => item.id));
    } else {
      setCheckedVehicles([]);
    }
  };

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

  // TODO: display active and inactive both vehicles on map

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
            <div className="flex justify-between p-4 items-center">
              <div className="flex bg-blue-200 py-2 px-3 rounded-lg gap-2 cursor-pointer" onClick={() => {}}> {/* TODO: this needs to be changed */}
                <p className="font-medium text-lg leading-6">{tAdmin("groups")}</p>
                <img src={GroupFilterIcon} alt="group-filter-icon"/>
              </div>
              <div className="flex gap-6 relative">
                <img src={FilterIcon} alt="filter-icon" className="cursor-pointer" onClick={() => {
                  dispatch(setModalsData({
                    ...modalsState,
                    showVehicleDetails: false,
                    showLayerFilter: false,
                    showVehicleFilter: true
                  }));
                }}/>
                <img src={SortIcon} alt="sort-icon" className="cursor-pointer" onClick={() => setShowSortingDropdown(!showSortingDropdown)}/>
                <SortingFilter showSortingDropdown={showSortingDropdown} selectedSorting={selectedSorting} setSelectedSorting={(item) => setSelectedSorting(item)}/>
              </div>
            </div>
            <div className="flex px-4 gap-3">
              <TickCheckbox
                id={`checkAllVehicles`}
                isChecked={checkedVehicles.length === dataPoints?.length}
                handleChange={handleChangeCheckAllVehicles}
                onClick={(e) => e.stopPropagation()}
              />
              <label
                htmlFor={`checkAllVehicles`}
                className="font-semibold text-sm leading-6 text-gray-900 cursor-pointer">
                {tMain("select_all")}
              </label>
            </div>
            <VehicleFilter />
            {/* <div className="px-3 font-bold text-lg leading-6">
              {t("listing_heading")}
            </div> */}
            <div className="mt-4 flex-grow overflow-auto">
              {dataPoints.length > 0 ? (
                <>{dataPoints
                  ?.map((dataPoint, index: number) => (
                  <MapVehicleListingColumnItem
                    key={index}
                    asideText={
                      <span className={`flex items-center justify-end gap-1 leading-3 text-[10px] ${dataPoint.is_active ? "text-field-success" : "text-field-error-dark"}`}>
                        {t(
                          dataPoint.coords.length > 2
                          ? "vehicleStatus.driving"
                          : dataPoint.is_active
                            ? "vehicleStatus.idle_active"
                            : "vehicleStatus.idle_inactive"
                        )}
                        <div dangerouslySetInnerHTML={{ __html:
                          dataPoint.coords.length > 2 // TODO: change this check
                            ? mapVehicleIconWrapped(
                                'driving',
                                false,
                                45
                              )
                            : mapVehicleIconWrapped(
                                mapVehicleStateIconSlug(dataPoint)
                              )
                        }} />
                      </span>
                    }
                    bottomText={`${dataPoint.licence_plate}`}
                    checked={checkedVehicles.includes(dataPoint.id)}
                    description={dataPoint.vin}
                    id={`checkedVehicle-${dataPoint.id}`}
                    onClickCheckbox={() => {
                      if (checkedVehicles.includes(dataPoint.id)) {
                        setCheckedVehicles(
                          checkedVehicles.filter((id: any) => id !== dataPoint.id)
                        );
                        // hide vehicle details popup if unchecked
                        dispatch(setModalsData({ ...modalsState, showVehicleDetails: false }));
                      } else {
                        setCheckedVehicles([...checkedVehicles, dataPoint.id]);
                      }
                    }}
                    onClick={() => {
                      if(!checkedVehicles.includes(dataPoint.id)) {
                        // select the vehicle if not already selected
                        setCheckedVehicles([...checkedVehicles, dataPoint.id]);
                      }
                      selectMapVehicle(dataPoint.id);
                    }}
                    title={mapVehicleDisplayTitle(dataPoint)}
                    selected={selectedVehicle === dataPoint.id}
                  />
                ))}</>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400 text-lg font-bold">{tMain("no_items_found")}</p>
                </div>
              )}
            </div>
          </div>
          <div className="flex-grow relative map-overview-map-wrapper">
            {!isFetchingOrgVehicles && !mapStateTransitionInProgress ? (
              <>
                <BasicMap
                  className="bg-gray-200 h-full w-full"
                  mapRef={mapRef}
                  mapData={mapState?.mapData}
                  // setMapData={() => {}}
                  onMapReady={handleMapReady}
                />
                {!!mapState?.mapData?.ready && (<div className="absolute flex gap-2 top-5 right-5 z-[999]">
                  {
                    showAddressSearchbox ? (
                      <AdminFormFieldAsyncDropdown
                        loadingData={isFetchingAutosuggest}
                        label={''}
                        id="search_address"
                        name="search_address"
                        noOptionsMessage={() => t("search_address_no_items")}
                        placeholder={t("search_address_placeholder")}
                        loadOptions={loadOptionsHandlerAutosuggest}
                        onChange={handleAutosuggestChange}
                        detailsFormField={true}
                        customWrapperClass="relative w-72"
                        searchStyle={true}
                        searchStyleOnClear={() => {
                          setShowAddressSearchbox(false);
                          // reset map to default view
                          mapUpdatesHandler(
                            getMapOpsProps(),
                            'centerToPushpin',
                            checkedVehicles
                          );
                        }}
                      />
                    ) : (
                      <button
                        className="bg-white hover:bg-gray-100 flex items-center justify-center w-8 h-8 rounded-md shadow-md"
                        type="button"
                        onClick={() => setShowAddressSearchbox(true)}>
                        <img className="size-4 grayscale opacity-70" src={SearchIcon} alt="" />
                      </button>
                    )
                  }
                  <button
                    className="bg-white hover:bg-gray-100 flex items-center justify-center w-8 h-8 rounded-md shadow-md"
                    type="button"
                    onClick={() => {
                      dispatch(setModalsData({
                        ...modalsState,
                        showVehicleDetails: false,
                        showVehicleFilter: false,
                        showLayerFilter: true
                      }));
                    }}>
                    <img className="size-[22px] grayscale opacity-70 translate-y-[1px]" src={MapLayersIcon} alt="" />
                  </button>
                </div>)}
              </>
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
            <VehicleDetails
              vehicleId={selectedVehicle}
              vehicleData={dataPoints.find((vehicle) => vehicle.id === selectedVehicle)}
            />
            <LayerFilters
              onMapTypeChange={handleMapTypeChange}
              onMapLayerChange={handleMapLayerChange}
            />
          </div>
        </div>
      </div>
      <MapFilter />
    </>
  );
};

export default ScreenMapOverview;
