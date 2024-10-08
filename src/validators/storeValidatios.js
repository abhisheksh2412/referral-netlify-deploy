import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const CreateStoreValidationSchema = Yup.object({
  name: Yup.string().required("Store Name is required"),
  category_id: Yup.string().required("Category is required"),
  number: Yup.number().required("Store No is required"),
  street: Yup.string().required("Street is required"),
  town: Yup.string().required("Town is required"),
  postal_code: Yup.string()
    .min(5, "Postal Code min 5 digit")
    .max(5, "Postal Code max 5 digit")
    .required("Postal Code is required"),
  mobile_number: Yup.string()
    .max(9, "Mobile Number contains only max 9 digit")
    .required("Mobile No is required"),
  description: Yup.string().required("Store Description is required"),
  logo: Yup.mixed()
    .required("Store Logo is required")
    .test("fileSize", "File too large", (value) => {
      return value && value.size <= MAX_FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value) => {
      return value && SUPPORTED_FORMATS.includes(value.type);
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
});
export const UpdateStoreValidationSchema = Yup.object({
  name: Yup.string().required("Store Name is required"),
  category_id: Yup.string().required("Category is required"),
  number: Yup.number().required("Store No is required"),
  street: Yup.string().required("Street is required"),
  town: Yup.string().required("Town is required"),
  postal_code: Yup.string()
    .min(5, "Postal Code must be 5 digit")
    .max(5, "Postal Code should not greater then 5 ")
    .required("Postal Code is required"),
  mobile_number: Yup.string()
    .max(9, "Mobile Number contains only max 9 digit")
    .required("Mobile No is required"),
  description: Yup.string().required("Store Description is required"),
  logo: Yup.mixed()
    .nullable()
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
});

export const AddProductPointsvalidation = Yup.object().shape({
  card_id: Yup.string().required("Card ID is required"),
  coupon_id: Yup.string().nullable(),
  customer_id: Yup.string().required("Customer ID is required"),
  exchange_point: Yup.number()
    .nullable()
    .positive("Exchange Point must be a positive number"),
  expire_at: Yup.string().required("Expiry date is required"),
  store_id: Yup.string().required("Store ID is required"),
  productList: Yup.array().of(
    Yup.object().shape({
      product_name: Yup.string().required("Product name is required"),
      product_image: Yup.mixed()
        .required("Product image is required")
        .test(
          "fileType",
          "Unsupported File Format. Only JPEG, JPG and PNG are allowed.",
          (value) => value && SUPPORTED_FORMATS.includes(value.type)
        )
        .test(
          "fileSize",
          "File size is too large. Maximum size is 2MB.",
          (value) => value && value.size <= MAX_FILE_SIZE
        )
        .test(
          "fileDimensions",
          "Image dimensions must be 500x500",
          function (value) {
            if (!value) return true; // Skip if no file uploaded
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                  resolve(img.width === 500 && img.height === 500);
                };
                img.src = event.target.result;
              };
              reader.readAsDataURL(value);
            });
          }
        ),
      barcode: Yup.string().required("Barcode is required"),
      product_points: Yup.number()
        .typeError("Product Points must be a number.")
        .required("Product points are required")
        .positive("Product points must be a positive number"),
      quantity: Yup.number()
        .typeError("Quantity must be a number.")
        .required("Quantity is required")
        .positive("Quantity must be a positive number")
        .integer("Quantity must be an integer"),
    })
  ),
});

export const UpdateProductSchema = Yup.object().shape({
  product_name: Yup.string().required("Product name is required"),
  product_image: Yup.mixed()
    .nullable()
    .notRequired()
    .test(
      "fileType",
      "Unsupported File Format. Only JPEG, JPG and PNG are allowed.",
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size is 2MB.",
      (value) => !value || (value && value.size <= MAX_FILE_SIZE)
    )
    .test(
      "fileDimensions",
      "Image dimensions must be 500x500",
      function (value) {
        if (!value) return true; // Skip if no file uploaded
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.width === 500 && img.height === 500);
            };
            img.src = event.target.result;
          };
          reader.readAsDataURL(value);
        });
      }
    ),
  barcode: Yup.string().required("Barcode is required"),
  earn_point: Yup.number()
    .required("Points are required")
    .positive("Points must be positive"),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be positive")
    .integer("Quantity must be an integer"),
});
