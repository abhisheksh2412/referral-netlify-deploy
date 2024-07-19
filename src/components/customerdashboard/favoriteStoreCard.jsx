import React, { useCallback } from "react";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import { config } from "@/config/config";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { AddStoreFavorite } from "@/store/slices/customer";
import { GetAllCustomerStores } from "@/store/slices/seller";

function FavoriteStoreCard({ data, handleView = null }) {
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const getAllData = useCallback(() => {
    if (user?.id) {
      dispatch(GetAllCustomerStores(user?.id));
    }
  }, [dispatch, user]);
  const favoriteStore = async (storeId, onClicked) => {
    const data = {
      user_id: user?.id,
      store_id: storeId,
      is_clicked: onClicked,
    };
    await dispatch(AddStoreFavorite(data));
    getAllData();
  };
  return (
    <div>
      <div className=" bg-white rounded-lg group  relative p-0 pb-4 rounded-b-lg mb-4  hover:shadow-md transition-shadow group cursor-pointer">
        <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
          <Image
            src={config?.IMAGE_URL_PATH + data?.logo}
            width={150}
            height={150}
            alt="Picture of the author"
            className="mx-auto"
          />
          <button
            className="absolute right-2  top-2 !z-50"
            onClick={() =>
              favoriteStore(data?.id, data?.is_favorite === 0 ? 1 : 0)
            }
          >
            <CiHeart
              className={clsx(
                "w-8 h-8  rounded-full p-1  cursor-pointer	pointer-events-none",
                data?.is_favorite === 1
                  ? "bg-red-700 text-white"
                  : "bg-white  text-red-400 shadow-md"
              )}
            />
          </button>
          <span
            class={clsx(
              "text-xs font-medium me-2 px-2.5 py-0.5 rounded-full absolute bottom-3 right-3",
              data?.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            )}
          >
            {data?.status}
          </span>
        </div>
        <h3
          className="text-left p-2  line-clamp-1 text-lg font-semibold hover:text-pink-600"
          onClick={() => handleView(data)}
        >
          {data?.name}
        </h3>
        <p className="line-clamp-2 px-3 text-gray-500 text-sm h-[40px]">
          {data?.description}
        </p>
      </div>
    </div>
  );
}

export default FavoriteStoreCard;
