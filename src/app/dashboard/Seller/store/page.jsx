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
    <div>
      <TopHeader />
      <DashboardHeader />
      <InnerBanner title={"Store"} />

      <div className="p-20 mobile:p-4 mobile:pt-14">
        <Container>
          <Loader isLoading={isLoading}>
            {stores.map((item, index) => (
              <div key={index} className="lg:w-1/2 mobile:w-full md:w-3/4 sm:w-3/4   mx-auto">
                <StoreCard data={item} />
              </div>
            ))}
          </Loader>
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(Store);
