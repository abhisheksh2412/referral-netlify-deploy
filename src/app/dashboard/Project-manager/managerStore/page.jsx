"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import { config } from "@/config/config";
import withAuth from "@/hoc/withAuth";
import { GetStores } from "@/store/slices/seller";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ManagerStore() {
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState(null);
  const [detailsModal, setDetialsModal] = useState(null);
  const { stores } = useSelector((state) => state.seller);

  const handleViewModal = (data) => {
    setDetialsModal(!detailsModal);
    setSelectedData(data);
  };

  const getAllData = useCallback(() => {
    dispatch(GetStores());
  }, [dispatch]);

  // to get all the products, stores, categories
  useEffect(() => {
    getAllData();
  }, [getAllData]);

  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Manager Store List"} />
      <div className="p-16 bg-gray-100">
        <Container>
          <div className="bg-gray-100	py-16">
            <Container>
              <h2 className=" text-center text-3xl font-semibold mb-12">
                Popular stores
              </h2>

              <div className="grid grid-cols-12 gap-8">
                {stores?.data?.map((item, index) => (
                  <div key={index} className="col-span-3">
                    <div
                      onClick={() => handleViewModal(item)}
                      className=" bg-white rounded-lg  relative p-0 rounded-b-lg mb-4 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                        <img
                          class="w-32 h-32 mx-auto object-cover"
                          src={config.IMAGE_URL_PATH + item?.logo}
                          alt="StoreImage"
                        />
                      </div>
                      <h3 className="text-center p-4 font-medium">
                        {item?.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              <Modal
                open={detailsModal}
                handleOpen={handleViewModal}
                size={"sm"}
              >
                <div className="w-full p-4 rounded-t-md bg-gradient-to-r from-blush-red to-pink-200">
                  <h1 className="text-xl font-semibold text-white">
                    Store Details
                  </h1>
                </div>
                <div className="max-h-[80vh] overflow-auto">
                  <div className="relative m-2 rounded-full flex items-center	 w-48 h-48 shadow-lg mx-auto p-2  bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                    <img
                      src={config.IMAGE_URL_PATH + selectedData?.logo}
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
            </Container>
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default withAuth(ManagerStore);
