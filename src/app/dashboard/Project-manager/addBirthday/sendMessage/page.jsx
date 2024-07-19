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
import { SEND_MESSAGE } from "@/language/Texts";
import AddSendMessage from "@/components/globals/dashboard/froms/addSendMessage";

const options = [
  { label: "User 1", value: "User 1" },
  { label: "User 2", value: "User 2" },
];
function SendMessage() {
  const [date, setDate] = useState();

  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Send Message"} />

      <div className="p-8">
        <Container>
          <div className="p-12 new-shadow  bg-white w-3/5	mx-auto rounded-lg">
            <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              {SEND_MESSAGE}
            </h3>
            <AddSendMessage />
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default SendMessage;
