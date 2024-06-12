import { OrganizationGeozone } from "../api/types/Geozone";

export const getGeozoneShapeDescription = (geozone: Partial<OrganizationGeozone>) => {
  switch (geozone.zone_type) {
    case 'Route':
      return !!geozone.properties?.locs ? `${geozone.properties?.locs?.length} route points` : null;
    case 'Polygon':
      return !!geozone.properties?.locs ? `${geozone.properties?.locs?.length} polygon points` : null;
    default:
      return !!geozone.properties?.radius ? `Radius ${geozone.properties?.radius?.toFixed(2)}mi` : null;
  }
}