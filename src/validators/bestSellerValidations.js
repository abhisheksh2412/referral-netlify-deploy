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
    .test("dimensions", "Image must be 120x60px", async (value) => {
      if (value) {
        const file = value;
        const image = new Image();
        image.src = URL.createObjectURL(file);

        return new Promise((resolve) => {
          image.onload = function () {
            const width = image.naturalWidth;
            const height = image.naturalHeight;
            URL.revokeObjectURL(image.src);
            resolve(width === 120 && height === 60);
          };
        });
      }
      return true;
    }),
  description: Yup.string().required("Description is required"),
});
