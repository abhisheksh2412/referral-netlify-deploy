import * as Yup from "yup";
const SUPPORTED_FORMATS = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
const FILE_SIZE = 2 * 1024 * 1024; // 2MB

export const ProductCreateValidationsSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  points: Yup.number()
    .min(1, "Points must be at least 1")
    .required("Points are required"),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  product_image: Yup.mixed()
    .test(
      "fileFormat",
      "Unsupported Format",
      (value) => value && SUPPORTED_FORMATS.includes(value.type)
    )
    .test(
      "fileSize",
      "File too large",
      (value) => value && value.size <= FILE_SIZE
    )
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
  description: Yup.string().required("Description is required"),
  weight: Yup.string().required("Weight is required"),
  store_id: Yup.string().required("Store ID is required"),
});




export const UpdateProductvalidationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    points: Yup.number().min(1, 'Points must be at least 1').required('Points are required'),
    quantity: Yup.number().min(1, 'Quantity must be at least 1').required('Quantity is required'),
    product_image: Yup.mixed()
      .nullable()
      .test(
        "fileFormat",
        "Unsupported Format",
        value => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      )
      .test(
        "fileSize",
        "File too large",
        value => !value || (value && value.size <= FILE_SIZE)
      )
      .test(
        "fileDimensions",
        "Image dimensions should be between 200x200 and 500x500 pixels",
        value => {
          if (!value) return true; // If no file is provided, skip this test
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const img = new Image();
              img.onload = () => {
                const { width, height } = img;
                resolve(width >= 200 && height >= 200 && width <= 500 && height <= 500);
              };
              img.onerror = () => resolve(false);
              img.src = event.target.result;
            };
            reader.readAsDataURL(value);
          });
        }
      ),
    description: Yup.string().required('Description is required'),
    weight: Yup.string().required('Weight is required'),
    store_id: Yup.string().required('Store ID is required')
  });
