import * as Yup from "yup";

export const MaxpointValidation = Yup.object({
  max_points_per_upload: Yup.number().required("Max Per Upload is Required"),
  max_points_per_day: Yup.number().required("Max per day is Required"),
  set_screen_timeout: Yup.number().required("Screen Timeout is requried"),
});
