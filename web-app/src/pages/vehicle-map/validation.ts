import * as Yup from 'yup';

export const formInitialValues = {
  all_event: false,
  accelerated: false,
  button_pressed: false,
  d_accelerated: false,
  distracted_driving: false,
  driver_check_in: false,
  driver_check_out: false,
  driver_unbelted: false,
};

export const formValidationSchema = Yup.object().shape({});