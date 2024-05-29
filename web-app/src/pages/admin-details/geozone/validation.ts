import * as Yup from 'yup';

// initial values for the form
export const geozoneDetailsInitialValues = {
  description: "",
  city: "",
  zone_type: "",
  geocode: "",
  latitude_longitude: "",
  overlap_priority: 0,
  assign_group: [{}],
  reverse_geocode: false,
  arrival_zone: false,
  departure_zone: false,
  zone_color: "",
  speed_limit: "",
}

// validation schema for the form
export const geozoneDetailsYupValidationSchema = Yup.object().shape({});