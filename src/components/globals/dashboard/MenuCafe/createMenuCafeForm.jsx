"use client";
import { useDispatch, useSelector } from "react-redux";
import EasySelect from "../../EasySelect";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetStores } from "@/store/slices/seller";
import { useFormik } from "formik";
import {
  CreateMenuValidationSchema,
  UpdateMenuValidationSchema,
} from "@/validators/menuCafeValidations";
import Image from "next/image";
import {
  CreateMenuShopCafe,
  GetMenuCafeList,
  UpdateMenuCafe,
} from "@/store/slices/menuShopCafe";
import Loader from "../../Loader";
import { popup } from "@/_utils/alerts";
import { useRouter } from "next/navigation";
import { config } from "@/config/config";

export default function CreateMenuCafeForm({
  menuPlacement = "bottom",
  edit = false,
  editData = null,
  handleModal = null,
}) {
  const navigate = useRouter();
  const [selectedImage, setSelectedImage] = useState(
    config.IMAGE_URL_PATH + editData?.menu_shop_cafe_img || null
  );
  const { stores } = useSelector((state) => state.seller);
  const { isLoading, isSuccess } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const getStoreList = useCallback(() => {
    dispatch(GetStores());
  }, [dispatch]);

  useEffect(() => {
    getStoreList();
  }, [getStoreList]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      formik.setFieldValue("menu_shop_cafe_img", event.currentTarget.files[0]);
      const file = event.target.files[0];
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };

  const formik = useFormik({
    initialValues: {
      menu_shop_cafe_img: "",
      title: editData?.title || "",
      weight: editData?.weight || "",
      price: editData?.price || "",
      store_id: editData?.store_id || "",
      description: editData?.description || "",
      points: editData?.points || "",
    },
    validationSchema: edit
      ? UpdateMenuValidationSchema
      : CreateMenuValidationSchema,
    enableReinitialize: edit,
    onSubmit: async (values, { resetForm }) => {
      const formdata = new FormData();
      for (const key of Object.keys(values)) {
        if (key === "menu_shop_cafe_img" && !values[key]) continue;
        formdata.append(key, values[key]);
      }

      if (edit) {
        await handleUpdateCafe(formdata, resetForm);
      } else {
        await handleCreateCafe(formdata, resetForm);
      }
    },
  });

  const handleCreateCafe = async (formdata, resetForm) => {
    await dispatch(CreateMenuShopCafe(formdata));
    setTimeout(() => {
      if (isSuccess) {
        popup({ status: "success", message: "create Successfully" });
        resetForm();
        navigate.back();
      }
    }, 400);
  };
  const handleUpdateCafe = async (formdata, resetForm) => {
    await dispatch(UpdateMenuCafe({ id: editData?.id, data: formdata }));
    for (const [key, value] of formdata.entries()) {
      console.log(`${key}:`, value);
    }
    dispatch(GetMenuCafeList());
    setTimeout(() => {
      if (isSuccess) {
        handleModal(null);
        popup({ status: "success", message: "Updated Successfully" });
      }
    }, 400);
    resetForm();
  };

  const storeListOptions = useMemo(() => {
    return stores?.data?.map((item) => ({ label: item.name, value: item?.id }));
  }, [stores]);
  return (
    <Loader isLoading={isLoading}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Upload Menu Cafe Image</p>
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={(event) => handleImageChange(event)}
              />
              {selectedImage && (
                <Image
                  src={selectedImage}
                  width={100}
                  height={100}
                  alt="uploaded_image"
                  className="!w-full !h-[20vh]"
                />
              )}

              {!selectedImage && (
                <>
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
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    JPG, JPEG, or PNG (MAX. 2MB, 100x60px)
                  </p>
                </>
              )}
            </div>
          </label>
          {formik.errors.menu_shop_cafe_img &&
            formik.touched.menu_shop_cafe_img && (
              <p className="text-red-500 text-xs">
                {formik.errors.menu_shop_cafe_img}
              </p>
            )}
        </div>

        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Title</p>
          <input
            type="text"
            id="title"
            name="title"
            className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
            placeholder="Enter Title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-xs">{formik.errors.title}</p>
          )}
        </div>

        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Point</p>
          <input
            type="text"
            id="points"
            name="points"
            className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
            placeholder="Enter Point"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.points}
          />
          {formik.errors.points && formik.touched.points && (
            <p className="text-red-500 text-xs">{formik.errors.points}</p>
          )}
        </div>
        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Price</p>
          <input
            type="number"
            id="price"
            name="price"
            className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
            placeholder="Enter Point"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.errors.price && formik.touched.price && (
            <p className="text-red-500 text-xs">{formik.errors.price}</p>
          )}
        </div>

        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Weight</p>
          <input
            type="text"
            id="weight"
            name="weight"
            className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
            placeholder="Enter Weight"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
          />
          {formik.errors.weight && formik.touched.weight && (
            <p className="text-red-500 text-xs">{formik.errors.weight}</p>
          )}
        </div>

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Description</p>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Description..."
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500 text-xs">{formik.errors.description}</p>
          )}
        </div>

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Select Store</p>
          <EasySelect
            id="store_id"
            name="store_id"
            defaultValue={storeListOptions?.find(
              (item) => item?.value === formik.values.store_id
            )}
            options={storeListOptions}
            menuPlacement={menuPlacement}
            handleChange={(option) =>
              formik.setFieldValue("store_id", option.value)
            }
          />
          {formik.errors.store_id && formik.touched.store_id && (
            <p className="text-red-500 text-xs">{formik.errors.store_id}</p>
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
    </Loader>
  );
}
