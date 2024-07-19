"use client";
import React, { useCallback } from "react";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { TiPencil } from "react-icons/ti";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { config } from "@/config/config";
import { CouponStatus } from "@/components/coupon/couponStatus";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { DeleteCouponById, GetManagerCoupons } from "@/store/slices/coupon";

function CouponsCard({ data, handleView, isdelete = true }) {
  const router = useRouter();
  const coupon = useSelector((state) => state.coupon);
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const fetchManagerCoupon = useCallback(() => {
    if (user?.id) {
      dispatch(GetManagerCoupons(user?.id));
    }
  }, [dispatch, user?.id]);
  const deleteCoupon = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(DeleteCouponById(id));
        fetchManagerCoupon();
        if (await coupon?.isSuccess) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };
  return (
    <div>
      <div className="bg-gray-100 rounded-lg p-3 relative group">
        <Image
          src={config.IMAGE_URL_PATH + data?.coupon_image}
          alt="Picture of the author"
          width={90}
          height={90}
          priority
          className="bg-white !w-20 !h-20 p-2 rounded-full absolute -top-[40px]"
        />

        <div className="flex items-center justify-center gap-1  py-1 px-1 rounded-full w-20 absolute top-0 right-0 m-2 ">
          <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100">
            {isdelete && (
              <div
                className="cursor-pointer bg-red-700 p-1 rounded"
                onClick={() => deleteCoupon(data?.id)}
              >
                <MdDeleteOutline className="text-white" />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 mt-12 mb-2 mobile:inline-block">
          <CouponStatus status={data?.status} />
          <h6 class="flex items-center text-ellipsis justify-center gap-1 bg-white text-black-800 text-xs font-medium me-2 px-2.5 py-1 rounded-full mobile:mt-3">
            <IoIosCheckmarkCircle className="text-blush-red text-base" />{" "}
            {data?.coupon_value}
          </h6>
        </div>
        <h3
          className="line-clamp-1  mb-2 font-medium cursor-pointer hover:text-pink-600 mobile:whitespace-nowrap"
          onClick={() => handleView(data)}
        >
          {data?.coupon_code}
        </h3>
        <p className="line-clamp-2 text-gray-700 text-sm h-[40px] ">
          {data?.description}
        </p>
      </div>
    </div>
  );
}

export default CouponsCard;
