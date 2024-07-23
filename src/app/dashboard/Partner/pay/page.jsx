"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import PaymentCard from "@/components/globals/dashboard/PaymentCard";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";

function Pay() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Pay"} />

      <div className="w-full py-8 mobile:py-0 flex items-center justify-center">
        <PaymentCard />
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(Pay);
