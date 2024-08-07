"use client";
import EasySelect from "@/components/globals/EasySelect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdHome } from "react-icons/io";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Radio } from "@material-tailwind/react";
import { useStateManager } from "@/providers/useStateManager";
import { useFormik } from "formik";
import { GetPaperCardOrderTotal, GetStores } from "@/store/slices/seller";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/globals/Loader";
import {
  CardOrderCheckOut,
  PaperCardSuccessApi,
  resetRedirectUrl,
} from "@/store/slices/common";
import usePaymentCheckout from "@/hooks/usePaymentCheckout";
import { StorePaperCardOrder } from "@/store/slices/partner";
import { RemoveSpaces } from "@/_utils/manageRoute";
import { popup } from "@/_utils/alerts";
import { cardNumberList } from "@/_utils/_utils";

function BuyPaperCardForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const [cardFormData, setCardFormData] = useState(null);
  const checkOut = useSelector((state) => state.common);
  const partner = useSelector((state) => state.partner);
  const { orderTotal, isLoading } = useSelector((state) => state.seller);
  const { paperCardData, setPaperCardData } = useStateManager();
  const { status, sessionId } = usePaymentCheckout(
    checkOut?.checkoutData?.redirect_url || null
  );
  const selectedStore = useMemo(() => {
    return paperCardData?.store;
  }, [paperCardData]);

  const formik = useFormik({
    initialValues: {
      template_image: paperCardData?.template_image ?? "",
      number_of_cards: "",
      card_total: "",
      order_total: "",
      shipping_charge: 1,
      shipping_method: "inpost",
      store_id: paperCardData?.store_id ?? "",
    },
    onSubmit: async (values) => {
      const formdata = new FormData();
      for (const key of Object.keys(values)) {
        formdata.append(key, values[key]);
      }
      const data = {
        partner_id: user?.role === "Partner" ? user?.id : user?.partner_id,
        url: location.href,
        total_price: orderTotal?.data?.total_card_price,
      };
      await dispatch(CardOrderCheckOut(data));
      setCardFormData(formdata);
    },
  });

  // handle the payment
  const handlePayment = useCallback(async () => {
    resetRedirectUrl();
    if (status === "success") {
      // integrate the payment gateway
      const data = {
        partner_id: user?.role !== "Partner" ? user?.partner_id : user?.id,
        session_id: sessionId,
      };
      await dispatch(
        PaperCardSuccessApi(data, cardFormData, () =>
          router.push(`/dashboard/${RemoveSpaces(user?.role)}/order`)
        )
      );
      if (typeof window !== "undefined") {
        localStorage.removeItem("store_payment");
      }
      // if (await checkOut.isSuccess) {
      //   await dispatch(StorePaperCardOrder(cardFormData));
      //   router.push(`/dashboard/${RemoveSpaces(user?.role)}/order`);
      // } else {
      //   popup({ status: "error", message: "failed to success order" });
      // }
    } else if (status === "cancel" || status === "failed") {
      if (typeof window !== "undefined") {
        localStorage.removeItem("store_payment");
      }
      popup({ status: "error", message: "Payment Failed" });
    }
  }, [status, sessionId]);

  useEffect(() => {
    handlePayment();
  }, [handlePayment]);

  const getStores = useCallback(() => {
    dispatch(GetStores());
  }, [dispatch]);

  const handleSelectQuantityAndMethod = useCallback(async () => {
    if (formik.values.number_of_cards && formik.values.shipping_method) {
      const data = {
        number_of_cards: formik.values.number_of_cards,
        shipping_method: formik.values.shipping_method,
      };
      await dispatch(GetPaperCardOrderTotal(data));
    }
  }, [dispatch, formik.values.shipping_method, formik.values.number_of_cards]);

  useEffect(() => {
    handleSelectQuantityAndMethod();
  }, [handleSelectQuantityAndMethod]);

  useEffect(() => {
    getStores();
  }, [getStores]);

  const fillOrderTotal = useCallback(() => {
    if (orderTotal?.data) {
      formik.setFieldValue("card_total", orderTotal?.data?.grand_total);
      formik.setFieldValue("order_total", orderTotal?.data?.total_card_price);
      formik.setFieldValue(
        "shipping_charge",
        orderTotal?.data?.shipping_method
      );
    }
  }, [orderTotal?.data]);

  useEffect(() => {
    fillOrderTotal();
  }, [fillOrderTotal]);
  return (
    <Loader isLoading={isLoading || partner.isLoading || checkOut.isLoading}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mt-5 w-full flex gap-3">
            <div className="w-2/4">
              <p className="text-base font-semibold mb-2">Card Front View</p>
              <Image
                src={
                  formik.values.template_image
                    ? URL.createObjectURL(formik.values.template_image)
                    : "/assets/card-front-view.png"
                }
                width={350}
                height={110}
                alt="Picture of the author"
                className="rounded-lg h-44"
              />
            </div>
            <div className="w-2/4">
              <p className="text-base font-semibold mb-2">Card Back View</p>
              <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 px-4 py-8 rounded-lg w-full">
                <div className="flex items-center gap-6">
                  <div className="bg-white p-1 rounded-lg w-3/12">
                    <Image
                      src={
                        selectedStore?.qr_code_img_path || "/assets/qrcode.png"
                      }
                      width={90}
                      height={50}
                      alt="Picture of the author"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="w-9/12	">
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-1">
                        {selectedStore?.qr_code || "XXXXXXXX0000"}
                      </h3>
                      <h4 className="text-sm">
                        Store Name: {selectedStore?.name || "Your Store"}
                      </h4>
                    </div>
                    <p className="text-xs">
                      <b>Description: </b>
                      {selectedStore?.description || "Best Store"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 w-full">
            <p className="text-base font-semibold mb-2">
              Select Number of cards
            </p>
            <EasySelect
              options={cardNumberList}
              handleChange={(value) =>
                formik.setFieldValue("number_of_cards", value?.label)
              }
            />
          </div>

          <div className="mt-5 w-full bg-gray-100 p-4 rounded-lg">
            <p className="text-base font-semibold mb-2">Shipping Address</p>
            <div className="flex items-center">
              <div className="w-1/12 text-center">
                <IoMdHome className="w-7 h-7 text-pink-400" />
              </div>
              <div className="w-11/12">
                <p>
                  {`${paperCardData?.store?.name || ""} , ${
                    paperCardData?.store?.street || ""
                  } ,${paperCardData?.store?.town || ""} \n ${
                    paperCardData?.store?.mobile_number || ""
                  } \n ${paperCardData?.store?.postal_code || ""}`}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-5 w-full">
            <p className="text-base font-semibold mb-2">Shipping Method</p>
            <div className="flex gap-10">
              <Radio
                name="type"
                label="In Post"
                defaultChecked
                value={formik.values.shipping_method}
                onChange={(e) =>
                  formik.setFieldValue("shipping_method", "inpost")
                }
              />
              <Radio
                name="type"
                label="DPD"
                onChange={(e) => formik.setFieldValue("shipping_method", "dpd")}
                value={formik.values.shipping_method}
              />
            </div>
            <div className="flex justify-between items-center gap-5 mt-5 w-full bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold">Shipping Charge</h3>
              <h3 className="text-base font-semibold">
                zł {orderTotal?.data?.shipping_method || 0}
              </h3>
            </div>
          </div>
          <div className="mt-8 w-full flex justify-between items-center gap-5 mt-5 w-full  rounded-lg">
            <h3 className="text-base font-semibold">
              Total Price :{" "}
              <strong>zł {orderTotal?.data?.grand_total || 0}</strong>
            </h3>
            <button
              disabled={isLoading || partner.isLoading || checkOut.isLoading}
              type="submit"
              className="text-white  bg-blush-red font-medium rounded-lg text-md px-5 py-3"
            >
              Buy
            </button>
          </div>
        </form>
      </div>
    </Loader>
  );
}

export default BuyPaperCardForm;
