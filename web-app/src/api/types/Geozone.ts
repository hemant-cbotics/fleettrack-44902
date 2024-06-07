import { TGeozoneMapDataForAPIs } from "../../types/map";

export type GeozoneType = 'Circle' | 'Polygon' | 'Route';

export type GeozoneVehicleGroup = {
  id: number;
  name: string;
  organization: number;
}

export type OrganizationGeozone = {
  id: number;
  created_at: string;
  updated_at: string;
  zone_id: string;
  zone_type: GeozoneType;
  // city: string | null;
  properties: TGeozoneMapDataForAPIs;
  description: string | null;
  geocode: string | null;
  radius: string | null;
  lat_lng: string | null; // comma separated lat,lng
  overlap_priority: number;
  reverse_geocode: boolean;
  arrival_geozone: boolean;
  departure_zone: boolean;
  zone_color: string;
  speed_limit: number | null;
  is_active: boolean;
  organization: number;
  groups: GeozoneVehicleGroup[];
};
