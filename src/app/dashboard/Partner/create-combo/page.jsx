"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import CreateComboForm from "@/components/managerdashboard/forms/createComboForm";
import PartnerHeader from "@/components/PartnerDashboard/header";

export default function PartnerAddCombo() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Add Combo Product"} />

      <div className="p-8">
        <Container>
          <div className="p-12 new-shadow  bg-white w-3/5 mobile:w-full md:w-8/12 mobile:p-4 md:p-6	mx-auto rounded-lg">
            <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
              Add Combo Product
            </h3>
            <CreateComboForm />
          </div>
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}
