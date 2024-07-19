"use client";
import { popup } from "@/_utils/alerts";
import EasySelect from "@/components/globals/EasySelect";
import Loader from "@/components/globals/Loader";
import Container from "@/components/globals/container";
import { AddCoupon } from "@/store/slices/coupon";
import { GetStores } from "@/store/slices/seller";
import { AddCouponvalidationSchema } from "@/validators/couponValidations";
import { useFormik } from "formik";
import { CloudUpload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function AddCouponForm() {
  const navigate = useRouter();
  const { stores } = useSelector((state) => state.seller);
  const [selectedImage, setSelectedImage] = useState(null);
  const coupon = useSelector((state) => state.coupon);
  const dispatch = useDispatch();
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
    validationSchema: AddCouponvalidationSchema,
    onSubmit: async (values) => {
      const formdata = new FormData();
      for (const key in values) {
        if (key !== "coupon_image" && !values[key]) {
          continue;
        }
        formdata.append(key, values[key]);
      }
      await dispatch(AddCoupon(formdata));
      if (coupon.isSuccess) {
        popup({ status: "success", message: "success created combo" });
        navigate.back();
      }
    },
  });

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      formik.setFieldValue("coupon_image", event.currentTarget.files[0]);
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  // const createdSuccessfully = useCallback(() => {
  //   if (coupon.isSuccess) {
  //     popup({ message: "coupon created successfully", status: "success" });
  //     navigate.back();
  //   }
  // }, [coupon.isSuccess]);
  // useEffect(() => {
  //   createdSuccessfully();
  // }, [createdSuccessfully]);
  return (
    <Loader isLoading={coupon.isLoading}>
      <div>
        <div className="p-8 mobile:p-2">
          <Container>
            <div className="p-12 new-shadow bg-white w-3/5 mobile:w-full sm:w-8/12 md:w-9/12 sm:p-6 mobile:p-3 mx-auto rounded-lg">
              <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
                Add Coupon
              </h3>
              <form onSubmit={formik.handleSubmit}>
                <div className="mt-6 w-full">
                  <p className="text-base font-semibold mobile:font-medium mb-2">
                    Upload Coupon Image
                  </p>
                  <label
                    htmlFor="coupon_image"
                    className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    {selectedImage && (
                      <Image
                        src={selectedImage}
                        width={100}
                        height={100}
                        alt="Selected Coupon Image"
                        className="!w-full !h-[25vh] object-cover"
                      />
                    )}
                    {!selectedImage && (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CloudUpload className="text-gray-500" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          JPG, JPEG, or PNG (Max. 2MB, 120x60px)
                        </p>
                      </div>
                    )}
                    <input
                      id="coupon_image"
                      name="coupon_image"
                      type="file"
                      onChange={(event) => {
                        handleImageChange(event);
                      }}
                      className="hidden"
                    />
                  </label>
                  {formik.errors.coupon_image &&
                    formik.touched.coupon_image && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.coupon_image}
                      </div>
                    )}
                </div>

                <div className="mt-6 w-full">
                  <p className="text-base font-semibold mb-2">Coupon Code</p>
                  <input
                    type="text"
                    id="coupon_code"
                    name="coupon_code"
                    className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
                    placeholder="Add Coupon Code"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.coupon_code}
                  />
                  {formik.errors.coupon_code && formik.touched.coupon_code && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.coupon_code}
                    </div>
                  )}
                </div>

                <div className="mt-6 w-full">
                  <p className="text-base font-semibold mb-2">Coupon Value</p>
                  <input
                    type="text"
                    id="coupon_value"
                    name="coupon_value"
                    className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
                    placeholder="Add Coupon Value"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.coupon_value}
                  />
                  {formik.errors.coupon_value &&
                    formik.touched.coupon_value && (
                      <div className="text-red-500 text-xs mt-1">
                        {formik.errors.coupon_value}
                      </div>
                    )}
                </div>

                <div className="mt-5 w-full">
                  <p className="text-base font-semibold mb-2">
                    Coupon Description
                  </p>
                  <textarea
                    id="description"
                    name="description"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Coupon Description..."
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                  ></textarea>
                  {formik.errors.description && formik.touched.description && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.description}
                    </div>
                  )}
                </div>

                <div className="mt-5 w-full">
                  <p className="text-base font-semibold mb-2">Select Store</p>
                  <EasySelect
                    id="store_id"
                    name="store_id"
                    options={options}
                    handleChange={(value) => {
                      formik.setFieldValue("store_id", value.value);
                    }}
                  />
                  {formik.errors.store_id && formik.touched.store_id && (
                    <div className="text-red-500 text-xs mt-1">
                      {formik.errors.store_id}
                    </div>
                  )}
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
      </div>
    </Loader>
  );
}

export default AddCouponForm;
