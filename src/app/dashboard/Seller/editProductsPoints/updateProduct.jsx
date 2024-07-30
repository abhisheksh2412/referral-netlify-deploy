import GlobalInput from "@/components/globals/globalInput";
import { config } from "@/config/config";
import {
  GetAllProductsAndPoints,
  UpdateProductsAndPoints,
} from "@/store/slices/products";
import { UpdateProductSchema } from "@/validators/storeValidatios";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function UpdateProduct({ data, handleClose }) {
  const [imagePreview, setImagePreview] = useState(
    config?.IMAGE_URL_PATH + data.product_image
  );
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.auth.data);

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      product_name: data.product_name || "",
      product_image: null,
      barcode: data.barcode || "",
      earn_point: data.earn_point || "",
      quantity: data.quantity || "",
    },
    validationSchema: UpdateProductSchema,
    onSubmit: async (values) => {
      const formdata = new FormData();

      for (const key of Object.keys(values)) {
        if (key === "product_image" && values.product_image === null) continue;
        formdata.append(key, values[key]);
      }

      await dispatch(UpdateProductsAndPoints(data?.id, formdata));
      dispatch(GetAllProductsAndPoints(user?.id));
      if (product.isSuccess) {
        Swal.mixin({ toast: true }).fire({
          icon: "success",
          text: "Product updated successfully",
          showConfirmButton: false,
          timer: 1200,
        });
        handleClose(null);
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      formik.setFieldValue("product_image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <form className="w-full" onSubmit={formik.handleSubmit}>
      <div className="bg-white shadow-md rounded-lg">
        <div className="flex items-center justify-between !inline-block bg-blush-red text-white w-full mobile:w-full p-5 border-b rounded-t-lg">
          <h4 className="font-semibold text-base">Update</h4>
        </div>
        <div className="p-8 rounded-b-lg max-h-[77vh] overflow-y-auto">
          <div className="sm:rounded-lg">
            <div className="md:px-2 lg:px-2 py-1 mb-3">
              <div className="mobile:py-1">
                <label className="text-base font-medium text-black mb-2 inline-block">
                  Product Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Product Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
                {formik.touched.product_image && formik.errors.product_image ? (
                  <p className="text-xs text-red-500  p-1">
                    {formik.errors.product_image}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="md:px-2 lg:px-2 py-1 mb-3">
              <div className="mobile:py-1">
                <label className="text-base font-medium text-black mb-2 inline-block">
                  Product Name
                </label>
                <GlobalInput
                  name="product_name"
                  type="text"
                  placeholder="Enter Product Name"
                  inputClassName="outline-none text-sm"
                  parentClassName="p-4 rounded-md border"
                  value={formik.values.product_name}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.product_name && formik.errors.product_name
                      ? formik.errors.product_name
                      : null
                  }
                />
              </div>
            </div>
            <div className="md:px-2 lg:px-2 py-1 mb-3">
              <div className="mobile:py-1">
                <label className="text-base font-medium text-black mb-2 inline-block">
                  Product Quantity
                </label>
                <GlobalInput
                  name="quantity"
                  type="text"
                  placeholder="Enter Product Quantity"
                  inputClassName="outline-none text-sm"
                  parentClassName="p-4 rounded-md border"
                  value={formik.values.quantity}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.quantity && formik.errors.quantity
                      ? formik.errors.quantity
                      : null
                  }
                />
              </div>
            </div>
            <div className="md:px-2 lg:px-2 py-1 mb-3">
              <div className="mobile:py-1">
                <label className="text-base font-medium text-black mb-2 inline-block">
                  Product Points
                </label>
                <GlobalInput
                  name="earn_point"
                  type="text"
                  placeholder="Enter Product Points"
                  inputClassName="outline-none text-sm"
                  parentClassName="p-4 rounded-md border"
                  value={formik.values.earn_point}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.earn_point && formik.errors.earn_point
                      ? formik.errors.earn_point
                      : null
                  }
                />
              </div>
            </div>
            <div className="md:px-2 lg:px-2 py-1 mb-3">
              <div className="mobile:py-1">
                <label className="text-base font-medium text-black mb-2 inline-block">
                  Barcode Number
                </label>
                <GlobalInput
                  name="barcode"
                  type="text"
                  placeholder="Enter Barcode Number"
                  inputClassName="outline-none text-sm"
                  parentClassName="p-4 rounded-md border"
                  value={formik.values.barcode}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.barcode && formik.errors.barcode
                      ? formik.errors.barcode
                      : null
                  }
                />
              </div>
            </div>
            <div className="mt-4">
              <button
                type="submit"
                className="text-white text-sm rounded-md font-semibold bg-blush-red p-4 w-full flex justify-center items-center gap-2 mt-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
