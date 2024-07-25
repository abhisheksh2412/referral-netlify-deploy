"use client";
import CustomerCouponFiltter from "@/components/customerdashboard/couponFiltter";
import CustomerCouponCard from "@/components/customerdashboard/customerCouponCard";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import Image from "next/image";
import Modal from "@/components/globals/Modal";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetActiveCouponsByStore,
  GetCouponsByStore,
  GetInActiveCouponsByStore,
} from "@/store/slices/customer";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/globals/Loader";
import { config } from "@/config/config";
import clsx from "clsx";
import moment from "moment";
import withAuth from "@/hoc/withAuth";

function CustomeCouponList() {
  const filtertabs = ["New", "Active Coupon", "Inactive Coupon"];
  const [activeTab, setActiveTab] = useState(0);
  const [viewExtraPointsModal, setViewExtraPointsModal] = useState(null);
  const handleCustomerCouponDetailsModel = (value) =>
    setViewExtraPointsModal(value);

  const { couponsByStore, isLoading } = useSelector((state) => state.customer);
  const storeId = useSearchParams().get("store_id");

  const dispatch = useDispatch();
  const getAllCouponsData = useCallback(() => {
    if (storeId) {
      if (activeTab === 0) {
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
        <InnerBanner title={"Customer Coupon"} />
        <div className="py-16 mobile:py-6 mobile:p-4 bg-gray-100">
          <Container>
            <CustomerCouponFiltter
              list={filtertabs}
              active={activeTab}
              onChange={setActiveTab}
            />
            {couponsByStore?.length === 0 ? (
              <h6 className="text-center text-sm font-semibold text-gray-500 py-5">
                You have No any coupons
              </h6>
            ) : (
              <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4">
                {couponsByStore?.map((item, index) => (
                  <div
                    key={index}
                    className="lg:col-span-4 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-6"
                  >
                    <div>
                      <CustomerCouponCard
                        data={item}
                        handleView={handleCustomerCouponDetailsModel}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <Modal
              size={"sm"}
              open={viewExtraPointsModal !== null}
              handleOpen={() => handleCustomerCouponDetailsModel(null)}
            >
              <div className="bg-gradient-to-r from-blush-red to-pink-300 text-lg font-semibold text-white p-4 text-left rounded-t-md">
                <h1>Customer Coupon Details</h1>
              </div>
              <div className="p-12 relative">
                <div className="">
                  <div className=" p-1 shadow rounded-md w-32 h-32 flex items-center justify-center mx-auto mb-4">
                    <Image
                      src={
                        config?.IMAGE_URL_PATH +
                        viewExtraPointsModal?.coupon_image
                      }
                      width={150}
                      height={150}
                      alt="Picture of the author"
                      className="rounded-md w-28 h-28"
                    />
                  </div>

                  <div>
                    <h3 className="text-center font-semibold text-lg mb-2 mt-2 text-black">
                      {viewExtraPointsModal?.coupon_code}
                    </h3>
                    <div className="flex justify-center">
                      <h5
                        className={clsx(
                          " text-xs font-medium me-2 px-4 py-2.5 rounded-full  inline-block",
                          viewExtraPointsModal?.status === "activated"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        )}
                      >
                        {viewExtraPointsModal?.status}
                      </h5>
                    </div>
                  </div>

                  <div className="flex justify-center	gap-8 my-2">
                    <h3 className="font-medium text-md text-black">
                      <b className="text-blush-red">Valid Until :</b>
                      {moment(viewExtraPointsModal?.expire_at).format(
                        "DD-MM-YYYY  hh:mm A"
                      )}
                    </h3>
                  </div>
                </div>
                <p className="text-gray-500 text-base mt-2 font-normal text-center">
                  {viewExtraPointsModal?.description}
                </p>
              </div>
            </Modal>
          </Container>
        </div>
        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(CustomeCouponList);
