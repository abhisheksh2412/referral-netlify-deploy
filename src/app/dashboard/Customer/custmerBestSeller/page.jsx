"use client";
import CustomerProductCard from "@/components/customerdashboard/customerProductCard";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import BestSellerCard from "@/components/managerdashboard/bestseller/bestsellercard";
import BestSellerDetails from "@/components/globals/dashboard/BestSeller/bestSellerDetails";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetBestSellerByUserId } from "@/store/slices/customer";
import Loader from "@/components/globals/Loader";

function CustomerBestSeller() {
  const [viewBestSeller, setViewBestSeller] = useState(null);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.auth.data);
  const { isSuccess, bestSellersList, isLoading } = useSelector(
    (state) => state.customer
  );
  const handleViewSellerModal = (value) => setViewBestSeller(value);
  const dispatch = useDispatch();
  const getAllBestSeller = useCallback(() => {
    if (user?.id) {
      dispatch(GetBestSellerByUserId(user?.id));
    }
  }, [dispatch, user]);

  // filter on search bestSeller data
  const filteredData = (search, data) => {
    let newdata = data;
    if (search?.length > 0) {
      const regex = new RegExp(search, "i");
      newdata = data?.filter((item) => regex.test(item?.product?.name));
    }
    return newdata;
  };

  useEffect(() => {
    getAllBestSeller();
  }, [getAllBestSeller]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <CustomerHeader />
        <InnerBanner title={"Best Sellers"} />

            <div className="py-16 mobile:py-6 mobile:p-4 bg-gray-100">

                <Container>

                <div className=" mb-12">
              <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <h2 className=" text-center text-2xl font-semibold">
                  Best Seller
                </h2>
                <div className="w-full md:w-72">
                  <div className="relative h-10 w-full min-w-[200px]">
                    <div className="absolute grid w-5 h-5 top-2/4 right-3 -translate-y-2/4 place-items-center text-blue-gray-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                        className="w-5 h-5"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        ></path>
                      </svg>
                    </div>
                    <input
                      className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 !pr-9  text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                      placeholder=" "
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                      Search
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {isSuccess && bestSellersList?.length === 0 ? (
              <h6 className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4">
                No Data Found
              </h6>
            ) : (
              <div className="lg:col-span-3 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-4">
                {filteredData(search, bestSellersList)?.map((item, index) => (
                  <div key={index} className="col-span-4">
                    <BestSellerCard
                      data={item}
                      handleView={handleViewSellerModal}
                    />
                  </div>
                ))}
              </div>
            )}

            <Modal
              size={"sm"}
              handleOpen={() => handleViewSellerModal(null)}
              open={viewBestSeller !== null}
            >
              <BestSellerDetails data={viewBestSeller} />
            </Modal>
          </Container>
        </div>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default CustomerBestSeller;
