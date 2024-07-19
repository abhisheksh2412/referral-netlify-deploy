"use client";
import CustomerPlasticCard from "@/components/customerdashboard/customerPlasicCard";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import PointsBanner from "@/components/globals/dashboard/customer/PointsBanner";
import Loader from "@/components/globals/Loader";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import { GetAllCardsWithStoreId } from "@/store/slices/customer";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function CustomerCard() {
  const storeId = useSearchParams().get("store_id");
  const { customerCardsByStore, isLoading } = useSelector(
    (state) => state.customer
  );
  const dispatch = useDispatch();
  const getCardsData = useCallback(() => {
    if (storeId) {
      dispatch(GetAllCardsWithStoreId(storeId));
    }
  }, [dispatch, storeId]);

  useEffect(() => {
    getCardsData();
  }, [getCardsData]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <CustomerHeader />
        <InnerBanner title={"Customer Plastic Card"} />
        <PointsBanner points={customerCardsByStore?.total_rewords_points} />
        <div className="py-16 mobile:py-6 mobile:p-4 bg-gray-100">
          <Container>
            <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4">
              {customerCardsByStore?.loyalty_card?.map((item, index) => (
                <div key={index} className="lg:col-span-4 mobile:col-span-1 sm:col-span-6 md-landscape:col-span-6 bg-white p-2 rounded-lg">
                  <CustomerPlasticCard data={item} />
                </div>
              ))}
            </div>

            <div className="mt-16">
              <h3 className="text-center text-2xl leading-tight mb-6 font-bold text-black">
                Coupon List
              </h3>

              <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/5 mobile:w-full	mx-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-sm text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        S.N.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Coupon Code
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Expire Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerCardsByStore?.active_coupon?.map((item, index) => (
                      <tr
                        key={index}
                        className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item?.id}.
                        </th>
                        <td className="px-6 py-4">{item?.coupon_code}</td>
                        <td className="px-6 py-4">
                          {moment(item?.expire_at).format(
                            "DD-MM-YYYY - hh:mm:ss"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </div>

        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default CustomerCard;
