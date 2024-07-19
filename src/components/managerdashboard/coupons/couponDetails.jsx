import { CouponStatus } from "@/components/coupon/couponStatus";
import { config } from "@/config/config";
import { MdDelete } from "react-icons/md";
import moment from "moment";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback } from "react";
import {
  ActivateUserCoupon,
  GetCouponsByStore,
  GetCustomerDashData,
} from "@/store/slices/customer";

export default function CouponDetails({ data, isdelete = false }) {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const storeId = useSearchParams().get("store_id");
  const CustomersAllData = useCallback(() => {
    const id = params.get("store_id");
    dispatch(GetCustomerDashData(id));
  }, [dispatch, params]);

  // activate coupon implementation
  const activateCoupon = useCallback(() => {
    dispatch(ActivateUserCoupon({ storeId: storeId, couponId: data?.id }));
    CustomersAllData();
  }, [dispatch, storeId, data]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <div className="bg-gradient-to-r p-3 from-blush-red to-pink-200 text-white font-semibold text-center rounded-t-md">
          <h1>Coupon Details</h1>
        </div>

        {/* Coupon Card  */}

        <div className="p-4">
          {/* card  */}
          <div className=" relative rounded-xl shadow-custom-inset flex flex-col">
            <span className="absolute w-fit right-2 top-2">
              <CouponStatus status={data?.status} />
            </span>

            {isdelete && (
              <button className="text-sm text-white font-normal bg-red-400 p-2 flex items-center justify-center rounded-md absolute left-0 lg:w-[30%] mobile:w-[40%] sm:w-[38%]  md-landscape:w-[40%] m-4">
                <MdDelete />
              </button>
            )}

            {/* coupon info  */}
            <div className="p-4 flex flex-col gap-2">
              <Image
                src={config.IMAGE_URL_PATH + data?.coupon_image}
                // src="/assets/store-10.png"
                alt="Coupon_Image"
                width={150}
                height={150}
                className="rounded-md mx-auto"
              />
              <h4 className="text-sm font-medium text-gray-700 text-center">
                COUPON CODE : <strong>{data?.coupon_code}</strong>
              </h4>
              <h4 className="text-sm font-medium text-gray-700 text-center">
                COUPON VALUE : <strong>{data?.coupon_value}</strong>
              </h4>
            </div>
            <div className="rounded-b-md p-3 px-4 bg-blush-red text-white">
              <h6 className="text-sm">
                Valid until date:
                {moment(data?.expire_at).format("DD-MM-YYYY hh:mm A")}
              </h6>
            </div>
          </div>

          <h3 className="text-sm font-semibold pt-3 text-gray-700">
            Description :
          </h3>
          <h4 className="text-sm font-normal py-3 text-gray-700">
            {data?.description}
          </h4>

          {/* activate coupon button with implementation */}
          {/* <button
          onClick={() => activateCoupon()}
          className=" rounded-md text-sm text-white p-1.5  w-full bg-blush-red"
        >
          Activate Coupon
        </button> */}
        </div>
      </div>
    </Suspense>
  );
}
