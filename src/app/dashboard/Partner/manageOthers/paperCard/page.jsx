"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import AddPaperCardForm from "@/components/managerdashboard/addPlasticard/addPaperCard";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";
import React from "react";

function PaperCard() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Paper Card Template"} />
      <div className="p-16 mobile:p-2">
        <Container>
          <div className="p-12 mobile:p-6 tab:p-4 new-shadow  bg-white lg:w-3/5 mobile:w-full tab:w-9/12 sm:w-8/12  mx-auto rounded-lg">
            <h3 class="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              Add Paper Card{" "}
            </h3>
            <AddPaperCardForm />
          </div>
        </Container>
      </div>
      <DashboardFooter />
    </div>
  );
}

export default withAuth(PaperCard);
