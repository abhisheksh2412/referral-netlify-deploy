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
import withAuth from "@/hoc/withAuth";
import PartnerHeader from "@/components/PartnerDashboard/header";
import CouponDetails from "@/components/managerdashboard/coupons/couponDetails";

function MoreCoupon() {
  const user = useSelector((state) => state.auth.data);
  const { managerCoupons, isLoading } = useSelector((state) => state.coupon);

  const [viewExtraPointsModal, setViewExtraPointsModal] = useState(null);
  const handleCustomerCouponDetailsModel = (value) =>
    setViewExtraPointsModal(value);

  const dispatch = useDispatch();

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
        <PartnerHeader />
        <InnerBanner title={"Products"} />
        <div className="p-28 px-12 mobile:py-6 mobile:p-4 tab:px-4 tab:py-10 bg-gray-100">
          <Container>
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
                    <div >
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
          open={viewExtraPointsModal !== null}
          handleOpen={() => handleCustomerCouponDetailsModel(null)}
        >
          <div>
            <CouponDetails
              data={viewExtraPointsModal}
              refreshFunc={fetchManagerCoupon}
              isdelete={true}
              handleClose={handleCustomerCouponDetailsModel}
            />
          </div>
        </Modal>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(MoreCoupon);
