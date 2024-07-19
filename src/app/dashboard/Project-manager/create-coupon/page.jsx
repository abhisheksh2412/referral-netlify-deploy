import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import AddCouponForm from "@/components/managerdashboard/addcoupons/addcouponform";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import React from "react";

function AddCoupon() {
  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Add Coupons"} />

      <div className="p-8">
        <Container>
          <AddCouponForm />
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default AddCoupon;
