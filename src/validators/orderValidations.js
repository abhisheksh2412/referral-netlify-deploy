import * as Yup from "yup";

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

export const SendMessageAddCouponValidation = Yup.object().shape({
  coupon_name: Yup.string().required("Coupon name is required"),
  points: Yup.number()
    .required("Points/Percentages are required")
    .positive()
    .integer(),
  validity: Yup.date().required("Validity period is required"),
  coupon_image: Yup.mixed()
    .required("Image is required")
    .test("fileSize", "Image must be less than 2MB", (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB
    })
    .test("fileFormat", "Image must be in jpeg or png format", (value) => {
      return (
        value && (value.type === "image/jpeg" || value.type === "image/png")
      );
    })
    .test(
      "fileDimensions",
      "Image dimensions should be 500x500 pixels",
      (value) => {
        return new Promise((resolve) => {
          if (!value) resolve(false);
          const img = new Image();
          img.src = URL.createObjectURL(value);
          img.onload = () => {
            const isValid = img.width === 500 && img.height === 500;
            resolve(isValid);
          };
        });
      }
    ),
});

export const AddSendMessageValidations = Yup.object({
  user_id: Yup.string().required("Please select a user"),
  test_message: Yup.string().required("Message is required"),
});

export const UserBirthdayCrationValidate = Yup.object({
  birthday_image: Yup.mixed()
    .required("Birthday image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileDimensions",
      "Image dimensions should be 500x500 pixels",
      (value) => {
        if (!value) return true; // If there is no file, we pass the test.
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.width === 500 && img.height === 500);
            };
            img.onerror = () => resolve(false);
            img.src = e.target.result;
          };
          reader.readAsDataURL(value);
        });
      }
    ),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  user_id: Yup.string().required("User ID is required"),
  message: Yup.string()
    .required("Message is required")
    .max(500, "Message cannot exceed 500 characters"),
});
export const UserBirthdayUpdateValidate = Yup.object({
  birthday_image: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileDimensions",
      "Image dimensions should be 500x500 pixels",
      (value) => {
        if (!value) return true; // If there is no file, we pass the test.
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.width === 500 && img.height === 500);
            };
            img.onerror = () => resolve(false);
            img.src = e.target.result;
          };
          reader.readAsDataURL(value);
        });
      }
    ),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be in the future"),
  user_id: Yup.string().required("User ID is required"),
  message: Yup.string()
    .required("Message is required")
    .max(500, "Message cannot exceed 500 characters"),
});

// plastic card image and storeid valdations

export const PlasticCardValidationSchema = Yup.object({
  template_image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Only jpeg and png files are allowed", (value) => {
      return (
        value && (value.type === "image/jpeg" || value.type === "image/png")
      );
    })
    .test("fileSize", "File size should be less than 2MB", (value) => {
      return value && value.size <= 2 * 1024 * 1024; // 2MB
    })
    .test(
      "fileDimensions",
      "Image dimensions should be at least 223x204 pixels",
      (value) => {
        return new Promise((resolve) => {
          if (!value) {
            resolve(false);
          } else {
            const img = new Image();
            img.src = URL.createObjectURL(value);
            img.onload = () => {
              if (img.width >= 223 && img.height >= 204) {
                resolve(true);
              } else {
                resolve(false);
              }
            };
            img.onerror = () => {
              resolve(false);
            };
          }
        });
      }
    ),
  store_id: Yup.string().required("Store ID is required"),
});

export const StoreBirthdayCreateValidation = Yup.object().shape({
  store_id: Yup.string().required("Store ID is required"),
  dob: Yup.date().required("Date of birth is required"),
  message: Yup.string().required("Message is required"),
  birthday_image: Yup.mixed()
    .required("Birthday image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => value && value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileDimensions",
      "Image dimensions should be 500x500 pixels",
      (value) => {
        if (!value) return true; // If there is no file, we pass the test.
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.width === 500 && img.height === 500);
            };
            img.onerror = () => resolve(false);
            img.src = e.target.result;
          };
          reader.readAsDataURL(value);
        });
      }
    ),
});

export const StoreBirthdayUpdateValidation = Yup.object().shape({
  store_id: Yup.string().required("Store ID is required"),
  dob: Yup.date().required("Date of birth is required"),
  message: Yup.string().required("Message is required"),
  birthday_image: Yup.mixed()
    .nullable()
    .test(
      "fileSize",
      "File size is too large",
      (value) => !value || value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported format",
      (value) => !value || SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileDimensions",
      "Image dimensions should be 500x500 pixels",
      (value) => {
        if (!value) return true; // If there is no file, we pass the test.
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.width === 500 && img.height === 500);
            };
            img.onerror = () => resolve(false);
            img.src = e.target.result;
          };
          reader.readAsDataURL(value);
        });
      }
    ),
});
