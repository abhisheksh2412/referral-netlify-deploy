import { config } from "@/config/config";
import { AddStoreFavorite } from "@/store/slices/customer";
import { GetAllCustomerStores } from "@/store/slices/seller";
import clsx from "clsx";
import moment from "moment";
import { useCallback } from "react";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

export default function StoreDetails({ selectedData, addFavBtn = false }) {
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
    <>
      <div className="w-full p-4 rounded-t-md bg-gradient-to-r from-blush-red to-pink-200">
        <h1 className="text-xl font-semibold text-white">Store Details</h1>
      </div>
      <div className="max-h-[80vh] overflow-auto relative">
        {addFavBtn && (
          <CiHeart
            onClick={() =>
              favoriteStore(
                selectedData?.id,
                selectedData?.is_favorite === 0 ? 1 : 0
              )
            }
            className={clsx(
              "absolute   top-2 right-2 w-8 h-8   rounded-full p-1  cursor-pointer",
              selectedData?.is_favorite === 1
                ? "bg-red-700 text-white"
                : "bg-white  text-red-400 shadow-md"
            )}
          />
        )}

        <div className="relative m-2 rounded-md flex items-center	 w-48 h-48 shadow-lg mx-auto p-2  bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
          
          <Image
             src={
              selectedData?.logo.includes("/public/storage/")
                ? selectedData?.logo
                : config?.IMAGE_URL_PATH + selectedData?.logo
            }
            width={500}
            height={500}
             alt="Store Image"
              className="w-42 h-42 mx-auto  rounded-md"
          />

          <span className="absolute right-3 bottom-0 p-1 px-2 text-xs font-medium text-white bg-green-300 rounded-full">
            {selectedData?.status}
          </span>
        </div>
        {/* store info */}
        <div className="flex flex-col gap-2 p-4">
          <span className="flex flex-col">
            <h1 className="text-lg font-semibold text-black text-center">
              {selectedData?.name}
            </h1>
            <h6 className="text-md font-normal text-gray-700 text-center">
              Shop number: {selectedData?.number}
            </h6>
          </span>
          <span className="flex flex-col">
            <h5 className="text-lg font-semibold text-black ">Description:</h5>
            <p className="text-md font-normal text-gray-700">
              {selectedData?.description}
            </p>
          </span>
        </div>

        {/* store details */}
        <div className=" p-4">
          <h1 className="pb-2 text-lg font-semibold  text-black">
            Store Details:
          </h1>

          <div className="relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <tbody>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <h5>Street</h5>
                  </th>
                  <td className="px-6 py-2">
                    <h5 className="text-md font-normal text-gray-700">
                      {selectedData?.street}
                    </h5>
                  </td>
                </tr>

                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <h5>Town</h5>
                  </th>
                  <td className="px-6 py-2">
                    <h5 className="text-md font-normal text-gray-700">
                      {selectedData?.town}
                    </h5>
                  </td>
                </tr>

                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <h5>Postal Code</h5>
                  </th>
                  <td className="px-6 py-2">
                    <h5 className="text-md font-normal text-gray-700">
                      {selectedData?.postal_code}
                    </h5>
                  </td>
                </tr>

                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <h5>Mobile Number</h5>
                  </th>
                  <td className="px-6 py-2">
                    <h5 className="text-md font-normal text-gray-700">
                      {selectedData?.mobile_number}
                    </h5>
                  </td>
                </tr>

                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <h5>Create at</h5>
                  </th>
                  <td className="px-6 py-2">
                    <h5 className="text-md font-normal text-gray-700">
                      {moment(selectedData?.created_at).format("DD/MM/YYYY")}
                    </h5>
                  </td>
                </tr>

                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <h5>Update at</h5>
                  </th>
                  <td className="px-6 py-2">
                    <h5 className="text-md font-normal text-gray-700">
                      {moment(selectedData?.updated_at).format("DD/MM/YYYY")}
                    </h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
