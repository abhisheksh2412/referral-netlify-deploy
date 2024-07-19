import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";
import InvoiceList from "./InvoiceList";

export default function Invoices() {
  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Invoices"} />

      <InvoiceList />

      <DashboardFooter />
    </div>
  );
}
