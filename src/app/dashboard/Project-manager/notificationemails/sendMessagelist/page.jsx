"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import { IoIosSend } from "react-icons/io";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import SendMessageCard from "@/components/managerdashboard/sendMessageNotification/sendmessagecard";
import PartnerHeader from "@/components/PartnerDashboard/header";
import { useDispatch, useSelector } from "react-redux";
import { GetSendMessageList } from "@/store/slices/orders";
import Modal from "@/components/globals/Modal";
import AddSendMessage from "@/components/globals/dashboard/froms/addSendMessage";
import Loader from "@/components/globals/Loader";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import withAuth from "@/hoc/withAuth";

function SendMessageList() {
  const { sendMessageUserList, isLoading } = useSelector(
    (state) => state.orders
  );
  const [editSendModal, setEditSendModal] = useState(null);
  const handleEditSendModal = (value) => setEditSendModal(value);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const getSendMessage = useCallback(() => {
    dispatch(GetSendMessageList());
  }, [dispatch]);

  useEffect(() => {
    getSendMessage();
  }, [getSendMessage]);
  const SearchFilterData = (search, data) => {
    let newdata = data;
    if (search?.length > 0) {
      const regex = new RegExp(search, "i");
      newdata = data?.filter((item) => regex.test(item.user.name));
    }
    return newdata;
  };

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <ManagerDashboardHeader />
        <InnerBanner title={"Send Message"} />
        <div className="py-16 mobile:py-6 mobile:p-4 bg-gray-100 ">
          <Container>
            <div className="bg-white p-5 rounded-t-lg border-b-[1.5px] border-grey-500">
              <div className="flex items-center justify-between bg-white p-4 rounded-md mobile:inline-block mobile:w-full mb-8 mobile:mb-0 sm:mb-2">
                <div className="w-2/4 mobile:w-full">
                  <form className="max-w-md">
                    <label
                      for="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full p-3 outline-0 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="Search Mockups, Logos..."
                        required
                      />
                    </div>
                  </form>
                </div>

                <div className="w-2/4 mobile:w-full">
                  <div className="flex justify-end mobile:justify-center mobile:mt-3">
                    <Link
                      href="/dashboard/Project-manager/addBirthday/sendMessage"
                      className=" bg-blush-red flex items-center justify-center gap-2 py-3 rounded-md text-white px-4"
                    >
                      <IoIosSend className="w-6 h-6" />
                      Add Send Message
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-b-lg ">
              {sendMessageUserList?.data?.length === 0 ||
              sendMessageUserList?.length === 0 ? (
                <h6 className="text-center text-gray-600 p-5 text-sm">
                  No data Found
                </h6>
              ) : (
                <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4 ">
                  {SearchFilterData(search, sendMessageUserList)?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="lg:col-span-4 sm:col-span-6 md-landscape:col-span-4"
                      >
                        <SendMessageCard
                          data={item}
                          handleEdit={handleEditSendModal}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
              <Modal
                handleOpen={() => handleEditSendModal(null)}
                open={editSendModal !== null}
              >
                <div className="bg-blush-red p-3 text-center text-white rounded-t-md">
                  Header
                </div>
                <div className="p-5 max-h-[88vh] overflow-y-auto remove-scroll-bar">
                  <AddSendMessage
                    editData={editSendModal}
                    handleClose={handleEditSendModal}
                  />
                </div>
              </Modal>
            </div>
          </Container>
        </div>
        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(SendMessageList);
