import Link from "next/link";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOutSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "@/store/slices/authSlice";
import { Users2 } from "lucide-react";
import { PiAperture } from "react-icons/pi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Image from "next/image";
import Loader from "@/components/globals/Loader";
import toast from "react-hot-toast";
import {
  Popover,
  PopoverContent,
  PopoverHandler,
} from "@material-tailwind/react";
import clsx from "clsx";

function PartnerProfileDropdown() {
  const pathname = typeof window !== "undefined" ? location.pathname : "";
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function LogOutUser() {
    toast.promise(dispatch(LogoutUser()), {
      loading: "Logging out...",
      success: "Logged out successfully. Redirecting to Home.",
      error: "Failed to log out. Please restart the app.",
    });
  }
  return (
    <Loader isLoading={user.isLoading}>
      <Popover>
        <PopoverHandler>
          <button
            id="dropdownDefaultButton"
            className=" focus:ring-blue-300 font-medium rounded-lg gap-2 mobile:gap-0 mobile:p-0 p-1.5 text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            {user?.data?.profile_photo_url ? (
              <Image
                src={user.data.profile_photo_url}
                width={500}
                height={500}
                alt="Picture of the author"
                className="inline-block h-10 w-10 mobile:rounded-md rounded-full  ring-2 ring-white"
              />
            ) : (
              <Skeleton circle={true} height={40} width={40} />
            )}

            <div className="text-left">
              <h4 className="mb-1">
                {user?.data?.name ? user.data.name : <Skeleton width={100} />}
              </h4>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                {user?.data?.role ? user.data.role : <Skeleton width={60} />}
              </span>
            </div>
          </button>
        </PopoverHandler>
        <PopoverContent className="z-50">
          <div
            id="dropdown"
            className={` block bg-white divide-y divide-gray-100 rounded-lg w-54 dark:bg-gray-700`}
          >
            <ul
              className=" text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <Link
                  href={"/dashboard/Partner/profile"}
                  className={clsx(
                    " px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3",
                    pathname === "/dashboard/Partner/profile" &&
                      "!text-blue-700"
                  )}
                >
                  <FaUser /> Profile
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/Partner/subscribers"}
                  className={clsx(
                    " px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3",
                    pathname === "/dashboard/Partner/subscribers" &&
                      "!text-blue-700"
                  )}
                >
                  <Users2 size={15} /> Subscribers
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/Partner/invoices"}
                  className={clsx(
                    " px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3",
                    pathname === "/dashboard/Partner/invoices" &&
                      "!text-blue-700"
                  )}
                >
                  <PiAperture /> Invoices
                </Link>
              </li>
              <li>
                <Link
                  href={"/dashboard/Partner/settings"}
                  className={clsx(
                    " px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3",
                    pathname === "/dashboard/Partner/settings" &&
                      "!text-blue-700"
                  )}
                >
                  <PiAperture /> Change Settings
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard/Partner/change-password"
                  className={clsx(
                    " px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3",
                    pathname === "/dashboard/Partner/change-password" &&
                      "!text-blue-700"
                  )}
                >
                  <RiLockPasswordFill /> Change Password
                </Link>
              </li>
              <li>
                <hr className="my-0 border-blue-gray-50" role="menuitem" />
              </li>
              <li>
                <button
                  onClick={LogOutUser}
                  className="px-4 w-full hover:rounded-b-xl py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3"
                >
                  <IoLogOutSharp /> Logout
                </button>
              </li>
            </ul>
          </div>
        </PopoverContent>
      </Popover>
      {/* <div>
        <button
          id="dropdownDefaultButton"
          onClick={toggleDropdown}
          className=" focus:ring-blue-300 font-medium rounded-lg gap-2 mobile:gap-0 mobile:p-0 p-1.5 text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          {user?.data?.profile_photo_url ? (
            <Image
              src={user.data.profile_photo_url}
              width={500}
              height={500}
              alt="Picture of the author"
              className="inline-block h-10 w-10 mobile:rounded-md rounded-full  ring-2 ring-white"
            />
          ) : (
            <Skeleton circle={true} height={40} width={40} />
          )}

          <div className="text-left">
            <h4 className="mb-1">
              {user?.data?.name ? user.data.name : <Skeleton width={100} />}
            </h4>
            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
              {user?.data?.role ? user.data.role : <Skeleton width={60} />}
            </span>
          </div>
        </button>

        <div
          id="dropdown"
          className={`z-20 ${
            isOpen ? "block" : "hidden"
          } block bg-white divide-y divide-gray-100 rounded-lg shadow w-54 dark:bg-gray-700 absolute mt-3 -ml-[136px] mt-[17px] rounded-none `}
        >
          <ul
            className=" text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownDefaultButton"
          >
            <li>
              <Link
                href={"/dashboard/Partner/profile"}
                className=" px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3"
              >
                <FaUser /> Profile
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/Partner/subscribers"}
                className=" px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3"
              >
                <Users2 size={15} /> Subscribers
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/Partner/invoices"}
                className=" px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3"
              >
                <PiAperture /> Invoices
              </Link>
            </li>
            <li>
              <Link
                href={"/dashboard/Partner/settings"}
                className=" px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3"
              >
                <PiAperture /> Change Settings
              </Link>
            </li>

            <li>
              <Link
                href="/dashboard/Partner/change-password"
                className=" px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3"
              >
                <RiLockPasswordFill /> Change Password
              </Link>
            </li>
            <li>
              <hr className="my-0 border-blue-gray-50" role="menuitem" />
            </li>
            <li>
              <button
                onClick={LogOutUser}
                className="px-4 w-full hover:rounded-b-xl py-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white flex items-center gap-3"
              >
                <IoLogOutSharp /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div> */}
    </Loader>
  );
}

export default PartnerProfileDropdown;
