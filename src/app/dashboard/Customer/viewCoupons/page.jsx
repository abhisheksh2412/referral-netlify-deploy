"use client";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import CouponsCard from "@/components/managerdashboard/coupons/couponscard";
import CouponDetails from "@/components/managerdashboard/coupons/couponDetails";
import React, { useState } from "react";
import withAuth from "@/hoc/withAuth";

const CouponDummyData = {
  coupon_image: "/images/sample-coupon.jpg",
  status: "active",
  coupon_value: "20% OFF",
  coupon_code: "SUMMER2024",
  description:
    "Get 20% off on your next purchase with this exclusive summer offer. Valid until 31st July 2024. Terms and conditions apply.",
};

function CustomerViewAllCoupon() {
  const [viewCoupon, setViewCoupon] = useState(null);
  const handleViewcoupon = (value) => setViewCoupon(value);

  return (
    <div>
      <TopHeader />
      <CustomerHeader />
      <InnerBanner title={"View All Coupos"} />

      <div className="py-16 mobile:py-6 mobile:p-4">
        <Container>
          <div className=" mb-20">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <h2 className=" text-center text-2xl mobile:text-lg font-semibold">
                View All Coupons
              </h2>
              <div className="w-full md:w-72">
                <div className="relative h-10 w-full min-w-[200px]">
                  <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="w-5 h-5"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                  />
                  <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Search
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-16 sm:gap-12">
            <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-6">
              <CouponsCard
                data={CouponDummyData}
                handleView={handleViewcoupon}
              />
            </div>

            <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-6">
              <CouponsCard
                data={CouponDummyData}
                handleView={handleViewcoupon}
              />
            </div>

            <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-6">
              <CouponsCard
                data={CouponDummyData}
                handleView={handleViewcoupon}
              />
            </div>

            <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-6">
              <CouponsCard
                data={CouponDummyData}
                handleView={handleViewcoupon}
              />
            </div>
          </div>

          <Modal
            size={"xs"}
            open={viewCoupon !== null}
            handleOpen={() => handleViewcoupon(null)}
          >
            <div>
              <CouponDetails data={CouponDummyData} />
            </div>
          </Modal>
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(CustomerViewAllCoupon);
