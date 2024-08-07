import React from "react";
import Image from "next/image";

function CustomerPlasticCard({ data }) {
  return (
    <div>
      <div className="bg-blush-red px-4 py-4 rounded-lg shadow overflow-hidden	relative ">
        <div className="flex justify-between gap-5">
          <div className="w-2/3">
            <p className="text-white mb-3">Card</p>
            <h2 className="text-left text-2xl leading-tight mb-6 font-medium text-white">
              {data?.loyalty_card_details?.card_number}
            </h2>
            <div className="flex  gap-12">
              <div>
                <h4 className="text-[#0e0a38] text-md font-medium">
                  Valid From
                </h4>
                <p className="text-white text-sm">
                  {data?.loyalty_card_details?.valid_from}
                </p>
              </div>
              <div>
                <h4 className="text-[#0e0a38] text-md font-medium">Valid To</h4>
                <p className="text-white text-sm font-normal">
                  {data?.loyalty_card_details?.valid_thru}
                </p>
              </div>
            </div>
          </div>
          <div className="pt-6 w-1/3 relative  z-30">
            <Image
              src={data?.qr_code_path}
              width={300}
              height={300}
              alt="Picture of the author"
              className="border-2 border-white p-1 w-28 rounded bg-white"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-5">
          <b className="text-[#0e0a38] font-medium">Card Holder:</b>
          <p className="text-white ">
            {data?.loyalty_card_details?.card_holder_name}
          </p>
        </div>
        <div className="absolute w-[217px] h-[277px] bg-[#ffd8e545] right-[-130px] bottom-0 top-[-8px] rounded-full border-[27px] border-[#ffffff85] rotate-[-164deg]"></div>
      </div>
      <div className="flex justify-between items-center px-2 pt-2 mt-2">
        <h3 className="font-semibold">Rewards Points</h3>
        <h5 className="bg-green-100 text-green-800 text-xs font-medium px-6 py-2 rounded-full dark:bg-green-900 dark:text-green-300 inline-block">
          {data?.loyalty_card_details?.customerPoints}
        </h5>
      </div>
    </div>
  );
}

export default CustomerPlasticCard;
