import React from "react";
import { FaRegUser } from "react-icons/fa";
import { GrStatusInfo } from "react-icons/gr";
import { HiOutlineMail } from "react-icons/hi";
import { MdOutlineAccessTime } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { HandeStatus } from "./userStatus";
import moment from "moment";

function UsersCard({ data }) {
  return (
    <div>
      <div className="block p-0 bg-white border border-gray-200 rounded-lg shadow">
       
            <div className="flex justify-between items-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 px-2">
              <div
                
                className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#0e0a38] flex items-center justify-center">
                  {" "}
                  <FaRegUser className="text-base text-white" />
                </div>
                Name :
              </div>
              <div className="px-2 py-3 break-all"><p className="text-sm">{data?.name}</p></div>
            </div>

            <div className="flex justify-between items-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 px-2">
              <div
                
                className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#0e0a38] flex items-center justify-center">
                  {" "}
                  <HiOutlineMail className="text-base text-white" />
                </div>
                Email :
              </div>
              <div className="px-2 py-3 break-all"><p className="text-sm">{data?.email}</p></div>
            </div>

            <div className="flex justify-between items-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 px-2">
              <div
                
                className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#0e0a38] flex items-center justify-center">
                  {" "}
                  <GrStatusInfo className="text-base text-white" />
                </div>
                Status :
              </div>
              <div className="px-2 py-3 break-all">
                <HandeStatus className="text-base" status={data?.status} />
              </div>
            </div>

            <div className="flex justify-between items-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 px-2">
              <div
                
                className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#0e0a38] flex items-center justify-center">
                  {" "}
                  <MdOutlineAccessTime className="text-base text-white" />
                </div>
                Assigned At :
              </div>
              <div className="px-2 py-3 break-all">
              <p className="text-sm">{moment(data?.created_at).format("DD-MM-YYYY hh:mm a")}</p>
              </div>
            </div>

            <div className="flex justify-between items-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 px-2">
              <div
                
                className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2 "
              >
                <div className="w-8 h-8 rounded-full bg-[#0e0a38] flex items-center justify-center">
                  {" "}
                  <MdOutlineAccessTime className="text-base text-white" />
                </div>{" "}
                Created At :
              </div>
              <div className="px-2 py-3 break-all">
              <p className="text-sm">{moment(data?.created_at).format("DD-MM-YYYY hh:mm a")}</p>
              </div>
            </div>

            <div className="flex justify-between items-center odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 px-2">
              <div
                
                className="px-2 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-[#0e0a38] flex items-center justify-center">
                  {" "}
                  <FaMobileAlt className="text-base text-white" />
                </div>{" "}
                Mobile Number :
              </div>
              <div className="px-2 py-3  break-all"><p className="text-sm">{data?.mobile_number}</p></div>
            </div>
    
      </div>
    </div>
  );
}

export default UsersCard;
