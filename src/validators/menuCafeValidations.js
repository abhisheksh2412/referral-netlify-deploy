import * as Yup from "yup";

const IMAGE_WIDTH = 100;
const IMAGE_HEIGHT = 60;
export const CreateMenuValidationSchema = Yup.object().shape({
  menu_shop_cafe_img: Yup.mixed()
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true; // Allow empty values
      return value.size <= 2 * 1024 * 1024; // 2 MB limit
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true; // Allow empty values
      return (
        ["image/jpeg", "image/jpg", "image/png"].includes(value.type) &&
        /\.(jpg|jpeg|png)$/.test(value.name.toLowerCase())
      );
    })
    .test(
      "fileDimensions",
      "Image dimensions are incorrect needed 100x60PX",
      (value) => {
        if (!value) return true; // Attachment is optional
        return new Promise((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(value);
          img.onload = () => {
            resolve(img.width === IMAGE_WIDTH && img.height === IMAGE_HEIGHT);
          };
        });
      }
    )
    .required("Menu Cafe Image is required"),
  title: Yup.string().required("Title is required"),
  weight: Yup.string().required("Weight is required"),
  store_id: Yup.string().required("Store is required"),
  description: Yup.string().required("Description is required"),
  points: Yup.string().required("Point is required"),
});
export const UpdateMenuValidationSchema = Yup.object().shape({
  menu_shop_cafe_img: Yup.mixed()
    .nullable()
    .test("fileSize", "File size is too large", (value) => {
      if (!value) return true; // Allow empty values
      return value.size <= 2 * 1024 * 1024; // 2 MB limit
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value) return true; // Allow empty values
      return (
        ["image/jpeg", "image/jpg", "image/png"].includes(value.type) &&
        /\.(jpg|jpeg|png)$/.test(value.name.toLowerCase())
      );
    })
    .test(
      "fileDimensions",
      "Image dimensions are incorrect, needed 100x60PX",
      (value) => {
        if (!value) return true; // Attachment is optional
        return new Promise((resolve) => {
          const img = new Image();
          img.src = URL.createObjectURL(value);
          img.onload = () => {
            resolve(img.width === IMAGE_WIDTH && img.height === IMAGE_HEIGHT);
          };
        });
      }
    ),
  title: Yup.string().required("Title is required"),
  weight: Yup.string().required("Weight is required"),
  store_id: Yup.string().required("Store is required"),
  description: Yup.string().required("Description is required"),
  points: Yup.string().required("Point is required"),
});
