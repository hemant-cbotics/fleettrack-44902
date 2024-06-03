import { TLatLng } from "../types/map";
import { APP_CONFIG } from "../constants/constants";
import { removeScript } from "./common";

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

export const removeBingMap = () => {
  if(APP_CONFIG.DEBUG.MAPS) console.log('removeBingMap')
  removeScript(APP_CONFIG.MAPS.SCRIPT_ID)
}

// -------------------------------------
// Bing Maps operations for map entites
// -------------------------------------

// get the distance between two locations
export const getDistanceFromCenter = (loc1: any, loc2: any) => {
  const Microsoft = (window as any).Microsoft;
  if(APP_CONFIG.DEBUG.MAPS) console.log('[getDistanceFromCenter]', loc1.getLocation().latitude, loc2.getLocation().longitude);
  return Microsoft.Maps.SpatialMath.getDistanceTo(
    loc1.getLocation(),
    loc2.getLocation(),
    Microsoft.Maps.SpatialMath.DistanceUnits.Miles
  );
}

// calculate the locations for a regular polygon that has 36 locations which will result in an approximate circle.
export const getCircleLocs = (center: any, radius: any, edges: number) => {
  const Microsoft = (window as any).Microsoft;
  return Microsoft.Maps.SpatialMath.getRegularPolygon(center, radius, edges, Microsoft.Maps.SpatialMath.DistanceUnits.Miles);
}

// Create a contour line that represents a circle.
export function createCircle(center: any, radius: any, color: any) {
  const Microsoft = (window as any).Microsoft;
  return new Microsoft.Maps.ContourLine(getCircleLocs(center, radius, 36 * 2), color);
}

export const renderCircle = (mapRef: any, center: any, radiusInMiles: number, colorRGB: [number,number,number]) => {
  const Microsoft = (window as any).Microsoft;
  if(APP_CONFIG.DEBUG.MAPS) console.log('Rendering circle at', center.latitude, center.longitude, 'with radius', radiusInMiles);
  mapRef.current.map.layers.clear();
  if(APP_CONFIG.DEBUG.MAPS) console.log('color', `rgba(${colorRGB.join(',')},0.2)`)
  mapRef.current.objects.mCircle = createCircle(center, radiusInMiles, `rgba(${colorRGB.join(',')},0.2)`);
  const circleLayer = new Microsoft.Maps.ContourLayer(
    [mapRef.current.objects.mCircle],
    {
      colorCallback: (val: any) => val,
      polygonOptions: {
        strokeThickness: 2,
        strokeColor: `rgba(${colorRGB.join(',')},0.6)`, // 'rgba(0,100,0,0.5)',
        visible: true
      }
    }
  );
  mapRef.current.map.layers.insert(circleLayer);
}

export const renderPolygon = (mapRef: any, center: any, polygonPoints: any, colorRGB: [number,number,number]) => {
  const Microsoft = (window as any).Microsoft;
  if(APP_CONFIG.DEBUG.MAPS) console.log('Rendering polygon at', center.latitude, center.longitude, 'with points', polygonPoints);
  mapRef.current.map.layers.clear();
  if(APP_CONFIG.DEBUG.MAPS) console.log('color', `rgba(${colorRGB.join(',')},0.2)`)
  mapRef.current.objects.mPolygon = new Microsoft.Maps.ContourLine(polygonPoints, `rgba(${colorRGB.join(',')},0.2)`); // createCircle(center, radiusInMiles, `rgba(${colorRGB.join(',')},0.2)`);
  const poygonLayer = new Microsoft.Maps.ContourLayer(
    [mapRef.current.objects.mPolygon],
    {
      colorCallback: (val: any) => val,
      polygonOptions: {
        strokeThickness: 2,
        strokeColor: `rgba(${colorRGB.join(',')},0.6)`, // 'rgba(0,100,0,0.5)',
        visible: true
      }
    }
  );
  mapRef.current.map.layers.insert(poygonLayer);
}

