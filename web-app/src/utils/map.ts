import { TLatLng } from "../components/maps/types";
import { APP_CONFIG } from "../constants/constants";

type TMapGetCurrentPositionCallback = (position: TLatLng) => void;

export const mapGetCurrentPosition = (callback: TMapGetCurrentPositionCallback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      if(APP_CONFIG.DEBUG.MAPS) console.log('[mapGetCurrentPosition]', `${position.coords.latitude}, ${position.coords.longitude}`)
      callback({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
