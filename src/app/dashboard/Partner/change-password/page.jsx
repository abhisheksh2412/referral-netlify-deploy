"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import ChangePassword from "@/components/globals/dashboard/ChangePassword";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";

function PartnerChangePassword() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Change Password"} />
      <ChangePassword />
      <DashboardFooter />
    </div>
  );
}

export default withAuth(PartnerChangePassword);
