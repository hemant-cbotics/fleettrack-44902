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
  TGeozoneMapDataCircle |
  TGeozoneMapDataPolygon |
  TGeozoneMapDataRoute;

export type TGeozoneMapData = TGeozoneMapDataForAPIs & { ready: boolean, editable: boolean };

// map state in redux store
export type TMapState = {
  mapScriptLoaded: boolean; // flag to check if the map script is loaded
  pageMapLoaded?: boolean; // flag to check if the map is loaded on the page
  mapCenter?: TLatLng; // center of the map
  mapZoom?: number; // zoom level of the map
  mapType?: string; // type of the map
  // mapBounds?: TLatLngBounds; // bounds of the map
  mapData?: TGeozoneMapData[]; // data to be displayed on the map
  mapDataForAPIs?: TGeozoneMapDataForAPIs[]; // data to be sent to APIs
}