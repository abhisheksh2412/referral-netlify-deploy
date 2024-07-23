"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import CreateBestSellerForm from "@/components/globals/dashboard/BestSeller/createBestSellerForm";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import withAuth from "@/hoc/withAuth";

function CreateBestSeller() {
  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Add Best Sellar"} />

      <div className="p-8">
        <Container>
          <CreateBestSellerForm />
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(CreateBestSeller);
