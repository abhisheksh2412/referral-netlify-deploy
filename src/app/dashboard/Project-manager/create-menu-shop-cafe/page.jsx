"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import EasySelect from "@/components/globals/EasySelect";
import Container from "@/components/globals/container";
import CreateMenuCafeForm from "@/components/globals/dashboard/MenuCafe/createMenuCafeForm";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import React from "react";

function CreateMenuShopCafe() {
  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Create Menu Shop Cafe"} />
      <div className="p-8">
        <Container>
          <div className="p-12 new-shadow  bg-white w-3/5	mx-auto rounded-lg">
            <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              Menu Shop Cafe
            </h3>
            <CreateMenuCafeForm />
          </div>
        </Container>

        <DashboardFooter />
      </div>
    </div>
  );
}

export default CreateMenuShopCafe;
