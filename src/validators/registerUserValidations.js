import * as yup from "yup";

export const AssignCardToUserValidations = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email().required("Email is required"),
  surname: yup.string().required("Surname is Required"),
  card_id: yup.string().required("Card Number is required"),
});
