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
import { PartnerGetManager } from "@/store/slices/seller";
import Loader from "@/components/globals/Loader";
import withAuth from "@/hoc/withAuth";

function ManagerList() {
  const [selectedData, setSelectedData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const handleManagerDetails = (value) => {
    setSelectedData(value);
    setShowDetails(!showDetails);
  };
  const dispatch = useDispatch();

  const { sellers, managers, isLoading } = useSelector((state) => state.seller);

  const GetSellerAndManagers = useCallback(() => {
    dispatch(PartnerGetManager());
  }, [dispatch]);

  useEffect(() => {
    GetSellerAndManagers();
  }, [GetSellerAndManagers]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <PartnerHeader />
        <InnerBanner title={"Managers List"} />

        <div className="bg-gray-100 py-16 mobile:py-6 mobile:p-4">
          <Container>
            <div className="grid grid-cols-12 gap-6 ">
              {managers?.data?.map((item, index) => (
                <div
                  key={index}
                  className="lg:col-span-4 mobile:col-span-12 md:col-span-6 md-landscape:col-span-6
"
                >
                  <ManagerCard
                    key={index}
                    data={item}
                    showDetails={handleManagerDetails}
                  />
                </div>
              ))}
            </div>

            <Modal
              open={showDetails}
              handleOpen={handleManagerDetails}
              size={"sm"}
            >
              <div>
                <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 rounded-t-lg flex items-center justify-between p-4">
                  <h4 className="text-base font-semibold text-black">
                    Manager Details
                  </h4>
                  <h5 className="cursor-pointer" onClick={handleManagerDetails}>
                    <IoCloseCircleOutline className="w-8 h-8" />
                  </h5>
                </div>
                <div className="p-4 max-h-[75vh] overflow-y-auto">
                  <ManagerDetails
                    data={selectedData}
                    handleClose={handleManagerDetails}
                  />
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

export default withAuth(ManagerList);
