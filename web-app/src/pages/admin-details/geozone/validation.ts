import * as Yup from 'yup';
import { OrganizationGeozone } from '../../../api/types/Geozone';

// initial values for the form
export const geozoneDetailsInitialValues: Partial<OrganizationGeozone> & { assign_group: any[] } = {
  properties: {},
  description: "",
  city: "",
  zone_type: "Circle",
  geocode: "",
  lat_lng: "",
  overlap_priority: 0,
  assign_group: [{}],
  reverse_geocode: false,
  arrival_geozone: false,
  departure_zone: false,
  zone_color: "",
  speed_limit: "",
}

// validation schema for the form
export const geozoneDetailsYupValidationSchema = Yup.object().shape({});