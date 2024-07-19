import * as yup from "yup";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

// Custom validation function to check image dimensions

const checkImageDimensions = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const { width, height } = img;
        resolve(width <= 100 && height <= 100);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

// Edit is not functional in combo so it was only placed not working
// export const UpdateComboValidations = yup.object({
//   store_id: yup.string().required(),
//   product_ids: yup
//     .array()
//     .min(2, "Select At least 2 products")
//     .required("Product is required"),
//   banner_image: yup
//     .mixed()
//     .nullable()
//     .test("fileType", "Unsupported file format", (value) => {
//       if (!value) return true;
//       return ["image/png", "image/jpg", "image/jpeg"].includes(value.type);
//     })
//     .test("fileSize", "File too large", (value) => {
//       if (!value) return true;
//       return value.size <= MAX_FILE_SIZE;
//     })
//     .test(
//       "dimensions",
//       "Please upload images with dimensions of 120x60 px",
//       async (value) => {
//         if (!value) return true;
//         return await checkImageDimensions(value);
//       }
//     ),
//   title: yup.string().required("Title is required"),
//   description: yup.string().required("Description is required"),
//   points: yup.string().required("Points is required"),
// });
export const CreateComboValidation = yup.object({
  store_id: yup.string().required(),
  product_ids: yup
    .array()
    .min(2, "Select Atleast 2 product")
    .required("Product is required"),
  banner_image: yup
    .mixed()
    .required("Banner image is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value && ["image/png", "image/jpg", "image/jpeg"].includes(value.type)
      );
    })
    .test("fileSize", "File too large", (value) => {
      return value && value.size <= MAX_FILE_SIZE;
    })
    .test(
      "dimensions",
      "Please upload images with dimensions of 120x60 px",
      async (value) => {
        return await checkImageDimensions(value);
      }
    ),
  title: yup.string().required("Title is required"),
  description: yup.string().required("Descriptions is required"),
  points: yup.string().required("Points is required"),
});

export const BithdayFormValidation =  yup.object({
    selectField: yup.string().required('Please select an option'),
    date: yup.date().required("Date Field is required"),
    message: yup.string().required('Message is required'),
    imageField: yup
    .mixed()
    .notRequired() // Allows the field to be empty
    .test("fileFormat", "Unsupported file format", (value) => {
      return !value || SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "File size too large", (value) => {
      return !value || value.size <= MAX_FILE_SIZE;
    })
    .test(
      "dimensions",
      "Please upload images with dimensions of 100x100 px",
      async (value) => {
        if (!value) return true; // Skip validation if value is not present
        return await checkImageDimensions(value);
      }),
})

export const BithdayCouponFormValidation =  yup.object({
  coupon_name: yup.string().required('Coupon name is required'),
  points: yup.number().typeError('Must be a number').required('Points is required'),
  validity: yup.date().required('Validity is required'),
  coupon_image: yup
  .mixed()
  .notRequired() // Allows the field to be empty
  .test("fileFormat", "Unsupported file format", (value) => {
    return !value || SUPPORTED_FORMATS.includes(value.type);
  })
  .test("fileSize", "File size too large", (value) => {
    return !value || value.size <= MAX_FILE_SIZE;
  })
  .test(
    "dimensions",
    "Please upload images with dimensions of 100x100 px",
    async (value) => {
      if (!value) return true; // Skip validation if value is not present
      return await checkImageDimensions(value);
    }),
})
