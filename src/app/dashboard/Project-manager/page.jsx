"use client";
import TopHeader from "@/components/home/homeHeader/topheader";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import "swiper/swiper-bundle.css";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import ComboList from "@/components/managerdashboard/comboproducts/comboList";
import CouponSlider from "@/components/managerdashboard/coupons/couponSlider";
import BestSellerSlider from "@/components/managerdashboard/bestseller/bestSellerList";
import MenuShopCafeSlider from "@/components/managerdashboard/menushopcafe/MenuShopCafeSlider";
import CategorySlider from "@/components/globals/dashboard/CategorySlider/CategorySlider";
import StoresSlider from "@/components/globals/dashboard/StoreSlider/StoreSlider";
import ProductsSlider from "@/components/globals/dashboard/ProductSlider/ProductsSlider";
import Container from "@/components/globals/container";

export default function ManagerDashboard() {
  return (
    <div className="relative">
      <TopHeader />
      <ManagerDashboardHeader />
      <ProductsSlider />
      <div className="bg-gray-100	p-12 mobile:p-3">
        <Container>
          <div className="flex justify-between">
            <h2 className="text-2xl mobile:text-lg font-semibold">
              Popular stores
            </h2>
          </div>

          <StoresSlider details={true} />
        </Container>
      </div>
      <CategorySlider />
      <ComboList />
      <CouponSlider />
      <BestSellerSlider />
      <MenuShopCafeSlider />
      <DashboardFooter />
    </div>
  );
}
