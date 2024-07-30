import React from "react";
import Image from 'next/image'

function CategoryCard({ data }) {
  return (
    <div className="hover:shadow-md transition-shadow">
      <div className="bg-gray-100  rounded-lg p-5 relative text-center">


        <Image
        src={data?.category_image}
        width={500}
        height={500}
        alt="Picture of the author"
        className="w-24 h-24 mx-auto"
      />

        <h3 className="font-medium mb-2">{data?.name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
