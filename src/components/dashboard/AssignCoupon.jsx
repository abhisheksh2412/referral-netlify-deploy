import Image from "next/image";
import EasySelect from "../globals/EasySelect";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { AssignCouponCard, GetAllSellerCoupons } from "@/store/slices/coupon";
import { popup } from "@/_utils/alerts";
import Loader from "../globals/Loader";
import { GetUserByCard } from "@/store/slices/userSlice";

export default function AssignCouponToCard({ handleClose }) {
  const dispatch = useDispatch();
  const { userByCard } = useSelector((state) => state.user);
  const { couponsList, isSuccess, isLoading } = useSelector(
    (state) => state.coupon
  );
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const user = useSelector((state) => state.auth.data);
  const getUser = useCallback(() => {
    const cardno =
      typeof window !== "undefined" && localStorage.getItem("card_no");
    if (cardno) {
      dispatch(GetUserByCard(cardno));
    } else {
      Swal.mixin({ toast: true }).fire({
        icon: "error",
        text: "oops ! card missing",
      });
    }
  }, [dispatch]);
  const getSellerCoupons = useCallback(() => {
    if (user) {
      dispatch(GetAllSellerCoupons(user?.id));
    }
  }, [dispatch, user]);
  useEffect(() => {
    getSellerCoupons();
  }, [getSellerCoupons]);

  const couponOptionsList = useMemo(() => {
    return couponsList?.data?.map((item) => ({
      label: item?.coupon_code,
      value: item?.id,
    }));
  }, [couponsList?.data]);

  const handleAssignCard = useCallback(
    async (user_id, card_id, coupon_id) => {
      if (!coupon_id) {
        return alert("select any coupon");
      }
      const formdata = new FormData();
      formdata.append("user_id", user_id);
      formdata.append("card_id", card_id);
      formdata.append("coupon_id", coupon_id);
      await dispatch(AssignCouponCard(formdata));
      getUser();
      if (await isSuccess) {
        popup({ status: "success", message: "Assigned Successfully" });
        handleClose();
      }
    },
    [dispatch]
  );
  return (
    <Loader isLoading={isLoading}>
      <div className="!text-gray-800">
        <div className="p-2 bg-blush-red text-white rounded-t-md text-center font-semibold">
          <h1>Assign Coupon to Card</h1>
        </div>
        <div className="grid grid-cols-2 justify-between p-4">
          <h4 className="text-sm p-2 font-semibold">Card Holder Name :</h4>
          <h4 className="text-sm p-2 text-end">
            {userByCard?.card_holder_name}
          </h4>
          <hr className="col-span-2" />
          <h4 className="text-sm p-2 font-semibold">Card Number:</h4>
          <h4 className="text-sm p-2 text-end">{userByCard?.card_number}</h4>
          <hr className="col-span-2" />
          <h4 className="text-sm p-2 font-semibold">Created At :</h4>
          <h4 className="text-sm p-2 text-end">
            {moment(userByCard?.created_at).format("DD-MM-YYYY hh:mm A")}
          </h4>
          <hr className="col-span-2" />
          <h4 className="text-sm p-2 font-semibold">Total Points :</h4>
          <h4 className="text-sm p-2 text-end">
            {userByCard?.customerPoints?.total_points}
          </h4>
          <hr className="col-span-2" />
          <h4 className="text-sm p-2 font-semibold">QR Code :</h4>
          <h4 className="text-sm p-2 text-end">{userByCard?.qr_code}</h4>
          <hr className="col-span-2" />
          <div className="col-span-2 flex flex-col gap-2 p-2">
            <h4 className="text-sm font-semibold ">User Info</h4>

            <div className="flex gap-2">
              <Image
                src={"/assets/store.png"}
                width={100}
                height={100}
                alt="user_image"
                className="!w-16 !h-16 !rounded-full"
              />
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-sm text-gray-700 ">Aakash</h4>
                <h4 className="text-xs text-gray-500">
                  aakashgupta3435@gmail.com
                </h4>
                <h4 className="text-blush-red text-xs font-semibold">active</h4>
              </div>
            </div>
          </div>
          <h4 className="text-sm p-2 font-semibold">Valid From :</h4>
          <h4 className="text-sm p-2 text-end">{userByCard?.valid_from}</h4>
          <hr className="col-span-2" />
          <h4 className="text-sm p-2 font-semibold">Valid To :</h4>
          <h4 className="text-sm p-2 text-end">{userByCard?.valid_thru}</h4>
          <hr className="col-span-2" />

          <div className="mt-5 col-span-2 p-2 flex flex-col">
            <h5 className="text-sm font-semibold text-gray-800">
              Select Coupon
            </h5>
            <EasySelect
              menuPlacement="top"
              options={couponOptionsList}
              handleChange={(value) => setSelectedCoupon(value)}
            />
          </div>
          <div className="col-span-2  p-2">
            <button
              onClick={() =>
                handleAssignCard(
                  userByCard?.user?.id,
                  userByCard?.id,

                  selectedCoupon?.value
                )
              }
              className="text-sm p-2 w-full bg-blush-red text-white text-center rounded-md"
            >
              Assign Coupon
            </button>
          </div>
        </div>
      </div>
    </Loader>
  );
}
