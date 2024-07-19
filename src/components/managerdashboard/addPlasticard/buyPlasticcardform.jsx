"use client";
import EasySelect from "@/components/globals/EasySelect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdHome } from "react-icons/io";

import React from "react";
import { Radio } from "@material-tailwind/react";

const NumberOfCards = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "30", value: "30" },
  { label: "40", value: "40" },
  { label: "50", value: "50" },
];

function BuyPlasticCardForm() {
  const router = useRouter();
  return (
    <div>
      <form>
        <div className="mt-5 w-full flex gap-3">
          <div className="w-2/4">
            <p className="text-base font-semibold mb-2">Card Front View</p>
            <Image
              src="/assets/card-front-view.png"
              width={350}
              height={110}
              alt="Picture of the author"
              className="rounded-lg h-44"
            />
          </div>
          <div className="w-2/4">
            <p className="text-base font-semibold mb-2">Card Back View</p>
            <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 px-4 py-8 rounded-lg w-full">
              <div className="flex items-center gap-6">
                <div className="bg-white p-1 rounded-lg w-3/12">
                  <Image
                    src="/assets/qrcode.png"
                    width={90}
                    height={50}
                    alt="Picture of the author"
                    className="rounded-lg 	"
                  />
                </div>
                <div className="w-9/12	">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-1">
                      1201 1205 12021 1200
                    </h3>
                    <h4 className="text-sm">Store Name: Akash</h4>
                  </div>
                  <p className="text-xs">
                    <b>Description: </b>
                    Lorem Ipsum has been the industry&apos;s standard
                  </p>
                </div>
              </div>
            </div>
          </div>         
        </div>

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Select Number of cards</p>
          <EasySelect options={NumberOfCards} />
        </div>

        <div className="mt-5 w-full bg-gray-100 p-4 rounded-lg">
          <p className="text-base font-semibold mb-2">Shipping Address</p>
          <div className="flex items-center">
            <div className="w-1/12 text-center">
              <IoMdHome className="w-7 h-7 text-pink-400" />
            </div>
            <div className="w-11/12">
              <p>
                Akshya Nagar 1st Block 1st Cross, Rammurthy nagar,
                Bangalore-560016
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Shipping Method</p>
          <div className="flex gap-10">
            <Radio name="type" label="In Post" />
            <Radio name="type" label="DPD" defaultChecked />
          </div>
          <div className="flex justify-between items-center gap-5 mt-5 w-full bg-gray-100 p-4 rounded-lg">
            <h3 className="text-lg font-semibold">Shipping Charge</h3>
            <h3 className="text-base font-semibold">Price</h3>
          </div>
        </div>
        <div class="mt-8 w-full flex justify-between items-center gap-5 mt-5 w-full  rounded-lg">
          <h3 className="text-base font-semibold">
            Total Price : <strong>255</strong>
          </h3>
          <button
            type="button"
            class="text-white  bg-blush-red font-medium rounded-lg text-md px-5 py-3"
          >
            Buy
          </button>
        </div>
      </form>
    </div>
  );
}

export default BuyPlasticCardForm;
