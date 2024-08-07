"use client";
import React, { useCallback, useState } from "react";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsFillHousesFill } from "react-icons/bs";
import { FaStreetView } from "react-icons/fa6";
import { BiSolidCity } from "react-icons/bi";
import { GiPostOffice } from "react-icons/gi";
import { FaMobileAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import Modal from "@/components/globals/Modal";
import { useSelector } from "react-redux";
import withAuth from "@/hoc/withAuth";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import Loader from "@/components/globals/Loader";
import CustomerEditProfile from "@/components/globals/dashboard/EditProfileForms/CustomerEditProfile";
import Image from "next/image";

function CustomerProfile() {
  const { data: user, isLoading } = useSelector((state) => state.auth);

  const [editModal, setEditModal] = useState(false);
  function handleSetEditModal() {
    setEditModal(!editModal);
  }

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <CustomerHeader />
        <InnerBanner title={"Profile"} />

        <div className="p-2 md:p-12 bg-gray-100">
          {/* <Container> */}
          <div className="relative  rounded-lg w-full md:2/3 xl:w-1/2		mx-auto bg-white">
            <div className="px-8 ">
              <div className="flex justify-center items-center text-center ">
                <div className="">
                  <div className="text-center relative -top-[30px] w-36 h-36 mx-auto bg-gray-100 rounded-full py-5">
                    <Image
                      src={user?.profile_photo_url}
                      width={500}
                      height={500}
                      alt="Picture of the author"
                      className="w-28 h-28 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500 mx-auto"
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
                    <span className="inline-flex items-center rounded-md bg-pink-100 px-4 py-2 text-sm font-medium text-pink-700 ring-1 ring-inset ring-pink-600/20">
                      {user?.role}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-0 top-0 p-7">
              <span className="inline-flex items-center rounded-md bg-green-50 px-3 py-2 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                <RiVerifiedBadgeFill />
                Verified
              </span>
            </div>

            <div className="absolute left-0 top-0 p-7">
              <button
                onClick={handleSetEditModal}
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20"
              >
                <MdOutlineEdit />
                Edit Profile
              </button>
            </div>

            <div className="flex justify-between flex-wrap mt-16 gap-5 bg-gray-50 p-3 px-5 mb-1 rounded">
              <div className="flex gap-3">
                <div className="text-base font-semibold flex items-center gap-2">
                  <BsFillHousesFill className="text-pink-400" />
                  House No :
                </div>
                <div>{user?.address?.house_no}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-base font-semibold flex items-center gap-2">
                  <FaStreetView className="text-pink-400" />
                  Street :
                </div>
                <div>{user?.address?.street}</div>
              </div>
            </div>

            <div className="flex justify-between flex-wrap gap-5 bg-gray-50 p-3 px-5 mb-1 rounded">
              <div className="flex items-center gap-3">
                <div className="text-base font-semibold flex items-center gap-2">
                  {" "}
                  <BiSolidCity className="text-pink-400" /> City :
                </div>
                <div>{user?.address?.city}</div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-base font-semibold flex items-center gap-2">
                  <GiPostOffice className="text-pink-400" />
                  Postal Code :
                </div>
                <div>{user?.address?.postal_code}</div>
              </div>
            </div>

            <div className="flex  justify-between gap-5 flex-wrap bg-gray-50 p-3 px-5 mb-1 rounded">
              <div className="flex items-center gap-3">
                <div className="text-base font-semibold flex items-center gap-2">
                  <FaMobileAlt className="text-pink-400" />
                  Mobile No :
                </div>
                <div>{user?.mobile_number}</div>
              </div>
            </div>
          </div>

          <Modal open={editModal} handleOpen={handleSetEditModal}>
            <div className="model-header w-full p-4 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
              <h3 className="text-xl leading-tight mb-0 font-semibold text-black">
                Edit Profile
              </h3>
            </div>

            <div className="p-4">
              <CustomerEditProfile handleOpen={handleSetEditModal} />
            </div>
          </Modal>
          {/* </Container> */}
        </div>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(CustomerProfile);
