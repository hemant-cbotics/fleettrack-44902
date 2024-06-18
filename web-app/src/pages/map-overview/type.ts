import { BingAutosuggestResItem } from "../../api/types/Map";
import { OrganizationVehicle } from "../../api/types/Vehicle";
import { TLatLng, TMapLayerOptions, TMapState } from "../../types/map";

export type TVehicleList = {
  id: string;
  name: string;
  description: string;
  vin: string;
  is_active: boolean;
}

export type TGroupList = {
  id: number;
  name: string;
  listOfVehicles: TVehicleList[];
  checked?: boolean;
}

export type TDataPoint = OrganizationVehicle & {
  coords: number[]; // TODO: dissolve this type later and use OranizationVehicle's lat and lon
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
  dataPoints: TDataPoint[];
  onDataPointPushpinClick?: (dataPoint: TDataPoint) => void;
  onViewChangeEnd?: (center: TLatLng, zoom: number) => void; // save last view (center and zoom) to store
}
export type TMemoizedMapOperationsProps = () => TMapOperationsProps;
export type TMapOperations = (
  props: TMapOperationsProps,
  checkedVehicles: string[],
) => void;

export type TMapUpdatesHandler = (
  props: TMapOperationsProps,
  action: 'checkedUpdated' | 'focusPushpin' | 'centerToPushpin' | 'centerToCoords',
  value?: any
) => void;

export type TAutosuggestOptionValue = {
  labelText: string;
  itemJSON: BingAutosuggestResItem;
}
