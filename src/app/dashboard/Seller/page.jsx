"use client";
import Card from "@/components/dashboard/enterCard/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import { FaShareAlt } from "react-icons/fa";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import { FaPlusCircle } from "react-icons/fa";
import { FaWallet } from "react-icons/fa";
import Link from "next/link";
import { useSelector } from "react-redux";
import VoucherTable from "@/components/dashboard/voucherTable/page";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import Modal from "@/components/globals/Modal";
import { useState } from "react";
import Invite from "@/components/dashboard/Invite";
import withAuth from "@/hoc/withAuth";
import Swal from "sweetalert2";
import EasySelect from "@/components/globals/EasySelect";

const SellerDashboard = () => {
  const user = useSelector((state) => state.auth);

  const [inviteModal, setInviteModal] = useState(false);
  const HandleInviteModal = () => setInviteModal(!inviteModal);


  const [cardregModal, setRegisterModal] = useState(false);
  const HandleRegisterModal = () => setRegisterModal(!cardregModal);


  const options = [
    { label: "12314585558887", value: "name",
      label: "89514585558887", value: "name"
     }
  ]



  return (
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
          <Card />
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
            <Invite handleModel={HandleInviteModal} inviteModal={inviteModal} />
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
                  className="text-white bg-blush-red text-md rounded-lg py-3 px-8 mobile:px-3 block" type="button"
                  onClick={HandleRegisterModal}
                >
                  Register Now
                </button>
              </div>
            </div>

            <Modal size={"sm"} open={cardregModal} handleOpen={HandleRegisterModal}>
              <div className="flex justify-between items-center modal-header w-full p-4 border-b rounded-t dark:border-gray-600 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
                <h4 className="text-xl leading-tight mb-0 font-semibold text-black">
                Card Register
                </h4>
              </div>
              <div className="p-6">

                <form>
                  <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                      <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                      <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                      <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                      <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>



                  </div>
                  <div class="mb-6">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
                  </div>

                  <div class="mb-6">
                    <EasySelect options={options} />
                  </div>

                  <button type="submit" className="text-white bg-blush-red font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>

              </div>
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
                    <h2 className="text-2xl font-bold">251</h2>
                  </div>
                </div>

                <div>
                  <Link
                    className="text-white bg-[#0e0a38] text-md rounded-lg py-3 px-8 block flex items-center gap-2 items-center justify-center"
                    href="/"
                  >
                    <FaPlusCircle /> <span>Add Points</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <div className="mb-12 mobile:m-3">
        <Container>
          <div className="lg:w-2/4	mobile:w-full sm:w-4/6 mx-auto mt-12 ">
            <VoucherTable />
            <div className="flex items-center justify-between p-5 bg-gray-100  mt-12 rounded-lg">
              <div>
                <Link
                  className="text-white bg-blush-red text-md rounded-lg py-3 px-8 mobile:px-2 block flex items-center gap-2"
                  href="/"
                >
                  <FaPlusCircle /> <span>Add Coupon</span>
                </Link>
              </div>

              <div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-blush-red">Click QR</span>
                  <button
                    type="button"
                    className="bg-white h-16 w-16 rounded-full flex items-center justify-center"
                  >
                    <MdOutlineQrCodeScanner className="h-8 w-8 text-blush-red" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="lg:w-2/4 sm:w-4/6 mobile:w-full	mx-auto my-12 mobile:my-4">
          <div className="flex items-center mobile:inline-block justify-between mobile:w-full p-5 bg-gray-100  mt-12 rounded-lg ">
            <div>
              <h3 className="text-md font-medium mobile:text-center mobile:mb-4">
                The Session Will Expire <b class="text-blush-red">58:77</b>
              </h3>
            </div>

            <div className="flex items-center justify-center	gap-3 md:gap-1">
              <button
                type="button"
                class="text-white bg-green-500 w-32 md:w-24	py-3 px-2  rounded text-sm"
              >
                Extend
              </button>
              <button
                type="button"
                class="text-white bg-blush-red w-32 md:w-26	py-3 px-2 rounded text-sm"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      </Container>

      <DashboardFooter />
    </div>
  );
};

export default withAuth(SellerDashboard);
