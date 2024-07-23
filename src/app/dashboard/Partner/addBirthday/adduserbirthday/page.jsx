"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import React, { useState } from "react";
import AddUserBirthdayForm from "@/components/common/form/addUserBirthdayForm";
import withAuth from "@/hoc/withAuth";

function UserAddBirthday() {
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

export default withAuth(UserAddBirthday);
