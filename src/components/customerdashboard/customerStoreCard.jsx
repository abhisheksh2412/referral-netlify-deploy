"use client"
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";


import { config } from "@/config/config";
import moment from "moment";
import { useSelector } from "react-redux";
import Container from "@/components/globals/container";
import Modal from "@/components/globals/Modal";

function CustomerStoreCard({ stores, details = false }) {
    const [selectedData, setSelectedData] = useState(null);
    const [detailsModal, setDetialsModal] = useState(null);
    const { isSuccess } = useSelector((state) => state.seller);

    const handleViewModal = (data) => {
        setDetialsModal(!detailsModal);
        setSelectedData(data);
    };

    return (
        <div className="py-5">
            <Container>
              
                {isSuccess && stores?.length === 0 ? (
                    <h1 className="text-sm text-center font-medium text-gray-500">
                        No Data Found
                    </h1>
                ) : (
                    <Swiper
                        spaceBetween={50}
                        slidesPerView={5}
                        autoplay={{ delay: 1000, disableOnInteraction: false }}
                    >
                        {Array(8).fill(2).map((_, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    onClick={() => handleViewModal(index)}
                                    className=" bg-white rounded-lg  relative p-0 rounded-b-lg mb-4 cursor-pointer shadow-md transition-shadow"
                                >
                                    <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                                        <img
                                            class="w-32 h-32 mx-auto object-cover"
                                            src="/assets/store.png"
                                            alt="StoreImage"
                                        />
                                    </div>
                                    <h3 className="text-center p-4 font-medium">Store Name</h3>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
                <Modal
                    open={detailsModal}
                    handleOpen={handleViewModal}
                    size={"sm"}
                >
                    <div className="w-full p-4 rounded-t-md bg-gradient-to-r from-blush-red to-pink-200">
                        <h1 className="text-xl font-semibold text-white">Store Details</h1>
                    </div>
                    <div className="max-h-[80vh] overflow-auto">
                        <div className="relative m-2 rounded-md flex items-center	 w-48 h-48 shadow-lg mx-auto p-2  bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                            <img
                                src="/assets/store.png"
                                alt="Store Image"
                                className="w-44 h-44 mx-auto  rounded-md"
                            />
                            <span className="absolute right-3 bottom-0 p-1 px-2 text-xs font-medium text-white bg-green-300 rounded-full">
                                active
                            </span>
                        </div>
                        {/* store info */}
                        <div className="flex flex-col gap-2 p-4">
                            <span className="flex flex-col">
                                <h1 className="text-lg font-semibold text-black text-center">
                                    Store Name
                                </h1>
                                <h6 className="text-md font-normal text-gray-700 text-center">
                                    Shop number: 72883783787
                                </h6>
                            </span>
                            <span className="flex flex-col">
                                <h5 className="text-lg font-semibold text-black ">
                                    Description:
                                </h5>
                                <p className="text-md font-normal text-gray-700">
                                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam enim eaque rerum beatae facilis quos totam ad ipsum explicabo magnam distinctio recusandae debitis amet architecto vero, dolore hic doloremque animi! Obcaecati error minus aspernatur, saepe earum voluptas asperiores quasi, quia repudiandae, sed architecto quos reprehenderit?
                                </p>
                            </span>
                        </div>

                        {/* store details */}
                        <div className=" p-4">
                            <h1 className="pb-2 text-lg font-semibold  text-black">
                                Store Details:
                            </h1>

                            <div className="relative shadow-md sm:rounded-lg">
                                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <tbody>
                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <h5>Street</h5>
                                            </th>
                                            <td className="px-6 py-2">
                                                <h5 className="text-md font-normal text-gray-700">
                                                    Lucknow
                                                </h5>
                                            </td>
                                        </tr>

                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <h5>Town</h5>
                                            </th>
                                            <td className="px-6 py-2">
                                                <h5 className="text-md font-normal text-gray-700">
                                                    Lucknow
                                                </h5>
                                            </td>
                                        </tr>

                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <h5>Postal Code</h5>
                                            </th>
                                            <td className="px-6 py-2">
                                                <h5 className="text-md font-normal text-gray-700">
                                                    342423
                                                </h5>
                                            </td>
                                        </tr>

                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <h5>Mobile Number</h5>
                                            </th>
                                            <td className="px-6 py-2">
                                                <h5 className="text-md font-normal text-gray-700">
                                                    3423423424234
                                                </h5>
                                            </td>
                                        </tr>

                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <h5>Create at</h5>
                                            </th>
                                            <td className="px-6 py-2">
                                                <h5 className="text-md font-normal text-gray-700">
                                                    {/* {moment(selectedData?.created_at).format(
                                                        "DD/MM/YYYY"
                                                    )} */}
                                                    24/12/2024
                                                </h5>
                                            </td>
                                        </tr>

                                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            <th
                                                scope="row"
                                                className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                <h5>Update at</h5>
                                            </th>
                                            <td className="px-6 py-2">
                                                <h5 className="text-md font-normal text-gray-700">
                                                    {/* {moment(selectedData?.updated_at).format(
                                                        "DD/MM/YYYY"
                                                    )} */}
                                                    23/12/2024
                                                </h5>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal>
            </Container>
        </div>
    );
}

export default CustomerStoreCard;
