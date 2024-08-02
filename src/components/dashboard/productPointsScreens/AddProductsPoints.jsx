"use client";

import GlobalInput from "@/components/globals/globalInput";
import UseSampleImage from "@/components/globals/useSampleImage";
import { GetSellerConfirmCoupons } from "@/store/slices/coupon";
import {
  AddProductAndPoints,
  GetAllProductsAndPoints,
} from "@/store/slices/products";
import { AddProductPointsvalidation } from "@/validators/storeValidatios";
import { Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useCallback, useEffect, useMemo } from "react";
import { GoPlusCircle } from "react-icons/go";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import clsx from "clsx";
import { useSellerContext } from "@/providers/useSellerOrders";

function AddProductsPoints({ handleModal }) {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  const user = useSelector((state) => state.auth.data);
  const coupons = useSelector((state) => state.coupon);
  const { orignalTime } = useSellerContext();
  const { userByCard } = useSelector((state) => state.user);
  const productsFormik = useFormik({
    initialValues: {
      card_id: "",
      coupon_id: "",
      customer_id: "",
      exchange_point: "",
      expire_at: "",
      store_id: "",
      productList: [
        {
          product_name: "",
          product_image: "",
          barcode: "",
          product_points: "",
          quantity: "",
        },
      ],
    },
    validationSchema: AddProductPointsvalidation,
    onSubmit: async (values) => {
      const formdata = new FormData();
      for (const key of Object.keys(values)) {
        if (key !== "productList") {
          formdata.append(key, values[key]);
        }
      }
      values.productList?.forEach((element, index) => {
        formdata.append(
          `products[${index}][product_name]`,
          element.product_name
        );
        formdata.append(
          `products[${index}][product_image]`,
          element.product_image
        );
        formdata.append(`products[${index}][barcode]`, element.barcode);
        formdata.append(
          `products[${index}][product_points]`,
          element.product_points
        );
        formdata.append(`products[${index}][quantity]`, element.quantity);
      });

      await dispatch(AddProductAndPoints(formdata, () => handleModal()));
      dispatch(GetAllProductsAndPoints(user?.id));
    },
  });
  const handleChangeProductImage = (e, field) => {
    const file = e.target.files[0];
    productsFormik.setFieldValue(field, file);
  };

  const handleAddProduct = () => {
    const emptyValue = {
      product_name: "",
      product_image: "",
      barcode: "",
      product_points: "",
      quantity: "",
    };
    productsFormik.setFieldValue("productList", [
      ...productsFormik.values.productList,
      emptyValue,
    ]);
  };

  const handleDeleteProduct = (index) => {
    const productList = productsFormik.values.productList;

    const newProductList = [
      ...productList.slice(0, index),
      ...productList.slice(index + 1),
    ];
    productsFormik.setFieldValue("productList", newProductList);
  };

  useEffect(() => {
    if (userByCard) {
      productsFormik.setFieldValue("card_id", userByCard?.id);
      productsFormik.setFieldValue("customer_id", userByCard?.user?.id);
      productsFormik.setFieldValue("expire_at", userByCard?.valid_thru);
      productsFormik.setFieldValue("store_id", userByCard?.store_id);
    }
  }, [userByCard]);

  const getConfirmCoupons = useCallback(() => {
    if (userByCard && user) {
      dispatch(GetSellerConfirmCoupons(userByCard?.id, user?.id));
    }
  }, [dispatch, userByCard, user]);

  useEffect(() => {
    getConfirmCoupons();
  }, [getConfirmCoupons]);

  const couponsList = useMemo(() => {
    return coupons?.confirmCoupon?.data?.map((item) => ({
      label: item?.coupon_code,
      value: item?.id,
    }));
  }, [coupons?.confirmCoupon]);

  const sessionEnd = useCallback(() => {
    if (parseInt(orignalTime) === 0) {
      handleModal(false);
    }
  }, [orignalTime]);

  useEffect(() => {
    sessionEnd();
  }, [sessionEnd]);

  return (
    <div>
      <form
        className="bg-gray-100 px-4  py-8 md:py-16 lg:py-16"
        onSubmit={productsFormik.handleSubmit}
      >
        <div className="bg-white mb-8 p-5 rounded">
          <div class="grid md:grid-cols-3 lg:grid-cols-3 md:gap-2 lg:gap-2  sm:rounded-lg ">
            <div class="md:px-2 lg:px-2  py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div className="mobile:py-1">
                <label className="text-xs	 font-semibold text-gray-700 mb-2 inline-block">
                  Select Coupon
                  <span className="text-red-300">(Optional)</span>
                </label>
                <Select
                  options={couponsList}
                  // styles={customStyles}
                  onChange={(value) =>
                    productsFormik.setFieldValue("coupon_id", value.value)
                  }
                />
              </div>
            </div>

            <div class="md:px-2 lg:px-2  py-1">
              <div className="mobile:py-1">
                <label className="text-xs font-semibold text-gray-700 mb-2 inline-block">
                  Exchange Points
                  <span className="text-red-300">(Optional)</span>
                </label>
                <GlobalInput
                  name="exchange_point"
                  type="text"
                  onChange={productsFormik.handleChange}
                  value={productsFormik.values.exchange_point}
                  placeholder=""
                  inputClassName="outline-none text-sm"
                  parentClassName="p-4 rounded-md border"
                />
              </div>
            </div>

            <div class="md:px-2 lg:px-2  py-1">
              <div className="mobile:py-1">
                <label className="text-xs font-semibold text-gray-700  inline-block mb-2">
                  Please Enter Exchane Point
                </label>
                <div>
                  <UseSampleImage />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product  */}
        {productsFormik.values.productList?.map((item, index) => (
          <div key={index} className="p-5 bg-white shadow mb-4 rounded">
            <div class="grid md:grid-cols-3 md-landscape:grid-cols-3 lg:grid-cols-6 md:gap-2 lg:gap-2  sm:rounded-lg ">
              <div class="md:px-2 lg:px-2  py-1">
                <div className="mobile:py-1">
                  <label className="text-xs font-semibold text-gray-700 mb-2 inline-block">
                    Product Image
                  </label>

                  <GlobalInput
                    name="street"
                    type="file"
                    placeholder=""
                    onChange={(e) =>
                      handleChangeProductImage(
                        e,
                        `productList[${index}].product_image`
                      )
                    }
                    inputClassName="outline-none text-sm"
                    parentClassName="p-3 rounded-md border"
                    error={
                      productsFormik.touched.productList &&
                      productsFormik.touched.productList[index] &&
                      productsFormik.errors.productList &&
                      productsFormik.errors.productList[index]?.product_image
                    }
                  />
                </div>
              </div>

              <div class="md:px-2 lg:px-2  py-1">
                <div className="mobile:py-1">
                  <label className="text-xs font-semibold text-gray-700 mb-2 inline-block">
                    Product Name
                  </label>
                  <GlobalInput
                    name="street"
                    type="text"
                    value={item.product_name}
                    onChange={(e) =>
                      productsFormik.setFieldValue(
                        `productList[${index}].product_name`,
                        e.target.value
                      )
                    }
                    placeholder="Enter Product Name"
                    inputClassName="outline-none text-sm"
                    parentClassName="p-4 rounded-md border"
                    error={
                      productsFormik.touched.productList &&
                      productsFormik.touched.productList[index] &&
                      productsFormik.errors.productList &&
                      productsFormik.errors.productList[index]?.product_name
                    }
                  />
                </div>
              </div>

              <div class="md:px-2 lg:px-2  py-1">
                <div className="mobile:py-1">
                  <label className="text-xs font-semibold text-gray-700 mb-2 inline-block">
                    Product Quantity
                  </label>
                  <GlobalInput
                    name="street"
                    type="text"
                    value={item.quantity}
                    onChange={(e) =>
                      productsFormik.setFieldValue(
                        `productList[${index}].quantity`,
                        e.target.value
                      )
                    }
                    placeholder="Enter Product Quantity"
                    inputClassName="outline-none text-sm"
                    parentClassName="p-4 rounded-md border"
                    error={
                      productsFormik.touched.productList &&
                      productsFormik.touched.productList[index] &&
                      productsFormik.errors.productList &&
                      productsFormik.errors.productList[index]?.quantity
                    }
                  />
                </div>
              </div>

              <div class="md:px-2 lg:px-2  py-1">
                <div className="mobile:py-1">
                  <label className="text-xs font-semibold text-gray-700 mb-2 inline-block">
                    Product Points
                  </label>
                  <GlobalInput
                    name="street"
                    type="text"
                    value={item.product_points}
                    onChange={(e) =>
                      productsFormik.setFieldValue(
                        `productList[${index}].product_points`,
                        e.target.value
                      )
                    }
                    placeholder="Enter Product Points"
                    inputClassName="outline-none text-sm"
                    parentClassName="p-4 rounded-md border"
                    error={
                      productsFormik.touched.productList &&
                      productsFormik.touched.productList[index] &&
                      productsFormik.errors.productList &&
                      productsFormik.errors.productList[index]?.product_points
                    }
                  />
                </div>
              </div>

              <div class="md:px-2 lg:px-2  py-1">
                <div className="mobile:py-1">
                  <label className="text-xs font-semibold text-gray-700 mb-2 inline-block">
                    Barcode Number
                  </label>
                  <GlobalInput
                    name="street"
                    type="text"
                    value={item.barcode}
                    onChange={(e) =>
                      productsFormik.setFieldValue(
                        `productList[${index}].barcode`,
                        e.target.value
                      )
                    }
                    placeholder="Enter Barcode Number"
                    inputClassName="outline-none text-sm"
                    parentClassName="p-4 rounded-md border"
                    error={
                      productsFormik.touched.productList &&
                      productsFormik.touched.productList[index] &&
                      productsFormik.errors.productList &&
                      productsFormik.errors.productList[index]?.barcode
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end items-center gap-2 mt-4">
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className={clsx(
                    " text-white text-sm  rounded-md font-semibold bg-[#0e0a38] p-3  flex justify-center items-center gap-2 mt-4",
                    index === 0 ? "w-full" : "w-full"
                  )}
                >
                  <GoPlusCircle className="text-2xl" />
                  Repeat
                </button>
                {index > 0 && (
                  <button
                    onClick={() => handleDeleteProduct(index)}
                    type="button"
                    className=" text-white text-sm  rounded-md font-semibold  bg-blush-red p-3 w-full flex justify-center items-center gap-2 mt-4"
                  >
                    <MdDelete className="text-2xl" />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        <Button
          loading={product?.isLoading}
          type="submit"
          className="w-fit  bg-blush-red"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddProductsPoints;
