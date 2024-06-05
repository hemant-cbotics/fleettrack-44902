import * as Yup from 'yup';
import { OrganizationGeozone } from '../../../api/types/Geozone';

// initial values for the form
export const geozoneDetailsInitialValues: Partial<OrganizationGeozone> & { assign_group: any[] } = {
  properties: {},
  description: "",
  // city: "",
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
export const geozoneDetailsYupValidationSchema = Yup.object().shape({
  description: Yup.string().required("Description is required"),
  zone_type: Yup.string().required("Zone Type is required"),
  lat_lng: Yup.string().required("Lat/Lng is required"),
  overlap_priority: Yup.number().required("Overlap Priority is required"),
  reverse_geocode: Yup.boolean().required("Reverse Geocode is required"),
  arrival_geozone: Yup.boolean().required("Arrival Geozone is required"),
  departure_zone: Yup.boolean().required("Departure Zone is required"),
  zone_color: Yup.string().required("Zone Color is required"),
});