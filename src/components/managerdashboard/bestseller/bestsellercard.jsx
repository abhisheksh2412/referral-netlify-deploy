import React, { useCallback } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { config } from "@/config/config";
import clsx from "clsx";
import Swal from "sweetalert2";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { DeleteBestSeller, GetBestSellerByToken } from "@/store/slices/seller";

function BestSellerCard({
  data,
  handleView,
  ClassName = "",
  isActionAllow = true,
}) {
  const user = useSelector((state) => state.auth.data);
  const seller = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const getBestSellers = useCallback(() => {
    if (user?.id) {
      dispatch(GetBestSellerByToken(user?.id));
    }
  }, [dispatch, user?.id]);
  const deleteBestSeller = (id) => {
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
        await dispatch(DeleteBestSeller(id));
        getBestSellers();
        if (seller?.isSuccess) {
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
      <div className={clsx("bg-white rounded-lg p-3 group ", ClassName)}>
        <div className="flex items-center	">
          <div className="w-3/6">
            <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100">
              {isActionAllow && (
                <div
                  className="cursor-pointer bg-red-700 p-1 rounded"
                  onClick={() => deleteBestSeller(data?.id)}
                >
                  <MdDeleteOutline className="text-white" />
                </div>
              )}
              {/* <div className="cursor-pointer bg-green-700 p-1 rounded">
                <TiPencil className="text-white" />
              </div> */}
            </div>

            <h4 className="text-xl font-semibold mb-2 line-clamp-1">
              {data?.product?.name}
            </h4>
            <p className=" text-sm line-clamp-2 mb-2 h-14">
              {data?.description}
            </p>
            <h5 className="text-gray-700 text-sm">
              {data?.product?.store_name}
            </h5>
            <h3 className="text-3xl sm:text-xl mobile:text-xl font-semibold text-blush-red my-2">
              {data?.product?.points}
            </h3>
          </div>
          <div className="w-3/6">
            <div className="">

              <Image
                src={config?.IMAGE_URL_PATH + data?.product?.path}
                width={500}
                height={500}
                alt="product_image"
                 className="w-36 h-36 mx-auto"
              />

            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => handleView(data)}
          class="w-full justify-center relative inline-flex items-center gap-1 px-6 py-2.5 text-sm font-medium text-center text-white bg-blush-red rounded-lg"
        >
          <FaRegEye />
          View Details
        </button>
      </div>
    </div>
  );
}

export default BestSellerCard;
