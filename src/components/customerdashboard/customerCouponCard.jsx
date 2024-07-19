import React, { Suspense, useCallback } from "react";
import Image from "next/image";
import { config } from "@/config/config";
import moment from "moment";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { ActivateUserCoupon, GetCouponsByStore } from "@/store/slices/customer";
import { useSearchParams } from "next/navigation";

function CustomerCouponCard({ data, handleView }) {
  const dispatch = useDispatch();
  const storeId = useSearchParams().get("store_id");

  const activateCoupon = useCallback(() => {
    dispatch(ActivateUserCoupon({ storeId: storeId, couponId: data?.id }));
    dispatch(GetCouponsByStore(storeId));
  }, [dispatch, storeId, data]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="shadow rounded-md bg-[#fce4ec]">
          <div className="p-3">
            <div className="flex items-center justify-between">
              <div className="w-1/2">
                <div className="p-1 shadow rounded-md w-20 bg-white">
                  <Image
                    src={config?.IMAGE_URL_PATH + data?.coupon_image}
                    width={65}
                    height={65}
                    alt="coupon img"
                    className="rounded-md"
                  />
                </div>
              </div>

              <div className="w-1/2 text-right">
                <h5
                  className={clsx(
                    " text-xs font-medium me-2 px-4 py-2.5 rounded-full  inline-block",
                    data?.status === "activated"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  )}
                >
                  {data?.status}
                </h5>
              </div>
            </div>
            <h3
              onClick={() => handleView(data)}
              className="line-clamp-1 hover:text-pink-600  mb-2 font-semibold mt-3"
            >
              {data?.coupon_code}
            </h3>
            <p className="text-black-500 min-h-[20px] text-sm mt-1 line-clamp-2">
              {data?.description}
            </p>
          </div>
          <div className="bg-white rounded-b-md px-3 py-2 border-t-2 border-white flex items-center justify-between">
            <div className="flex items-center">
              <h3 className="text-xs">
                <b className="font-medium">Valid Until :</b>
                {moment(data?.expire_at).format("DD-MM-YYYY  hh:mm A")}
              </h3>
            </div>
            <div>
              <button
                onClick={() => activateCoupon()}
                className="relative px-3 py-3 text-xs  font-normal text-center text-white bg-[#0e0a38] rounded-lg"
              >
                Activate Coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default CustomerCouponCard;
