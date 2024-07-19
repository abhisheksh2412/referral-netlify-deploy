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
import AddUserBirthdayForm from "@/components/common/form/addUserBirthdayForm";

const options = [
  { label: "Store 1", value: "Store 1" },
  { label: "Store 2", value: "Store 2" },
];
function UserAddBirthday() {
  const [date, setDate] = useState();
  const [addCoupon, setAddCoupon] = useState(false);
  const handleCouponModal = () => setAddCoupon(!addCoupon);

  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Add User Birthday"} />

      <div className="p-8 mobile:p-2">
        <Container>
          <div className="p-12 mobile:p-6 tab:p-4 new-shadow  bg-white lg:w-6/12 mobile:w-full md:w-8/12 md-landscape:w-8/12  mx-auto rounded-lg">
            <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              Add User Birthday
            </h3>
            <AddUserBirthdayForm />
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default UserAddBirthday;
