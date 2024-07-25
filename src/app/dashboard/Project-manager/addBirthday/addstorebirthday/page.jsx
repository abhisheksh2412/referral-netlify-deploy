"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";

import React from "react";

import withAuth from "@/hoc/withAuth";
import { useSelector } from "react-redux";

import Loader from "@/components/globals/Loader";
import AddStoreBirthdayForm from "@/components/common/form/AddStoreBirthdayForm";

function AddStoreBirthday() {
  const { stores, isLoading } = useSelector((state) => state.orders);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <ManagerDashboardHeader />
        <InnerBanner title={"Add Store Birthday"} />

        <div className="p-8 mobile:p-2">
          <Container>
            <div className="p-12 mobile:p-6 tab:p-4 new-shadow  bg-white lg:w-3/5 mobile:w-full tab:w-9/12 sm:w-8/12 	mx-auto rounded-lg">
              <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
                Add Store Birthday
              </h3>
              <AddStoreBirthdayForm />
            </div>
          </Container>
        </div>
        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(AddStoreBirthday);
