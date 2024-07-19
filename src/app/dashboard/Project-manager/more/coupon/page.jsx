"use client";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import MoreCouponCard from "@/components/customerdashboard/more/couponCard";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import Image from "next/image";
import InnerBanner from "@/components/innerpagebanner/page";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "@/components/globals/Loader";
import { GetManagerCoupons } from "@/store/slices/coupon";

function MoreCoupon() {
  // const filtertabs = [
  //   { name: "New", id: null },
  //   { name: "Active Coupon", id: 1 },
  //   { name: "Inactive Coupon", id: 2 },
  // ];

  const user = useSelector((state) => state.auth.data);
  const { managerCoupons, isLoading, isSuccess } = useSelector(
    (state) => state.coupon
  );
  // const [activeTab, setActiveTab] = useState(null);
  const [viewExtraPointsModal, setViewExtraPointsModal] = useState(null);
  const handleCustomerCouponDetailsModel = (value) =>
    setViewExtraPointsModal(value);

  // const { couponsByStore, isLoading } = useSelector((state) => state.customer);

  const dispatch = useDispatch();
  // const getAllCouponsData = useCallback(() => {
  //   if (storeId) {
  //     if (activeTab === null) {
  //       dispatch(GetCouponsByStore(storeId));
  //     } else if (activeTab === 1) {
  //       dispatch(GetActiveCouponsByStore(storeId));
  //     } else if (activeTab === 2) {
  //       dispatch(GetInActiveCouponsByStore(storeId));
  //     } else {
  //       dispatch(GetCouponsByStore(storeId));
  //     }
  //   }
  // }, [dispatch, storeId, activeTab]);
  const fetchManagerCoupon = useCallback(() => {
    if (user?.id) {
      dispatch(GetManagerCoupons(user?.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    fetchManagerCoupon();
  }, [fetchManagerCoupon]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <CustomerHeader />
        <InnerBanner title={"Products"} />
        <div className="p-28 px-12 mobile:py-6 mobile:p-4 tab:px-4 tab:py-10 bg-gray-100">
          <Container>
            {/* <TabFiltter
              tabs={filtertabs}
              active={activeTab}
              setActive={setActiveTab}
            /> */}
            {managerCoupons?.data?.length === 0 ? (
              <h6 className="text-gray-600 text-center font-semibold text-sm py-5">
                No Data Found
              </h6>
            ) : (
              <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4">
                {managerCoupons?.data?.map((item, index) => (
                  <div
                    key={index}
                    className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-6"
                  >
                    <div onClick={handleCustomerCouponDetailsModel}>
                      <MoreCouponCard data={item} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Container>
        </div>

        <Modal
          size={"sm"}
          open={viewExtraPointsModal}
          handleOpen={handleCustomerCouponDetailsModel}
        >
          <div className="bg-gradient-to-r from-blush-red to-pink-300 text-lg font-semibold text-white p-4 text-left rounded-t-md">
            <h1>Customer Coupon Details</h1>
          </div>
          <div className="p-12 relative">
            <div className="">
              <div className=" p-1 shadow rounded-md w-32 h-32 flex items-center justify-center mx-auto mb-4">
                <Image
                  src="/assets/shopping.png"
                  width={150}
                  height={150}
                  alt="Picture of the author"
                  className="rounded-md w-28 h-28"
                />
              </div>

              <div>
                <h3 className="text-center font-semibold text-lg mb-2 mt-2 text-black">
                  Coupon Name
                </h3>
                <div className="flex justify-center">
                  <h5 className="absolute top-0 right-6 m-6 bg-green-100 text-green-800 text-xs font-medium me-2 px-4 py-2.5 rounded-full dark:bg-green-900 dark:text-green-300 inline-block">
                    Activated
                  </h5>
                </div>
              </div>

              <div className="flex justify-center	gap-8 my-2">
                <h3 className="font-medium text-md text-black">
                  <b className="text-blush-red">Valid Until :</b> 20-07-2024 :
                  02:48 PM
                </h3>
              </div>
            </div>
            <p className="text-gray-500 text-base mt-2 font-normal text-center">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry&apos;s standard dummy
              text ever since the 1500s, when an unknown printer took a galley
              of type and scrambled it to make a type specimen book.
            </p>
          </div>
        </Modal>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default MoreCoupon;
