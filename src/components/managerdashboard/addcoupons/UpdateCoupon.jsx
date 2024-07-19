"use client";
import EasySelect from "@/components/globals/EasySelect";
import Container from "@/components/globals/container";
import { GetStores } from "@/store/slices/seller";
import { UpdateCouponValidationSchema } from "@/validators/couponValidations";
import { useFormik } from "formik";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function UpdateCouponForm() {
  const { stores } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);

  const GetAllstores = useCallback(() => {
    dispatch(GetStores());
  }, [dispatch]);

  useEffect(() => {
    GetAllstores();
  }, [GetAllstores]);

  const options = stores?.data
    ? stores?.data?.map((item) => ({
        label: item?.name,
        value: item?.id,
      }))
    : [];

  const formik = useFormik({
    initialValues: {
      coupon_image: null,
      coupon_code: "",
      coupon_value: "",
      store_id: "",
      description: "",
    },
    validationSchema: UpdateCouponValidationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }
      console.log("FormData:", formData);
      // handle form submission, e.g., send the formData to the server
    },
  });

  return (
    <div className="p-8">
      <Container>
        <div className="p-12 new-shadow bg-white w-3/5 mx-auto rounded-lg">
          <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
            Update Coupon
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-6 w-full">
              <p className="text-base font-semibold mb-2">
                Upload Coupon Image
              </p>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Image Preview"
                    width={100}
                    height={100}
                    className="!w-full !h-[25vh]"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <CloudUpload className="text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="dropzone-file"
                  name="coupon_image"
                  type="file"
                  className="hidden"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    formik.setFieldValue("coupon_image", file);
                    if (file) {
                      setImagePreview(URL.createObjectURL(file));
                    } else {
                      setImagePreview(null);
                    }
                  }}
                />
              </label>
              {formik.errors.coupon_image && formik.touched.coupon_image ? (
                <div className="text-red-600">{formik.errors.coupon_image}</div>
              ) : null}
            </div>

            <div className="mt-6 w-full">
              <p className="text-base font-semibold mb-2">Coupon Code</p>
              <input
                type="text"
                id="coupon_code"
                name="coupon_code"
                className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
                placeholder="Add Coupon Code"
                value={formik.values.coupon_code}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.errors.coupon_code && formik.touched.coupon_code ? (
                <div className="text-red-600">{formik.errors.coupon_code}</div>
              ) : null}
            </div>

            <div className="mt-6 w-full">
              <p className="text-base font-semibold mb-2">Coupon Value</p>
              <input
                type="text"
                id="coupon_value"
                name="coupon_value"
                className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
                placeholder="Add Coupon Value"
                value={formik.values.coupon_value}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.errors.coupon_value && formik.touched.coupon_value ? (
                <div className="text-red-600">{formik.errors.coupon_value}</div>
              ) : null}
            </div>

            <div className="mt-5 w-full">
              <p className="text-base font-semibold mb-2">Coupon Description</p>
              <textarea
                id="description"
                name="description"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Coupon Description..."
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              ></textarea>
              {formik.errors.description && formik.touched.description ? (
                <div className="text-red-600">{formik.errors.description}</div>
              ) : null}
            </div>

            <div className="mt-5 w-full">
              <p className="text-base font-semibold mb-2">Select Store</p>
              <EasySelect
                options={options}
                defaultValut={options?.find(
                  (item) => item.value === formik.values.store_id
                )}
                name="store_id"
                handleChange={(value) =>
                  formik.setFieldValue("store_id", value?.value)
                }
              />
              {formik.errors.store_id && formik.touched.store_id ? (
                <div className="text-red-600">{formik.errors.store_id}</div>
              ) : null}
            </div>

            <div className="mt-5 w-full">
              <button
                type="submit"
                className="text-white w-full bg-blush-red font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
              >
                Add & Update
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default UpdateCouponForm;
