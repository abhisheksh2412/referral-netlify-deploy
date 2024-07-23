"use client";
import { useFormik } from "formik";
import { Button } from "@material-tailwind/react";
import EasySelect from "../../EasySelect";
import GlobalInput from "../../globalInput";
import {
  CreateStoreValidationSchema,
  UpdateStoreValidationSchema,
} from "@/validators/storeValidatios";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { GetAllCategories } from "@/store/slices/category";
import Loader from "../../Loader";
import {
  resetRedirectUrl,
  StoreAddCheckout,
  SuccessPaymentTransaction,
} from "@/store/slices/common";
import { CreateStore, UpdateStore } from "@/store/slices/seller";
import Image from "next/image";
import { config } from "@/config/config";
import { popup } from "@/_utils/alerts";
import { useRouter } from "next/navigation";
import usePaymentCheckout from "@/hooks/usePaymentCheckout";

const AddStoreForm = ({ edit = false, editData = null }) => {
  const [SelectedImage, setSelectedImage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const [storeData, setStoreData] = useState(null);
  const checkOut = useSelector((state) => state.common);
  const user = useSelector((state) => state.auth.data);
  const store = useSelector((state) => state.seller);
  const { categoryList, isLoading } = useSelector((state) => state.category);
  const router = useRouter();
  const dispatch = useDispatch();

  // update the logo when editData
  const updateStoreData = useMemo(() => {
    setSelectedImage(editData?.logo);
    return editData;
  }, [editData]);

  // collect data and submit it using formik
  const formik = useFormik({
    initialValues: {
      name: updateStoreData?.name || "",
      category_id: updateStoreData?.category?.id || "",
      number: updateStoreData?.number || "",
      street: updateStoreData?.street || "",
      town: updateStoreData?.town || "",
      postal_code: updateStoreData?.postal_code || "",
      mobile_number: updateStoreData?.mobile_number || "",
      description: updateStoreData?.description || "",
      logo: null,
    },
    enableReinitialize: edit ? true : false,
    validationSchema: edit
      ? UpdateStoreValidationSchema
      : CreateStoreValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      for (const key in values) {
        if (key === "logo" && !values[key]) {
          continue;
        }
        formData.append(key, values[key]);
      }

      // fire the api as per the from status edit or add
      if (edit) {
        await handleUpdateStore(editData?.id, formData, resetForm);
      } else {
        await handleCreateStore(formData, resetForm);
      }
    },
  });

  // handle to create store
  const handleCreateStore = async (formdata) => {
    await dispatch(
      StoreAddCheckout({
        partner_id: user?.role !== "Partner" ? user?.partner_id : user?.id,
        url: location.href,
      })
    );
    await setStoreData(formdata);
  };

  // Handle Update Store
  const handleUpdateStore = async (id, fromdata) => {
    await dispatch(UpdateStore(id, fromdata));
    if (await store?.isSuccess) {
      popup({ message: "Update store Successfully ", status: "success" });
      router.back();
    }
  };

  // handle file Change and update in formik
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue("logo", file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  // handle Payment checkout to open a new window and checkout
  const { status, sessionId } = usePaymentCheckout(
    checkOut?.checkoutData?.redirect_url
  );

  // handle the payment
  const handlePayment = useCallback(async () => {
    resetRedirectUrl();
    if (status === "success") {
      const data = {
        partner_id: user?.role !== "Partner" ? user?.partner_id : user?.id,
        session_id: sessionId,
      };
      await dispatch(SuccessPaymentTransaction(data));
      if (typeof window !== "undefined") {
        localStorage.removeItem("store_payment");
      }
      if (await checkOut.isSuccess) {
        await dispatch(CreateStore(storeData));
        setTimeout(() => {
          if (store.isSuccess) {
            popup({ status: "success", message: "Create Store Successfuly" });
            router.back();
          }
        }, 500);
      }
    } else if (status === "cancel" || status === "failed") {
      if (typeof window === "undefined") {
        localStorage.removeItem("store_payment");
      }
      popup({ status: "error", message: "Payment Failed" });
    }
  }, [status, sessionId]);

  useEffect(() => {
    handlePayment();
  }, [handlePayment]);

  const GetallCategories = useCallback(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);
  useEffect(() => {
    GetallCategories();
  }, [GetallCategories]);

  // Category get and modify
  const CategoryOptions = useMemo(() => {
    if (!Array.isArray(categoryList)) return [];

    return categoryList.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  }, [categoryList]);

  return (
    <Loader isLoading={store?.isLoading || isLoading}>
      <div className=" flex items-center justify-center">
        <form
          className="mobile:w-full  md:w-3/5 lg:w-2/5 p-4 shadow-lg rounded-xl "
          onSubmit={formik.handleSubmit}
        >
          {/* Image upload */}
          <div className="w-full">
            <p className="text-base font-semibold mb-2">Upload Store Logo</p>
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {previewImage ? (
                  <Image
                    src={previewImage}
                    width={100}
                    height={100}
                    className="!w-full !h-full"
                  />
                ) : SelectedImage ? (
                  <Image
                    src={
                      SelectedImage.includes(config?.BASE_URL)
                        ? SelectedImage
                        : config.IMAGE_URL_PATH + SelectedImage
                    }
                    width={100}
                    height={100}
                    className="!w-full !h-full"
                  />
                ) : (
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
                      PNG, JPG or JPEG (MAX. 100x100px, 2MB)
                    </p>
                  </>
                )}
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {formik.errors.logo && formik.touched.logo && (
              <div className="text-red-500 text-xs">{formik.errors.logo}</div>
            )}
          </div>
          {/* store name */}
          <div className="py-3 mobile:py-1">
            <label htmlFor="store_name" className="text-sm text-gray-700">
              Store Name
            </label>
            <GlobalInput
              name="name"
              placeholder="Enter Store Name"
              inputClassName="outline-none text-sm"
              parentClassName="p-1.5 px-2 rounded-md border"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              error={
                formik.errors.name && formik.touched.name
                  ? formik.errors.name
                  : null
              }
            />
          </div>
          <div className="py-3 mobile:py-1">
            <label htmlFor="category_id" className="text-sm text-gray-700">
              Select Category
            </label>
            <EasySelect
              name="category_id"
              defaultValue={CategoryOptions?.find(
                (item) => item.value === formik.values.category_id
              )}
              options={CategoryOptions}
              placeholder="Select Category"
              className="text-xs"
              handleChange={(option) => {
                formik.setFieldValue("category_id", option.value);
              }}
            />
            {formik.errors.category_id && formik.touched.category_id && (
              <p className="text-red-500 text-xs">
                {formik.errors.category_id}
              </p>
            )}
          </div>
          <div className="py-3 mobile:py-1">
            <label htmlFor="store_no" className="text-sm text-gray-700">
              Store No
            </label>
            <GlobalInput
              name="number"
              type="number"
              placeholder="Enter Store House No"
              inputClassName="outline-none text-sm"
              parentClassName="p-1.5 px-2 rounded-md border"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.number}
              error={
                formik.errors.number && formik.touched.number
                  ? formik.errors.number
                  : null
              }
            />
          </div>
          <div className="py-3 mobile:py-1">
            <label htmlFor="street" className="text-sm text-gray-700">
              Street
            </label>
            <GlobalInput
              name="street"
              type="text"
              placeholder="Enter Store Street"
              inputClassName="outline-none text-sm"
              parentClassName="p-1.5 px-2 rounded-md border"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.street}
              error={
                formik.errors.street && formik.touched.street
                  ? formik.errors.street
                  : null
              }
            />
          </div>
          <div className="py-3 mobile:py-1">
            <label htmlFor="town" className="text-sm text-gray-700">
              Town
            </label>
            <GlobalInput
              name="town"
              type="text"
              placeholder="Enter Town"
              inputClassName="outline-none text-sm"
              parentClassName="p-1.5 px-2 rounded-md border"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.town}
              error={
                formik.errors.town && formik.touched.town
                  ? formik.errors.town
                  : null
              }
            />
          </div>
          <div className="py-3 mobile:py-1">
            <label htmlFor="postal_code" className="text-sm text-gray-700">
              Postal Code
            </label>
            <GlobalInput
              name="postal_code"
              type="text"
              placeholder="12-345"
              inputClassName="outline-none text-sm"
              parentClassName="p-1.5 px-2 rounded-md border"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.postal_code}
              error={
                formik.errors.postal_code && formik.touched.postal_code
                  ? formik.errors.postal_code
                  : null
              }
            />
          </div>
          <div className="py-3 mobile:py-1">
            <label htmlFor="mobile_no" className="text-sm text-gray-700">
              Mobile No
            </label>
            <GlobalInput
              name="mobile_number"
              type="text"
              placeholder="Enter Mobile No"
              inputClassName="outline-none text-sm"
              parentClassName="p-1.5 px-2 rounded-md border"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.mobile_number}
              error={
                formik.errors.mobile_number && formik.touched.mobile_number
                  ? formik.errors.mobile_number
                  : null
              }
            />
          </div>
          <div className="py-3 mobile:py-1">
            <label htmlFor="description" className="text-sm text-gray-700">
              Store Description
            </label>
            <textarea
              name="description"
              rows={3}
              className="w-full px-2 p-1.5 text-sm border rounded-md outline-none"
              placeholder="Enter Short Description"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            ></textarea>
            {formik.errors.description && formik.touched.description && (
              <p className="text-red-500 text-xs">
                {formik.errors.description}
              </p>
            )}
          </div>

          <Button
            className=" text-white text-sm w-full rounded-md font-semibold bg-blush-red"
            loading={
              (store.isLoading && !store.isSuccess) || checkOut?.isLoading
            }
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </Loader>
  );
};

export default AddStoreForm;
