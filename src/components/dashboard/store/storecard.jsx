import React from "react";
import { FiMapPin } from "react-icons/fi";
import { HiMiniDevicePhoneMobile } from "react-icons/hi2";

function StoreCard({ data }) {
  return (
    <div>
      <div className="p-5  pt-0 text-gray-700 bg-white new-shadow bg-clip-border rounded-xl">
        <div className="relative mx-4  overflow-hidden text-gray-700 bg-white  bg-clip-border w-2/4 mx-auto	-top-[35px]">
          <img
            src={data?.stores?.logo}
            alt="store"
            className="h-32 w-32 rounded-full table mx-auto shadow bg-slate-100  shadow p-1"
          />
        </div>
        <div className="p-0 text-center mb-8">
          <h4 className="block mb-2 text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {data?.stores?.name}
          </h4>
          <p className="block text-sm antialiased font-normal ">
            {data?.stores?.description}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <div className="text-center w-2/4	">
            <div className="bg-blush-red w-14	h-14 rounded-full mx-auto flex items-center justify-center mb-2">
              {" "}
              <FiMapPin className="mx-auto text-white text-xl" />
            </div>
            <h3 className="block mb-2  text-lg  font-semibold text-black">
              Address
            </h3>
            <p className="text-sm">
              {data?.stores?.street} {data?.stores?.town}{" "}
              {data?.stores?.postal_code}
            </p>
          </div>
          <div className="text-center w-2/4	">
            <div className="bg-blush-red w-14	h-14 rounded-full mx-auto flex items-center justify-center mb-2">
              <HiMiniDevicePhoneMobile className="mx-auto text-white text-xl" />
            </div>
            <h3 className="block mb-2  text-lg  font-semibold text-black">
              Contact
            </h3>
            <p className="text-sm">{data?.stores?.mobile_number}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
