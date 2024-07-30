import React, { useCallback } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import Image from "next/image";
import { config } from "@/config/config";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteMenuShopCafe,
  GetMenuCafeList,
} from "@/store/slices/menuShopCafe";
import Swal from "sweetalert2";

function MmenuShopCafeCard({
  data,
  handleEdit,
  handleView,
  isActionAllow = true,
}) {
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector((state) => state.menu);
  const fetChMenuCafeList = useCallback(() => {
    dispatch(GetMenuCafeList());
  }, [dispatch]);

  const deleteShopMenuCafe = (id) => {
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
        await dispatch(DeleteMenuShopCafe(id));
        fetChMenuCafeList();
        if (await isSuccess) {
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
      <div>
        <div className=" w-fit rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 rounded-lg p-3 relative group">
          <Image
            src={config?.IMAGE_URL_PATH + data?.menu_shop_cafe_img}
            alt="Picture of the author"
            width={100}
            height={100}
            className="bg-white !h-20 !w-20 p-2 rounded-full absolute -top-[40px] mx-auto left-0 right-0 mobile:w-12 mobile:h-12"
          />

          <div className="flex items-center justify-center gap-1  py-1 px-1 rounded-full w-20 absolute top-0 right-0 m-2 ">
            {isActionAllow && (
              <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100">
                <div
                  className="cursor-pointer bg-red-700 p-1 rounded"
                  onClick={() => deleteShopMenuCafe(data?.id)}
                >
                  <MdDeleteOutline className="text-white" />
                </div>
                <div
                  onClick={() => handleEdit(data)}
                  className="cursor-pointer bg-green-700 p-1 rounded"
                >
                  <TiPencil className="text-white" />
                </div>
              </div>
            )}
          </div>

          <h3
            onClick={() => handleView(data)}
            className="line-clamp-1 cursor-pointer hover:text-pink-600 mobile:text-sm mb-2 font-semibold text-center mt-16 mobile:mt-10"
          >
            {data?.title}
          </h3>
          <div className="flex justify-center items-center gap-5 mt-3 mobile:gap-2">
            <h4 className="bg-[#0e0a38] text-nowrap text-white text-sm mobile:text-xs font-medium  px-4 py-1.5 rounded-full">
              {data?.price} PLN
            </h4>
            <h4 className="bg-blush-red text-nowrap text-white text-sm mobile:text-xs font-medium  px-4 py-1.5 rounded-full">
              {data?.points} PKT
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MmenuShopCafeCard;
