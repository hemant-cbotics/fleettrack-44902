/**
 * -----------------------------------------------------------------------------
 * Geozone Edit Form
 * -----------------------------------------------------------------------------
 * These components are used to render the form for editing the geozone details.
 */
import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdminFormFieldCheckbox, AdminFormFieldDropdown, AdminFormFieldInput } from "../../../components/admin/formFields";
import { OVERLAP_PRIORITY_OPTIONS, ZONE_COLOR_OPTIONS, ZONE_TYPES_OPTIONS } from "./constants";
import { useLoggedInUserData } from "../../../utils/user";
import { useOrganizationGroupsQuery } from "../../../api/network/adminApiServices";
import { OrganizationGroup } from "../../../api/types/Group";
import CloseIcon from "../../../assets/svg/close-icon.svg";
import BasicMap from "../../../components/maps/basicMap";
import { mapOperations, mapUpdatesHandler } from "./map";
import { TGeozoneMapData, TLatLng } from "../../../components/maps/types";
import { mapGetCurrentPosition } from "../../../utils/map";
import { TMapRef } from "./type";

export interface GeozoneDetailFormProps {
  values: any;
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
  loadingData: boolean;
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
  const {
    data: dataOrgGroups,
  } =
    useOrganizationGroupsQuery(orgGroupsQueryParams);

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
  // map data state - used to store map data for saving
  const [mapData, setMapData] = useState<TGeozoneMapData>({
    centerPosition: { latitude: 0, longitude: 0 },
    radius: 0,
    ready: false,
    editable: userCanEdit,
  });

  useEffect(() => {
    if (!mapData.ready) {
      mapGetCurrentPosition((position: TLatLng) => {
        setMapData({
          ...mapData,
          centerPosition: position,
          ready: true,
        });
      });
    }
    const { ready, editable, ...mapDataToSave } = mapData;
    formikSetValue('properties', mapDataToSave);
  }, [mapData]);

  useEffect(() => {
    setMapData({
      ...mapData,
      editable: userCanEdit,
    });
    mapUpdatesHandler(
      {
        mapRef,
        mapData,
        setMapData,
      },
      'edit',
      userCanEdit
    );
  }, [userCanEdit]);

  // carry out map operations on map ready
  const handleMapReady = () => {
    mapOperations({
      mapRef,
      mapData,
      setMapData,
    })
  }

  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      mapData: {JSON.stringify(mapData)}
      {mapData.ready && <BasicMap
        className="col-span-12 mb-4 bg-gray-200 h-96"
        mapRef={mapRef}
        setMapData={setMapData}
        onMapReady={handleMapReady}
      />}
      <AdminFormFieldInput
        label={t("description")}
        type="text"
        id="description"
        name="description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.description}
        touched={touched.description}
        disabled={!userCanEdit}
        customWrapperClass="col-span-12"
      />

      <AdminFormFieldDropdown
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
      />

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
        label={t("latitude_longitude")}
        type="text"
        id="latitude_longitude"
        name="latitude_longitude"
        value={values.latitude_longitude}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.latitude_longitude}
        touched={touched.latitude_longitude}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        loadingData={loadingData}
        label={t("overlap_priority")}
        id="overlap_priority"
        name="overlap_priority"
        value={values.overlap_priority.toString()}
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
        label={t("arrival_zone")}
        id="arrival_zone"
        type="checkbox"
        name="arrival_zone"
        checked={values.arrival_zone}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.arrival_zone}
        touched={touched.arrival_zone}
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