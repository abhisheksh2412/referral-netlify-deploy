"use client";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import MoreStoreCard from "@/components/customerdashboard/more/storeCard";
import TabFiltter from "@/components/customerdashboard/more/tabFiltter";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Loader from "@/components/globals/Loader";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import StoreDetails from "@/components/globals/dashboard/StoreDetials";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import withAuth from "@/hoc/withAuth";
import { GetAllCategoryByPartnerId } from "@/store/slices/category";
import {
  GetallStoresByUserId,
  GetStoresByCategoryId,
} from "@/store/slices/seller";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MoreStore() {
  const [selectedData, setSelectedData] = useState(null);
  const [active, setActive] = useState(null);
  const [detailsModal, setDetialsModal] = useState(null);
  const [search, setSearch] = useState("");
  const handleViewModal = (data) => {
    setDetialsModal(!detailsModal);
    setSelectedData(data);
  };
  const user = useSelector((state) => state.auth.data);

  const { categoryListByUserId } = useSelector((state) => state.category);
  const { customerStores, isLoading } = useSelector((state) => state.seller);
  const dispatch = useDispatch();
  const getAllCategories = useCallback(() => {
    if (user?.id) {
      dispatch(GetAllCategoryByPartnerId(user?.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    getAllCategories();
  }, [getAllCategories]);

  const filter = useMemo(() => {
    const defaultList = [{ name: "All", id: null }];
    const newData = [
      ...defaultList,
      ...(categoryListByUserId?.data?.map((item) => ({
        name: item?.name,
        id: item?.id,
      })) || []),
    ];

    return newData;
  }, [categoryListByUserId]);

  const filteredData = (search, data) => {
    let newdata = data;
    if (search?.length > 0) {
      const regex = new RegExp(search, "i");
      newdata = data?.filter((item) => regex.test(item.name));
    }
    return newdata;
  };

  const GetStores = useCallback(() => {
    if (user?.id) {
      if (active === null) {
        dispatch(GetallStoresByUserId(user?.id));
      } else {
        dispatch(GetStoresByCategoryId(active));
      }
    }
  }, [dispatch, user, active]);

  useEffect(() => {
    GetStores();
  }, [GetStores]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <CustomerHeader />
        <InnerBanner title={"Store"} />
        <div className="py-28 mobile:py-6 mobile:p-4 bg-gray-100">
          <Container>
            <TabFiltter
              tabs={filter}
              inputValue={search}
              inputOnChange={setSearch}
              active={active}
              setActive={setActive}
            />

            <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4">
              {filteredData(search, customerStores)?.map((item, index) => (
                <div
                  key={index}
                  className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4"
                >
                  <div onClick={() => handleViewModal(item)}>
                    <MoreStoreCard data={item} />
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </div>
        <Modal open={detailsModal} handleOpen={handleViewModal} size={"sm"}>
          <StoreDetails selectedData={selectedData} />
        </Modal>
        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(MoreStore);
