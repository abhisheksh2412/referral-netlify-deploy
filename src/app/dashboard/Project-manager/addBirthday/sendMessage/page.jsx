"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import React from "react";
import { SEND_MESSAGE } from "@/language/Texts";
import AddSendMessage from "@/components/globals/dashboard/froms/addSendMessage";
import withAuth from "@/hoc/withAuth";

function SendMessage() {
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

export default withAuth(SendMessage);
