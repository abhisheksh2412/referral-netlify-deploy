"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import CreateMenuCafeForm from "@/components/globals/dashboard/MenuCafe/createMenuCafeForm";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";

function CreateShopMenuCafe() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Create Menu Shop Cafe"} />
      <div className="p-8 mobile:p-4">
        <Container>
          <div className="p-12 new-shadow bg-white w-3/5 mobile:w-full sm:w-8/12 md:w-9/12 sm:p-6 mobile:p-3 mx-auto rounded-lg">
            <h3 className="text-left text-2xl mobile:text-lg leading-tight mb-6 font-semibold text-black">
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

export default withAuth(CreateShopMenuCafe);
