/**
 * -----------------------------------------------------------------------------
 * Geozone Edit Form
 * -----------------------------------------------------------------------------
 * These components are used to render the form for editing the geozone details.
 */
import React, { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminFormFieldAsyncDropdown, AdminFormFieldCheckbox, AdminFormFieldDropdown, AdminFormFieldInput, PseudoSelect, TSelectboxOption } from "../../../components/admin/formFields";
import { OVERLAP_PRIORITY_OPTIONS, ZONE_COLOR_OPTIONS, ZONE_TYPES_OPTIONS } from "./constants";
import { useLoggedInUserData } from "../../../utils/user";
import { useOrganizationGroupsQuery } from "../../../api/network/adminApiServices";
import { OrganizationGroup } from "../../../api/types/Group";
import CloseIcon from "../../../assets/svg/close-icon.svg";
import { geozoneDetailsInitialValues } from "./validation";
import BasicMap, { MapLoadingAnimation } from "../../../components/maps/basicMap";
import {
  mapOperations as mapOperationsPolygon,
  mapUpdatesHandler as mapUpdatesHandlerPolygon
} from "./map-polygon";
import {
  mapOperations as mapOperationsRoute,
  mapUpdatesHandler as mapUpdatesHandlerRoute
} from "./map-route";
import {
  mapOperations as mapOperationsCircle,
  mapUpdatesHandler as mapUpdatesHandlerCircle
} from "./map-circle";
import { TGeozoneMapData, TGeozoneMapDataCircle, TGeozoneMapDataForAPIs, TGeozoneMapDataPolygon, TGeozoneMapDataRoute, TLatLng, TMapState } from "../../../types/map";
import { TAutosuggestOptionValue, TMapOperations, TMapRef, TMapUpdatesHandler } from "./type";
import { useDispatch, useSelector } from "react-redux";
import { APP_CONFIG } from "../../../constants/constants";
import { useDebouncedCallback } from "use-debounce";
import { useLazyAutosuggestAddressQuery, useLazyGeocodeQuery } from "../../../api/network/mapApiServices";
import { BingAutosuggestResItem } from "../../../api/types/Map";
import { geozoneDescriptionDisplayText } from "../../admins/geozones/geozones";
import MapMarkerRed from "../../../assets/svg/map-marker-red.svg";
import MapMarkerBlue from "../../../assets/svg/map-marker-blue.svg";
import { setMapStateData } from "../../../api/store/commonSlice";
import { getCircleLocs } from "../../../utils/map";

export interface GeozoneDetailFormProps {
  values: typeof geozoneDetailsInitialValues;
  errors: any;
  touched: any;
  handleChange: (event: React.ChangeEvent<any>) => void;
  formikSetValue: (field: string, value: any, shouldValidate?: boolean) => void;
  handleBlur: (event: React.FocusEvent<any>) => void;
  formikSetTouched: (
    field: string,
    isTouched?: boolean,
    shouldValidate?: boolean
  ) => void;
  userCanEdit: boolean;
  loadingData: boolean; // true if isFetchingSingleGeozone || !formikValuesReady
}

export const GeozoneDetailForm: FC<GeozoneDetailFormProps> = ({ 
  values,
  errors,
  touched,
  handleChange,
  formikSetValue,
  handleBlur,
  formikSetTouched,
  userCanEdit,
  loadingData,
 }) => {
  const { t } = useTranslation("translation", { keyPrefix: "admins.geozones.detailsPage.form" });
  const userCurrPos: TLatLng = useSelector((state: any) => state.commonReducer.userCurrPos);
  const mapState: TMapState = useSelector((state: any) => state.commonReducer.mapState);
  const dispatch = useDispatch();

  // selected groups mechanism
  const [selectedGroups, setSelectedGroups] = React.useState(values.assign_group);
  const [filteredGroupData, setFilteredGroupData] = React.useState<any[]>([]);

  // prepare group query params
  const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
  const [orgGroupsQueryParams, setOrgGroupsQueryParams] = React.useState({
    organization_id: thisUserOrganizationId ?? 0,
    page: 1,
    page_size: 100,
    search: ""
  });

  // fetch organization groups
  const { data: dataOrgGroups } = useOrganizationGroupsQuery(orgGroupsQueryParams);

  // prepare group data for display
  const { results } = dataOrgGroups ?? {};
  const groupData = !!results
  ? (results || ([] as OrganizationGroup[])).map(
      (item: OrganizationGroup, index: number) => ({
        value: item?.id.toString(),
        label: item?.name,
      })
    )
  : [];

  // update selected groups
  useEffect(() => {
    setFilteredGroupData(groupData.filter((group) => !selectedGroups.some((selectedGroup:any) => selectedGroup.id === parseInt(group.value))))
    formikSetValue('assign_group', selectedGroups);
  }, [selectedGroups, dataOrgGroups])

  // handle group selection
  const handleChangeGroup = (e: any) => {
    if(e?.value){
      setSelectedGroups([...selectedGroups, {id: parseInt(e.value), name: e.label, organization: thisUserOrganizationId}]);
    }
  }

  // handle group removal
  const onRemoveFromGroup = (option: any) => {
    setSelectedGroups(selectedGroups.filter((selectedGroup:any) => selectedGroup !== option));
    formikSetValue('assign_group', selectedGroups);
  }

  // common map ref to be used for various map operations
  const mapRef = React.useRef<TMapRef>({
    map: null,
    objects: {},
  });

  const [mapStateTransitionInProgress, setMapStateTransitionInProgress] = useState(false);

  // set map data on form load
  useEffect(() => {
    if(!!!values.properties || Object.keys(values.properties).length === 0) return;
    const savedMapData = values.properties as TGeozoneMapData;
    if (!!savedMapData
    && Object.keys(savedMapData).length > 0) {
      console.log('SAVED MAP DATA', savedMapData as TGeozoneMapDataCircle)
      console.log('>> new values', JSON.stringify(values.properties));
      setMapStateTransitionInProgress(true)
      setTimeout(() => {
        dispatch(setMapStateData({
          ...mapState,
          mapCenter: (savedMapData as TGeozoneMapDataCircle)?.centerPosition ?? userCurrPos,
          mapData: {
            // ...mapState?.mapData,
            centerPosition: (savedMapData as TGeozoneMapDataCircle)?.centerPosition ?? userCurrPos,
            ...(values.zone_type !== 'Circle' && (savedMapData as TGeozoneMapDataPolygon)?.locs && { locs: (savedMapData as TGeozoneMapDataPolygon)?.locs }),
            radius: (savedMapData as TGeozoneMapDataCircle)?.radius ?? APP_CONFIG.MAPS.DEFAULTS.RADIUS,
            ready: true,
            editable: userCanEdit,
          },
        }));
        setMapStateTransitionInProgress(false);
      }, 200);
    }
  }, [values.properties]);

  // update form values on map data change
  useEffect(() => {
    const mapDataToSave = { ...mapState?.mapData } as TGeozoneMapData;
    delete mapDataToSave.ready;
    delete mapDataToSave.editable;
    console.log('[CHANGE] to values.properties for saving map changes is DISABLED!', JSON.stringify(mapState?.mapDataForAPIs))
    dispatch(setMapStateData({
      ...mapState,
      mapDataForAPIs: mapDataToSave,
    }));
  }, [mapState?.mapData]);

  useEffect(() => {
    console.log('[setMapData] via useEffect', { userCanEdit })
    dispatch(setMapStateData({
      ...mapState,
      mapData: {
        ...mapState?.mapData,
        editable: userCanEdit,
      },
    }));
    const applicableMapUpdatesHandler =
      values.zone_type === 'Route'
        ? mapUpdatesHandlerRoute
      : values.zone_type === 'Polygon'
        ? mapUpdatesHandlerPolygon
        : mapUpdatesHandlerCircle;
    applicableMapUpdatesHandler(
      {
        mapRef,
        mapData: { ...mapState?.mapData }, // not in use
        setMapData: () => {}, // not in use
      },
      'edit',
      userCanEdit
    );
  }, [userCanEdit]);

  // carry out map operations on map ready
  const handleMapReady =
  useCallback(
  () => {
    if(mapState?.mapData?.centerPosition?.latitude === 0) {
      console.error('MAP DATA ISSUE - lat = 0')
    } else {
      console.log('>> sending map operations', JSON.stringify({ ...mapState?.mapData }))
      const applicableMapOperations =
        values.zone_type === 'Route'
          ? mapOperationsRoute
        : values.zone_type === 'Polygon'
          ? mapOperationsPolygon
          : mapOperationsCircle;
      applicableMapOperations({
        mapRef,
        mapData: { ...mapState?.mapData },
        setMapData: (newMapData: TGeozoneMapData) => {
          const mapDataToSave = { ...newMapData } as TGeozoneMapData;
          delete mapDataToSave.ready;
          delete mapDataToSave.editable;
          console.log('[setMapData] via handleMapReady - dispatch(setMapStateData({...', JSON.stringify(mapState))
          dispatch(setMapStateData({
            ...mapState,
            mapData: {
              ...mapState?.mapData,
              ...newMapData,
            },
            mapDataForAPIs: { ...mapDataToSave } as TGeozoneMapDataForAPIs,
          }));
        },
      })
    }
  }
  , [mapState?.mapData]);

  const [autoSuggestKeyword, setAutoSuggestKeyword] = useState<string>("");
  const debouncedSetSearchKeyword = useDebouncedCallback((value: string) => {
    setAutoSuggestKeyword(value);
  }, 500);

  const [autosuggestQuery, { isFetching: isFetchingAutosuggest }] = useLazyAutosuggestAddressQuery()
  const [autosuggestResults, setAutosuggestResults] = useState<BingAutosuggestResItem[]>([]);
  const [autosuggestDropOptions, setAutosuggestDropOptions] = useState<TSelectboxOption[]>([]);

  const loadOptionsHandlerAutosuggest =
  // TODO: enable debouncing, currently causing issues with autosuggest
  // useDebouncedCallback(
    async (inputValue: string) => {
      const autosuggestResponse = await autosuggestQuery(inputValue)
      console.log('autosuggestResponse', autosuggestResponse)
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
      console.log('newAutosuggestResults', newAutosuggestResults)
      setAutosuggestResults(newAutosuggestResults);
      setAutosuggestDropOptions(options);
      return options;
    }
  // , 500);

  const [geocodeQuery, { isFetching: isFetchingGeocode }] = useLazyGeocodeQuery();

  const handleAutosuggestChange = async (e: any) => {
    const newlySelectedLocation = e.value;
    const newlySelectedLocationJSON = JSON.parse(e.value) as TAutosuggestOptionValue;
    formikSetValue('description', newlySelectedLocation);
    console.log('newlySelectedLocation', newlySelectedLocation);
    console.log('newlySelectedLocationJSON', newlySelectedLocationJSON);
    const geocodeResponse = await geocodeQuery(
      newlySelectedLocationJSON.itemJSON.address
    );
    console.log('geocodeResponse', geocodeResponse);
    const newlySelectedLocationCoords = geocodeResponse.data?.resourceSets?.[0]?.resources?.[0]?.point?.coordinates;
    console.log('newlySelectedLocationCoords', newlySelectedLocationCoords);
    if(!!newlySelectedLocationCoords?.[0] && !!newlySelectedLocationCoords?.[1]) {
      dispatch(setMapStateData({
        ...mapState,
        mapData: {
          // ...mapState?.mapData,
          ready: false,
        },
      }));
      setTimeout(() => {
        console.info('[handleAutosuggestChange] Setting map data with new location coords', newlySelectedLocationCoords)
        const Microsoft = (window as any).Microsoft;
        const newMapDataForAPIs: TGeozoneMapDataForAPIs = {
          ...mapState?.mapData,
          centerPosition: {
            latitude: newlySelectedLocationCoords?.[0],
            longitude: newlySelectedLocationCoords?.[1],
          },
          ...(
            values.zone_type === 'Route'
            ? { locs: [] }
            : values.zone_type === 'Polygon'
            ? { locs:
                  getCircleLocs(
                    new Microsoft.Maps.Location(newlySelectedLocationCoords?.[0], newlySelectedLocationCoords?.[1]),
                    APP_CONFIG.MAPS.DEFAULTS.RADIUS,
                    APP_CONFIG.MAPS.DEFAULTS.POLYGON_POINTS
                  ).map((loc: any) => ({ latitude: loc.latitude, longitude: loc.longitude }))
              }
            : { radius: APP_CONFIG.MAPS.DEFAULTS.RADIUS }
          ),
        }
        dispatch(setMapStateData({
          ...mapState,
          mapData: {
            ...newMapDataForAPIs,
            ready: true,
            editable: userCanEdit,
          },
          mapDataForAPIs: newMapDataForAPIs,
        }));
      }, 200);
    } else {
      console.error('GEOCODE RESPONSE ISSUE - no coordinates')
    }
  }

  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      {/* mapData: {JSON.stringify(mapData)} */}
      {mapState?.mapData?.ready && !loadingData && !mapStateTransitionInProgress ? (<>
        <BasicMap
          className="col-span-12 bg-gray-200 h-96"
          mapRef={mapRef}
          mapData={mapState?.mapData}
          setMapData={() => {}}
          onMapReady={handleMapReady}
        />
        <div className="col-span-12 flex gap-8 mb-4">
          {userCanEdit && (<>
            {values.zone_type === 'Circle' && (<div className="flex items-center gap-2">
              <img src={MapMarkerBlue} alt="" />
              <span className="font-bold text-sm text-[#5959FF]">{t('bluePushpin')}</span>
            </div>)}
            <div className="flex items-center gap-2">
              <img src={MapMarkerRed} alt="" />
              <span className="font-bold text-sm text-[#FF3F4F]">{t('redPushpin')}</span>
            </div>
          </>)}
        </div>
      </>) : (<>
        <div className="col-span-12 bg-gray-200 h-96 flex items-center justify-center relative">
          <MapLoadingAnimation />
        </div>
        <div className="col-span-12 flex gap-8 mb-4"></div>
      </>)}
      {loadingData ? <PseudoSelect label={t("description")} /> : 
        (<AdminFormFieldAsyncDropdown
          loadingData={loadingData || isFetchingAutosuggest}
          label={t("description")}
          id="description"
          name="description"
          noOptionsMessage={() => t("description_no_options")}
          defaultOption={{ value: `${values.description}`, label: `${geozoneDescriptionDisplayText(`${values.description}`, "-")}` }}
          loadOptions={loadOptionsHandlerAutosuggest}
          onChange={handleAutosuggestChange}
          onBlur={(e) => {
            formikSetTouched("description", true);
            handleBlur(e);
          }}
          error={errors.description}
          touched={touched.description}
          disabled={!userCanEdit}
          customWrapperClass="col-span-12"
        />)
      }
      {/* <AdminFormFieldInput
        label={t("description")}
        type="text"
        id="description"
        name="description"
        value={values.description}
        // onChange={handleChange}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          handleChange(e)
          debouncedSetSearchKeyword(e.target.value)
        }}
        onBlur={handleBlur}
        error={errors.description}
        touched={touched.description}
        disabled={!userCanEdit}
        customWrapperClass="col-span-12"
      /> */}

      {/* <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("city")}
        id="city"
        name="city"
        value={values.city}
        onChange={(e) => {formikSetValue("city", e?.value)}}
        onBlur={(e) => {formikSetTouched("city", true); handleBlur(e)}}
        error={errors.city}
        touched={touched.city}
        options={[
          { label: "ABC", value: "abc" },
          { label: "DEF", value: "def" },
          { label: "GHI", value: "ghi" },
        ]}
        disabled={true}
      /> */}

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("zone_type")}
        id="zone_type"
        name="zone_type"
        value={values.zone_type}
        onChange={(e) => {formikSetValue("zone_type", e?.value)}}
        onBlur={(e) => {formikSetTouched("zone_type", true); handleBlur(e)}}
        error={errors.zone_type}
        touched={touched.zone_type}
        options={ZONE_TYPES_OPTIONS}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("geocode")}
        type="text"
        id="geocode"
        name="geocode"
        value={values.geocode}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.geocode}
        touched={touched.geocode}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("lat_lng")}
        type="text"
        id="lat_lng"
        name="lat_lng"
        value={values.lat_lng}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.lat_lng}
        touched={touched.lat_lng}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("overlap_priority")}
        id="overlap_priority"
        name="overlap_priority"
        value={`${values.overlap_priority ?? ""}`}
        onChange={(e) => {formikSetValue("overlap_priority", e?.value)}}
        onBlur={(e) => {formikSetTouched("overlap_priority", true); handleBlur(e)}}
        error={errors.overlap_priority}
        touched={touched.overlap_priority}
        options={OVERLAP_PRIORITY_OPTIONS}
        disabled={!userCanEdit}
      />

      <div className="col-span-12 p-3 gap-2 bg-white border border-black rounded-lg flex items-start flex-wrap min-h-24">
        {selectedGroups?.map((option:any, i: number) => (
          <div className="flex items-center bg-gray-200 rounded-lg gap-3 py-1 px-2" key={`${option.id}_${i}`}>
            <span className="font-normal text-sm leading-4 tracking-tighter">{option.name}</span>
            <img src={CloseIcon} alt={option.label} className="size-5 cursor-pointer" onClick={() => onRemoveFromGroup(option)}/>
          </div>
        ))}
      </div>

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("assign_group")}
        id="assign_group"
        name="assign_group"
        value={filteredGroupData?.[0]?.value}
        onChange={handleChangeGroup}
        onBlur={(e) => {formikSetTouched("assign_group", true); handleBlur(e)}}
        error={errors.assign_group}
        touched={touched.assign_group}
        options={filteredGroupData}
        disabled={!userCanEdit}
        customWrapperClass="col-span-12"
      />

      <AdminFormFieldCheckbox
        label={t("reverse_geocode")}
        id="reverse_geocode"
        type="checkbox"
        name="reverse_geocode"
        checked={values.reverse_geocode}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.reverse_geocode}
        touched={touched.reverse_geocode}
        disabled={!userCanEdit}
      />

      <AdminFormFieldCheckbox
        label={t("arrival_geozone")}
        id="arrival_geozone"
        type="checkbox"
        name="arrival_geozone"
        checked={values.arrival_geozone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.arrival_geozone}
        touched={touched.arrival_geozone}
        disabled={!userCanEdit}
      />

      <AdminFormFieldCheckbox
        label={t("departure_zone")}
        id="departure_zone"
        type="checkbox"
        name="departure_zone"
        checked={values.departure_zone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.departure_zone}
        touched={touched.departure_zone}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("zone_color")}
        id="zone_color"
        name="zone_color"
        value={values.zone_color}
        onChange={(e) => {formikSetValue("zone_color", e?.value)}}
        onBlur={(e) => {formikSetTouched("zone_color", true); handleBlur(e)}}
        error={errors.zone_color}
        touched={touched.zone_color}
        options={ZONE_COLOR_OPTIONS}
        disabled={!userCanEdit}
      />

      <AdminFormFieldInput
        label={t("speed_limit")}
        type="text"
        id="speed_limit"
        name="speed_limit"
        value={values.speed_limit}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.speed_limit}
        touched={touched.speed_limit}
        disabled={!userCanEdit}
      />
    </div>
  )
}