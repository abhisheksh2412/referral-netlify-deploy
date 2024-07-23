"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerCard from "@/components/managerdashboard/manageOthers/managerCard";
import { IoCloseCircleOutline } from "react-icons/io5";
import React, { useCallback, useEffect, useState } from "react";
import Modal from "@/components/globals/Modal";
import ManagerDetails from "@/components/managerdashboard/manageOthers/managerDetails";
import PartnerHeader from "@/components/PartnerDashboard/header";
import { useDispatch, useSelector } from "react-redux";
import { PartnerGetSeller } from "@/store/slices/seller";
import Loader from "@/components/globals/Loader";
import withAuth from "@/hoc/withAuth";

function SellerList() {
  const dispatch = useDispatch();
  const [selectedData, setSelectedData] = useState({});
  const [addCoupon, setAddCoupon] = useState(false);
  const handleCouponModal = (value) => {
    setSelectedData(value);
    setAddCoupon(!addCoupon);
  };
  const { sellers, isLoading } = useSelector((state) => state.seller);

  const GetSellerAndManagers = useCallback(() => {
    dispatch(PartnerGetSeller());
  }, [dispatch]);

  useEffect(() => {
    GetSellerAndManagers();
  }, [GetSellerAndManagers]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <PartnerHeader />
        <InnerBanner title={"Seller List"} />

        <div className="bg-gray-100 py-16 mobile:py-6 mobile:p-4">
          <Container>
            <div className="grid grid-cols-12 gap-6 ">
              {sellers?.data?.map((item, index) => (
                <div
                  key={index}
                  className="lg:col-span-4 mobile:col-span-12 md:col-span-6 md-landscape:col-span-6"
                >
                  <ManagerCard data={item} showDetails={handleCouponModal} />
                </div>
              ))}
            </div>

            <Modal open={addCoupon} handleOpen={handleCouponModal} size={"sm"}>
              <div>
                <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 rounded-t-lg flex items-center justify-between p-4">
                  <h4 className="text-base font-semibold text-black">
                    Seller Details
                  </h4>
                  <h5 className="cursor-pointer" onClick={handleCouponModal}>
                    <IoCloseCircleOutline className="w-8 h-8" />
                  </h5>
                </div>
                <div className="p-4 max-h-[80vh] overflow-y-auto">
                  <ManagerDetails data={selectedData} />
                </div>
              </div>
            </Modal>
          </Container>
        </div>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(SellerList);
