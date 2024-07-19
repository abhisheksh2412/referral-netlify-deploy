import * as Yup from "yup";

export const LoginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Require a valid email")
    .required("Email is Required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
});

export const UserSignupValidationsSchema = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("email is required"),
  mobile_number: Yup.number().required("mobile number is required"),
  dob: Yup.date(),
  password: Yup.string()
    .required("password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  password_confirmation: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const partnerSignupValidationsSchema = Yup.object({
  name: Yup.string().required("name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  street: Yup.string().required("Street is required"),
  house_no: Yup.string().required("house no is required"),
  city: Yup.string().required("city is required"),
  postal_code: Yup.string().required("Postal Code is required"),
  password: Yup.string()
    .required("password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  password_confirmation: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  mobile_number: Yup.string().matches(
    /^\d+$/,
    "Mobile number must be digits only"
  ),
  website: Yup.string().url("Invalid URL").required("Website is required"),
  business_name: Yup.string().required("bussiness name is required"),
  nip_number: Yup.string().required("NIP number is required"),
  industry: Yup.string().required("Industry is required"),
  description: Yup.string().required("sort discription is required"),
  referral_code: Yup.string(),
});

export const ChangePasswordValidation = Yup.object({
  password: Yup.string()
    .required("password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  password_confirmation: Yup.string()
    .required("confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const SellerEditProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  house_no: Yup.string().required("House No is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  postal_code: Yup.string().required("Postal Code is required"),
  mobile_number: Yup.string()
    .matches(/^[5-9][0-9]{8}$/, "Invalid mobile number")
    .required("Mobile number is required"),
});
export const PartnerProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  house_no: Yup.string().required("House No is required"),
  street: Yup.string().required("Street is required"),
  city: Yup.string().required("City is required"),
  postal_code: Yup.string().required("Postal Code is required"),
  mobile_number: Yup.string()
    .matches(/^[5-9][0-9]{8}$/, "Invalid mobile number")
    .required("Mobile number is required"),
  business_name: Yup.string().required("Business Name is requried"),
  website: Yup.string().url("Invalid Url").required("Website Url is required"),
  industry: Yup.string().required("Industry Name is Required"),
  description: Yup.string().required("Description is Required"),
});

export const CreateManagerValdiations = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("password is required")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    ),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
});
