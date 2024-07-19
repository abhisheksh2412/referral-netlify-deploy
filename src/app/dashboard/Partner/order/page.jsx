"use client";
import { copyToClipboard, handleShare } from "@/_utils/browser_utils";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import Modal from "@/components/globals/Modal";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import ManagerCreateFrom from "@/components/PartnerDashboard/forms/managerCreateFrom";
import SellerCreateForm from "@/components/PartnerDashboard/forms/sellerCreateForm";
import PartnerHeader from "@/components/PartnerDashboard/header";
import { Copy, Globe, Share2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FaBirthdayCake,
  FaRegArrowAltCircleRight,
  FaRegCreditCard,
  FaUserTie,
} from "react-icons/fa";
import { MdOutlineMail, MdOutlineSell } from "react-icons/md";

const RenderModalContent = ({ content, handleClose }) => {
  switch (content) {
    case "manager":
      return <ManagerCreateFrom handleClose={handleClose} />;
    case "seller":
      return <SellerCreateForm handleClose={handleClose} />;
    default:
      return null;
  }
};

export default function PartnerOrder() {
  const router = useRouter();
  const [modelContent, setModalContent] = useState(null);
  const handleModalContent = (content) => {
    setModalContent(content);
  };

  return (
    <div>
      <TopHeader />
      <PartnerHeader />
      <InnerBanner title={"Order"} />
      <div className="p-16 mobile:p-4">
        <Container>
          <div className="lg:w-6/12 mobile:w-full sm:w-10/12 md:w-10/12 md-landscape:w-8/12 mx-auto mb-10 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col gap-2 py-5">
              <h1>Open account with Store Access</h1>
              <div className="flex w-full gap-2 items-center ">
                <button
                  onClick={() => handleModalContent("manager")}
                  className="p-2 px-3 bg-blush-red text-white rounded-md w-full hover:bg-pink-300 transition-colors"
                >
                  Project Manager
                </button>
                <button
                  onClick={() => handleModalContent("seller")}
                  className="p-2 px-3 bg-blush-red text-white rounded-md w-full hover:bg-pink-300 transition-colors"
                >
                  Seller
                </button>
              </div>
            </div>
            <h5 className="mb-6 text-base font-semibold text-pink-400 md:text-xl dark:text-white flex items-center gap-2">
              <MdOutlineMail className="text-2xl" />{" "}
              <span>Notification Emails</span>
            </h5>
            <ul className="my-4 space-y-3">
              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 mobile:ms-0 whitespace-nowrap inline-flex items-center gap-3 mobile:gap-1">
                    <FaBirthdayCake className="text-[#0e0a38]" />{" "}
                    <span>Store Birthday</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-28 inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push(
                        "/dashboard/Partner/notificationemails/storeBirthday"
                      )
                    }
                  >
                    Manage <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 mobile:ms-0 whitespace-nowrap inline-flex items-center gap-3 mobile:gap-1">
                    <FaBirthdayCake className="text-[#0e0a38]" />{" "}
                    <span>User Birthday</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-28 inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push(
                        "/dashboard/Partner/notificationemails/userBirthday"
                      )
                    }
                  >
                    Manage <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 mobile:ms-0 whitespace-nowrap inline-flex items-center gap-3 mobile:gap-1">
                    <FaBirthdayCake className="text-[#0e0a38]" />{" "}
                    <span>Send a Message</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-28 inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push(
                        "/dashboard/Partner/notificationemails/sendMessagelist"
                      )
                    }
                  >
                    Manage <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>
            </ul>
          </div>
          <div className="lg:w-6/12 mobile:w-full sm:w-10/12 md:w-10/12 md-landscape:w-8/12 mx-auto mb-10 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100  p-2 rounded-md">
              <h4>Partner Website</h4>
              <Image src="/assets/refferals_img.svg" width={60} height={60} />
            </div>

            <div className="w-full py-3 flex flex-col gap-2">
              <div className="flex justify-between items-center w-full">
                <h6 className="text-xs text-blush-red">Partner Link</h6>
                <Globe className="text-blush-red" size={15} />
              </div>
              <a
                href="https://www.google.com"
                className="text-black underline text-sm"
                target="_blank"
              >
                https://www.testing.com
              </a>
              <div className="w-full flex items-center gap-3">
                <button
                  onClick={() => copyToClipboard("https://www.testing.com")}
                  className="p-2 flex items-center justify-center gap-2 px-3 bg-blush-red text-white rounded-md w-full hover:bg-pink-300 transition-colors"
                >
                  <Copy size={15} /> Copy Link
                </button>
                <button
                  onClick={() => handleShare("https://www.testing.com")}
                  className="p-2 flex items-center justify-center gap-2 px-3 bg-blush-red text-white rounded-md w-full hover:bg-pink-300 transition-colors"
                >
                  <Share2 size={15} /> Share Link
                </button>
              </div>
            </div>
          </div>

          <div className="lg:w-6/12 mobile:w-full sm:w-10/12 md:w-10/12 md-landscape:w-8/12 mx-auto mb-10 p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-6 text-base font-semibold text-pink-400 md:text-xl dark:text-white flex items-center gap-2">
              <MdOutlineMail className="text-2xl" /> <span>Manage Others</span>
            </h5>
            <ul className="my-4 space-y-3">
              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 mobile:ms-0 whitespace-nowrap inline-flex items-center gap-3 mobile:gap-1">
                    <FaUserTie className="text-[#0e0a38]" />
                    <span>Managers</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-40 inline-flex items-center mobile:whitespace-nowrap justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push("/dashboard/Partner/manageOthers/managers")
                    }
                  >
                    View All Managers <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 mobile:ms-0 whitespace-nowrap inline-flex items-center gap-3 mobile:gap-1">
                    <MdOutlineSell className="text-[#0e0a38]" />
                    <span>Seller</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-40 inline-flex items-center mobile:whitespace-nowrap justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push("/dashboard/Partner/manageOthers/sellers")
                    }
                  >
                    View All Seller <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 mobile:ms-0 whitespace-nowrap inline-flex items-center gap-3 mobile:gap-1">
                    <FaRegCreditCard className="text-[#0e0a38]" />
                    <span>Plastic Card</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-40 inline-flex mobile:whitespace-nowrap items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push("/dashboard/Partner/manageOthers/plasticCard")
                    }
                  >
                    View All Plastic Card <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>

              <li>
                <div className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                  <span className="flex-1 ms-3 mobile:ms-0 whitespace-nowrap inline-flex items-center gap-3 mobile:gap-1">
                    <FaRegCreditCard className="text-[#0e0a38]" />{" "}
                    <span>Paper Cards</span>
                  </span>
                  <button
                    type="button"
                    className="w-52 mobile:w-40 mobile:whitespace-nowrap inline-flex items-center justify-center gap-2 px-5 mobile:px-2 py-3 text-sm font-medium text-white bg-blush-red rounded"
                    onClick={() =>
                      router.push("/dashboard/Partner/manageOthers/paperCard")
                    }
                  >
                    View All Paper Cards <FaRegArrowAltCircleRight />
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </Container>
      </div>
      {/* Project manager Account Creation */}
      <Modal
        open={modelContent !== null}
        handleOpen={() => handleModalContent(null)}
      >
        <div className="text-base bg-gradient-to-r from-blush-red to-pink-200 text-white p-3 rounded-t-md">
          <h1>
            Open {modelContent === "seller" ? "Seller" : "Project Manager"}
            Account
          </h1>
        </div>
        <div className="p-4">
          <RenderModalContent
            content={modelContent}
            handleClose={handleModalContent}
          />
        </div>
      </Modal>
      <DashboardFooter />
    </div>
  );
}
