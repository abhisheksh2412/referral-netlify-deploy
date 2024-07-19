"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import OrdersTable from "@/components/dashboard/orders/orderstable";
import { FetchAllSellerOrders } from "@/store/slices/orders";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import withAuth from "@/hoc/withAuth";

function AllOrders() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FetchAllSellerOrders());
  }, [dispatch]);

  return (
    <div>
      <TopHeader />
      <DashboardHeader />
      <InnerBanner title={"All Orders"} />

      <div className="p-12 mobile:p-3">
        <Container>
          <OrdersTable />
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(AllOrders);
