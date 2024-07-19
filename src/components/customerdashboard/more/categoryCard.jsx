import React from "react";
import Image from "next/image";

function MoreCategoryCard({ data }) {
  return (
    <div>
      <div class=" bg-white rounded-lg  relative p-0 rounded-b-lg mb-4 cursor-pointer shadow-md transition-shadow">
        <div class="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
          <Image
            src={data?.category_image}
            width={150}
            height={150}
            alt="Picture of the author"
            className="w-36 h-36 mx-auto rounded-lg bg-white p-1"
          />
        </div>
        <div className="p-4">
          <h3 className="text-center py-1 font-medium text-lg">{data?.name}</h3>
          <p className="text-sm line-clamp-2 h-[40px] text-center">
            {data?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MoreCategoryCard;
