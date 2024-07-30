import { config } from "@/config/config";
import { CheckCheck } from "lucide-react";
import Image from "next/image";

export default function ComboDetails({ data }) {
  return (
    <div>
      <div className="p-2 text-base font-semibold text-white bg-gradient-to-r from-blush-red to-pink-200 rounded-t-md">
        <h1>Combo Details</h1>
      </div>
      {/* product image */}
      <div className="p-3 grid grid-cols-2 gap-2">
        {data?.productData?.slice(0, 4)?.map((item, index) => (
          <div key={index} className="w-full p-1 rounded-md border shadow-md">

            <Image
              src={config.IMAGE_URL_PATH + item?.path}
              width={500}
              height={500}
              alt="product_image"
              className="rounded-md h-28 w-full object-contain"
            />

          </div>
        ))}
      </div>
      {/* Product details */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <h1 className="text-lg text-gray-800 font-semibold">{data?.title}</h1>
          <span className="py-1 text-sm text-blush-red px-2 rounded-md bg-[rgba(244,115,158,0.1)] border border-blush-red">
            {data?.points} Points
          </span>
        </div>
        <p className="py-3 text-sm text-gray-800">{data?.description}</p>

        <button className="bg-blush-red flex items-center justify-center gap-2 text-white p-1 w-full font-medium hover:shadow-md transition-shadow rounded-md">
          <CheckCheck /> {data?.points}
        </button>
        <h6 className="text-gray-800 text-xs flex items-center justify-center gap-2">
          Available points :
          <span className="flex items-center gap-2 text-blush-red">
            {data?.points} <CheckCheck />
          </span>
        </h6>
      </div>
    </div>
  );
}
