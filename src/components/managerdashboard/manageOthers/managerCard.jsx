import React from "react";
import Image from "next/image";
import { VscVerified } from "react-icons/vsc";
import clsx from "clsx";
import { Clock10Icon } from "lucide-react";
import { Button } from "@material-tailwind/react";

const RenderStatus = ({ status }) => {
  switch (status) {
    case "active":
      return (
        <span
          className={clsx(
            "bg-green-100 text-green-800 text-xs font-medium me-2 px-2 py-1 rounded-full inline-flex items-center gap-1"
          )}
        >
          <VscVerified className="w-4 h-4" />
          Verified
        </span>
      );
    case "pending":
      return (
        <span
          className={clsx(
            "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2 py-1 rounded-full inline-flex items-center gap-1"
          )}
        >
          <Clock10Icon className="w-4 h-4" />
          Pending
        </span>
      );

    default:
      break;
  }
};
function ManagerCard({ data, showDetails }) {
  return (
    <div onClick={() => showDetails(data)}>
      <div className=" bg-white rounded-lg  relative p-2 new-shadow rounded-b-lg border-2 border-red-50 cursor-pointer hover:shadow-md transition-shadow">
        <div className="flex items-center gap-4 ">
          <div className="w-1/3">
            <Image
              src={data?.profile_photo_url}
              width={100}
              height={100}
              alt="user_img"
              className="rounded bg-white shadow p-1"
            />
          </div>
          <div className="w-2/3">
            <h3 className="text-base font-semibold  text-pink-400 mb-2">
              {data?.name}
            </h3>
            <h5 className="text-gray-500 text-sm mb-2">{data?.email}</h5>

            <div className="flex justify-between items-center">
              <RenderStatus status={data?.status} />
              {data?.status !== "active" && (
                <Button className="bg-green-500 !p-1.5 !text-xs !font-normal">
                  Verify
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerCard;
