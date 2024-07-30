"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import Container from "@/components/globals/container";
import Loader from "@/components/globals/Loader";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import StoreCard from "@/components/dashboard/store/storecard";
import { GetSellerStores } from "@/store/slices/seller";

import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import withAuth from "@/hoc/withAuth";

function Store() {
  const user = useSelector((state) => state.auth.data);
  const { stores, isLoading } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const getSellerStores = useCallback(() => {
    if (user?.id) {
      dispatch(GetSellerStores(user?.id));
    }
  }, [dispatch, user?.id]);

  //   Get all stores of seller
  useEffect(() => {
    getSellerStores();
  }, [getSellerStores]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <DashboardHeader />
        <InnerBanner title={"Store"} />

        <div className="p-20 mobile:p-4 mobile:pt-14">
          <Container>
            {stores?.length === 0 ? (
              <h5 className="text-sm text-gray-500 text-center font-semibold">
                No Stores Found
              </h5>
            ) : (
              stores.map((item, index) => (
                <div
                  key={index}
                  className="lg:w-1/2 mobile:w-full md:w-3/4 sm:w-3/4   mx-auto"
                >
                  <StoreCard data={item} />
                </div>
              ))
            )}
          </Container>
        </div>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(Store);
