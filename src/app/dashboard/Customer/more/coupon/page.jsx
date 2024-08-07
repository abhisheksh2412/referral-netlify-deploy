"use client";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import MoreCouponCard from "@/components/customerdashboard/more/couponCard";
import TabFiltter from "@/components/customerdashboard/more/tabFiltter";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetActiveCouponsByStore,
  GetCouponsByStore,
  GetInActiveCouponsByStore,
} from "@/store/slices/customer";
import Loader from "@/components/globals/Loader";
import withAuth from "@/hoc/withAuth";
import CouponDetails from "@/components/managerdashboard/coupons/couponDetails";

function MoreCoupon() {
  const storeId =
    typeof window !== "undefined" && localStorage.getItem("store_id");
  const filtertabs = [
    { name: "New", id: null },
    { name: "Active Coupon", id: 1 },
    { name: "Inactive Coupon", id: 2 },
  ];
  const [activeTab, setActiveTab] = useState(null);
  const [viewExtraPointsModal, setViewExtraPointsModal] = useState(null);
  const handleCustomerCouponDetailsModel = (value) =>
    setViewExtraPointsModal(value);

  const { couponsByStore, isLoading } = useSelector((state) => state.customer);

  const dispatch = useDispatch();
  const getAllCouponsData = useCallback(() => {
    if (storeId) {
      if (activeTab === null) {
        dispatch(GetCouponsByStore(storeId));
      } else if (activeTab === 1) {
        dispatch(GetActiveCouponsByStore(storeId));
      } else if (activeTab === 2) {
        dispatch(GetInActiveCouponsByStore(storeId));
      } else {
        dispatch(GetCouponsByStore(storeId));
      }
    }
  }, [dispatch, storeId, activeTab]);

  useEffect(() => {
    getAllCouponsData();
  }, [getAllCouponsData]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <CustomerHeader />
        <InnerBanner title={"Products"} />
        <div className="p-28 px-12 mobile:py-6 mobile:p-4 tab:px-4 tab:py-10 bg-gray-100">
          <Container>
            <TabFiltter
              tabs={filtertabs}
              active={activeTab}
              setActive={setActiveTab}
            />
            {couponsByStore?.length === 0 ? (
              <h6 className="text-gray-600 text-center font-semibold text-sm py-5">
                No Data Found
              </h6>
            ) : (
              <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4">
                {couponsByStore?.map((item, index) => (
                  <div
                    key={index}
                    className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-6"
                  >
                    <div>
                      <MoreCouponCard
                        data={item}
                        handleView={handleCustomerCouponDetailsModel}
                      />
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
          <div>
            <CouponDetails data={viewExtraPointsModal} />
          </div>
        </Modal>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(MoreCoupon);
