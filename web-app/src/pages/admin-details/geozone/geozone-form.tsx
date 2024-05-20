import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AdminFormFieldCheckbox, AdminFormFieldDropdown, AdminFormFieldInput } from "../../../components/admin/formFields";

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
 }) => {
  const { t } = useTranslation("translation", { keyPrefix: "admins.geozones.detailsPage.form" });
  return (
    <div className="px-5 pt-4 pb-8 bg-gray-100 grid grid-cols-12 gap-4">
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
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("zone_type")}
        id="zone_type"
        name="zone_type"
        value={values.zone_type}
        onChange={(e) => {formikSetValue("zone_type", e?.value)}}
        onBlur={(e) => {formikSetTouched("zone_type", true); handleBlur(e)}}
        error={errors.zone_type}
        touched={touched.zone_type}
        options={[
          { label: "Circle", value: "circle" },
          { label: "Polygon", value: "polygon" },
          { label: "Rectangle", value: "rectangle" },
        ]}
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
        label={t("overlap_priority")}
        id="overlap_priority"
        name="overlap_priority"
        value={values.overlap_priority}
        onChange={(e) => {formikSetValue("overlap_priority", e?.value)}}
        onBlur={(e) => {formikSetTouched("overlap_priority", true); handleBlur(e)}}
        error={errors.overlap_priority}
        touched={touched.overlap_priority}
        options={[
          { label: "High", value: "high" },
          { label: "Medium", value: "medium" },
          { label: "Low", value: "low" },
        ]}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("assign_group")}
        id="assign_group"
        name="assign_group"
        value={values.assign_group}
        onChange={(e) => {formikSetValue("assign_group", e?.value)}}
        onBlur={(e) => {formikSetTouched("assign_group", true); handleBlur(e)}}
        error={errors.assign_group}
        touched={touched.assign_group}
        options={[
          { label: "Group 1", value: "group1" },
          { label: "Group 2", value: "group2" },
          { label: "Group 3", value: "group3" },
        ]}
        disabled={!userCanEdit}
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
        label={t("zone_color")}
        id="zone_color"
        name="zone_color"
        value={values.zone_color}
        onChange={(e) => {formikSetValue("zone_color", e?.value)}}
        onBlur={(e) => {formikSetTouched("zone_color", true); handleBlur(e)}}
        error={errors.zone_color}
        touched={touched.zone_color}
        options={[
          { label: "Red", value: "red" },
          { label: "Green", value: "green" },
          { label: "Blue", value: "blue" },
        ]}
        disabled={!userCanEdit}
      />

      <AdminFormFieldDropdown
        label={t("speed_limit")}
        id="speed_limit"
        name="speed_limit"
        value={values.speed_limit}
        onChange={(e) => {formikSetValue("speed_limit", e?.value)}}
        onBlur={(e) => {formikSetTouched("speed_limit", true); handleBlur(e)}}
        error={errors.speed_limit}
        touched={touched.speed_limit}
        options={[
          { label: "10", value: "10" },
          { label: "20", value: "20" },
          { label: "30", value: "30" },
        ]}
        disabled={!userCanEdit}
      />
    </div>
  )
}