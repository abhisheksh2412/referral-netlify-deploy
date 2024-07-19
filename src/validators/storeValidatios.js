import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/png", "image/jpeg", "image/jpg"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const CreateStoreValidationSchema = Yup.object({
  name: Yup.string().required("Store Name is required"),
  category_id: Yup.string().required("Category is required"),
  number: Yup.number().required("Store No is required"),
  street: Yup.string().required("Street is required"),
  town: Yup.string().required("Town is required"),
  postal_code: Yup.string().required("Postal Code is required"),
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
    .test("fileDimensions", "Image dimensions must be 100x100", (value) => {
      return new Promise((resolve) => {
        if (!value) {
          resolve(false);
        }
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = () => {
            resolve(img.width === 100 && img.height === 100);
          };
          img.src = event.target.result;
        };
        reader.readAsDataURL(value);
      });
    }),
});
export const UpdateStoreValidationSchema = Yup.object({
  name: Yup.string().required("Store Name is required"),
  category_id: Yup.string().required("Category is required"),
  number: Yup.number().required("Store No is required"),
  street: Yup.string().required("Street is required"),
  town: Yup.string().required("Town is required"),
  postal_code: Yup.string().required("Postal Code is required"),
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
      "Image dimensions must be 100x100",
      function (value) {
        if (!value) return true; // Skip if no file uploaded
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
              resolve(img.width === 100 && img.height === 100);
            };
            img.src = event.target.result;
          };
          reader.readAsDataURL(value);
        });
      }
    ),
});
