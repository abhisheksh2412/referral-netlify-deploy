import { config } from "@/config/config";
import { CheckCheck } from "lucide-react";
import Image from 'next/image'

export default function ProductDetails({ data }) {
  return (
    <>
      <div className="bg-gradient-to-r from-blush-red to-pink-300 text-lg font-semibold text-white p-2 text-left rounded-t-md">
        <h1>Product Details</h1>
      </div>
      {/* details */}
      <div className="flex flex-col p-5 gap-2 max-h-[90vh] overflow-auto">
        <div className="flex flex-col-reverse items-center justify-between">
          <div className="w-full flex flex-col py-3 gap-3 justify-center items-center">
            <h1 className="font-semibold text-gray-800 text-xl">
              {data?.name}
            </h1>
            <div className="text-sm font-medium text-gray-800">
              Quantity :{" "}
              <span className="text-blush-red font-semibold">
                {data?.quantity}
              </span>{" "}
              | Points :
              <span className="text-blush-red font-semibold">
                {data?.weight} G
              </span>
            </div>
          </div>
          <Image
            src={config.IMAGE_URL_PATH + data?.path}  
            width={250}
            height={500}
            alt="Picture of the author"
             className="!w-36 !h-36 rounded-full shadow-lg p-2"
          />
        </div>
        <div className="flex flex-col">
          <p className="text-sm text-center text-gray-800 py-3">
            {data?.description}
          </p>

          <button className="p-1.5 w-full flex border-none outline-none justify-center gap-2 font-semibold bg-blush-red text-white rounded-md my-3">
            <CheckCheck />
            {data?.points}
          </button>
        </div>
      </div>
    </>
  );
}
