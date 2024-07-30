import React from "react";
import Image from "next/image";

function Card({ data }) {
  return (
    <div>
      <div className="bg-blush-red px-4 py-4 rounded-[1.5rem] shadow">
        <div className="flex justify-between">
          <div>
            <p className="text-white mb-3">Card</p>
            <h2 className="text-left text-xl leading-tight mb-6 font-medium text-white">
              {data?.card_number}
            </h2>
          </div>

          <div className="pt-6">
           

            <Image
              src="/assets/credit-card.svg"
              width={500}
              height={500}
              alt="Picture of the author"
              class="border-2 border-white p-1 w-16 rounded"
            />
          </div>
        </div>

        <div className="flex  gap-20">
          <div>
            <h4 className="text-[#0e0a38] text-md font-medium">Valid From</h4>
            <p className="text-white">{data?.valid_from}</p>
          </div>
          <div>
            <h4 className="text-[#0e0a38] text-md font-medium">Valid To</h4>
            <p className="text-white">{data?.valid_thru}</p>
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <b className="text-[#0e0a38] font-medium">Card Holder:</b>{" "}
          <p className="text-white ">{data?.card_holder_name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
