"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import EasySelect from "@/components/globals/EasySelect";
import Container from "@/components/globals/container";
import DateTimePicker from "@/components/globals/dateTimePicker";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import { FaPlusCircle } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import Image from "next/image";
import React, { useState } from "react";
import Modal from "@/components/globals/Modal";
import withAuth from "@/hoc/withAuth";

const options = [
  { label: "Store 1", value: "Store 1" },
  { label: "Store 2", value: "Store 2" },
];
function AddStoreBirthday() {
  const [date, setDate] = useState();
  const [addCoupon, setAddCoupon] = useState(false);
  const handleCouponModal = () => setAddCoupon(!addCoupon);

  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Add Store Birthday"} />

      <div className="p-8 mobile:p-2">
        <Container>
          <div className="p-12 mobile:p-6 tab:p-4 new-shadow  bg-white lg:w-3/5 mobile:w-full tab:w-9/12 sm:w-8/12 	mx-auto rounded-lg">
            <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              Add Store Birthday
            </h3>
            <form>
              <div className="bg-gray-100 p-4 rounded-lg">
                <div className=" mb-3 w-full">
                  <p className="text-base font-semibold mb-2">Select Store</p>
                  <EasySelect options={options} />
                </div>

                <div className="flex items-center gap-3 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 p-2 rounded-lg w-64">
                  <Image
                    src="/assets/pic7.jpg"
                    width={60}
                    height={60}
                    alt="Picture of the author"
                    className="rounded-full"
                  />
                  <p class="text-base font-semibold">Name Here</p>
                </div>
              </div>

              <div className="mt-5 w-full">
                <p className="text-base font-semibold mb-2">
                  Please Write Message
                </p>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Please Write Message..."
                ></textarea>
              </div>

              <div className="mt-6 w-full">
                <p className="text-base font-semibold mb-2">
                  Upload Birthday Image
                </p>
                <label
                  for="dropzone-file"
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
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>

              <div className="mt-6 w-full">
                <p className="text-base font-semibold mb-2">
                  Enter Date Of Birth
                </p>
                <DateTimePicker date={date} setDate={setDate} />
              </div>

              <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 mt-6 rounded-lg">
                <div className="flex justify-between p-4 rounded-t-lg border-b-[1.5px] border-grey-500 bg-gray-100">
                  <h3 className="text-base font-semibold">Coupon List</h3>
                  <h4 className="text-base font-bold">00</h4>
                </div>
                <div className="flex items-center justify-between p-4 ">
                  <h3 className="text-base font-semibold">Add Coupon</h3>
                  <button
                    onClick={handleCouponModal}
                    type="button"
                    class="flex items-center gap-2 text-white bg-blush-red font-medium rounded-lg text-sm px-5 py-3"
                  >
                    <FaPlusCircle />
                    Add
                  </button>
                </div>
              </div>

              <div
                className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 mt-4"
                role="alert"
              >
                <span className="font-medium">
                  Website Message, Include Unsubscribe
                </span>
              </div>

              {/* Add coupon form */}
              <Modal
                open={addCoupon}
                handleOpen={handleCouponModal}
                size={"sm"}
              >
                <div>
                  <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 rounded-t-lg flex items-center justify-between p-4">
                    <h4 className="text-base font-semibold text-black">
                      Add Coupon
                    </h4>
                    <h5 className="cursor-pointer" onClick={handleCouponModal}>
                      <IoCloseCircleOutline className="w-8 h-8" />
                    </h5>
                  </div>
                  <div className="p-4">
                    <form>
                      <div className="mt-0 w-full">
                        <p className="text-base font-semibold mb-2 text-black">
                          Upload Attachment
                        </p>
                        <label
                          for="dropzone-file"
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
                              <span class="font-semibold">Click to upload</span>{" "}
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

                      <div className="mt-6 w-full">
                        <p className="text-base font-semibold mb-2 text-black">
                          Coupon Name
                        </p>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border  text-gray-900 text-sm rounded  block w-full p-2.5"
                          placeholder="Enter Coupon Name"
                          required
                        />
                      </div>

                      <div className="mt-6 w-full">
                        <p className="text-base font-semibold mb-2 text-black">
                          Points/Percentages
                        </p>
                        <input
                          type="text"
                          id="first_name"
                          class="bg-gray-50 border  text-gray-900 text-sm rounded  block w-full p-2.5"
                          placeholder="Enter Points/Percentages"
                          required
                        />
                      </div>

                      <div className="mt-6 w-full">
                        <p className="text-base font-semibold mb-2 text-black">
                          Validity Period of the Coupon
                        </p>
                        <input
                          type="date"
                          id="first_name"
                          class="bg-gray-50 border  text-gray-900 text-sm rounded  block w-full p-2.5"
                          placeholder="02-05-2024"
                          required
                        />
                      </div>

                      <div className="mt-8 w-full">
                        <button
                          type="button"
                          class="text-white w-full bg-blush-red font-medium rounded-lg text-sm px-5 py-4 mb-2"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </Modal>

              <div className="mt-8 w-full">
                <button
                  type="button"
                  class="text-white w-full bg-blush-red font-medium rounded-lg text-md px-5 py-4 mb-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default withAuth(AddStoreBirthday);
