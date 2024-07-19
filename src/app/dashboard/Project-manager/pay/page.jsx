import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import PaymentCard from "@/components/globals/dashboard/PaymentCard";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";

export default function Pay() {
  return (
    <div>
      <TopHeader />
      <ManagerDashboardHeader />
      <InnerBanner title={"Pay"} />

      <div className="w-full py-8 flex items-center justify-center">
        <PaymentCard />
      </div>

      <DashboardFooter />
    </div>
  );
}
