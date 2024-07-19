"use client";
import React from "react";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { TiPencil } from "react-icons/ti";
import { config } from "@/config/config";
import { useDispatch } from "react-redux";
import { DeleteProduct, GetAllProduct } from "@/store/slices/products";
import Swal from "sweetalert2";

function ProductCard({ data, handleModal = null }) {
  const dispatch = useDispatch();
  const handleDeleteProduct = async (productId) => {
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
        await dispatch(DeleteProduct(productId));
        dispatch(GetAllProduct());
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
      <div className="shadow bg-white rounded-lg p-0 relative pb-2 rounded-b-lg mb-4 group">
        <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50">
          <div className=" absolute right-0 flex justify-end gap-2 mb-2 opacity-0 group-hover:opacity-100">
            <button
              className="cursor-pointer bg-red-700 p-1 rounded"
              onClick={() => handleDeleteProduct(data?.id)}
            >
              <MdDeleteOutline className="text-white" />
            </button>
            <div
              className="cursor-pointer bg-green-700	 p-1 rounded"
              onClick={() => handleModal("edit", data)}
            >
              <TiPencil className="text-white" />
            </div>
          </div>
          <img
            className="w-36 h-36 mx-auto"
            onClick={() => handleModal("view", data)}
            src={config.IMAGE_URL_PATH + data?.path}
            alt=""
          />
        </div>
        <h3
          onClick={() => handleModal("view", data)}
          class="text-center mobile:text-sm font-semibold pt-3"
        >
          {data?.name}
        </h3>
        <h4 className="text-center p-1 font-medium  mobile:text-sm text-neutral-400">
          {data?.weight} g
        </h4>
        <h5 className="flex items-center justify-center gap-1">
          <RiVerifiedBadgeFill className="text-green-700" /> {data?.points}
        </h5>
      </div>
    </div>
  );
}

export default ProductCard;
