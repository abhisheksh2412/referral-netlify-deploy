import { config } from "@/config/config";
import Image from "next/image";

export default function MenuShopCafeDetails({ data }) {
  return (
    <div>
      <div className="bg-gradient-to-r from-blush-red to-pink-300 text-lg font-semibold text-white p-4 text-left rounded-t-md">
        <h1>Menu Shop Cafe Details</h1>
      </div>
      <div className="p-4  h-fit flex items-center justify-center">
      

        <Image
          src={config?.IMAGE_URL_PATH + data?.menu_shop_cafe_img}
          width={500}
          height={500}
          alt="cafe_image"
          className=" w-32 h-32 rounded-md object-cover p-2 shadow-xl"
        />
        
      </div>
      <div className="px-4 pb-4">
        <h1 className="text-lg  font-semibold text-gray-700 text-center">
          {" "}
          {data?.title}
        </h1>
        <div className="flex justify-center gap-8 my-2">
          <h6 className="font-medium text-md text-black">
            <b className="text-blush-red">PLN</b> {data?.price}
          </h6>
          <h6 className="font-medium text-md text-black">
            <b className="text-blush-red">PKT</b> {data?.points}
          </h6>
        </div>
        <p className="text-sm font-normal text-gray-600 text-center">
          {data?.description}
        </p>
      </div>
    </div>
  );
}
