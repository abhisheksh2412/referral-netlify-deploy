import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import Container from "@/components/globals/container";
import GlobalInput from "@/components/globals/globalInput";
import TopHeader from "@/components/home/homeHeader/topheader";
import { GoPlusCircle } from "react-icons/go";
import React from "react";

function UpdateProductsPoints() {
  return (
    <div>
      <TopHeader />
      <DashboardHeader />

      <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 min-h-48 mobile:min-h-28 flex items-center justify-center">
        <Container>
          <h3 className="text-center text-2xl leading-tight mb-6 font-bold text-black">
            Update Products Points
          </h3>
        </Container>
      </div>

      <div className="bg-gray-100 px-4  py-8 md:py-16 lg:py-16">
        <Container>
          <div className="lg:w-2/4 mobile:w-full md:w-5/6 md-landscape::w-5/6 mx-auto lg:mt-12 mobile:mt-3 ">
            <div class="bg-white  shadow-md rounded-lg mt-5">
              <div className="flex items-center justify-between !inline-block w-full mobile:w-full p-5  bg-white border-b border-gray-200 rounded-t-lg

">
                <h4 className="font-semibold text-base">Update</h4>
              </div>

              <div className="p-8 rounded-b-lg

">
                <div class="  sm:rounded-lg ">
                  <div class="md:px-2 lg:px-2 py-1 mb-3">
                    <div className="mobile:py-1">
                      <label className="text-base font-medium text-black mb-2 inline-block">
                        Product Image
                      </label>

                      <div class="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file"
                          className="flex flex-col items-center justify-center w-full h-42 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
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
                              <span className="font-semibold">Click to upload</span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="md:px-2 lg:px-2 py-1 mb-3">
                    <div className="mobile:py-1">
                      <label className="text-base font-medium text-black mb-2 inline-block">
                        Product Name
                      </label>
                      <GlobalInput
                        name="street"
                        type="text"
                        placeholder="Enter Product Name"
                        inputClassName="outline-none text-sm"
                        parentClassName="p-4 rounded-md border"
                      />
                    </div>
                  </div>

                  <div class="md:px-2 lg:px-2 py-1 mb-3">
                    <div className="mobile:py-1">
                      <label className="text-base font-medium text-black mb-2 inline-block">
                        Product Quantity
                      </label>
                      <GlobalInput
                        name="street"
                        type="text"
                        placeholder="Enter Product Quantity"
                        inputClassName="outline-none text-sm"
                        parentClassName="p-4 rounded-md border"
                      />
                    </div>
                  </div>

                  <div class="md:px-2 lg:px-2 py-1 mb-3">
                    <div className="mobile:py-1">
                      <label className="text-base font-medium text-black mb-2 inline-block">
                        Product Points
                      </label>
                      <GlobalInput
                        name="street"
                        type="text"
                        placeholder="Enter Product Points"
                        inputClassName="outline-none text-sm"
                        parentClassName="p-4 rounded-md border"
                      />
                    </div>
                  </div>

                  <div class="md:px-2 lg:px-2 py-1 mb-3">
                    <div className="mobile:py-1">
                      <label className="text-base font-medium text-black mb-2 inline-block">
                        Barcode Number
                      </label>
                      <GlobalInput
                        name="street"
                        type="text"
                        placeholder="Enter Barcode Number"
                        inputClassName="outline-none text-sm"
                        parentClassName="p-4 rounded-md border"
                      />
                    </div>
                  </div>

                  <div className=" mt-4">
                    <button
                      type="submit"
                      className=" text-white text-sm  rounded-md font-semibold text-white bg-blush-red p-4 w-full flex justify-center items-center gap-2 mt-4"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default UpdateProductsPoints;
