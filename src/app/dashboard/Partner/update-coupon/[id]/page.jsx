"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import UpdateCouponForm from "@/components/managerdashboard/addcoupons/UpdateCoupon";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import withAuth from "@/hoc/withAuth";
import React from "react";

function UpdateCoupon() {
  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Update Coupons"} />

      <div className="p-8">
        <Container>
          <UpdateCouponForm />
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(UpdateCoupon);
