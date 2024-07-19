import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import Image from "next/image";
import { config } from "@/config/config";

function ExtraPoints({ data }) {
  return (
    <>
      <div>
        <div className="bg-white p-3 rounded-md cursor-pointer">
          <div className="flex gap-3 items-center	">
            <div className=" p-1 shadow rounded-full ">
              <Image
                src={config?.IMAGE_URL_PATH + data?.product_image}
                width={150}
                height={150}
                alt="Picture of the author"
                className="rounded-full w-20 h-20"
              />
            </div>

            <div>
              <h3 className="text-center font-semibold text-sm mb-2 line-clamp-1">
                {data?.product_name}
              </h3>
              <h5 class="bg-blush-red text-white text-xs font-medium me-2 px-3 py-1.5 rounded-full dark:bg-pink-900 dark:text-pink-300 inline-flex items-center gap-1">
                <AiFillCheckCircle />
                {data?.earn_point}
              </h5>
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-2 line-clamp-2">
            {data?.store_name}
          </p>
        </div>
      </div>
    </>
  );
}

export default ExtraPoints;
