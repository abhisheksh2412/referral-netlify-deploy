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

function PartnerProfileDropdown() {
  const user = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  async function LogOutUser() {
    await dispatch(LogoutUser());
  }
  return (
    <div>
      <button
        id="dropdownDefaultButton"
        onClick={toggleDropdown}
        className=" focus:ring-blue-300 font-medium rounded-lg gap-2 mobile:gap-0 mobile:p-0 p-1.5 text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {user?.data?.profile_photo_url ? (
          <img
            className="inline-block h-10 w-10 mobile:rounded-md rounded-full  ring-2 ring-white"
            src={user.data.profile_photo_url}
            alt=""
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
    </div>
  );
}

export default PartnerProfileDropdown;
