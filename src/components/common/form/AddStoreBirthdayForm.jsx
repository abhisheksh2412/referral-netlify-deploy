import EasySelect from "@/components/globals/EasySelect";
import Loader from "@/components/globals/Loader";
import Modal from "@/components/globals/Modal";
import { config } from "@/config/config";
import {
  AddStoreBirthdayData,
  FetchStoreBirthdayList,
  FetchStoreForBirthday,
  UpdateStoreBirthdayData,
} from "@/store/slices/orders";
import {
  SendMessageAddCouponValidation,
  StoreBirthdayCreateValidation,
  StoreBirthdayUpdateValidation,
} from "@/validators/orderValidations";
import { useFormik } from "formik";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

export default function AddStoreBirthdayForm({ editData = null, handleClose }) {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [coupons, setCoupons] = useState([]);
  const [birthdayImage, setBirthdayImage] = useState(null);
  const [selectedStore, setSelectedStore] = useState("");
  const [couponImageBinary, setCouponImageBinary] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [addCoupon, setAddCoupon] = useState(false);
  const handleCouponModal = () => setAddCoupon(!addCoupon);
  const { stores, isLoading } = useSelector((state) => state.orders);

  const getAllBirthdayList = useCallback(() => {
    dispatch(FetchStoreBirthdayList());
  }, [dispatch]);

  const options = stores?.data
    ? stores?.data?.map((item) => ({
        label: item?.name,
        value: item?.id,
        logo: item?.logo,
      }))
    : [];

  const formik = useFormik({
    initialValues: {
      birthday_image: null,
      dob: editData?.dob || "",
      store_id: editData?.store_id || "",
      message: editData?.message || "",
    },
    validationSchema: !editData
      ? StoreBirthdayCreateValidation
      : StoreBirthdayUpdateValidation,
    onSubmit: async (values) => {
      console.log(values);
      const formdata = new FormData();

      // Append the image if present
      if (values.birthday_image) {
        formdata.append("birthday_image", values.birthday_image);
      }
      // Append other fields
      formdata.append("dob", values.dob);
      formdata.append("store_id", values.store_id);
      formdata.append("message", values.message);

      // Append coupons if present
      if (coupons.length > 0) {
        coupons?.forEach((coupon, index) => {
          formdata.append(
            `coupons_list[${index}][coupon_name]`,
            coupon.coupon_name
          );
          formdata.append(`coupons_list[${index}][points]`, coupon.points);
          formdata.append(`coupons_list[${index}][validity]`, coupon.validity);
          formdata.append(
            `coupons_list[${index}][coupon_image]`,
            coupon.coupon_image
          );
        });
      }

      try {
        if (!editData) {
          await dispatch(AddStoreBirthdayData(formdata));
          if (orders.isSuccess) {
            popup({ status: "success", message: "created Successfully" });
            router.back();
          }
        } else {
          await dispatch(UpdateStoreBirthdayData(formdata, editData?.id));
          getAllBirthdayList();
          if (orders.isSuccess) {
            popup({ status: "success", message: "updated Successfully" });
            handleClose(null);
          }
        }
      } catch (error) {
        console.error("Error submitting the form:", error);
      }
    },
  });

  const modalFormik = useFormik({
    initialValues: {
      coupon_name: "",
      points: "",
      validity: "",
      coupon_image: "",
    },
    validationSchema: SendMessageAddCouponValidation,
    onSubmit: (values, { resetForm }) => {
      setCoupons([...coupons, values]);
      resetForm();
      handleCouponModal();
    },
  });

  const handleImageChange = async (event, field, modal = true) => {
    const file = event.currentTarget.files[0];
    if (file) {
      if (modal) {
        setCouponImageBinary([...couponImageBinary, file]);
        await modalFormik.setFieldValue(field, file);
        setImagePreview(URL.createObjectURL(file));
      } else {
        await formik.setFieldValue(field, file);
        setBirthdayImage(URL.createObjectURL(file));
      }
    }
  };
  const handleDeleteCoupons = (data) => {
    const newCouponList = coupons?.filter((item) => item !== data);
    setCoupons(newCouponList);
  };
  const handleSelectStore = useCallback(
    (data) => {
      const findData = stores?.data?.find((item) => item?.id === data?.value);
      formik.setFieldValue("store_id", findData?.id);
      setSelectedStore(findData);
    },
    [stores?.data, formik]
  );

  const getAllStores = useCallback(() => {
    dispatch(FetchStoreForBirthday());
  }, [dispatch]);

  const onEditDataFound = useCallback(() => {
    if (editData) {
      setBirthdayImage(config.IMAGE_URL_PATH + editData?.birthday_image);
      formik.setFieldValue("message", editData?.message);
      formik.setFieldValue("store_id", editData?.store_id);
      formik.setFieldValue("dob", editData?.dob);
    }
  }, [editData]);

  useEffect(() => {
    onEditDataFound();
  }, [onEditDataFound]);

  useEffect(() => {
    getAllStores();
  }, [getAllStores]);

  const getDefaultValue = useMemo(() => {
    return { label: editData?.store?.name, value: editData?.store?.id };
  }, [editData]);

  return (
    <Loader isLoading={isLoading}>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className=" mb-3 w-full">
            <p className="text-base font-semibold mb-2">Select Store</p>
            <EasySelect
              defaultValue={getDefaultValue}
              options={options}
              handleChange={handleSelectStore}
            />
          </div>

          {selectedStore && (
            <div className="flex items-center gap-3 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 p-2 rounded-lg w-64">
              <Image
                src={config?.IMAGE_URL_PATH + selectedStore?.logo}
                width={60}
                height={60}
                alt="Picture of the author"
                className="rounded-full"
              />
              <p class="text-base font-semibold">{selectedStore?.name}</p>
            </div>
          )}
        </div>
        {formik.errors.store_id && (
          <p className="text-xs  text-red-500 p-2">{formik.errors.store_id}</p>
        )}

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Please Write Message</p>
          <textarea
            id="message"
            rows="4"
            value={formik.values.message}
            onChange={formik.handleChange}
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please Write Message..."
          ></textarea>{" "}
          {formik.touched.message && formik.errors.message ? (
            <p className="text-xs  text-red-500 p-2">{formik.errors.message}</p>
          ) : null}
        </div>

        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Upload Birthday Image</p>
          <label
            for="brithday_image_upload"
            className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            {birthdayImage && (
              <Image
                src={birthdayImage}
                alt="birthdayImage"
                width={200}
                height={200}
              />
            )}
            {!birthdayImage && (
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span class="font-semibold">Click to upload</span> or drag and
                  drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            )}
            <input
              id="brithday_image_upload"
              onChange={(e) => handleImageChange(e, "birthday_image", false)}
              type="file"
              className="hidden"
            />
          </label>
          {formik.touched.birthday_image && formik.errors.birthday_image ? (
            <p className="text-xs  text-red-500 p-2">
              {formik.errors.birthday_image}
            </p>
          ) : null}
        </div>

        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Enter Date Of Birth</p>
          <input
            type="date"
            className="w-full border-2 border-gray-200 p-2 px-3 rounded-md text-sm "
            value={formik.values.dob}
            onChange={formik.handleChange}
            name="dob"
          />
          {formik.touched.dob && formik.errors.dob ? (
            <p className="text-xs  text-red-500 p-2">{formik.errors.dob}</p>
          ) : null}
          {/* <DateTimePicker date={date} setDate={setDate} /> */}
        </div>

        {!editData && (
          <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 mt-6 rounded-lg">
            <div className="flex justify-between p-4 rounded-t-lg border-b-[1.5px] border-grey-500 bg-gray-100">
              <h3 className="text-base font-semibold">Coupon List</h3>
              <h4 className="text-base font-bold">{coupons?.length}</h4>
            </div>
            {coupons?.length !== 0 && (
              <div className="bg-white py-3 flex flex-col gap-2">
                {coupons?.map((item, index) => (
                  <div
                    key={index}
                    className="w-full flex justify-between items-center p-2 rounded-md border hover:bg-pink-50 cursor-pointer"
                  >
                    <h5>{item?.coupon_name}</h5>
                    <Trash2
                      size={14}
                      className="cursor-pointer"
                      onClick={() => handleDeleteCoupons(item)}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between p-4 ">
              <h3 className="text-base font-semibold">Add Coupon</h3>
              <button
                onClick={handleCouponModal}
                type="button"
                class="flex items-center gap-2 text-white bg-blush-red font-medium rounded-lg text-sm px-5 py-3"
              >
                <FaPlusCircle />
                Add
              </button>
            </div>
          </div>
        )}
        {formik.touched.coupons_list && formik.errors.coupons_list ? (
          <p className="text-xs text-red-500 p-1">
            {formik.errors.coupons_list}{" "}
          </p>
        ) : null}

        <div
          className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 mt-4"
          role="alert"
        >
          <span className="font-medium">
            Website Message, Include Unsubscribe
          </span>
        </div>

        {/* Add coupon form */}
        <Modal open={addCoupon} handleOpen={handleCouponModal} size={"sm"}>
          <div>
            <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 rounded-t-lg flex items-center justify-between p-4">
              <h4 className="text-base font-semibold text-black">Add Coupon</h4>
              <h5 className="cursor-pointer" onClick={handleCouponModal}>
                <IoCloseCircleOutline className="w-8 h-8" />
              </h5>
            </div>
            <div className="p-4 max-h-[80vh] overflow-y-auto remove-scroll-bar">
              <form onSubmit={modalFormik.handleSubmit}>
                <div className="mt-0 w-full">
                  <p className="text-base font-semibold mb-2 text-black">
                    Upload Attachment
                  </p>
                  <label
                    htmlFor="upload_couponImage"
                    className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-24 h-24 mb-4"
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
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </>
                      )}
                    </div>
                    <input
                      id="upload_couponImage"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, "coupon_image")}
                    />
                  </label>
                  {modalFormik.errors.coupon_image &&
                    modalFormik.touched.coupon_image && (
                      <div className="text-red-500 text-xs mt-1">
                        {modalFormik.errors.coupon_image}
                      </div>
                    )}
                </div>

                <div className="mt-6 w-full">
                  <p className="text-base font-semibold mb-2 text-black">
                    Coupon Name
                  </p>
                  <input
                    type="text"
                    name="coupon_name"
                    value={modalFormik.values.coupon_name}
                    onChange={modalFormik.handleChange}
                    className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
                    placeholder="Enter Coupon Name"
                  />
                  {modalFormik.errors.coupon_name &&
                    modalFormik.touched.coupon_name && (
                      <div className="text-red-500 text-xs mt-1">
                        {modalFormik.errors.coupon_name}
                      </div>
                    )}
                </div>

                <div className="mt-6 w-full">
                  <p className="text-base font-semibold mb-2 text-black">
                    Points/Percentages
                  </p>
                  <input
                    type="text"
                    name="points"
                    value={modalFormik.values.points}
                    onChange={modalFormik.handleChange}
                    className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
                    placeholder="Enter Points/Percentages"
                  />
                  {modalFormik.errors.points && modalFormik.touched.points && (
                    <div className="text-red-500 text-xs mt-1">
                      {modalFormik.errors.points}
                    </div>
                  )}
                </div>

                <div className="mt-6 w-full">
                  <p className="text-base font-semibold mb-2 text-black">
                    Validity Period of the Coupon
                  </p>
                  <input
                    type="date"
                    name="validity"
                    value={modalFormik.values.validity}
                    onChange={modalFormik.handleChange}
                    className="bg-gray-50 border text-gray-900 text-sm rounded block w-full p-2.5"
                    placeholder="02-05-2024"
                  />
                  {modalFormik.errors.validity &&
                    modalFormik.touched.validity && (
                      <div className="text-red-500 text-xs mt-1">
                        {modalFormik.errors.validity}
                      </div>
                    )}
                </div>

                <div className="mt-8 w-full">
                  <button
                    type="submit"
                    className="text-white w-full bg-blush-red font-medium rounded-lg text-sm px-5 py-4 mb-2"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>

        <div className="mt-8 w-full">
          <button
            type="submit"
            class="text-white w-full bg-blush-red font-medium rounded-lg text-md px-5 py-4 mb-2"
          >
            Submit
          </button>
        </div>
      </form>
    </Loader>
  );
}
