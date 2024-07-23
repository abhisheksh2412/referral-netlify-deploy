"use client";

import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import BuyPaperCardForm from "@/components/managerdashboard/addPlasticard/buyPaperCard";
import BuyPlasticCardForm from "@/components/managerdashboard/addPlasticard/buyPlasticcardform";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";
import { useRouter } from "next/navigation";
import React from "react";

function BuyPaperCard() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Buy paper Card"} />
      <div className="p-4  md:p-2 lg:p-16">
        <Container>
          <div className="p-3 md:p-6 lg:p-12 new-shadow  bg-white md:w-5/5 lg:w-3/5 sm:w-5/5 tab:w-5/5 md-landscape:w-5/5  mx-auto rounded-lg">
            <h3 class="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              Add Plastic Card{" "}
            </h3>

            <BuyPaperCardForm />
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default withAuth(BuyPaperCard);
