"use client";
import Container from "@/components/globals/container";
import { GetStores } from "@/store/slices/seller";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import Modal from "../../Modal";
import { config } from "@/config/config";
import moment from "moment";
import Image from "next/image";

export default function StoresSlider({ details = true }) {
  const [selectedData, setSelectedData] = useState(null);
  const [detailsModal, setDetialsModal] = useState(null);
  const { isSuccess } = useSelector((state) => state.seller);

  const handleViewModal = (data) => {
    setDetialsModal(!detailsModal);
    setSelectedData(data);
  };

  const dispatch = useDispatch();
  const { stores, isLoading } = useSelector((state) => state.seller);

  const getAllStores = useCallback(() => {
    dispatch(GetStores());
  }, [dispatch]);

  useEffect(() => {
    getAllStores();
  }, [getAllStores]);

  return (
    <Loader isLoading={isLoading}>
      <div className="bg-gray-100 mt-12 mobile:mt-3">
        <Container>
          <div className="p-0 rounded-lg  ">
            {isSuccess && stores?.data?.length === 0 ? (
              <h1 className="text-sm text-center font-medium text-gray-800">
                No Data Found
              </h1>
            ) : (
              <Swiper
                spaceBetween={50}
                slidesPerView={5}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                breakpoints={{
                  // Mobile devices (320px and up)
                  320: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                  },
                  // iPads/Tablets (768px and up)
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  // Desktops (1024px and up)
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 50,
                  },
                  // Desktops (1200px and up)
                  1200: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                }}
              >
                {stores?.data?.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div
                      onClick={() => handleViewModal(item)}
                      className=" bg-white rounded-lg  relative p-0 rounded-b-lg mb-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                        <Image
                          src={config.IMAGE_URL_PATH + item?.logo}
                          width={300}
                          height={300}
                          alt="Picture of the author"
                          className="w-32 h-32 mx-auto object-cover"
                        />
                      </div>
                      <h3 className="text-center p-4 font-medium">
                        {item?.name}
                      </h3>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
            <Modal
              open={details && detailsModal}
              handleOpen={handleViewModal}
              size={"sm"}
            >
              <div className="w-full p-4 rounded-t-md bg-gradient-to-r from-blush-red to-pink-200">
                <h1 className="text-xl font-semibold text-white">
                  Store Details
                </h1>
              </div>
              <div className="max-h-[80vh] overflow-auto">
                <div className="relative m-2 rounded-lg flex items-center	 w-40 h-40 shadow-lg mx-auto p-2  bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                  <Image
                    src={config.IMAGE_URL_PATH + selectedData?.logo}
                    width={500}
                    height={500}
                    alt="Store Image"
                    className="w-36 h-36 mx-auto  rounded-md"
                  />

                  <span className="absolute right-3 bottom-0 p-1 px-2 text-xs font-medium text-white bg-green-300 rounded-full">
                    {selectedData?.status}
                  </span>
                </div>
                {/* store info */}
                <div className="flex flex-col gap-2 p-4">
                  <span className="flex flex-col">
                    <h1 className="text-lg font-semibold text-black text-center">
                      {selectedData?.name}
                    </h1>
                    <h6 className="text-md font-normal text-gray-700 text-center">
                      Shop number: {selectedData?.number}
                    </h6>
                  </span>
                  <span className="flex flex-col">
                    <h5 className="text-lg font-semibold text-black ">
                      Description:
                    </h5>
                    <p className="text-md font-normal text-gray-700">
                      {selectedData?.description}
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
                              {selectedData?.street}
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
                              {selectedData?.town}
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
                              {selectedData?.postal_code}
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
                              {selectedData?.mobile_number}
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
                              {moment(selectedData?.created_at).format(
                                "DD/MM/YYYY"
                              )}
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
                              {moment(selectedData?.updated_at).format(
                                "DD/MM/YYYY"
                              )}
                            </h5>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        </Container>
      </div>
    </Loader>
  );
}
