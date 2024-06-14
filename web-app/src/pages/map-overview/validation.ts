import * as Yup from 'yup';

export const formInitialValues = {
  address: "",
  traffic: false,
  weather: false,
  street_view: false,
  three_d_building: false,
  attribute_filtering: "",
  spatial_filtering: "",
  temporal_filtering: "",
  hide_geozones: false,
  clustering: false,
  date: "",
  time: "",
  timezone: "",
  auto_refresh_timer: "",
}

export const dateInitialValues = {
  date: "",
  time: "",
  timezone: "",
}

export const LayerFilterInitialValues = {
  view: "Road",
  traffic: false,
  weather: false,
  three_d_building: false,
  clustering: false,
  hide_geozones: false,
}

export const dateValidationSchema = Yup.object().shape({
});

export const YupValidationSchema = Yup.object().shape({});

export const LayerFilterValidationSchema = Yup.object().shape({});