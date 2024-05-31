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
  locs: TLatLng[];
}

export type TGeozoneMapDataForAPIs =
  TGeozoneMapDataCircle |
  TGeozoneMapDataPolygon |
  TGeozoneMapDataRoute;

export type TGeozoneMapData = TGeozoneMapDataForAPIs & { ready: boolean, editable: boolean };