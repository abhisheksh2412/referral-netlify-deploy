"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import EditProfile from "@/components/globals/dashboard/EditProfileForms/SellerEditProfile";
import Container from "@/components/globals/container";
import Modal from "@/components/globals/Modal";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import { useState } from "react";
import { BiSolidCity } from "react-icons/bi";
import { BsFillHousesFill } from "react-icons/bs";
import { FaMobileAlt, FaStreetView } from "react-icons/fa";
import { GiPostOffice } from "react-icons/gi";
import { MdOutlineEdit } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import ManagerEditProfile from "@/components/globals/dashboard/EditProfileForms/ManagerEditProfile";

export default function Profile() {
  const { data: user, isLoading } = useSelector((state) => state.auth);

  const [editModal, setEditModal] = useState(false);
  function handleSetEditModal() {
    setEditModal(!editModal);
  }

  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Profile"} />
      <div className="p-12 mobile:pl-3 mobile:pr-3  bg-gray-100">
        <Container>
          <div className="relative  rounded-lg mobile:full lg:w-3/6 md:w-full md-landscape:w-5/6 sm:w-5/6	mx-auto bg-white">
            <div className="px-8 ">
              <div className="flex justify-center items-center text-center ">
                <div className="">
                  <div className="text-center relative -top-[30px] w-36 h-36 mx-auto bg-gray-100 rounded-full py-5">
                    <img
                      class="w-28 h-28 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-auto table"
                      src={user?.profile_photo_url}
                      alt="sellar avatar"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1 text-center ">
                      {" "}
                      {user?.name}
                    </h3>
                    <p className="flex items-center gap-2 mb-2 text-center ">
                      <strong>Email:</strong>
                      <span>{user?.email}</span>
                    </p>
                    <span class="inline-flex items-center rounded-md bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700 ring-1 ring-inset ring-pink-600/20">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute left-0 top-0 p-7 mobile:p-0 mobile:pt-2">
              <span class="inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                <RiVerifiedBadgeFill />
                Verified
              </span>
            </div>

            <div className="absolute right-0 top-0 p-7 mobile:p-0 mobile:pt-2">
              <button
                onClick={handleSetEditModal}
                type="button"
                class="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
              >
                <MdOutlineEdit />
                Edit Profile
              </button>
            </div>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
              <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <tbody>
                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="text-base font-semibold flex items-center gap-2">
                        <BsFillHousesFill className="text-pink-400" />
                        House No :
                      </div>
                    </th>
                    <td class="px-6 py-4">{user?.address?.house_no}</td>
                  </tr>

                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="text-base font-semibold flex items-center gap-2">
                        <FaStreetView className="text-pink-400" />
                        Street :
                      </div>
                    </th>
                    <td class="px-6 py-4">{user?.address?.street}</td>
                  </tr>

                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="text-base font-semibold flex items-center gap-2">
                        {" "}
                        <BiSolidCity className="text-pink-400" /> City :
                      </div>
                    </th>
                    <td class="px-6 py-4">{user?.address?.city}</td>
                  </tr>

                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="text-base font-semibold flex items-center gap-2">
                        <GiPostOffice className="text-pink-400" />
                        Postal Code :
                      </div>
                    </th>
                    <td class="px-6 py-4">{user?.address?.postal_code}</td>
                  </tr>

                  <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <div className="text-base font-semibold flex flex-nowrap text-nowrap items-center gap-2">
                        <FaMobileAlt className="text-pink-400" />
                        Mobile No :
                      </div>
                    </th>
                    <td class="px-6 py-4">{user?.mobile_number}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <Modal open={editModal} handleOpen={handleSetEditModal}>
            <div className="model-header w-full p-4 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
              <h3 className="text-xl leading-tight mb-0 font-semibold text-black">
                Edit Profile
              </h3>
            </div>

            <div className="p-4">
              <ManagerEditProfile handleOpen={handleSetEditModal} />
            </div>
          </Modal>
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}
