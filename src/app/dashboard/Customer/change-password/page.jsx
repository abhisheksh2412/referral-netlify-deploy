"use client";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import ChangePassword from "@/components/globals/dashboard/ChangePassword";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";

function CustomerChangePassword() {
  return (
    <div>
      <TopHeader />
      <CustomerHeader />
      <InnerBanner title={"Change Password"} />
      <ChangePassword />
      <DashboardFooter />
    </div>
  );
}

export default withAuth(CustomerChangePassword);
