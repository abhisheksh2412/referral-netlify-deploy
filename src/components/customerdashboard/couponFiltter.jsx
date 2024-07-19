import clsx from "clsx";
import React from "react";

function CustomerCouponFiltter({ list, active, onChange }) {
  return (
    <div>
      <div className="flex items-center justify-between bg-white p-4 rounded-md mobile:inline-block mobile:w-full mb-8">
        <div>
          <h2 className="text-center text-xl font-semibold mobile:text-center mobile:mb-3">
            Customer Coupon List
          </h2>
        </div>
        <div className="flex gap-2 mobile:gap-0 mobile:inline-block mobile:text-center mobile:grid mobile:grid-cols-2">
          {list?.map((item, index) => (
            <button
              key={index}
              onClick={() => onChange(index)}
              className={clsx(
                "relative mobile:m-1 px-8 mobile:px-2 py-3 text-sm  transition-all font-normal mobile:text-xs text-center text-white rounded-full bg-blush-red	sm:col-span-6",
                active !== index && "!bg-[#0e0a38]"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CustomerCouponFiltter;
