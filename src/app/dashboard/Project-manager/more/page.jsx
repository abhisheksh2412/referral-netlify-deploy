"use client";
import CustomerHeader from "@/components/customerdashboard/header/customerHeader";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import Loader from "@/components/globals/Loader";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerDashboardHeader from "@/components/managerdashboard/header/managerheader";
import { config } from "@/config/config";
import withAuth from "@/hoc/withAuth";
import { GetMoreSectionCounts } from "@/store/slices/customer";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function More() {
  const user = useSelector((state) => state.auth.data);
  console.log(user);
  const { moreTabs, isLoading } = useSelector((state) => state.customer);
  const dispatch = useDispatch();
  const getCounts = useCallback(() => {
    if (user?.id) {
      dispatch(GetMoreSectionCounts(user?.partner_id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    getCounts();
  }, [getCounts]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <ManagerDashboardHeader />
        <InnerBanner title={"More"} />
        <div className="py-28 mobile:py-6 mobile:p-4 px-12 bg-gray-100">
          <Container>
            <div className="grid grid-cols-10 gap-16 mobile:grid-cols-2  mobile:gap-4 sm:gap-4">
              {moreTabs?.Overview?.map((item, index) => (
                <div
                  key={index}
                  className="lg:col-span-2 mobile:col-span-1 sm:col-span-4 md-landscape:col-span-4"
                >
                  <Link
                    href={`/dashboard/Project-manager/more/${item?.title}`}
                    className="group"
                  >
                    <div class="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 p-2 rounded-t-lg">
                      <Image
                        src={
                          config?.IMAGE_URL_PATH.replace(
                            "/public/storage",
                            ""
                          ) + item?.image
                        }
                        width={120}
                        height={120}
                        alt="Picture of the author"
                        className="mx-auto"
                      />
                    </div>
                    <div class="bg-white rounded-b-lg p-3 group-hover:bg-blush-red">
                      <h3 class="line-clamp-1 text-black font-normal text-base text-center group-hover:text-white">
                        {item?.title} ({item?.count})
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </Container>
        </div>
        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(More);
