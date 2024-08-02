"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaShareAlt, FaPlusCircle, FaWallet } from "react-icons/fa";
import { TicketCheck } from "lucide-react";

import Card from "@/components/dashboard/enterCard/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import VoucherTable from "@/components/dashboard/voucherTable/page";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Modal from "@/components/globals/Modal";
import Invite from "@/components/dashboard/Invite";
import RegisterCard from "@/components/dashboard/RegisterCard";
import AssignCouponToCard from "@/components/dashboard/AssignCoupon";
import VoucherLists from "@/components/dashboard/VoucherList";
import EditProductsPoints from "@/components/dashboard/productPointsScreens/EditProductPoints";
import withAuth from "@/hoc/withAuth";
import Loader from "@/components/globals/Loader";
import { EndSession } from "@/store/slices/userSlice";
import { useSellerContext } from "@/providers/useSellerOrders";

const SellerDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userByCard, isLoading } = useSelector((state) => state.user);
  const [reset, setReset] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const [productPointsModal, setProductPointsModal] = useState(false);
  const [cardRegModal, setCardRegModal] = useState(false);
  const [addCoupon, setAddCoupon] = useState(false);
  const [voucherModal, setVoucherModal] = useState(false);

  const { time, isActive, startCountdown } = useSellerContext();

  const handleInviteModal = () => setInviteModal(!inviteModal);
  const handleProductPointsModal = (value = null) => {
    if (userByCard?.card_number) {
      if (value) {
        setProductPointsModal(value);
      } else {
        setProductPointsModal(!productPointsModal);
      }
    } else {
      toast.error("Please Enter a Card Number", { position: "top-right" });
    }
  };
  const handleCardRegModal = () => setCardRegModal(!cardRegModal);
  const handleAddCoupon = () => {
    if (!userByCard?.card_number) {
      toast.error("Please Enter A Card  Number", {
        position: "top-right",
      });
    } else {
      userByCard?.card_number && setAddCoupon(!addCoupon);
    }
  };
  const handleVoucherModal = () => setVoucherModal(!voucherModal);

  const handleEndSession = () => {
    dispatch(EndSession());
    setReset(true);
    if (typeof window !== "undefined") {
      localStorage.removeItem("card_no");
      startCountdown(0);
      sessionStorage.removeItem("time");
    }
    toast.error("Session Expired");
  };

  // const handleNavigateToUrl = (path) => {
  //   if (!userByCard?.id) {
  //     return toast("Please enter the card number first");
  //   }
  //   return router.push(path);
  // };

  const handleExtendTime = (time) => startCountdown(time);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const lastTime = sessionStorage.getItem("time");
      if (lastTime) {
        startCountdown(lastTime);
      } else {
        if (userByCard?.session_timeout) {
          startCountdown(userByCard?.session_timeout);
        }
      }
    }
  }, [userByCard, startCountdown]);

  useEffect(() => {
    if (userByCard?.session_timeout && !isActive) {
      handleEndSession();
    }
  }, [isActive]);

  return (
    <Loader isLoading={isLoading}>
      <div>
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
          <div className="bg-white relative p-14 mobile:p-4 -top-12 mobile:!top-0 rounded-t-lg mt-3">
            <Card reset={reset} />
          </div>
          <div className="text-center">
            <button
              onClick={handleInviteModal}
              className="text-white lg:w-1/3 bg-blush-red text-lg rounded-lg p-3 block mx-auto flex items-center justify-center gap-2 mobile:mt-14"
            >
              <FaShareAlt /> <span>Invite</span>
            </button>
            <Modal open={inviteModal} handleOpen={handleInviteModal}>
              <div className="flex justify-between items-center modal-header w-full p-4 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                <h4 className="text-xl leading-tight mb-0 font-semibold text-black">
                  Send Invitation
                </h4>
              </div>
              <Invite
                handleModel={handleInviteModal}
                inviteModal={inviteModal}
              />
            </Modal>
          </div>
        </Container>

        <div className="pb-0 mt-12 mobile:m-3">
          <Container>
            <div className="bg-gray-100 p-0 rounded-lg relative lg:w-3/4 mobile:w-full md:w-5/6 sm:w-4/6 mx-auto mt-12">
              <div className="flex items-center justify-between py-8 px-8 mobile:py-2 mobile:px-2">
                <div>
                  <h2 className="text-lg mobile:text-base leading-tight mb-0 font-semibold">
                    Card Not Registered?
                  </h2>
                </div>
                <div>
                  <button
                    className="text-white bg-blush-red text-md rounded-lg py-3 px-8 mobile:px-3 block"
                    type="button"
                    onClick={handleCardRegModal}
                  >
                    Register Now
                  </button>
                </div>
              </div>

              <Modal
                size={"sm"}
                open={cardRegModal}
                handleOpen={handleCardRegModal}
              >
                <div className="flex justify-between items-center modal-header w-full p-4 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                  <h4 className="text-xl leading-tight mb-0 font-semibold text-black">
                    Card Register
                  </h4>
                </div>
                <RegisterCard handleClose={handleCardRegModal} />
              </Modal>

              <div className="bg-[#f4739e] p-8 rounded-b-lg relative bg-[url('/assets/bg-1.png')] bg-no-repeat bg-cover py-5 px-8 md:px-4 mobile:px-0">
                <div className="flex items-center justify-between mobile:!inline-block py-5 px-8 md:px-0 mobile:px-4 mobile:py-2">
                  <div className="flex items-center justify-between bg-white mobile:w-full p-5 rounded-lg gap-4 mobile:mb-3">
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
                    <button
                      onClick={handleProductPointsModal}
                      className="text-white bg-[#0e0a38] text-md rounded-lg py-3 px-8 flex items-center gap-2 justify-center"
                    >
                      <FaPlusCircle /> <span>Add Points</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Modal
          size={"xl"}
          open={productPointsModal}
          handleOpen={handleProductPointsModal}
        >
          <div className="rounded-md overflow-hidden">
            <div className="p-2 py-2.5 rounded-t-md bg-blush-red pr-20 text-white flex justify-between items-center">
              <h5>Product And Points</h5> <h5>{time}</h5>
            </div>

            <EditProductsPoints handleClose={handleProductPointsModal} />
          </div>
        </Modal>

        <div className="mb-12 mobile:m-3">
          <Container>
            <div className="lg:w-2/4 mobile:w-full sm:w-4/6 mx-auto mt-12">
              <VoucherTable />
              <div className="flex items-center justify-between p-5 bg-gray-100 mt-12 rounded-lg">
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
                  className="flex gap-2 p-3 rounded-md bg-blush-red text-white px-4 text-sm items-center hover:shadow-xl transition-all"
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
              <AssignCouponToCard handleClose={handleAddCoupon} />
            </Modal>
          </Container>
        </div>
        {userByCard?.session_timeout && (
          <Container>
            <div className="lg:w-2/4 sm:w-4/6 mobile:w-full mx-auto my-12 mobile:my-4">
              <div className="flex items-center mobile:inline-block justify-between mobile:w-full p-5 bg-gray-100 mt-12 rounded-lg">
                <div>
                  <h3 className="text-md font-medium mobile:text-center mobile:mb-4">
                    The Session Will Expire{" "}
                    <b className="text-blush-red">{time}</b>
                  </h3>
                </div>

                <div className="flex items-center justify-center gap-3 md:gap-1">
                  <button
                    type="button"
                    onClick={() =>
                      handleExtendTime(userByCard?.session_timeout)
                    }
                    className="text-white bg-green-500 w-32 md:w-24 py-3 px-2 rounded text-sm"
                  >
                    Extend
                  </button>
                  <button
                    type="button"
                    onClick={handleEndSession}
                    className="text-white bg-blush-red w-32 md:w-26 py-3 px-2 rounded text-sm"
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
