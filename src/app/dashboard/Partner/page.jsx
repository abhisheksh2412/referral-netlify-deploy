"use client";
import TopHeader from "@/components/home/homeHeader/topheader";
import PartnerHeader from "@/components/PartnerDashboard/header";
import ComboList from "@/components/managerdashboard/comboproducts/comboList";
import CouponSlider from "@/components/managerdashboard/coupons/couponSlider";
import BestSellerSlider from "@/components/managerdashboard/bestseller/bestSellerList";
import MenuShopCafeSlider from "@/components/managerdashboard/menushopcafe/MenuShopCafeSlider";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import ProductsSlider from "@/components/globals/dashboard/ProductSlider/ProductsSlider";
import CategorySlider from "@/components/globals/dashboard/CategorySlider/CategorySlider";
import StoresSlider from "../../../components/globals/dashboard/StoreSlider/StoreSlider";
import Container from "@/components/globals/container";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

export default function PartnerDashboard() {
  return (
    <div>
      <Toaster />
      <TopHeader />
      <PartnerHeader />
      <ProductsSlider />
      {/* store Slider */}
      <div className="bg-gray-100	py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className="flex justify-between">
            <h2 className="text-2xl mobile:text-lg font-semibold">
              Popular stores
            </h2>
            <Link
              href="/dashboard/Partner/store/add-store"
              className="p-2 px-3 flex items-center gap-2 bg-blush-red text-sm text-white rounded-md "
            >
              <FaPlus /> Add Store
            </Link>
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
