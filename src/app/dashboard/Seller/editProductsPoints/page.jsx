"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import Image from "next/image";
import { FaPen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, Check, MoveLeft } from "lucide-react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductsAndPoints } from "@/store/slices/products";
import Loader from "@/components/globals/Loader";
import { config } from "@/config/config";
import withAuth from "@/hoc/withAuth";

function EditProductsPoints() {
  const [mode, setMode] = useState("edit");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const { sellerUserProducts, isLoading } = useSelector(
    (state) => state.product
  );

  const getProductsAndPoints = useCallback(() => {
    const userid = user && user !== null && user.id;
    dispatch(GetAllProductsAndPoints(userid));
  }, [dispatch, user]);

  const [selectedProduct, setSelectedProduct] = useState([]);
  const handleSelectProduct = (productId) => {
    if (selectedProduct.includes(productId)) {
      setSelectedProduct(selectedProduct.filter((item) => item !== productId));
    } else {
      setSelectedProduct([...selectedProduct, productId]);
    }
  };

  useEffect(() => {
    getProductsAndPoints();
  }, [getProductsAndPoints]);

  return (
    <Loader isLoading={isLoading}>
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

        <div className="bg-gray-100 px-4  py-8 md:py-16 lg:py-16">
          {/* edit options */}
          <Container>
            {mode === "edit" && (
              <div className="flex w-full justify-start mb-3">
                <button
                  onClick={() => setMode("show")}
                  className="text-blush-red transition-all duration-500 !text-lg bg-transparent w-fit h-fit  items-center rounded-md flex gap-2 "
                >
                  <MoveLeft size={36} /> Back
                </button>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 transition-all md-landscape:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3	 lg:gap-5">
              {sellerUserProducts?.AllProductPoints?.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleSelectProduct(index)}
                  className={clsx(
                    "shadow text-center cursor-pointer rounded-lg flex items-center gap-2  bg-white ",
                    mode === "show" && selectedProduct.includes(index)
                      ? "border-4 border-blush-red"
                      : "border-4 border-transparent"
                  )}
                >
                  <div className="p-2 rounded-l-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative w-2/6	">
                    <Image
                      src={config?.IMAGE_URL_PATH + item.product_image}
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-contain"
                    />
                  </div>
                  <div className="py-2 px-1 w-3/6	">
                    <h4 className="font-medium text-blush-red text-left">
                      {item?.product_name}
                    </h4>
                    <p className="font-medium text-sm text-left">
                      {" "}
                      Qty: {item?.quantity}
                    </p>
                    <p className="font-medium text-sm text-left">
                      {" "}
                      Points: {item?.earn_point}
                    </p>
                  </div>
                  {mode === "edit" && (
                    <div className="w-1/6 h-full flex items-center justify-center border-l divide-slate-200">
                      <div className="flex flex-col gap-2">
                        <button
                          class="text-white bg-blush-red text-md rounded-lg py-2 px-2 mobile:px-3 block w-full"
                          type="button"
                        >
                          <MdDelete className="text-md" />
                        </button>
                        <button
                          class="text-white bg-[#0e0a38] text-md rounded-lg py-2 px-2 mobile:px-3 block w-full"
                          type="button"
                        >
                          <FaPen className="text-sm" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center bg-white p-5 mt-8 rounded-lg">
              <div className="w-full md:w-1/2 !md-landscape:w-4/4 lg:w-1/2">
                {mode === "show" && (
                  <div class="w-full md:w-4/4 md-landscape:w-full  lg:w-2/4 relative">
                    <input
                      class="block w-full rounded-lg p-4  shadow-inherit !bg-gray-100 outline-none text-left "
                      placeholder="Enter Points"
                      type="text"
                    />
                    <button className="text-white bg-blush-red text-md rounded-r-lg py-3 px-8 absolute top-0 right-0 bottom-0">
                      Submit
                    </button>
                  </div>
                )}
              </div>
              <div className="w-full md:w-1/2 lg:w-1/2">
                <div className="text-right flex justify-center md:justify-end lg:justify-end gap-3 mobile:mt-5">
                  {mode === "edit" && (
                    <button
                      onClick={() => setMode("show")}
                      className="text-white bg-blush-red text-md rounded-lg py-3 px-2 mobile:px-2  flex items-center justify-center gap-2 w-24 "
                    >
                      <ArrowLeft size={17} />
                      <span> Back</span>
                    </button>
                  )}
                  {mode === "edit" && (
                    <button className="text-white bg-[#0e0a38] text-md rounded-lg py-3 px-2 mobile:px-2  flex items-center justify-center gap-2 w-24 ">
                      <FaPlus />
                      <span> Add</span>
                    </button>
                  )}

                  {mode === "show" && (
                    <button
                      className="text-white bg-blush-red text-md rounded-lg py-3 px-2 mobile:px-2  flex items-center justify-center gap-2 w-24"
                      onClick={() => setMode("edit")}
                    >
                      <FaPen /> <span> Edit</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Container>
        </div>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(EditProductsPoints);
