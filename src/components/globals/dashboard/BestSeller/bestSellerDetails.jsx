import { config } from "@/config/config";
import { useStateManager } from "@/providers/useStateManager";
import { Share, Share2 } from "lucide-react";
import Image from "next/image";

export default function BestSellerDetails({ data }) {
  const { shareUrl } = useStateManager();
  return (
    <div className=" relative">
      <div className="bg-gradient-to-r from-blush-red to-pink-300 text-lg font-semibold text-white p-4 text-left rounded-t-md">
        <h1> Product Details</h1>
      </div>

      <span
        onClick={shareUrl}
        className="absolute right-2 top-3 p-2 rounded-full bg-blush-red text-white shadow-lg cursor-pointer"
      >
        <Share2 size={15} />
      </span>

      <div className="flex py-3 justify-center">
        <Image
          src={config?.IMAGE_URL_PATH + data?.product?.path}
          width={100}
          height={100}
          property
          alt="ProductImage"
          className="!w-36 object-cover rounded-md !h-36 p-2 shadow"
        />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="border w-fit h-fit border-blush-red p-2 px-3 rounded-md bg-pink-50 mx-auto">
          <h6 className="text-sm font-normal text-pink-600 ">
            Publish on : 24-06-2024 11:33 AM
          </h6>
        </div>

        <h5 className="text-xl text-gray-700 font-bold text-center">
          {data?.product?.name}
        </h5>
        <h5 className="text-md text-gray-700 font-normal text-center">
          {data?.description}
        </h5>
        <div className="flex justify-center gap-4 p-5">
          <h5 className="text-md text-gray-700 font-medium">
            {data?.product?.points}
          </h5>
          <h5 className="text-md text-gray-700 font-medium">
            <span class="bg-green-100 text-green-800 text-md font-medium me-2 px-4 py-1.5 rounded-full dark:bg-green-900 dark:text-green-300">
              {data?.product?.store_name
                ? data?.product?.store_name
                : "No Store"}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
}
