"use client";

import { Search } from "lucide-react";
import GlobalInput from "../globals/globalInput";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConfirmCoupon,
  GetCustomerCouponsByCard,
  RejectCoupon,
} from "@/store/slices/coupon";
import { config } from "@/config/config";
import moment from "moment";
import { popup } from "@/_utils/alerts";
import Loader from "../globals/Loader";
import Swal from "sweetalert2";
import { GetUserByCard } from "@/store/slices/userSlice";

function VoucherLists() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const { userByCard } = useSelector((state) => state.user);
  const [search, setSearch] = useState("");
  const { voucherList, isLoading, isSuccess } = useSelector(
    (state) => state.coupon
  );

  const getUser = useCallback(() => {
    const cardno =
      typeof window !== "undefined" && localStorage.getItem("card_no");
    if (cardno) {
      dispatch(GetUserByCard({ cardNo: cardno }));
    } else {
      Swal.mixin({ toast: true }).fire({
        icon: "error",
        text: "oops ! card missing",
      });
    }
  }, [dispatch]);
  const getAllVouchers = useCallback(() => {
    if (userByCard) {
      dispatch(GetCustomerCouponsByCard(userByCard?.id));
    }
  }, [dispatch, userByCard]);

  useEffect(() => {
    getAllVouchers();
  }, [getAllVouchers]);

  const filteredData = (search, data) => {
    let newdata = data;
    if (search?.length > 0) {
      const regex = new RegExp(search, "i");
      newdata = data?.filter((item) => regex.test(item.coupon_code));
    }
    return newdata;
  };

  const confirmCoupon = useCallback(
    async (cardId, sellerId, couponId) => {
      if (cardId && sellerId && couponId) {
        const formdata = new FormData();
        formdata.append("card_id", cardId);
        formdata.append("seller_id", sellerId);
        await dispatch(ConfirmCoupon(formdata, couponId));
        getUser();
        if (isSuccess) {
          Swal.mixin({
            toast: true,
          }).fire({
            icon: "success",
            text: "Coupon Confirmed",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        popup({ status: "info", message: "try again" });
      }
    },
    [dispatch]
  );
  const rejectCoupon = useCallback(
    async (cardId, sellerId, couponId) => {
      if (cardId && sellerId && couponId) {
        const formdata = new FormData();
        formdata.append("card_id", cardId);
        formdata.append("seller_id", sellerId);
        await dispatch(RejectCoupon(formdata, couponId));
        getUser();
        if (isSuccess) {
          Swal.mixin({
            toast: true,
          }).fire({
            icon: "warning",
            text: "Coupon Rejected",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } else {
        popup({ status: "info", message: "try again" });
      }
    },
    [dispatch]
  );
  return (
    <Loader isLoading={isLoading}>
      <div>
        <div className="bg-blush-red p-2.5 text-center rounded-t-md text-white font-semibold">
          <h4>Vouchers</h4>
        </div>

        <div className="p-4 bg-gray-100">
          <GlobalInput
            placeholder="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            inputClassName=" outline-none bg-transparent text-sm"
            parentClassName="p-2 border rounded-md bg-white"
            rightIcon={<Search className="text-gray-400" />}
          />
        </div>
        <div className="p-3 grid grid-cols-1 md:grid-cols-2 transition-all md-landscape:grid-cols-2 lg:grid-cols-2 gap-2 lg:gap-3 max-h-[75vh] overflow-y-auto">
          {filteredData(search, voucherList?.data)?.map((item, index) => (
            <div key={index} className="bg-red-100 p-2 rounded-lg ">
              <div className="shadow text-center cursor-pointer rounded-lg flex items-center gap-2 bg-white relative">
                <div className="p-2 rounded-l-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative w-2/6">
                  <div className="absolute top-[47px] left-[-20px] w-[30px] h-[30px] bg-white rounded-full"></div>
                  <img
                    src={config.IMAGE_URL_PATH + item?.coupon_image}
                    alt="image"
                    className="!w-24 !h-24 mx-auto object-contain"
                  />
                </div>
                <div className="py-2 px-1 w-4/6 text-left">
                  <h3 className="font-semibold text-blush-red text-sm mb-2">
                    {item?.coupon_code}
                  </h3>
                  <h5 className="font-medium text-xs text-left mb-1">
                    {item?.coupon_value} Points
                  </h5>
                  <p className="text-xs">
                    Valid Untill{" "}
                    {moment(item?.expire_at).format("DD-MM-YYYY hh:mm A")}
                  </p>
                  <div className="absolute top-[47px] right-[-20px] w-[30px] h-[30px] bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex justify-between gap-5 mt-2">
                <button
                  className="w-full text-xs bg-green-200 text-green-600 p-2 rounded-lg font-semibold"
                  type="button"
                  onClick={() =>
                    confirmCoupon(userByCard?.id, user?.id, item?.coupon_id)
                  }
                  role="button"
                >
                  Confirm
                </button>
                <button
                  className="w-full text-xs bg-rose-200 text-red-600 p-2 rounded-lg font-semibold"
                  type="button"
                  role="button"
                  onClick={() =>
                    rejectCoupon(userByCard?.id, user?.id, item?.coupon_id)
                  }
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Loader>
  );
}

export default VoucherLists;
