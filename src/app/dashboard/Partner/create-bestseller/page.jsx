"use client";

import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import CreateBestSellerForm from "@/components/globals/dashboard/BestSeller/createBestSellerForm";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";

export default function CreateBestSeller() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Add Best Sellar"} />

      <div className="p-8 mobile:p-4">
        <Container>
          <CreateBestSellerForm />
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}
