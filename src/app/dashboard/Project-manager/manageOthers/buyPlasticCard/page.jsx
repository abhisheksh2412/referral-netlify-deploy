"use client";

import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import BuyPlasticCardForm from "@/components/managerdashboard/addPlasticard/buyPlasticcardform";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import withAuth from "@/hoc/withAuth";
import React from "react";

function BuyPlasticCard() {
  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Buy Plastic Card"} />
      <div className="p-16">
        <Container>
          <div className="p-12 new-shadow  bg-white w-3/5 mx-auto rounded-lg">
            <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              Add Plastic Card{" "}
            </h3>

            <BuyPlasticCardForm />
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default withAuth(BuyPlasticCard);
