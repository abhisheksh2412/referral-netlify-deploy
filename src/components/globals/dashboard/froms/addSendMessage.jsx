"use client";

import Image from "next/image";
import EasySelect from "../../EasySelect";
import Modal from "../../Modal";
import { FaPlusCircle } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCustomer } from "@/store/slices/customer";
import Loader from "../../Loader";
import { Delete, Trash2 } from "lucide-react";

import {
  AddSendMessageValidations,
  SendMessageAddCouponValidation,
} from "@/validators/orderValidations";
import {
  AddUserSendMessage,
  GetSendMessageList,
  UpdateUserSendMessage,
} from "@/store/slices/orders";
import { popup } from "@/_utils/alerts";
import { useRouter } from "next/navigation";
import UseSampleImage from "../../useSampleImage";

export default function AddSendMessage({ editData = null, handleClose }) {
  const [addCoupon, setAddCoupon] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [couponImageBinary, setCouponImageBinary] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleCouponModal = () => setAddCoupon(!addCoupon);
  const navigate = useRouter();
  const { customerList, isLoading } = useSelector((state) => state.customer);
  const orders = useSelector((state) => state.orders);

  const dispatch = useDispatch();
  const allCustomers = useCallback(() => {
    dispatch(GetAllCustomer());
  }, [dispatch]);

  useEffect(() => {
    allCustomers();
  }, [allCustomers]);

  //   customer list for dropdown
  const customers = useMemo(() => {
    return customerList?.data?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  }, [customerList]);

  //   modal formik
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

  //   delete coupons
  const handleDeleteCoupons = (data) => {
    const newCouponList = coupons?.filter((item) => item !== data);
    setCoupons(newCouponList);
  };

  //
  const handleImageChange = async (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setCouponImageBinary([...couponImageBinary, file]);
      await modalFormik.setFieldValue("coupon_image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  //   main form formik
  const formik = useFormik({
    initialValues: {
      user_id: "",
      test_message: "",
    },
    validationSchema: AddSendMessageValidations,
    onSubmit: async (values) => {
      if (!editData) {
        const formData = {
          ...values,
          coupons_list: coupons,
        };
        await dispatch(AddUserSendMessage(formData, () => navigate.back()));
      } else {
        await dispatch(UpdateUserSendMessage(values, editData?.id));
        setTimeout(() => {
          if (orders.isSuccess) {
            popup({ message: "Updated Successfully", status: "success" });
            navigate.refresh();
          }
        }, 400);
        handleClose(null);
        dispatch(GetSendMessageList());
      }
    },
  });

  // update the edit data on the form
  const editDataUpdate = useCallback(() => {
    if (editData) {
      formik.setFieldValue("user_id", editData?.user_id);
      formik.setFieldValue("test_message", editData?.test_message);
      if (customerList?.data) {
        setSelectedCustomer(
          customerList?.data?.find((item) => item.id === editData?.user_id)
        );
      }
    }
  }, [editData, customerList?.data]);

  useEffect(() => {
    editDataUpdate();
  }, [editDataUpdate]);

  //   update selected user when the customer select
  const handleSelectCustomer = useCallback(
    async (data) => {
      try {
        formik.setFieldValue("user_id", data.value);
        if (customerList && customerList.data) {
          const newData = customerList.data.find(
            (item) => parseInt(item.id, 10) === parseInt(data.value, 10)
          );
          setSelectedCustomer(newData);
        } else {
          console.error("Customer list is not available.");
          setSelectedCustomer(null);
        }
      } catch (error) {
        console.error("Error selecting customer:", error);
      }
    },
    [customerList, formik, setSelectedCustomer]
  );

  return (
    <Loader isLoading={isLoading || orders?.isLoading}>
      <form onSubmit={formik.handleSubmit}>
        <div className="bg-gray-100 p-4 rounded-lg">
          <div className=" mb-3 w-full">
            <p className="text-base font-semibold mb-2">Select User</p>
            <EasySelect
              options={customers}
              defaultValue={customers?.find(
                (value) => value.value === editData?.user_id
              )}
              handleChange={handleSelectCustomer}
            />
            {formik.touched.user_id && formik.errors.user_id ? (
              <p className="text-xs text-red-500 p-1">
                {formik.errors.user_id}
              </p>
            ) : null}
          </div>

          {formik.values.user_id && (
            <div className="flex items-center gap-3 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 p-2 rounded-lg w-64">
              <Image
                src={
                  selectedCustomer?.profile_photo_url ||
                  "/assets/defaultseller.jpg"
                }
                width={60}
                height={60}
                alt="Picture of the author"
                className="rounded-full"
              />
              <p class="text-base font-semibold">{selectedCustomer?.name}</p>
            </div>
          )}
        </div>

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Please Write Message</p>
          <textarea
            id="message"
            rows="4"
            value={formik.values.test_message}
            onChange={formik.handleChange}
            name="test_message"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Please Write Message..."
          ></textarea>

          {formik.touched.test_message && formik.errors.test_message ? (
            <p className="text-xs text-red-500 p-1">
              {formik.errors.test_message}{" "}
            </p>
          ) : null}
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
                  <UseSampleImage
                    popper={false}
                    buttonClass="!w-fit"
                    imageUrl="/assets/coupondemo.png"
                  />
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {imagePreview ? (
                        <Image
                          src={imagePreview}
                          width={500}
                          height={500}
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
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
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
            send
          </button>
        </div>
      </form>
    </Loader>
  );
}
