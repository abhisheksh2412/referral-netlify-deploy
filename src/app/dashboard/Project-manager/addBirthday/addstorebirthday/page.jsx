"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";

import React, { useState, useCallback, useEffect } from "react";
import AddBirthdayForm from "@/components/common/form/addBirthdayForm";

import { useDispatch, useSelector } from "react-redux";
import {
  FetchStoreBirthdayList,
  FetchStoreForBirthday,
} from "@/store/slices/orders";
import Loader from "@/components/globals/Loader";
import withAuth from "@/hoc/withAuth";

function AddStoreBirthday() {
  const dispatch = useDispatch();
  const { storesBirthday, isLoading } = useSelector((state) => state.orders);
  const { stores } = useSelector((state) => state.orders);

  const options = stores?.data
    ? stores?.data?.map((item) => ({
        label: item?.name,
        value: item?.id,
        logo: item?.logo,
      }))
    : [];
  const getAllStores = useCallback(() => {
    dispatch(FetchStoreForBirthday());
  }, [dispatch]);

  useEffect(() => {
    getAllStores();
  }, [getAllStores]);
  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <ManagerDashboardHeader />
        <InnerBanner title={"Add Store Birthday"} />

        <div className="p-8">
          <Container>
            <div className="p-12 new-shadow  bg-white w-3/5	mx-auto rounded-lg">
              <h3 className="text-left text-2xl leading-tight mb-6 font-semibold text-black">
                Add Store Birthday
              </h3>
              <AddBirthdayForm options={options} />
            </div>
          </Container>
        </div>
        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(AddStoreBirthday);
