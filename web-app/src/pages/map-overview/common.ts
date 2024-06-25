import { OrganizationVehicle } from "../../api/types/Vehicle";
import { TDataPoint } from "./type";

export const mapVehicleDisplayTitle = (dataPoint: TDataPoint | OrganizationVehicle) => {
  return `${dataPoint?.vehicle_model} ${dataPoint?.vehicle_make}`;
};

export const mapInfoBoxContent = (dataPoint: TDataPoint) => {
  return `
    <div class="vehicle-infobox-content bg-white rounded-lg font-semibold text-sm text-accent-blue-dark p-2 text-center w-32">
      <h4>${mapVehicleDisplayTitle(dataPoint)}</h4>
    </div>
  `;
}