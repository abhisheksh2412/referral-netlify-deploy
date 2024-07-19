"use client";
import EasySelect from "@/components/globals/EasySelect";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const options = [
  { label: "Store 1", value: "Store 1" },
  { label: "Store 2", value: "Store 2" },
];

function AddPlasticCardForm() {
  const router = useRouter();
  const [cardFrontImage, setCardFrontImage] = useState(null);
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    setCardFrontImage(file);
  };
  return (
    <div>
      <form>
        <div className="mt-6 w-full">
          <p className="text-base font-semibold mb-2">Card Front View</p>
          <label
            for="card_front_view"
            className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                PNG, JPEG, or JPG (204.96 X 323.52 PX)
              </p>
            </div>
            <input id="card_front_view" type="file" className="hidden" />
          </label>
        </div>

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Select Store</p>
          <EasySelect options={options} />
        </div>

        <div className="mt-5 w-full">
          <p className="text-base font-semibold mb-2">Card Front View</p>
          <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 px-4 py-8 rounded-lg lg:w-2/3 mobile:w-full md:w-5/6	mt-4">
            <div className="flex items-center gap-6">
              <div className="bg-white p-1 rounded-lg w-3/12">
                <Image
                  src="/assets/qrcode.png"
                  width={100}
                  height={100}
                  alt="Picture of the author"
                  className="rounded-lg mx-auto"
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

        <div class="mt-8 w-full">
          {/* Same Button For Paper and Plastic Card */}

          <button
            type="button"
            class="text-white w-full bg-blush-red font-medium rounded-lg text-md px-5 py-4 mb-2"
            onClick={() =>
              router.push("/dashboard/Partner/manageOthers/buyPlasticCard")
            }
          >
            Save & Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPlasticCardForm;
