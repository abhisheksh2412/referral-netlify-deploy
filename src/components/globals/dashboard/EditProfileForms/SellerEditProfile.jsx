"use client";
import { MdEdit } from "react-icons/md";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { SellerEditProfileValidationSchema } from "@/validators/authValidations";
import { UpdateProfileBySellerId } from "@/store/slices/seller";
import Loader from "../../Loader";
import { FindSelfUser } from "@/store/slices/authSlice";
import Swal from "sweetalert2";
import Image from "next/image";

export default function EditProfile({ handleOpen }) {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.seller);
  const user = useSelector((state) => state.auth.data);
  const [selectedImage, setSelectedImage] = useState(null);
  const [ImageBinary, setImageBinary] = useState(null);

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: user.name || "",
      email: user.email || "",
      profile_photo_url: null,
      house_no: user?.address?.house_no || "",
      street: user?.address?.street || "",
      city: user?.address?.city || "",
      postal_code: user?.address?.postal_code || "",
      mobile_number: user?.mobile_number || "",
    },
    validationSchema: SellerEditProfileValidationSchema,
    onSubmit: async (values) => {
      const formdata = new FormData();

      for (let key of Object.keys(values)) {
        if (key !== "profile_photo_url") {
          formdata.append(key, values[key]);
        }
      }

      if (ImageBinary) {
        formdata.append("profile_photo_url", ImageBinary);
      }

      await dispatch(UpdateProfileBySellerId(user?.id, formdata));
      dispatch(FindSelfUser());
      handleOpen();
      Swal.fire({ icon: "success", text: "updated profile successfully" });
    },
  });

  // Handle file change for profile photo
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setImageBinary(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Loader isLoading={isLoading}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <span className="relative table mx-auto">
           
            <Image
              src={selectedImage || user.profile_photo_url}
              width={500}
              height={500}
              alt="seller avatar"
              className="w-28 h-28 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-auto table"
            />

            <div
              onClick={() => document.getElementById("file-select").click()}
              className="absolute right-2.5 top-0 w-5 h-5 !bg-blush-red rounded-full flex items-center justify-center cursor-pointer"
            >
              <MdEdit className="text-white" />
            </div>
            <input
              type="file"
              className="hidden"
              id="file-select"
              onChange={handleFileChange}
              accept="image/*"
            />
          </span>

          <div className="grid gap-2 mb-6 md:grid-cols-2 px-3 mt-6">
            <div>
              <label
                htmlFor="house_no"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter House No"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.house_no && formik.errors.house_no ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.house_no}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="house_no"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email Id
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter House No"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.house_no && formik.errors.house_no ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.house_no}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="house_no"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                House No:
              </label>
              <input
                type="text"
                id="house_no"
                name="house_no"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter House No"
                {...formik.getFieldProps("house_no")}
              />
              {formik.touched.house_no && formik.errors.house_no ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.house_no}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="street"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Street:
              </label>
              <input
                type="text"
                id="street"
                name="street"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Street"
                {...formik.getFieldProps("street")}
              />
              {formik.touched.street && formik.errors.street ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.street}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter City"
                {...formik.getFieldProps("city")}
              />
              {formik.touched.city && formik.errors.city ? (
                <div className="text-red-500 text-xs">{formik.errors.city}</div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="postal_code"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Postal Code:
              </label>
              <input
                type="tel"
                id="postal_code"
                name="postal_code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Postal Code"
                {...formik.getFieldProps("postal_code")}
              />
              {formik.touched.postal_code && formik.errors.postal_code ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.postal_code}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="mobile_number"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile No:
              </label>
              <input
                type="tel"
                id="mobile_number"
                name="mobile_number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none block w-full p-2.5"
                placeholder="Enter Mobile No"
                {...formik.getFieldProps("mobile_number")}
              />
              {formik.touched.mobile_number && formik.errors.mobile_number ? (
                <div className="text-red-500 text-xs">
                  {formik.errors.mobile_number}
                </div>
              ) : null}
            </div>
          </div>

          <div className="p-4 border-t text-right">
            <button
              type="submit"
              className="border align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg text-white hover:bg-white/10 active:bg-white/30 mr-1 !bg-blush-red"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Loader>
  );
}
