"use client";

import Notification from "@/components/dashboard/dashboardheader/notification";
import Container from "@/components/globals/container";
import Logo from "@/components/globals/logo";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { RiCouponLine } from "react-icons/ri";
import { FaRegCreditCard, FaStore } from "react-icons/fa";
import { FaGift } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ManagerProfileDropdown from "./CustomerProfileDropdown";
import { IoGridOutline, IoHome } from "react-icons/io5";
import { FindSelfUser } from "@/store/slices/authSlice";
import { useStateManager } from "@/providers/useStateManager";
import { useRouter } from "next/navigation";
import CustomerProfileDropdown from "./CustomerProfileDropdown";
import clsx from "clsx";

export default function CustomerHeader() {
  const router = useRouter();

  const storeId =
    typeof window !== "undefined" && localStorage.getItem("store_id");
  const pathname = typeof window !== "undefined" ? location.pathname : "";
  const { token } = useStateManager();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const redirectToHome = useCallback(() => {
    if (!user.isAuthenticated && user.isLoggedOut) {
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    redirectToHome();
  }, [redirectToHome]);

  const fetchUser = useCallback(async () => {
    if (token) {
      await dispatch(FindSelfUser());
    }
  }, [dispatch, token]);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <nav className="bg-rose-300">
      <Container>
        <div className=" flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Logo />
          </Link>
          <div className="flex mobile:gap-2 gap-1">
            <div className="md:hidden lg:hidden flex gap-1 mobile:gap-2 m-nav">
              <Notification />
              {/* <button className="relative inline-flex items-center gap-1 px-3 mobile:px-2 mobile:font-normal py-2.5 text-sm mobile:h-10	 font-medium text-center text-white bg-[#0e0a38] rounded-lg">
                <FaGift />
                <strong>120</strong>
              </button> */}
              <ManagerProfileDropdown />
            </div>

            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded={isOpen}
              onClick={handleToggle}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className={`${
              isOpen ? "block" : "hidden"
            } w-full md:block md:w-auto mobile:absolute mobile:left-0 mobile:right-0 mobile:top-[120px] mobile:bg-[#0e0a38] z-40	`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 mobile:p-0 mobile:mt-0">
              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className={clsx(
                    "flex items-center gap-1  py-2 px-3 mobile:px-6 mobile:p-3 mobile:text-white rounded md:bg-transparent md:p-0 dark:text-white text-base md:text-base mobile:rounded-none",
                    pathname === "/dashboard/Customer" && "!text-blue-700"
                  )}
                  aria-current="page"
                  href="/dashboard/Customer"
                >
                  <IoHome /> Home
                </Link>
              </li>
              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className={clsx(
                    "flex items-center gap-1 py-2 px-3 mobile:p-3 mobile:px-6 mobile:text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:text-base md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base mobile:rounded-none",
                    pathname === "/dashboard/Customer/customerCoupon" &&
                      "!text-blue-700"
                  )}
                  href={`/dashboard/Customer/customerCoupon?store_id=${storeId}`}
                >
                  <RiCouponLine />
                  Coupon
                </Link>
              </li>
              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className={clsx(
                    "flex items-center gap-1  py-2 px-3 mobile:p-3 mobile:px-6 mobile:text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:text-base dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base mobile:rounded-none",
                    pathname === "/dashboard/Customer/customerCard" &&
                      "!text-blue-700"
                  )}
                  href={`/dashboard/Customer/customerCard?store_id=${storeId}`}
                >
                  <FaRegCreditCard /> Card
                </Link>
              </li>
              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className={clsx(
                    "flex items-center gap-1 py-2 px-3 mobile:p-3 mobile:px-6 mobile:text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:text-base dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base mobile:rounded-none",
                    pathname === "/dashboard/Customer/customerStoreList" &&
                      "!text-blue-700"
                  )}
                  href="/dashboard/Customer/customerStoreList"
                >
                  <FaStore /> Store
                </Link>
              </li>
              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className={clsx(
                    "flex items-center gap-1 py-2 px-3 mobile:p-3 mobile:px-6 mobile:text-white text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:text-base dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base mobile:rounded-none",
                    pathname === "/dashboard/Customer/more" && "!text-blue-700"
                  )}
                  href="/dashboard/Customer/more"
                >
                  <IoGridOutline /> More
                </Link>
              </li>

              <li className="mobile:hidden mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <CustomerProfileDropdown />
              </li>

              <li className="mobile:hidden mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Notification />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
}
