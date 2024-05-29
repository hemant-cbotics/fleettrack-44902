import React, { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AdminFormFieldCheckbox, AdminFormFieldDropdown, AdminFormFieldInput } from "../../../components/admin/formFields";
import { OVERLAP_PRIORITY_OPTIONS, ZONE_COLOR_OPTIONS, ZONE_TYPES_OPTIONS } from "./constants";
import { useLoggedInUserData } from "../../../utils/user";
import { useOrganizationGroupsQuery } from "../../../api/network/adminApiServices";
import { OrganizationGroup } from "../../../api/types/Group";
import CloseIcon from "../../../assets/svg/close-icon.svg";
import BasicMap from "../../../components/maps/basicMap";

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
const [selectedGroups, setSelectedGroups] = React.useState(values.assign_group);
const [filteredGroupData, setFilteredGroupData] = React.useState<any[]>([]);
const thisUserOrganizationId = useLoggedInUserData("ownerOrganizationId")
const [orgGroupsQueryParams, setOrgGroupsQueryParams] = React.useState({
  organization_id: thisUserOrganizationId ?? 0,
  page: 1,
  page_size: 100,
  search: ""
});

const {
  data: dataOrgGroups,
} =
  useOrganizationGroupsQuery(orgGroupsQueryParams);

  const { results } = dataOrgGroups ?? {};
  const groupData = !!results
  ? (results || ([] as OrganizationGroup[])).map(
      (item: OrganizationGroup, index: number) => ({
        value: item?.id.toString(),
        label: item?.name,
      })
    )
  : [];

  useEffect(() => {
    setFilteredGroupData(groupData.filter((group) => !selectedGroups.some((selectedGroup:any) => selectedGroup.id === parseInt(group.value))))
    formikSetValue('assign_group', selectedGroups);
  }, [selectedGroups, dataOrgGroups])

  const handleChangeGroup = (e: any) => {
    if(e?.value){
      setSelectedGroups([...selectedGroups, {id: parseInt(e.value), name: e.label, organization: thisUserOrganizationId}]);
    }
  }

  const onRemoveFromGroup = (option: any) => {
    setSelectedGroups(selectedGroups.filter((selectedGroup:any) => selectedGroup !== option));
    formikSetValue('assign_group', selectedGroups);
  }

  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
      <BasicMap className="col-span-12 mb-4 bg-gray-200 h-96" />
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
        {selectedGroups?.map((option:any) => (
          <div className="flex items-center bg-gray-200 rounded-lg gap-3 py-1 px-2" key={option.id}>
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