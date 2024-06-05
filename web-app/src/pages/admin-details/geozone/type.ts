import { GeozoneType } from "../../../api/types/Geozone";
import { BingAutosuggestResItem } from "../../../api/types/Map";
import { TGeozoneMapData } from "../../../types/map";

export type TListData = {
  id: number;
  zone_id: string;
  zone_type: GeozoneType;
  description: string | null;
  radius: string | null;
}

export type TMapRef = {
  map: any;
  objects: any;
}

export type TMapOperationsProps = {
  mapRef: React.MutableRefObject<TMapRef>;
  mapData: TGeozoneMapData;
  setMapData: (mapData: TGeozoneMapData) => void; // React.Dispatch<React.SetStateAction<TGeozoneMapData>>;
}
export type TMapOperations = (props: TMapOperationsProps) => void;
export type TMapUpdatesHandler = (props: TMapOperationsProps, action: 'edit', value?: any) => void;

export type TAutosuggestOptionValue = {
  labelText: string;
  itemJSON: BingAutosuggestResItem;
}