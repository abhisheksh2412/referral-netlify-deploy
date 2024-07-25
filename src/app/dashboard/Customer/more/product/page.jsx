"use client";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import ProductsCard from "@/components/customerdashboard/more/productsCard";
import TabFiltter from "@/components/customerdashboard/more/tabFiltter";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Loader from "@/components/globals/Loader";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ProductDetails from "@/components/managerdashboard/products/ProductDetails";
import withAuth from "@/hoc/withAuth";
import { GetAllCategoryByPartnerId } from "@/store/slices/category";
import {
  GetAllProductByPartner,
  GetAllProductsbyCategory,
} from "@/store/slices/products";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MoreProduct() {
  const [search, setSearch] = useState("");

  const { productList, isLoading } = useSelector((state) => state.product);
  const { categoryListByUserId } = useSelector((state) => state.category);
  const [showProduct, setShowProduct] = useState(null);
  const handleShowProduct = (value) => setShowProduct(value);
  const user = useSelector((state) => state.auth.data);
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

  const [active, setActive] = useState(null);

  const getAllProductsByPartnerId = useCallback(() => {
    if (user?.id) {
      if (active === null) {
        dispatch(GetAllProductByPartner(user?.id));
      } else {
        dispatch(GetAllProductsbyCategory(active));
      }
    }
  }, [dispatch, user, active]);

  const filteredData = (search, data) => {
    let newdata = data;
    if (search?.length > 0) {
      const regex = new RegExp(search, "i");
      newdata = data?.filter((item) => regex.test(item.name));
    }
    return newdata;
  };

  useEffect(() => {
    getAllProductsByPartnerId();
  }, [getAllProductsByPartnerId]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <CustomerHeader />
        <InnerBanner title={"Products"} />
        <div className="p-28 px-12 bg-gray-100">
          <Container>
            <TabFiltter
              inputValue={search}
              inputOnChange={setSearch}
              tabs={filter}
              active={active}
              setActive={setActive}
            />

            <div className="grid grid-cols-12 gap-8 mt-16">
              {filteredData(search, productList)?.map((item, index) => (
                <div key={index} className="col-span-3">
                  <div onClick={() => handleShowProduct(item)}>
                    <ProductsCard data={item} />
                  </div>
                </div>
              ))}
            </div>
          </Container>

          <Modal
            open={showProduct !== null}
            handleOpen={() => handleShowProduct(null)}
          >
            <div>
              <ProductDetails data={showProduct} />
            </div>
          </Modal>
        </div>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(MoreProduct);
