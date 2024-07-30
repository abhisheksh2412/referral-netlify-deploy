import * as Yup from "yup";

export const CreateBestSellerValidations = Yup.object({
  product_id: Yup.string().required("Product is required"),
  banner_image: Yup.mixed()
    .required("Banner Image is required")
    .test(
      "fileSize",
      "File size is too large",
      (value) => value && value.size <= 2000000
    )
    .test("fileType", "Unsupported file format", (value) =>
      ["image/jpeg", "image/png", "image/jpg"].includes(value && value.type)
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
});
