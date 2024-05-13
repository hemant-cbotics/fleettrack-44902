import { Formik } from "formik";
import { FC, useEffect, useState } from "react";
import {
  detailFormValidationSchema,
  groupMembershipFormValidationSchema,
  vehicleDetailFormInitialValues,
  vehicleGroupMembershipFormInitialValues,
} from "./validation";
import {
  AdminFormFieldCheckbox,
  AdminFormFieldDropdown,
  AdminFormFieldInput,
} from "../../../components/admin/formFields";

interface VehicleDetailFormProps {
  vehicle: any;
  onSubmit: (values: any) => void;
}

interface VehicleGroupMembershipFormProps {
  groups: any;
  onSubmit: (values: any) => void;
}

export const VehicleDetailForm: FC<VehicleDetailFormProps> = ({
  vehicle,
  onSubmit,
}) => {
  
  const [userCanEdit, setUserCanEdit] = useState(true);

  return (
    <Formik
      initialValues={vehicleDetailFormInitialValues}
      validationSchema={detailFormValidationSchema}
      onSubmit={() => console.log("submit")}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <form className="px-5 pt-4 pb-8 bg-gray-100" onSubmit={handleSubmit}>
            <div className="grid grid-cols-12 gap-4">
              <AdminFormFieldInput
                label="Vehicle ID"
                type="text"
                id="vehicle_id"
                name="vehicle_id"
                value={values.vehicle_id}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Creation Date"
                type="datetime-local"
                id="creation_date"
                name="creation_date"
                value={values.creation_date}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Server Id"
                type="text"
                id="server_id"
                name="server_id"
                value={values.server_id}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Firmware Version"
                type="text"
                id="firmware_version"
                name="firmware_version"
                value={values.firmware_version}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Unique Id"
                type="text"
                id="unique_id"
                name="unique_id"
                value={values.unique_id}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Previous Unique Id"
                type="text"
                id="previous_unique_id"
                name="previous_unique_id"
                value={values.previous_unique_id}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Unique Id Last Change"
                type="date"
                id="unique_id_last_change"
                name="unique_id_last_change"
                value={values.unique_id_last_change}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Unique Id"
                type="text"
                id="unique_id"
                name="unique_id"
                value={values.unique_id}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <div className="grid grid-cols-8 col-span-12">
                <AdminFormFieldCheckbox
                  label="Active"
                  id="is_active"
                  type="checkbox"
                  name="is_active"
                  value={values.is_active}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>

              <AdminFormFieldInput
                label="Vehicle Description"
                type="text"
                id="vehicle_description"
                name="vehicle_description"
                value={values.vehicle_description}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Short Name"
                type="text"
                id="short_name"
                name="short_name"
                value={values.short_name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="VIN"
                type="text"
                id="vin"
                name="vin"
                value={values.vin}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Vehicle Make"
                type="text"
                id="vehicle_make"
                name="vehicle_make"
                value={values.vehicle_make}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Vehicle Model"
                type="text"
                id="vehicle_model"
                name="vehicle_model"
                value={values.vehicle_model}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="License Plate"
                type="text"
                id="license_plate"
                name="license_plate"
                value={values.license_plate}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="License Expiration"
                type="date"
                id="license_expiration"
                name="license_expiration"
                value={values.license_expiration}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Equipment Type (VIN)"
                type="text"
                id="equipment_type"
                name="equipment_type"
                value={values.equipment_type}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Equipment Status"
                id="equipment_status"
                name="equipment_status"
                value={values.equipment_status}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Asset Type"
                id="asset_type"
                name="asset_type"
                value={values.asset_type}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Vehicle Class"
                id="vehicle_class"
                name="vehicle_class"
                value={values.vehicle_class}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="IMEI/ESN Number"
                type="text"
                id="imei_number"
                name="imei_number"
                value={values.imei_number}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Serial Number"
                type="text"
                id="serial_number"
                name="serial_number"
                value={values.serial_number}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="SIM Phone"
                type="text"
                id="phone_number"
                name="phone_number"
                value={values.phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="SMS Email Address"
                type="email"
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Group Pushpin Id"
                type="text"
                id="group_pushpin_id"
                name="group_pushpin_id"
                value={values.group_pushpin_id}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Map Route Color"
                id="map_route_color"
                name="map_route_color"
                value={values.map_route_color}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldDropdown
                label="Ignition Input"
                id="ignition_input"
                name="ignition_input"
                value={values.ignition_input}
                onChange={handleChange}
                disabled={!userCanEdit}
              />
              <div className="grid grid-cols-12 col-span-12">
                <AdminFormFieldInput
                  label="Maximum Speed"
                  type="text"
                  id="maximum_speed"
                  name="maximum_speed"
                  value={values.maximum_speed}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>

              <AdminFormFieldInput
                label="Driver Name"
                type="text"
                id="driver_name"
                name="driver_name"
                value={values.driver_name}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Driver Phone"
                type="text"
                id="driver_phone_number"
                name="driver_phone_number"
                value={values.driver_phone_number}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <div className="grid grid-cols-12 col-span-12">
                <AdminFormFieldInput
                  label="Driver ID"
                  type="text"
                  id="driver_id"
                  name="driver_id"
                  value={values.driver_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={!userCanEdit}
                />
              </div>

              <AdminFormFieldDropdown
                label="Fuel Type"
                id="fuel_type"
                name="fuel_type"
                value={values.fuel_type}
                onChange={handleChange}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Fuel Capacity"
                type="text"
                id="fuel_capacity"
                name="fuel_capacity"
                value={values.fuel_capacity}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Fuel Economy"
                type="text"
                id="fuel_economy"
                name="fuel_economy"
                value={values.fuel_economy}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldInput
                label="Fuel Cost"
                type="text"
                id="fuel_cost"
                name="fuel_cost"
                value={values.fuel_cost}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};

export const VehicleGroupMembershipForm: FC<VehicleGroupMembershipFormProps> = ({
  groups,
  onSubmit,
}) => {
  const [userCanEdit, setUserCanEdit] = useState(true);
  return (
    <Formik
      initialValues={vehicleGroupMembershipFormInitialValues}
      validationSchema={groupMembershipFormValidationSchema}
      onSubmit={() => console.log("submit")}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => {
        return (
          <form className="px-5 pt-4 pb-8 bg-gray-100" onSubmit={handleSubmit}>
            <div className="grid grid-cols-8 gap-4">
              <AdminFormFieldCheckbox
                label="All Vehicles"
                id="all_vehicles"
                type="checkbox"
                name="all_vehicles"
                value={values.all_vehicles}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Demo Map"
                id="demo_map"
                type="checkbox"
                name="demo_map"
                value={values.demo_map}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="District 1"
                id="district1"
                type="checkbox"
                name="district1"
                value={values.district1}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="District 2"
                id="district2"
                type="checkbox"
                name="district2"
                value={values.district2}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="District 3"
                id="district3"
                type="checkbox"
                name="district3"
                value={values.district3}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="District 4"
                id="district4"
                type="checkbox"
                name="district4"
                value={values.district4}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="District 5"
                id="district5"
                type="checkbox"
                name="district5"
                value={values.district5}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="District 6"
                id="district6"
                type="checkbox"
                name="district6"
                value={values.district6}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="District 7"
                id="district7"
                type="checkbox"
                name="district7"
                value={values.district7}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="District 8"
                id="district8"
                type="checkbox"
                name="district8"
                value={values.district8}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Group A"
                id="group_a"
                type="checkbox"
                name="group_a"
                value={values.group_a}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Group B"
                id="group_b"
                type="checkbox"
                name="group_b"
                value={values.group_b}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Hybrid Vehicle"
                id="hybrid_vehicle"
                type="checkbox"
                name="hybrid_vehicle"
                value={values.hybrid_vehicle}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Jacob"
                id="jacob"
                type="checkbox"
                name="jacob"
                value={values.jacob}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="K9 Units"
                id="k9_units"
                type="checkbox"
                name="k9_units"
                value={values.k9_units}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Map Demo"
                id="map_demo"
                type="checkbox"
                name="map_demo"
                value={values.map_demo}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Medium Group"
                id="medium_group"
                type="checkbox"
                name="medium_group"
                value={values.medium_group}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Meitrack"
                id="meitrack"
                type="checkbox"
                name="meitrack"
                value={values.meitrack}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Patrol Cars"
                id="patrol_cars"
                type="checkbox"
                name="patrol_cars"
                value={values.patrol_cars}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Public Works Pickups"
                id="public_works_pickups"
                type="checkbox"
                name="public_works_pickups"
                value={values.public_works_pickups}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Small Group"
                id="small_group"
                type="checkbox"
                name="small_group"
                value={values.small_group}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />

              <AdminFormFieldCheckbox
                label="Snow Plows"
                id="snow_plows"
                type="checkbox"
                name="snow_plows"
                value={values.snow_plows}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!userCanEdit}
              />
            </div>
          </form>
        );
      }}
    </Formik>
  );
};
