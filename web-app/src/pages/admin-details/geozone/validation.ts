import * as Yup from 'yup';

export const geozoneDetailsInitialValues = {
  description: "",
  city: "",
  zone_type: "",
  geocode: "",
  latitude_longitude: "",
  overlap_priority: "",
  assign_group: "",
  reverse_geocode: "",
  arrival_zone: "",
  departure_zone: "",
  zone_color: "",
  speed_limit: "",
}

export const geozoneDetailsYupValidationSchema = Yup.object().shape({});