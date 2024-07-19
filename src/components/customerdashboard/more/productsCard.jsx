import React from "react";
import Image from "next/image";
import { BsPatchCheck } from "react-icons/bs";
import { config } from "@/config/config";

function ProductsCard({ data }) {

  // map the product data and work on other
  return (
    <div>
      <div className="shadow bg-white rounded-lg p-0 relative pb-2 rounded-b-lg mb-4 cursor-pointer">
        <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
          <div className="cursor-pointer p-1 rounded">
            <Image
              src={config.IMAGE_URL_PATH + data?.path}
              width={150}
              height={150}
              alt="Picture of the author"
              className="mx-auto"
            />
          </div>
        </div>
        <div className="px-3">
          <h3 className="text-center font-semibold pt-3">{data?.name}</h3>
          <p className="text-sm line-clamp-2 h-[40px] text-center">
            {data?.description}
          </p>
          <div className="flex items-center justify-center gap-4 mt-4 mb-3">
            <h4 className="text-center text-sm text-nowrap p-1 font-medium text-neutral-400 rounded-full bg-pink-100 text-pink-800 px-6 py-0.5">
              {data?.weight} g
            </h4>
            <h5 className="flex text-sm items-center justify-center gap-1 text-center p-1 font-medium text-neutral-400 rounded-full bg-green-100 text-green-800 px-6 py-0.5">
              <BsPatchCheck />
              {data?.points}
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
