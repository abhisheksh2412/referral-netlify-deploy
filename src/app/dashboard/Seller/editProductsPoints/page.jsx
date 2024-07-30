"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaPen, FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { ArrowLeft, MoveLeft } from "lucide-react";
import Image from "next/image";
import clsx from "clsx";
import { useRouter } from "next/navigation";

import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import Loader from "@/components/globals/Loader";
import withAuth from "@/hoc/withAuth";
import { useSellerContext } from "@/providers/useSellerOrders";
import {
  DeleteProductPoints,
  GetAllProductsAndPoints,
} from "@/store/slices/products";
import { AddExtraPoints } from "@/store/slices/seller";
import { popup } from "@/_utils/alerts";
import { config } from "@/config/config";
import Link from "next/link";
import Modal from "@/components/globals/Modal";
import UpdateProductsPoints from "../updateProductsPoints/page";
import GlobalInput from "@/components/globals/globalInput";
import UpdateProduct from "./updateProduct";

const useFetchProductsAndPoints = (userId) => {
  const dispatch = useDispatch();
  const fetchProductsAndPoints = useCallback(() => {
    if (userId) {
      dispatch(GetAllProductsAndPoints(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    fetchProductsAndPoints();
  }, [fetchProductsAndPoints]);

  return useSelector((state) => ({
    sellerUserProducts: state.product.sellerUserProducts,
    isLoading: state.product.isLoading,
  }));
};

const ProductCard = ({
  item,
  index,
  mode,
  handleEdit,
  selectedProduct,
  handleSelectProduct,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);

  const deleteProduct = useCallback(
    (id) => {
      dispatch(DeleteProductPoints(id));
      dispatch(GetAllProductsAndPoints(user?.id));
    },
    [dispatch, user]
  );

  return (
    <div
      key={index}
      onClick={() => handleSelectProduct(index)}
      className={clsx(
        "shadow text-center cursor-pointer rounded-lg flex items-center gap-2 bg-white",
        mode === "show" && selectedProduct === index
          ? "border-4 border-blush-red"
          : "border-4 border-transparent"
      )}
    >
      <div className="p-2 rounded-l-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative w-2/6	">
        <Image
          src={`${config?.IMAGE_URL_PATH}${item.product_image}`}
          width={250}
          height={250}
          className="!w-24 !h-24 mx-auto object-contain"
        />
      </div>
      <div className="py-2 px-1 w-3/6">
        <h4 className="font-medium text-blush-red text-left">
          {item?.product_name}
        </h4>
        <p className="font-medium text-sm text-left">Qty: {item?.quantity}</p>
        <p className="font-medium text-sm text-left">
          Points: {item?.earn_point}
        </p>
      </div>
      {mode === "edit" && (
        <div className="w-1/6 h-full flex items-center justify-center border-l divide-slate-200">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => deleteProduct(item?.id)}
              className="text-white bg-blush-red text-md rounded-lg py-2 px-2 mobile:px-3 block w-full"
            >
              <MdDelete className="text-md" />
            </button>
            <button
              onClick={() => handleEdit(item)}
              className="text-white bg-[#0e0a38] text-md rounded-lg py-2 px-2 mobile:px-3 block w-full"
            >
              <FaPen className="text-sm" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const EditProductsPoints = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [mode, setMode] = useState("show");
  const { selectedProduct, setSelectedProduct } = useSellerContext();
  const seller = useSelector((state) => state.seller);
  const [extraPoints, setExtraPoints] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const handleEditProduct = (value) => setEditProduct(value);
  const user = useSelector((state) => state.auth.data);
  const userId = user?.id;
  const { userByCard } = useSelector((state) => state.user);
  const { sellerUserProducts, isLoading } = useFetchProductsAndPoints(userId);

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
  };

  const addExtraPoints = useCallback(async () => {
    if (extraPoints && userByCard) {
      const data = {
        extra_point: extraPoints,
        card_id: userByCard?.id,
      };
      await dispatch(AddExtraPoints(data));
      if (seller.isSuccess) {
        popup({ status: "success", message: "points added successfully" });
        setExtraPoints("");
        router.back();
      }
    }
  }, [dispatch, extraPoints, userByCard, seller.isSuccess, router]);

  return (
    <Loader isLoading={isLoading || seller?.isLoading}>
      <div>
        <TopHeader />
        <DashboardHeader />
        <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 min-h-48 mobile:min-h-28 flex items-center justify-center">
          <Container>
            <h3 className="text-center text-2xl leading-tight mb-6 font-bold text-black">
              Edit Products & Points
            </h3>
          </Container>
        </div>
        <div className="bg-gray-100 px-4 py-8 md:py-16 lg:py-16">
          <Container>
            {mode === "edit" && (
              <div className="flex w-full justify-start mb-3">
                <button
                  onClick={() => setMode("show")}
                  className="text-blush-red transition-all duration-500 !text-lg bg-transparent w-fit h-fit items-center rounded-md flex gap-2"
                >
                  <MoveLeft size={36} /> Back
                </button>
              </div>
            )}
            {sellerUserProducts?.AllProductPoints?.length === 0 ? (
              <h5 className="text-sm font-semibold text-center text-gray-600">
                {" "}
                No Product & Points Found
              </h5>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 transition-all md-landscape:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3	 lg:gap-5">
                {sellerUserProducts?.AllProductPoints?.map((item, index) => (
                  <ProductCard
                    key={index}
                    item={item}
                    index={index}
                    handleEdit={handleEditProduct}
                    mode={mode}
                    selectedProduct={selectedProduct}
                    handleSelectProduct={handleSelectProduct}
                  />
                ))}
              </div>
            )}
            <div className="flex flex-wrap items-center bg-white p-3 mt-8 rounded-lg">
              <div className="w-full md:w-1/2 !md-landscape:w-4/4 lg:w-1/2">
                {mode === "show" && (
                  <div className="w-full md:w-4/4 md-landscape:w-4/6 lg:w-2/4 relative">
                    <input
                      className="block w-full rounded-lg p-3 shadow-inherit !bg-gray-100 outline-none text-left"
                      placeholder="Enter Points"
                      type="text"
                      value={extraPoints}
                      onChange={(e) => setExtraPoints(e.target.value)}
                    />
                    <button
                      onClick={addExtraPoints}
                      className="text-white bg-blush-red text-md rounded-r-lg py-3 px-8 absolute top-0 right-0 bottom-0"
                    >
                      Submit
                    </button>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 lg:w-1/2">
                <div className="text-right flex justify-center md:justify-end lg:justify-end gap-3 mobile:mt-5">
                  {mode === "edit" ? (
                    <>
                      <button
                        onClick={() => setMode("show")}
                        className="text-white bg-blush-red text-md rounded-lg py-3 px-2 mobile:px-2 flex items-center justify-center gap-2 w-24"
                      >
                        <ArrowLeft size={17} />
                        <span>Back</span>
                      </button>
                      <Link
                        href="/dashboard/Seller/addProductsPoints"
                        className="text-white bg-[#0e0a38] text-md rounded-lg py-3 px-2 mobile:px-2 flex items-center justify-center gap-2 w-24"
                      >
                        <FaPlus />
                        <span>Add</span>
                      </Link>
                    </>
                  ) : (
                    <button
                      onClick={() => setMode("edit")}
                      className="text-white bg-blush-red text-md rounded-lg py-3 px-2 mobile:px-2 flex items-center justify-center gap-2 w-24"
                    >
                      <FaPen /> <span>Edit</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>
        <DashboardFooter />
      </div>
      <Modal
        open={editProduct !== null}
        handleOpen={() => handleEditProduct(null)}
      >
        <UpdateProduct data={editProduct} handleClose={handleEditProduct} />
      </Modal>
    </Loader>
  );
};

export default withAuth(EditProductsPoints);
