"use client";
import React from "react";
import Image from "next/image";
import { config } from "@/config/config";

function MoreBestSellerCard({ data }) {
  return (
    <div>
      <div class="shadow bg-white rounded-lg p-0 relative pb-2 rounded-b-lg mb-4 group cursor-pointer">
        <div class="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
          <Image
            src={config?.IMAGE_URL_PATH + data?.product?.path}
            width={150}
            height={150}
            alt="Picture of the author"
            className="mx-auto"
          />
        </div>
        <div className="px-3">
          <h3 class="text-center font-semibold pt-3 mb-3">
            {data?.product?.name}
          </h3>
          <p class="text-sm line-clamp-2 h-[40px] text-center">
            {data?.description}
          </p>
          <h4 class="text-center p-1 font-medium text-neutral-400 rounded-full bg-pink-100 text-pink-800 px-6 py-0.5 table mx-auto my-2">
            {data?.product?.weight} g
          </h4>
        </div>
      </div>
    </div>
  );
}

export default MoreBestSellerCard;
