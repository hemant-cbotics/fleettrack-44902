import { ColorRGB } from "./common";

export type TLatLng = {
  latitude: number;
  longitude: number;
}

export type TGeozoneMapDataCircle = {
  centerPosition: TLatLng;
  radius: number;
}

export type TGeozoneMapDataPolygon = {
  centerPosition: TLatLng;
  locs: TLatLng[];
}

export type TGeozoneMapDataRoute = {
  centerPosition: TLatLng;
  locs: TLatLng[];
}

export type TGeozoneMapDataForAPIs =
  Partial<TGeozoneMapDataCircle> & // TGeozoneMapDataCircle |
  Partial<TGeozoneMapDataPolygon> & // TGeozoneMapDataPolygon |
  Partial<TGeozoneMapDataRoute>; // TGeozoneMapDataRoute;

export type TGeozoneMapData = TGeozoneMapDataForAPIs & {
  ready?: boolean,
  editable?: boolean,
  color?: ColorRGB,
};

export type TMapType = 'road' | 'aerial' | 'auto' | 'birdseye' | 'collinsBart' | 'mercator' | 'ordnanceSurvey' | 'streetside';

export type TMapLayerOptions = {
  traffic: boolean;
  weather: boolean;
  threeDBuildings: boolean;
  clusters: boolean;
  geozones: boolean;
}

// map state in redux store
export type TMapState = {
  mapScriptLoaded: boolean; // flag to check if the map script is loaded
  pageMapLoaded?: boolean; // flag to check if the map is loaded on the page
  mapCenter?: TLatLng; // center of the map
  mapZoom?: number; // zoom level of the map
  mapType?: TMapType; // type of the map
  mapLayerOptions: TMapLayerOptions; // options for map layers
  // mapBounds?: TLatLngBounds; // bounds of the map
  mapData?: TGeozoneMapData; // data to be displayed on the map
  mapDataForAPIs?: TGeozoneMapDataForAPIs; // data to be sent to APIs
}

export type TMapVehicleIconState =
  'driving' | 'idle_active' | 'idle_inactive' | 'stopped' | 'online' | 'offline';