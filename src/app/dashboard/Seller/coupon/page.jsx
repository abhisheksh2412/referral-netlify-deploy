"use client";
import CouponCard from "@/components/coupon/couponcard";
import CouponFilter from "@/components/coupon/filter";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import Modal from "@/components/globals/Modal";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import Image from "next/image";
import InnerBanner from "@/components/innerpagebanner/page";
import { config } from "@/config/config";
import { GetAllSellerCoupons } from "@/store/slices/coupon";
import {
  Button,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import clsx from "clsx";
import Loader from "@/components/globals/Loader";
import withAuth from "@/hoc/withAuth";

function Coupon() {
  const coupons = useSelector((state) => state.coupon);
  const user = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState(null);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const data = [
    {
      label: `New (${coupons?.couponsList?.data?.length})`,
      value: "new",
      desc: coupons?.couponsList?.data,
    },
    {
      label: `Active Coupon (${
        coupons?.couponsList?.data?.filter((item) => item?.status === "active")
          .length
      })`,
      value: "active",
      desc: coupons?.couponsList?.data?.filter(
        (item) => item?.status === "active"
      ),
    },
    {
      label: `Inactive Coupon (${
        coupons?.couponsList?.data?.filter(
          (item) => item?.status === "inactive"
        ).length
      })`,
      value: "inactive",
      desc: coupons?.couponsList?.data?.filter(
        (item) => item?.status === "inactive"
      ),
    },
  ];

  const handleOpen = (itemId) => {
    const activeData = coupons?.couponsList?.data?.find(
      (item) => item?.id === itemId
    );
    setSelectedCoupon(activeData);
    setOpen(!open);
  };
  const dispatch = useDispatch();

  const getCouponse = useCallback(() => {
    dispatch(GetAllSellerCoupons(user?.data?.id));
  }, [dispatch, user?.data?.id]);

  useEffect(() => {
    if (user?.data?.id) {
      getCouponse();
    }
  }, [getCouponse, user?.data?.id]);

  return (
    <div>
      <TopHeader />
      <DashboardHeader />
      <InnerBanner title={"Coupon List"} />

      <Loader isLoading={coupons?.isLoading}>
        <div className="bg-gray-100 p-16   p-16 mobile:p-4">
          <div className="p-8 mobile:p-0">
            <Container>
              <Tabs value="new" className="">
                <div className="block p-2 bg-white border border-gray-200 rounded-full shadow  dark:bg-gray-800 dark:border-gray-700  lg:w-3/5 mobile:w-full sm:w-12/12 mx-auto">
                  <TabsHeader
                    className="bg-transparent"
                    indicatorProps={{
                      className: "bg-blush-red shadow-none rounded-full",
                    }}
                  >
                    {data.map(({ label, value }) => (
                      <Tab
                        className="p-3 mobile:p-1 mobile:py-2 whitespace-nowrap font-semibold mobile:text-xs	"
                        activeClassName="!text-white"
                        key={value}
                        value={value}
                      >
                        {label}
                      </Tab>
                    ))}
                  </TabsHeader>
                </div>

                <TabsBody
                  animate={{
                    initial: { y: 250 },
                    mount: { y: 0 },
                    unmount: { y: 250 },
                  }}
                  className="mt-10 mobile:mt-5"
                >
                  {data.map(({ value, desc }) => (
                    <TabPanel key={value} value={value}>
                      <Container>
                        <div className="grid grid-cols-4 mobile:grid-cols-1 md:grid-cols-3 sm:grid-cols-3 gap-4">
                          {desc?.length === 0 ? (
                            <h5 className="text-sm text-gray-500 text-center font-semibold">
                              No Data
                            </h5>
                          ) : (
                            desc?.map((item, index) => (
                              <div
                                key={index}
                                onClick={() => handleOpen(item?.id)}
                                className="cursor-pointer"
                              >
                                <CouponCard data={item} />
                              </div>
                            ))
                          )}
                        </div>
                      </Container>
                    </TabPanel>
                  ))}
                </TabsBody>
              </Tabs>
            </Container>
          </div>

          {/* Details modal  */}
          <Modal open={open} handleOpen={handleOpen} size={"md"}>
            <div className="flex justify-between items-center modal-header w-full p-4 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
              <h4 className="text-xl leading-tight mb-0 font-semibold text-black">
                Coupon Details
              </h4>
              <span
                className={clsx(
                  "text-sm font-semibold me-2 px-4 py-2 rounded-full",
                  selectedCoupon?.status === "active"
                    ? " bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                )}
              >
                {selectedCoupon?.status}
              </span>
            </div>

            <div className="p-5">
              <div className="">
                <div className="mb-3">
                  <Image
                    src={config.IMAGE_URL_PATH + selectedCoupon?.coupon_image}
                    width={500}
                    height={500}
                    alt="gift"
                    className="w-16 h-16 rounded-full shadow p-1"
                  />
                </div>

                <div className="">
                  <h3 className="text-md font-semibold text-black mb-1">
                    {selectedCoupon?.coupon_code}
                  </h3>
                  <p className="text-base text-gray-500">
                    {selectedCoupon?.description}
                  </p>
                </div>
              </div>

              <div className="flex justify-between  py-5 px-2">
                <div>
                  <h5 className="text-md font-semibold text-black mb-1">
                    Coupon Code :
                  </h5>
                  <strong className="font-semibold">
                    {selectedCoupon?.coupon_code}
                  </strong>
                </div>

                <div>
                  <h5 className="text-md font-semibold text-black mb-1">
                    Coupon Value :
                  </h5>
                  <strong className="font-semibold">
                    {selectedCoupon?.coupon_value}
                  </strong>
                </div>

                <div>
                  <h5 className="text-md font-semibold text-black mb-1">
                    Valid Until Date:
                  </h5>
                  <strong className="font-semibold">
                    {moment(selectedCoupon?.expire_at).format("DD-MM-YYYY")}{" "}
                    -&nbsp;
                    {moment(selectedCoupon?.expire_at).format("hh:mm a")}
                  </strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <Button
                variant="text"
                color="white"
                onClick={handleOpen}
                className="mr-1 !bg-blush-red"
              >
                <span>Close</span>
              </Button>
            </div>
          </Modal>
        </div>
      </Loader>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(Coupon);
