"use client";
import Card from "@/components/dashboard/enterCard/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import { FaShareAlt } from "react-icons/fa";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import { FaPlusCircle } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import VoucherTable from "@/components/dashboard/voucherTable/page";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Modal from "@/components/globals/Modal";
import { useEffect, useState } from "react";
import Invite from "@/components/dashboard/Invite";
import withAuth from "@/hoc/withAuth";
import Loader from "@/components/globals/Loader";
import RegisterCard from "@/components/dashboard/RegisterCard";
import { EndSession } from "@/store/slices/userSlice";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { FaPen } from "react-icons/fa";
import AssignCouponToCard from "@/components/dashboard/AssignCoupon";
import { useSellerContext } from "@/providers/useSellerOrders";
import { TicketCheck } from "lucide-react";
import VoucherLists from "@/components/dashboard/VoucherList";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { userByCard, isLoading } = useSelector((state) => state.user);
  const [reset, setReset] = useState(false);

  const [inviteModal, setInviteModal] = useState(false);
  const HandleInviteModal = () => setInviteModal(!inviteModal);

  const [cardregModal, setRegisterModal] = useState(false);
  const HandleRegisterModal = () => setRegisterModal(!cardregModal);

  const [addCoupon, setAddCoupon] = useState(false);
  const handleAddCoupon = () => {
    if (userByCard?.card_number) {
      setAddCoupon(!addCoupon);
    }
  };

  const [voucherModal, setVoucherModal] = useState(false);
  const handleVoucherModal = () => setVoucherModal(!voucherModal);

  function handleEndSession() {
    // dispatch(EndSession());
    // setReset(true);
    // if (typeof window !== "undefined") {
    //   localStorage.removeItem("card_no");
    // }
  }

  const { time, isActive, startCountdown } = useSellerContext();
  const [addpointsModal, setAddPointsModal] = useState(false);
  const HandleAddPointsModal = () => setAddPointsModal(!addpointsModal);
  const handleExtendTime = (time) => startCountdown(time);

  useEffect(() => {
    if (userByCard?.session_timeout) {
      startCountdown(userByCard?.session_timeout);
    }
  }, [userByCard, startCountdown]);

  useEffect(() => {
    if (userByCard?.session_timeout) {
      if (isActive === false) {
        handleEndSession();
      }
    }
  }, [isActive]);

  return (
    <Loader isLoading={isLoading}>
      <div>
        {/* <h1>{user?.data?.name}</h1> */}
        <TopHeader />
        <DashboardHeader />

        <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 min-h-48 mobile:min-h-28 flex items-center justify-center">
          <Container>
            <h3 className="text-center text-2xl leading-tight mb-6 font-bold text-black">
              Welcome to Partner
            </h3>
          </Container>
        </div>

        <Container>
          <div className="bg-white relative p-14 mobile:p-4  -top-12 mobile:!top-0 rounded-t-lg mt-3">
            <Card reset={reset} />
          </div>
          <div className="text-center">
            <button
              onClick={HandleInviteModal}
              className="text-white lg:w-1/3	bg-blush-red text-lg rounded-lg p-3 block mx-auto flex items-center justify-center gap-2 mobile:mt-14"
            >
              <FaShareAlt /> <span>Invite</span>
            </button>
            <Modal open={inviteModal} handleOpen={HandleInviteModal}>
              <div className="flex justify-between items-center modal-header w-full p-4 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                <h4 className="text-xl leading-tight mb-0 font-semibold text-black">
                  Send Invitation
                </h4>
              </div>
              <Invite
                handleModel={HandleInviteModal}
                inviteModal={inviteModal}
              />
            </Modal>
          </div>
        </Container>

        <div className="pb-0 mt-12 mobile:m-3">
          <Container>
            <div className="bg-gray-100 p-0 rounded-lg relative lg:w-3/4 mobile:w-full md:w-5/6 sm:w-4/6 mx-auto mt-12 ">
              <div className="flex items-center justify-between py-8 px-8 mobile:py-2 mobile:px-2">
                <div>
                  <h2 className="text-lg mobile:text-base leading-tight mb-0 font-semibold ">
                    Card Not Registered ?
                  </h2>
                </div>
                <div>
                  <button
                    className="text-white bg-blush-red text-md rounded-lg py-3 px-8 mobile:px-3 block"
                    type="button"
                    onClick={HandleRegisterModal}
                  >
                    Register Now
                  </button>
                </div>
              </div>

              <Modal
                size={"sm"}
                open={cardregModal}
                handleOpen={HandleRegisterModal}
              >
                <div className="flex justify-between items-center modal-header w-full p-4 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                  <h4 className="text-xl leading-tight mb-0 font-semibold text-black">
                    Card Register
                  </h4>
                </div>
                <RegisterCard handleClose={HandleRegisterModal} />
              </Modal>

              <div className="bg-[#f4739e] p-8 rounded-b-lg relative  bg-[url('/assets/bg-1.png')] bg-no-repeat; bg-cover py-5 px-8  md:px-4 mobile:px-0">
                <div className="flex items-center justify-between mobile:!inline-block py-5 px-8 md:px-0 mobile:px-4 mobile:py-2">
                  <div className="flex items-center justify-between bg-white  mobile:w-full p-5 rounded-lg gap-4 mobile:mb-3 ">
                    <div className="flex items-center gap-4">
                      <div className="bg-blush-red h-16 w-16 rounded-full flex items-center justify-center">
                        <FaWallet className="text-white h-8 w-8" />
                      </div>
                      <div>
                        <h3 className="text-black text-lg font-semibold">
                          Total Points
                        </h3>
                        <p>User Wallet Points</p>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold">
                        {userByCard?.customerPoints?.total_points || "00"}
                      </h2>
                    </div>
                  </div>

                  <div>
                    <Link
                      onClick={HandleAddPointsModal}
                      href="/dashboard/Seller/editProductsPoints"
                      className="text-white bg-[#0e0a38] text-md rounded-lg py-3 px-8  flex items-center gap-2 justify-center"
                    >
                      <FaPlusCircle /> <span>Add Points</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
        {/* 
        <Modal
          size={"md"}
          open={addpointsModal}
          handleOpen={HandleAddPointsModal}
        >
          <div className="w-full p-4 rounded-t-md bg-gradient-to-r from-blush-red to-pink-200">
            <h3 className="text-xl leading-tight mb-0 font-semibold text-black">
              Add Points
            </h3>
          </div>
          <div className="p-6">
            <div className="text-right">
              <Link
                className="text-white bg-blush-red text-md rounded-lg py-3 px-8 mobile:px-2 block flex items-center justify-center gap-2 w-48	 mx-auto mr-0 mb-[25px]"
                href="/dashboard/Seller/editProductsPoints"
              >
                <FaPen /> <span> Edit List</span>
              </Link>
            </div>
            <div className="relative overflow-y-auto h-[30rem] p-3">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3	 lg:gap-5">
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                    <FaCheckCircle className="absolute top-[10px] right-[12px] text-[30px] text-green-500" />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                    <FaCheckCircle className="absolute top-[10px] right-[12px] text-[30px] text-green-500" />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                    <FaCheckCircle className="absolute top-[10px] right-[12px] text-[30px] text-green-500" />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
                <div className="shadow text-center cursor-pointer rounded-b-lg">
                  <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
                    <Image
                      src="/assets/combo-3.png"
                      width={250}
                      height={250}
                      className="!w-24 !h-24 mx-auto object-cover"
                    />
                    \
                  </div>
                  <div className="py-2 px-1 border-t">
                    <h4 className="font-medium text-blush-red">Product Name</h4>
                    <p className="font-bold"> Points</p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" pt-8 md:w-1/2 lg:w-1/2	mx-auto">
              <div className="w-full relative">
                <input
                  id="price"
                  class="block w-full rounded-lg p-4  mt-5 shadow-inherit !bg-gray-100 outline-none mb-6 text-left"
                  placeholder="Enter Points"
                  type="text"
                />
                <button className="text-white bg-blush-red text-md rounded-r-lg py-3 px-8 absolute top-0 right-0 bottom-0">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </Modal> */}

        <div className="mb-12 mobile:m-3">
          <Container>
            <div className="lg:w-2/4	mobile:w-full sm:w-4/6 mx-auto mt-12 ">
              <VoucherTable />
              <div className="flex items-center justify-between p-5 bg-gray-100  mt-12 rounded-lg">
                <div>
                  <button
                    className="text-white bg-blush-red text-md rounded-lg py-3 px-8 mobile:px-2 block flex items-center gap-2"
                    onClick={handleAddCoupon}
                  >
                    <FaPlusCircle /> <span>Add Coupon</span>
                  </button>
                </div>
                <button
                  onClick={handleVoucherModal}
                  title="vouchers"
                  className="flex gap-2 p-3 rounded-md bg-blush-red text-white px-4 text-sm items-center  hover:shadow-xl transition-all"
                >
                  <TicketCheck /> Voucher
                </button>
              </div>
            </div>

            <Modal
              open={voucherModal}
              size={"md"}
              handleOpen={handleVoucherModal}
            >
              <VoucherLists />
            </Modal>
            <Modal open={addCoupon} handleOpen={handleAddCoupon}>
              <AssignCouponToCard />
            </Modal>
          </Container>
        </div>
        {userByCard?.session_timeout && (
          <Container>
            <div className="lg:w-2/4 sm:w-4/6 mobile:w-full	mx-auto my-12 mobile:my-4">
              <div className="flex items-center mobile:inline-block justify-between mobile:w-full p-5 bg-gray-100  mt-12 rounded-lg ">
                <div>
                  <h3 className="text-md font-medium mobile:text-center mobile:mb-4">
                    The Session Will Expire <b class="text-blush-red">{time}</b>
                  </h3>
                </div>

                <div className="flex items-center justify-center	gap-3 md:gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleExtendTime(userByCard?.session_timeout)
                    }
                    class="text-white bg-green-500 w-32 md:w-24	py-3 px-2  rounded text-sm"
                  >
                    Extend
                  </button>
                  <button
                    type="button"
                    onClick={handleEndSession}
                    class="text-white bg-blush-red w-32 md:w-26	py-3 px-2 rounded text-sm"
                  >
                    End Session
                  </button>
                </div>
              </div>
            </div>
          </Container>
        )}

        <DashboardFooter />
      </div>
    </Loader>
  );
};

export default withAuth(SellerDashboard);
