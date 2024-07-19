import React from "react";
import Image from "next/image";
import { config } from "@/config/config";

function MoreStoreCard({ data }) {
  return (
    <div>
      <div className="bg-white p-3 rounded-md cursor-pointer">
        <div className="flex gap-3 items-center ">
          <div className=" p-1 shadow rounded-md ">
            <Image
              src={
                data?.logo.includes("/public/storage/")
                  ? data?.logo
                  : config?.IMAGE_URL_PATH + data?.logo
              }
              width={80}
              height={80}
              alt="Picture of the author"
            />
          </div>
          <div>
            <h3 className="text-center font-semibold text-sm mb-2 line-clamp-1">
              {data?.name}
            </h3>
            <h5 className="bg-green-100 text-green-800 text-xs font-medium me-2 px-3 py-1.5 rounded-full dark:bg-pink-900 dark:text-pink-300 inline-flex items-center gap-1">
              {data?.status}
            </h5>
          </div>
        </div>
        <p className="text-gray-500 text-sm mt-2 line-clamp-2">
          {data?.description}
        </p>
      </div>
    </div>
  );
}

export default MoreStoreCard;
