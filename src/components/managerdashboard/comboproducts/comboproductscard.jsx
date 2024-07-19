"use client";
import Modal from "@/components/globals/Modal";
import { config } from "@/config/config";
import { DeleteCombos, GetUserComboByToken } from "@/store/slices/combo";
import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import UpdateComboForm from "../forms/updateComboForm";

function ComboProductsCard({ data, handleClose = null, isdelete = true }) {
  const { isSuccess } = useSelector((state) => state.combo);
  const dispatch = useDispatch();
  async function DeleteAllCombo(comboId) {
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
        await dispatch(DeleteCombos(comboId));
        dispatch(GetUserComboByToken());
        if (await isSuccess) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  }
  return (
    <div>
      <div className="bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 rounded-lg p-5 group">
        <div className="flex items-center	">
          <div className="w-3/6">
            <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100">
              {isdelete && (
                <div
                  className="cursor-pointer bg-red-700 p-1 rounded"
                  onClick={() => DeleteAllCombo(data?.id)}>
                  <MdDeleteOutline className="text-white"/>
                </div>
              )}
            </div>
            <h4
              onClick={() => handleClose(data)}
              className="text-xl font-semibold w-fit hover:text-pink-600 cursor-pointer mb-2 line-clamp-1">
              {data?.title}
            </h4>
            <p className=" text-sm line-clamp-2 h-[50px]">
              {data?.description}
            </p>
            <h3 className="text-3xl font-semibold text-blush-red my-2">
              {data?.points}
            </h3>
            <small className="text-gray-500 text-xs">
              All Terms Condition Apply
            </small>
          </div>
          <div className="w-3/6">
            <div className="grid grid-cols-4 gap-2">
              {data?.productData?.slice(0, 4)?.map((item, index) => (
                <div key={index} className="col-span-2">
                  <img
                    className="w-20 h-20 mx-auto"
                    src={config?.IMAGE_URL_PATH + item?.path}
                    alt="product_image"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComboProductsCard;
