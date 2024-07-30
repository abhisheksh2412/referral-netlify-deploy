"use client";
import React, { useCallback, useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import { config } from "@/config/config";
import calculateAge from "@/_utils/ageCalculator";
import { useDispatch } from "react-redux";
import {
  DeleteStoreBirthday,
  FetchStoreBirthdayList,
} from "@/store/slices/orders";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Image from "next/image";

function StoreBirthdayCard({ data, handleEdit = null }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleDeleteBirthday = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(DeleteStoreBirthday(id));
        dispatch(FetchStoreBirthdayList());
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div className="block relative max-w-sm p-4 border bg-gray-100 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 border-l-4 border-blush-500 group">
        <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 absolute right-2 top-2">
          <button
            className="cursor-pointer bg-red-700 p-1 rounded"
            onClick={() => handleDeleteBirthday(data?.id)}
          >
            <MdDeleteOutline className="text-white" />
          </button>
          <button
            className="cursor-pointer bg-green-700 p-1 rounded"
            onClick={() => handleEdit(data)}
          >
            <TiPencil className="text-white" />
          </button>
        </div>
        <div className="flex items-center gap-2">
         
          <Image
            src={config.IMAGE_URL_PATH + data?.birthday_image}
            width={500}
            height={500}
            alt="Picture of the author"
            class="w-20 h-20 ml-0 rounded-full p-1 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50"
          />

          <div>
            <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white text-pink-400">
              {data?.store?.name}
            </h5>
            <table className="w-full mt-3">
              <tbody>
                <tr>
                  <th className="text-left text-sm font-semibold pr-5">
                    Birthday
                  </th>
                  <td className="text-left text-sm">{data?.dob}</td>
                </tr>
                <tr>
                  <th className="text-left text-sm font-semibold pr-5">Age</th>
                  <td className="text-left text-sm">
                    {calculateAge(data?.dob)} Year
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button class=" bg-blush-red inline-block flex items-center justify-center gap-2 py-2 rounded-md text-white px-4 w-full mt-6">
          Send <IoIosSend />
        </button>
      </div>
    </div>
  );
}

export default StoreBirthdayCard;
