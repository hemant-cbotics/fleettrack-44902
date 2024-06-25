import { OrganizationVehicle } from "../../api/types/Vehicle";
import { TLatLng, TMapLayerOptions, TMapState } from "../../types/map";

export type TVehicleDataPoint = {
  id: number;
  coords: TLatLng;
}

export type TMapRef = {
  map: any;
  objects: {
    mPushpins: TMPushpin[];
    mClusterLayer: any;
  }
}

export type TMPushpin = {
  id: string;
  pushpin: any;
  infobox: any;
}

export type TMapData = {
  centerPosition: TLatLng;
  radius: number;
}

export type TMapOperationsProps = {
  mapRef: React.MutableRefObject<TMapRef>;
  mapState: TMapState;
  mapData: TMapData;
  mapLayerOptions: TMapLayerOptions;
  setMapData: (mapData: TMapData) => void;
  dataPoints: TVehicleDataPoint[];
  onDataPointPushpinClick?: (dataPoint: TVehicleDataPoint) => void;
  onViewChangeEnd?: (center: TLatLng, zoom: number) => void; // save last view (center and zoom) to store
}
export type TMemoizedMapOperationsProps = () => TMapOperationsProps;
export type TMapOperations = (
  props: TMapOperationsProps,
  filteredDataPoints: TVehicleDataPoint[],
) => void;