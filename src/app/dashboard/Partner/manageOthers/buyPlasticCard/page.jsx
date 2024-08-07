"use client";

import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import BuyPlasticCardForm from "@/components/managerdashboard/addPlasticard/buyPlasticcardform";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";
import React from "react";

function BuyPlasticCard() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Buy Plastic Card"} />
      <div className="p-4  md:p-2 lg:p-16">
        <Container>
          <div className="p-3 md:p-6 lg:p-12 new-shadow  bg-white  lg:w-3/5 md:w-5/5   mx-auto rounded-lg">
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
