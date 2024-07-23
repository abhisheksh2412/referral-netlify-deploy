"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import AddStoreForm from "@/components/globals/dashboard/store/addStoreForm";
import Loader from "@/components/globals/Loader";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import PartnerHeader from "@/components/PartnerDashboard/header";
import withAuth from "@/hoc/withAuth";
import { GetStoreById } from "@/store/slices/seller";
import { useParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function UpdateStore() {
  const { singleStore, isLoading } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const getStore = useCallback(() => {
    dispatch(GetStoreById(id));
  }, [dispatch, id]);

  useEffect(() => {
    getStore();
  }, [getStore]);

  return (
    <div>
      <Loader isLoading={isLoading}>
        <TopHeader />
        <PartnerHeader />
        <InnerBanner title={"Update Store"} />
        <div className="py-5">
          <AddStoreForm edit={true} editData={singleStore} />
        </div>
        <DashboardFooter />
      </Loader>
    </div>
  );
}

export default withAuth(UpdateStore);
