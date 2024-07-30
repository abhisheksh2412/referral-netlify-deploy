"use client";

import {
  BillPaymentApi,
  BillPaymentSuccessApi,
  GetInvoiceData,
  PayInvoiceData,
} from "@/store/slices/common";
import { CalendarCheck } from "lucide-react";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import usePaymentCheckout from "@/hooks/usePaymentCheckout";
import { popup } from "@/_utils/alerts";
import Swal from "sweetalert2";

export default function PaymentCard() {
  const user = useSelector((state) => state.auth.data);
  const partnerId = user?.role === "Partner" ? user?.id : user?.partner_id;
  const dispatch = useDispatch();
  const checkOut = useSelector((state) => state.common);

  const { payInvoiceData, lastInvoices, isLoading } = useSelector(
    (state) => state.common
  );
  const getLastInvoices = useCallback(() => {
    dispatch(GetInvoiceData());
  }, [dispatch]);
  const getInvoiceData = useCallback(() => {
    dispatch(PayInvoiceData());
  }, [dispatch]);

  const { status, sessionId } = usePaymentCheckout(
    checkOut?.checkoutData?.redirect_url || null,
    "payment"
  );

  const floatToFixed = (data, fixed = 2) => {
    return parseFloat(data).toFixed(fixed).toString().replace(".", ",");
  };

  const handlePaymentAfterPay = useCallback(async () => {
    if (status === "success") {
      const formdata = new FormData();
      const partnerId = user?.role === "Partner" ? user?.id : user?.partner_id;
      formdata.append("session_id", sessionId);
      formdata.append("partner_id", partnerId);
      await dispatch(BillPaymentSuccessApi(formdata));
      getInvoiceData();
      getLastInvoices();
      await Swal.mixin({ toast: true }).fire({
        icon: "success",
        text: "Payment Successfull",
        timer: 1500,
        showConfirmButton: false,
      });
    } else if (status === "cancel") {
      console.log("cancle hai");
      await Swal.mixin({ toast: true }).fire({
        icon: "error",
        text: "Payment cancel",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  }, [status, sessionId, user]);

  const handleBillPayment = useCallback(
    async (totalPrice) => {
      if (totalPrice) {
        const formdata = new FormData();
        let url = `${location.href}`;
        const partnerId =
          user?.role === "Partner" ? user?.id : user?.partner_id;
        formdata.append("url", url);
        formdata.append("total_price", totalPrice);
        formdata.append("partner_id", partnerId);

        await dispatch(BillPaymentApi(formdata));
      }
    },
    [dispatch, user]
  );

  useEffect(() => {
    handlePaymentAfterPay();
  }, [handlePaymentAfterPay]);

  useEffect(() => {
    getInvoiceData();
    getLastInvoices();
  }, [getInvoiceData, getLastInvoices]);

  return (
    <Loader isLoading={isLoading}>
      <div className="p-10 mobile:p-4 shadow-xl flex flex-col gap-2 lg:w-1/3  mobile:w-full  md:w-2/3 md-landscape:w-2/4 sm:w-1/3 bg-gray-100">
        <h4 className="font-semibold text-gray-700">Last Payment Amount</h4>

        {lastInvoices?.data?.length === 0 ? (
          <h6 className="text-sm text-red-500 font-medium">
            You haven&apos;t paid any amount yet.
          </h6>
        ) : (
          <div>
            {lastInvoices?.data
              ?.filter((_, index) => lastInvoices?.data?.length - 1 === index)
              .map((item, index) => (
                <div
                  key={index}
                  className="w-full p-2 px-3 bg-white rounded-md shadown-lg"
                >
                  <div className="flex justify-between items-center pt-1">
                    <h5 className="text-xs bg-green-100 text-green-500 p-1 px-2 rounded-md">
                      {item?.invoice?.status}
                    </h5>
                    <h5 className="text-sm">
                      {floatToFixed(item?.transactions?.amount)} zl
                    </h5>
                  </div>
                  <h5 className="text-sm pt-1">{item?.transactions?.note}</h5>
                  <div className="flex items-center justify-between pt-1">
                    <CalendarCheck className="text-green-500" size={14} />
                    <h5 className="text-xs">
                      {item?.transactions?.date_recorded}
                    </h5>
                  </div>
                </div>
              ))}
          </div>
        )}

        <h5>Next Month Plan</h5>
        <div className="p-2 rounded-xl border grid grid-cols-2 relative bg-white">
          <h5 className="text-sm text-gray-700 p-2">Plastic Card</h5>
          <h6 className="p-2 text-sm text-gray-700 text-end text-nowrap">
            {floatToFixed(payInvoiceData?.card?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.card?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.card?.total)}
          </h6>
          <span className="w-full border border-dashed col-span-2"></span>
          <h5 className="text-sm text-gray-700 p-2">Paper Card</h5>
          <h6 className="p-2 text-sm text-gray-700 text-end">
            {floatToFixed(payInvoiceData?.paper_card_fee?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.paper_card_fee?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.paper_card_fee?.total)}
          </h6>
          <span className="w-full border border-dashed col-span-2"></span>
          <h5 className="text-sm text-gray-700 p-2">Store</h5>
          <h6 className="p-2 text-sm text-gray-700 text-end">
            {floatToFixed(payInvoiceData?.store?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.store?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.store?.total)}
          </h6>
          <span className="w-full border border-dashed col-span-2"></span>
          <h5 className="text-sm text-gray-700 p-2">User</h5>
          <h6 className="p-2 text-sm text-gray-700 text-end">
            {floatToFixed(payInvoiceData?.user?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.user?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.user?.total)}
          </h6>
          <span className="w-full border border-dashed col-span-2"></span>
          <h5 className="text-sm text-gray-700 p-2">Seller account</h5>
          <h6 className="p-2 text-sm text-gray-700 text-end">
            {floatToFixed(payInvoiceData?.seller_account?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.seller_account?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.seller_account?.total)}
          </h6>
          <span className="w-full border border-dashed col-span-2"></span>
          <h5 className="text-sm text-gray-700 p-2">Manager account</h5>
          <h6 className="p-2 text-sm text-gray-700 text-end">
            {floatToFixed(payInvoiceData?.manager_account?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.manager_account?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.manager_account?.total)}
          </h6>
          <span className="w-full border border-dashed col-span-2"></span>
          <h5 className="text-sm text-gray-700 p-2">
            Email user&apos;s birthday
          </h5>
          <h6 className="p-2 text-sm text-gray-700 text-end">
            {floatToFixed(payInvoiceData?.email_user_birthday?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.email_user_birthday?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.email_user_birthday?.total)}
          </h6>
          <span className="w-full border border-dashed col-span-2"></span>
          <h5 className="text-sm text-gray-700 p-2">
            Email store&apos;s birthday
          </h5>
          <h6 className="p-2 text-sm text-gray-700 text-end">
            {floatToFixed(payInvoiceData?.email_store_birthday?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.email_store_birthday?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.email_store_birthday?.total)}
          </h6>
          <span className="w-full border border-dashed col-span-2"></span>
          <h5 className="text-sm text-gray-700 p-2">Card Support</h5>
          <h6 className="p-2 text-sm text-gray-700 text-end">
            {floatToFixed(payInvoiceData?.card_support?.qty)} x zl{" "}
            {floatToFixed(payInvoiceData?.card_support?.fee)} = zl{" "}
            {floatToFixed(payInvoiceData?.card_support?.total)}
          </h6>
          <div className="col-span-2 border-t border-gray-400 grid grid-cols-2">
            {/* <span className="w-full border border-dashed col-span-2"></span> */}
            <h5 className="text-sm text-gray-800 font-semibold p-2">
              Total Amount
            </h5>
            <h6 className="p-2 text-sm text-gray-800 font-semibold text-end">
              zl {floatToFixed(payInvoiceData?.total_amount)}
            </h6>
          </div>
          <div className="p-2 col-span-2 relative">
            <button
              // loading={checkOut.isLoading}
              type="button"
              disabled={parseInt(payInvoiceData?.total_amount) === 0}
              onClick={() => handleBillPayment(10)}
              className="rounded-md shadow-md p-3 px-5  bottom-0 left-1/2  text-white font-semibold bg-blush-red   w-full text-sm"
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </Loader>
  );
}
