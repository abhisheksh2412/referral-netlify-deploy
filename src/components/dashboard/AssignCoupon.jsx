import Image from "next/image";
import EasySelect from "../globals/EasySelect";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

export default function AssignCouponToCard() {
  const { userByCard, isLoading } = useSelector((state) => state.user);
  useEffect(() => {
    console.log(userByCard);
  }, [userByCard]);
  return (
    <div className="!text-gray-800">
      <div className="p-2 bg-blush-red text-white rounded-t-md text-center font-semibold">
        <h1>Assign Coupon to Card</h1>
      </div>
      <div className="grid grid-cols-2 justify-between">
        <h4 className="text-sm p-2 font-semibold">Card Holder Name :</h4>
        <h4 className="text-sm p-2 text-end">{userByCard?.card_holder_name}</h4>
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
          <h5 className="text-sm font-semibold text-gray-800">Select Coupon</h5>
          <EasySelect options={[{ label: "name", value: "name" }]} />
        </div>
        <div className="col-span-2  p-2">
          <button className="text-sm p-2 w-full bg-blush-red text-white text-center rounded-md">
            Assign Coupon
          </button>
        </div>
      </div>
    </div>
  );
}
