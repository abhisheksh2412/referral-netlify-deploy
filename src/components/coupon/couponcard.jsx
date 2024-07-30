import { config } from "@/config/config";
import clsx from "clsx";
import React from "react";
import Image from "next/image";

function CouponCard({ data }) {
  return (
    <div>
      <div class="block max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow">
        <div className="flex justify-between items-center">
          <div>
            <Image
              src={config.IMAGE_URL_PATH + data?.coupon_image}
              width={500}
              height={500}
              alt="gift"
              className="w-16 h-16 rounded-full shadow p-1 bg-white"
            />
          </div>
          <div>
            <span
              class={clsx(
                " text-xs font-medium me-2 px-4 py-2 rounded-full ",
                data?.status === "active"
                  ? " bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              )}
            >
              {data?.status}
            </span>
          </div>
        </div>
        <h3 className="mt-6 text-md font-medium line-clamp-1">
          {data?.coupon_code}
        </h3>
        <p class="mt-2 text-sm text-gray-500 line-clamp-3 h-16">
          {data?.description}
        </p>
      </div>
    </div>
  );
}

export default CouponCard;
