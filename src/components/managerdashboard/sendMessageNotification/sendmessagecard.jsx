"use client";
import React, { useCallback } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import Image from "next/image";
import moment from "moment";
import {
  DeleteSendMessage,
  GetSendMessageList,
  SendMessage,
} from "@/store/slices/orders";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

function SendMessageCard({ data, handleEdit }) {
  const order = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const getSendMessage = useCallback(() => {
    dispatch(GetSendMessageList());
  }, [dispatch]);

  const handleDelete = (id) => {
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
        await dispatch(DeleteSendMessage(id));
        getSendMessage();
        if (await order.isSuccess) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  const handlesend = useCallback(
    (id) => {
      Swal.fire({
        title: "Are you sure want to send it?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await dispatch(SendMessage(id));
          if (await order.isSuccess) {
            Swal.fire({
              title: "Sended !",
              text: "message sended successfully",
              icon: "success",
            });
          }
        }
      });
    },
    [dispatch]
  );
  return (
    <div>
      <div className="block relative max-w-sm p-2 border bg-gray-100 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 border-l-4 border-blush-500 group">
        <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 absolute right-2 top-2">
          <div
            onClick={() => handleDelete(data?.id)}
            className="cursor-pointer bg-red-700 p-1 rounded"
          >
            <MdDeleteOutline className="text-white" />
          </div>
          <div
            className="cursor-pointer bg-green-700 p-1 rounded"
            onClick={() => handleEdit(data)}
          >
            <TiPencil className="text-white" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Image
            src={data?.user?.profile_photo_url || "/assets/defaultseller.jpg"}
            width={500}
            height={500}
            alt="Picture of the author"
            className="w-20 h-20 ml-0 rounded-full p-1 bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50"
          />

          <div>
            <h5 className="mb-2 text-md font-semibold tracking-tight text-gray-900 dark:text-white text-pink-400">
              {data?.user?.name}
            </h5>
            <p className="text-sm">{data?.user?.email}</p>
          </div>
        </div>
        <table className="w-full mt-3">
          <tbody>
            <tr>
              <th className="text-left text-sm font-semibold">Created At</th>
              <td className="text-left text-sm">
                {moment(data?.created_at).format("DD MMM YYYY")}
              </td>
            </tr>
          </tbody>
        </table>

        <button
          onClick={() => handlesend(data?.id)}
          className=" bg-blush-red inline-block flex items-center justify-center gap-2 py-2 rounded-md text-white px-4 w-full mt-6"
        >
          Send <IoIosSend />
        </button>
      </div>
    </div>
  );
}

export default SendMessageCard;
