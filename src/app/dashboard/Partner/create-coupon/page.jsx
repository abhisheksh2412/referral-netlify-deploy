"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import AddCouponForm from "@/components/managerdashboard/addcoupons/addcouponform";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";

function PartnerCreateCoupon() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Add Coupons"} />

      <div className="p-8 mobile:p-3">
        <Container>
          <AddCouponForm />
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(PartnerCreateCoupon);
