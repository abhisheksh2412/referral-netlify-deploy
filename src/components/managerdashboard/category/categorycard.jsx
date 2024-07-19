import React from "react";

function CategoryCard({ data }) {
  return (
    <div className="hover:shadow-md transition-shadow">
      <div className="bg-gray-100  rounded-lg p-5 relative text-center">
        <img className="w-24 h-24 mx-auto" src={data?.category_image} alt="" />
        <h3 className="font-medium mb-2">{data?.name}</h3>
      </div>
    </div>
  );
}

export default CategoryCard;
