"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import { FaBirthdayCake } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";
import { FaRegArrowAltCircleRight } from "react-icons/fa";

import React from "react";
import { useRouter } from "next/navigation";

function Order() {
  const router = useRouter();

  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Order"} />
      <div className="p-16 mobile:p-4">
        <Container>
          <div className="lg:w-6/12 mobile:w-full sm:w-10/12 md:w-10/12 md-landscape:w-8/12 mx-auto mb-10 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">

            <h5 className="mb-6 text-base font-semibold text-pink-400 md:text-xl dark:text-white flex items-center gap-2">
              <MdOutlineMail className="text-2xl" />{" "}
              <span>Notification Emails</span>
            </h5>
            <ul className="my-4 space-y-3">
              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 whitespace-nowrap inline-flex items-center gap-3">
                    <FaBirthdayCake className="text-[#0e0a38]" />{" "}
                    <span>Store Birthday</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-28 inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push(
                        "/dashboard/Project-manager/notificationemails/storeBirthday"
                      )
                    }
                  >
                    Manage <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 whitespace-nowrap inline-flex items-center gap-3">
                    <FaBirthdayCake className="text-[#0e0a38]" />{" "}
                    <span>User Birthday</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-28 inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push(
                        "/dashboard/Project-manager/notificationemails/userBirthday"
                      )
                    }
                  >
                    Manage <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 whitespace-nowrap inline-flex items-center gap-3">
                    <FaBirthdayCake className="text-[#0e0a38]" />{" "}
                    <span>Send a Message</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-28 inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push(
                        "/dashboard/Project-manager/notificationemails/sendMessagelist"
                      )
                    }
                  >
                    Manage <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:w-6/12 mobile:w-full sm:w-10/12 md:w-10/12 md-landscape:w-8/12 mx-auto mb-10 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-6 text-base font-semibold text-pink-400 md:text-xl dark:text-white flex items-center gap-2">
              <MdOutlineMail className="text-2xl" /> <span>Manage Others</span>
            </h5>
            <ul className="my-4 space-y-3">
              {/* <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 whitespace-nowrap inline-flex items-center gap-3">
                    <FaUserTie className="text-[#0e0a38]" />
                    <span>Managers</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 inline-flex items-center justify-center px-5 gap-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push(
                        "/dashboard/Project-manager/manageOthers/managers"
                      )
                    }
                  >
                    View All Managers <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 whitespace-nowrap inline-flex items-center gap-3">
                    <MdOutlineSell className="text-[#0e0a38]" />
                    <span>Seller</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 inline-flex items-center justify-center px-5 gap-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push(
                        "/dashboard/Project-manager/manageOthers/sellers"
                      )
                    }
                  >
                    View All Seller <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li> */}

              <li>
                <div className="flex mobile:!inline-block items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 whitespace-nowrap inline-flex items-center gap-3">
                    <FaRegCreditCard className="text-[#0e0a38]" />
                    <span>Plastic Card</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-28 inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded mobile:w-full mobile:mt-4"
                    onClick={() =>
                      router.push(
                        "/dashboard/Project-manager/manageOthers/plasticCard"
                      )
                    }
                  >
                    View All Plastic Card <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex mobile:!inline-block items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 whitespace-nowrap inline-flex items-center gap-3">
                    <FaRegCreditCard className="text-[#0e0a38]" />{" "}
                    <span>Paper Cards</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-28 inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded mobile:w-full mobile:mt-4"
                    onClick={() =>
                      router.push(
                        "/dashboard/Project-manager/manageOthers/paperCard"
                      )
                    }
                  >
                    View All Paper Cards <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default Order;
