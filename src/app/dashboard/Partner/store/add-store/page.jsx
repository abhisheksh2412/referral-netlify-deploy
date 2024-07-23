"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import AddStoreForm from "@/components/globals/dashboard/store/addStoreForm";
import Loader from "@/components/globals/Loader";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";
function PartnerAddStore() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Partner Add Store"} />
      <div className="py-5">
        <AddStoreForm />
      </div>
      <DashboardFooter />
    </div>
  );
}

export default withAuth(PartnerAddStore);
