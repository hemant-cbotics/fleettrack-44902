import * as Yup from 'yup';
import { OrganizationGeozone } from '../../../api/types/Geozone';
import { TSelectboxOption } from '../../../components/admin/formFields';

// form field names
export type TFormFieldNames = "description" | "zone_type" | "lat_lng" | "overlap_priority" | "reverse_geocode" | "arrival_geozone" | "departure_zone" | "zone_color" | "speed_limit" | "assign_group";

// initial values for the form
export const geozoneDetailsInitialValues: Partial<OrganizationGeozone> & { assign_group: TSelectboxOption[] } = {
  properties: {},
  description: "",
  // city: "",
  zone_type: "Circle",
  geocode: "",
  lat_lng: "",
  overlap_priority: 0,
  assign_group: [],
  reverse_geocode: false,
  arrival_geozone: false,
  departure_zone: false,
  zone_color: "",
  speed_limit: "0.0",
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