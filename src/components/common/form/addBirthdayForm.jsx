import React, { useState, useEffect, useCallback } from "react";
import EasySelect from "@/components/globals/EasySelect";
import DateTimePicker from "@/components/globals/dateTimePicker";
import { FaPlusCircle } from "react-icons/fa";
import NextImage from "next/image";
import AddBirthdayCoupon from "@/components/common/modal/addBirthdayCoupon";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Select from "react-select";
import { config } from "@/config/config";
import { BithdayFormValidation } from "@/validators/comboValidation";
import { useStateManager } from "@/providers/useStateManager";
import { useDispatch, useSelector } from "react-redux";
import {
  AddStoreBirthdayData,
  FetchStoreBirthdayList,
  UpdateStoreBirthdayData,
} from "@/store/slices/orders";
import { popup } from "@/_utils/alerts";
import { useSearchParams, useRouter } from "next/navigation";

export default function AddBirthdayForm({ options }) {
  const searchParams = useSearchParams();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [storeName, setStoreName] = useState(null);
  const [storeImage, setStoreImage] = useState(null);
  const [addCoupon, setAddCoupon] = useState(false);
  const [initialValues, setInitialValues] = useState({
    selectField: "",
    imageField: null,
    date: null,
    message: "",
  });
  const [initialValuesCount, setInitialValuesCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [birthdayId, setBirthdayId] = useState(null);

  const handleCouponModal = () => setAddCoupon(!addCoupon);
  const { couponList, setCouponList, birthdayInfo, setBirthdayInfo } =
    useStateManager();
  const dispatch = useDispatch();
  const { isSuccess, storesBirthday } = useSelector((state) => state.orders);
  const router = new useRouter();

  const fetchBirthday = () => {
    dispatch(FetchStoreBirthdayList());
  };

  useEffect(() => {
    const id = searchParams.get("id");
    setBirthdayId(id);
    fetchBirthday();
  }, []);

  if (storesBirthday !== undefined) {
    (async () => {
      if (birthdayId) {
        const singleData = await storesBirthday.filter(
          (elem) => elem.id == birthdayId
        );
        if (singleData) {
          setBirthdayInfo(singleData[0]);
        }
      }
    })();
  }

  const removeCoupon = (index) => {
    setCouponList(...couponList.splice(index, 1));
  };

  const handleSelectChange = (selectedOption, { setFieldValue }) => {
    setFieldValue("selectField", selectedOption ? selectedOption.value : "");
    if (selectedOption.logo) {
      let storeImageUrl = config.IMAGE_URL_PATH + selectedOption.logo;
      setStoreImage(storeImageUrl);
    }

    setStoreName(selectedOption.label);
  };
  const handleImageChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    setFieldValue("imageField", file);
    if (file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const formdata = new FormData();
    const date = new Date(values.date);
    const dateOption = { day: "2-digit", month: "2-digit", year: "numeric" };
    const dob = date.toLocaleDateString("en-GB", dateOption);
    formdata.append("store_id", values.selectField);
    formdata.append("message", values.message);
    formdata.append("coupon_list", couponList);
    formdata.append("birthday_image", values.imageField);
    formdata.append("dob", dob);
    handleStoreBirhtdayAPI(formdata, resetForm);
    setSubmitting(false);
  };

  const handleUpdate = (values, { resetForm }) => {
    const formdata = new FormData();
    const date = new Date(values.date);
    const dateOption = { day: "2-digit", month: "2-digit", year: "numeric" };
    const dob = date.toLocaleDateString("en-GB", dateOption);
    formdata.append("store_id", values.selectField);
    formdata.append("message", values.message);
    formdata.append("dob", dob);
    {
      values.imageField && formdata.append("birthday_image", values.imageField);
    }
    {
      values.couponList && formdata.append("coupon_list", couponList);
    }
    handleStoreBirthdayUpdate(formdata, resetForm);
  };

  const handleStoreBirthdayUpdate = async (formdata, resetForm) => {
    await dispatch(UpdateStoreBirthdayData(formdata, birthdayId));
    if (isSuccess) {
      popup({ status: "success", message: "Birthday Updated successfully" });
      resetForm();
      setBirthdayInfo(null);
      router.push(
        `/dashboard/Project-manager/notificationemails/storeBirthday`
      );
      FetchStoreBirthdayList();
    } else {
      popup({ status: "error", message: "Validation error" });
    }
  };

  const handleStoreBirhtdayAPI = async (formdata, resetForm) => {
    await dispatch(AddStoreBirthdayData(formdata));
    if (isSuccess) {
      popup({ status: "success", message: "Birthday Added successfully" });
      resetForm();
      FetchStoreBirthdayList();
    } else {
      popup({ status: "error", message: "Validation error" });
    }
  };

  if (birthdayInfo && initialValuesCount < 2) {
    const count = initialValuesCount + 1;
    setInitialValuesCount(count);
    setInitialValues({
      selectField: birthdayInfo ? birthdayInfo?.store_id : "",
      imageField: null,
      date: birthdayInfo ? birthdayInfo?.dob : null,
      message: birthdayInfo ? birthdayInfo?.message : "",
    });
    setSelectedOption([
      { value: birthdayInfo.store_id, label: birthdayInfo?.store?.name },
    ]);
    setPreviewUrl(config.IMAGE_URL_PATH + birthdayInfo?.birthday_image);
    console.log(birthdayInfo);
  }

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={BithdayFormValidation}
        validateOnBlur={true}
        enableReinitialize={true}
        onSubmit={birthdayId ? handleUpdate : handleSubmit}
      >
        {({ isSubmitting, setFieldValue, values, handleBlur }) => (
          <Form>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="mb-3 w-full">
                <p className="text-base font-semibold mb-2">Select Store</p>
                <Field name="selectField" id="selectField">
                  {({ field, form }) => (
                    <Select
                      options={options}
                      value={selectedOption}
                      onChange={(selectedOption) =>
                        handleSelectChange(selectedOption, { setFieldValue })
                      }
                      onBlur={handleBlur}
                      placeholder="Select an option"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="selectField"
                  component="div"
                  className="error"
                />
              </div>
              {storeName && (
                <div className="flex items-center gap-3 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 p-2 rounded-lg w-64">
                  {storeImage && (
                    <NextImage
                      src={storeImage}
                      width={60}
                      height={60}
                      alt="Picture of the author"
                      className="rounded-full"
                    />
                  )}
                  <p className="text-base font-semibold">{storeName}</p>
                </div>
              )}
            </div>

            <div className="mt-5 w-full">
              <p className="text-base font-semibold mb-2">
                Please Write Message
              </p>
              <Field
                as="textarea"
                id="message"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Please Write Message..."
                name="message"
              />
              <ErrorMessage name="message" component="div" className="error" />
            </div>

            <div className="mt-6 w-full">
              <p className="text-base font-semibold mb-2">
                Upload Birthday Image
              </p>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
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
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleImageChange(e, setFieldValue)}
                  onBlur={handleBlur}
                />
              </label>
              <ErrorMessage
                name="imageField"
                component="div"
                className="error"
              />
            </div>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                style={{ maxWidth: "100%", maxHeight: 200 }}
              />
            )}

            <div className="mt-6 w-full">
              <p className="text-base font-semibold mb-2">
                Enter Date Of Birth
              </p>
              <DateTimePicker
                date={values.date}
                setDate={(date) => setFieldValue("date", date)}
                onBlur={handleBlur}
                name="date"
                id="date"
              />
              <ErrorMessage name="date" component="div" className="error" />
            </div>

            <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 mt-6 rounded-lg">
              <div className="flex justify-between p-4 rounded-t-lg border-b-[1.5px] border-grey-500 bg-gray-100">
                <h3 className="text-base font-semibold">Coupon List</h3>
                <h4 className="text-base font-bold">{couponList.length}</h4>
              </div>
              <div className="border-grey-500 bg-gray-100">
                {couponList && couponList.length > 0 ? (
                  <ul>
                    {couponList.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4"
                      >
                        <h3 className="text-base font-semibold">
                          {item.coupon_name}
                        </h3>
                        <a
                          className="cursor-pointer"
                          onClick={() => removeCoupon(index)}
                        >
                          Remove
                        </a>
                      </div>
                    ))}
                  </ul>
                ) : (
                  <p></p>
                )}
              </div>
              <div className="flex items-center justify-between p-4 ">
                <h3 className="text-base font-semibold">Add Coupon</h3>
                <button
                  onClick={handleCouponModal}
                  type="button"
                  className="flex items-center gap-2 text-white bg-blush-red font-medium rounded-lg text-sm px-5 py-3"
                >
                  <FaPlusCircle />
                  Add
                </button>
              </div>
            </div>

            <div
              className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 mt-4"
              role="alert"
            >
              <span className="font-medium">
                Website Message, Include Unsubscribe
              </span>
            </div>

            {/* Add coupon form */}
            <AddBirthdayCoupon
              handleCouponModal={handleCouponModal}
              addCoupon={addCoupon}
              couponList={couponList}
              setCouponList={setCouponList}
            />

            <div className="mt-8 w-full">
              <button
                type="submit"
                className="text-white w-full bg-blush-red font-medium rounded-lg text-md px-5 py-4 mb-2"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
