"use client";

import Notification from "@/components/dashboard/dashboardheader/notification";
import Container from "@/components/globals/container";
import Logo from "@/components/globals/logo";
import { useStateManager } from "@/providers/useStateManager";
import { FindSelfUser, resetUser } from "@/store/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaBorderAll, FaRegCreditCard, FaStore } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import PartnerProfileDropdown from "./PartnerProfile";
import { MdPayments } from "react-icons/md";
import toast from "react-hot-toast";

export default function PartnerHeader() {
  const router = useRouter();

  const { token } = useStateManager();
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const redirectToHome = useCallback(async () => {
    if (!user.isAuthenticated && user.isLoggedOut) {
      router.push("/");
    }
  }, [user]);

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
              <PartnerProfileDropdown />
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
            } w-full md:block md:w-auto mobile:absolute mobile:left-0 mobile:right-0 mobile:top-[120px] mobile:bg-[#0e0a38] z-40 `}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col items-center p-4 md:p-0 mt-4  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 mobile:p-0 mobile:mt-0">
              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className="flex items-center gap-1 block py-2 px-3 mobile:px-6 mobile:p-3 mobile:text-white rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500 text-base md:text-base mobile:rounded-none"
                  aria-current="page"
                  href="/dashboard/Partner"
                >
                  Home
                </Link>
              </li>

              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className="flex items-center gap-1 block py-2 px-3 mobile:p-3 mobile:px-6 mobile:text-white text-gray-900 rounded  md:border-0 md:hover:text-blue-700 md:text-base md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base mobile:rounded-none"
                  href="/dashboard/Partner/order"
                >
                  <FaBorderAll />
                  Order
                </Link>
              </li>

              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className="flex items-center gap-1 block py-2 px-3 mobile:p-3 mobile:px-6 mobile:text-white text-gray-900 rounded  md:border-0 md:hover:text-blue-700 md:text-base md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base mobile:rounded-none"
                  href="/dashboard/Partner/store"
                >
                  <FaStore /> Store
                </Link>
              </li>

              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className="flex items-center gap-1 block py-2 px-3 mobile:p-3 mobile:px-6 mobile:text-white text-gray-900 rounded  md:border-0 md:hover:text-blue-700 md:text-base md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base mobile:rounded-none"
                  href="/dashboard/Partner/more"
                >
                  <FaRegCreditCard /> More
                </Link>
              </li>

              <li className="mobile:w-full tab:!ml-3 md-landscape:!ml-3">
                <Link
                  className="flex items-center gap-1 block py-2 px-3 mobile:p-3 mobile:px-6 mobile:text-white text-gray-900 rounded  md:border-0 md:hover:text-blue-700 md:text-base md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent text-base mobile:rounded-none"
                  href="/dashboard/Partner/pay"
                >
                  <MdPayments /> Pay
                </Link>
              </li>

              <li className="mobile:w-full mobile:hidden tab:!ml-3 md-landscape:!ml-3">
                <PartnerProfileDropdown />
              </li>
              <li className="mobile:w-full mobile:hidden tab:!ml-3 md-landscape:!ml-3">
                <Notification />
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
}
