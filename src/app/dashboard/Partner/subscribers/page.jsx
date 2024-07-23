"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Loader from "@/components/globals/Loader";
import Modal from "@/components/globals/Modal";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerCard from "@/components/managerdashboard/manageOthers/managerCard";
import ManagerDetails from "@/components/managerdashboard/manageOthers/managerDetails";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";
import { PartnerGetManager, PartnerGetSeller } from "@/store/slices/seller";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

const RenderTabComponents = ({
  component,
  sellerData,
  managerData,
  showDetails,
}) => {
  const data = component === "manager" ? managerData : sellerData;
  return data?.map((item, index) => (
    <ManagerCard key={index} data={item} showDetails={showDetails} />
  ));
};

function Subscribers() {
  const [selectedData, setSelectedData] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const handleManagerDetails = (value) => {
    setSelectedData(value);
    setShowDetails(!showDetails);
  };
  const dispatch = useDispatch();
  const [active, setActive] = useState("manager");

  const { sellers, managers, isLoading } = useSelector((state) => state.seller);

  const GetSellerAndManagers = useCallback(() => {
    dispatch(PartnerGetSeller());
    dispatch(PartnerGetManager());
  }, [dispatch]);

  useEffect(() => {
    GetSellerAndManagers();
  }, [GetSellerAndManagers]);

  const sellerCount = sellers?.data?.length || 0;
  const managerCount = managers?.data?.length || 0;

  const activeData = useMemo(() => {
    return {
      manager: managers?.data,
      seller: sellers?.data,
    };
  }, [managers?.data, sellers?.data]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <PartnerHeader />
        <InnerBanner title={"Subscribers"} />

        <div className="lg:w-2/3 mobile:w-full md:w-5/6 mx-auto shadow-lg my-5 p-4 rounded">
          {/* Tabs */}
          <div className="flex  items-center justify-between gap-3">
            <button
              className={clsx(
                "w-full p-4 mobile:p-3 px-4 rounded-md transition-all duration-500 text-sm",
                active === "manager"
                  ? "bg-blush-red text-white border border-blush-red"
                  : "bg-white shadow-custom-inset text-blush-red border border-transparent"
              )}
              onClick={() => setActive("manager")}
            >
              Manager ({managerCount})
            </button>
            <button
              className={clsx(
                "w-full p-4 mobile:p-3 px-4 rounded-md transition-all duration-500 text-sm",
                active === "seller"
                  ? "bg-blush-red text-white border border-blush-red"
                  : "bg-white shadow-custom-inset text-blush-red border border-transparent"
              )}
              onClick={() => setActive("seller")}
            >
              Seller ({sellerCount})
            </button>
          </div>

          {/* All cards */}
          <div className="grid grid-cols-2 mobile:grid-cols-1 gap-2 mt-8">
            <RenderTabComponents
              component={active}
              sellerData={activeData.seller}
              managerData={activeData.manager}
              showDetails={handleManagerDetails}
            />
          </div>
        </div>

        <Modal open={showDetails} handleOpen={handleManagerDetails} size={"sm"}>
          <div>
            <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 rounded-t-lg flex items-center justify-between p-4">
              <h4 className="text-base font-semibold text-black">
                {active} Details
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

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(Subscribers);
