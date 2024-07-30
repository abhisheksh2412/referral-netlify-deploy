import * as Yup from "yup";

const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const FILE_SIZE = 2 * 1024 * 1024; // 2MB
const IMAGE_WIDTH = 120;
const IMAGE_HEIGHT = 60;

export const AddCouponvalidationSchema = Yup.object().shape({
  coupon_image: Yup.mixed()
    .required("Coupon Image is Required")
    .test("fileSize", "File too large", function (value) {
      if (!value) return true; // Skip if no file uploaded
      return value.size <= MAX_FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", function (value) {
      if (!value) return true; // Skip if no file uploaded
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test(
      "fileDimensions",
      "Image dimensions should be between 200x200 and 500x500 pixels",
      (value) => {
        if (!value) return true; // If no file is provided, skip this test
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              const { width, height } = img;
              resolve(
                width >= 200 && height >= 200 && width <= 500 && height <= 500
              );
            };
            img.onerror = () => resolve(false);
            img.src = event.target.result;
          };
          reader.readAsDataURL(value);
        });
      }
    ),
  coupon_code: Yup.string().required("Coupon code is required"),
  coupon_value: Yup.string().required("Coupon value is required"),
  store_id: Yup.string().required("Store is required"),
  description: Yup.string().required("Description is required"),
});

export const UpdateCouponValidationSchema = Yup.object().shape({
  coupon_image: Yup.mixed()
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
    .test(
      "fileSize",
      "File too large",
      (value) => !value || (value && value.size <= FILE_SIZE)
    )
    .test("fileDimensions", "Image dimensions are incorrect", (value) => {
      if (!value) return true; // Attachment is optional
      return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(value);
        img.onload = () => {
          resolve(img.width === IMAGE_WIDTH && img.height === IMAGE_HEIGHT);
        };
      });
    }),
  coupon_code: Yup.string().required("Coupon code is required"),
  coupon_value: Yup.string().required("Coupon value is required"),
  description: Yup.string().required("Description is required"),
  store_id: Yup.string().required("Store selection is required"),
});
