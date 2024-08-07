"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import AddPlasticCardForm from "@/components/managerdashboard/addPlasticard/addPlasticardform";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";
import React from "react";

function PlasticCard() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Plastic Card Template"} />
      <div className="p-16 mobile:p-2">
        <Container>
          <div className="p-12 mobile:p-6 tab:p-4 new-shadow  bg-white lg:w-3/5 mobile:w-full tab:w-9/12 sm:w-8/12  mx-auto rounded-lg">
            <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              Add Plastic Card{" "}
            </h3>
            <AddPlasticCardForm />
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default withAuth(PlasticCard);
