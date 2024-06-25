import { TLatLng } from "../../types/map";
import { TVehicleDataPoint } from "./type";

export const dummyVehicleData = (startPoint: TLatLng) => {
  return [
    ..."*".repeat(5).split('').map((_, i) => ({
      id: i,
      coords: {
        latitude: startPoint.latitude + Math.random() * 0.01 * (i % 2 === 0 ? 1 : -1),
        longitude: startPoint.longitude + Math.random() * 0.01 * (i % 2 === 0 ? 1 : -1),
      }
    } as TVehicleDataPoint))
  ]
}