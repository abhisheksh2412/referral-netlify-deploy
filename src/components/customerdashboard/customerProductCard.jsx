"use client";
import React, { useCallback, useState } from "react";
import { CiHeart } from "react-icons/ci";
import Modal from "../globals/Modal";
import ProductDetails from "../managerdashboard/products/ProductDetails";
import { config } from "@/config/config";
import clsx from "clsx";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProductAsFavorite,
  GetRecentProductList,
} from "@/store/slices/customer";

const dummyData = {
  id: 1,
  name: "Dummy Product",
  weight: 500,
  points: 50,
  path: "/assets/store-10.png",
};

function CustomerProductCard({ data }) {
  const { favoriteProductList, isLoading } = useSelector(
    (state) => state.customer
  );
  const [productDetailsModal, setProductDetailsModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.data);
  const handleProductDetailsModal = () =>
    setProductDetailsModal(!productDetailsModal);

  const getFavProductList = useCallback(() => {
    if (user?.id) {
      dispatch(GetRecentProductList(user.id));
    }
  }, [dispatch, user]);
  const addProductFav = useCallback(
    (clicked, productID) => {
      if (user?.id) {
        const data = {
          user_id: user?.id,
          product_id: productID,
          is_clicked: clicked,
        };
        dispatch(AddProductAsFavorite(data));
        getFavProductList();
      }
    },
    [dispatch, user, getFavProductList]
  );
  return (
    <div>
      <div className="shadow bg-white rounded-lg p-0 relative pb-2 rounded-b-lg mb-4 group cursor-pointer">
        <div className="p-2 rounded-t-lg bg-gradient-to-r from-pink-100 via-pink-50 to-pink-50 relative">
          <Image
            src={config?.IMAGE_URL_PATH + data?.path}
            width={500}
            height={500}
            alt="Picture of the author"
            className="w-36 h-36 mx-auto"
          />

          <button disabled={isLoading}>
            <CiHeart
              onClick={() => {
                addProductFav(data?.is_favorite === 1 ? 0 : 1, data?.id);
              }}
              className={clsx(
                "w-8 h-8  rounded-full p-1  cursor-pointer",
                data?.is_favorite === 1
                  ? "bg-red-700 text-white"
                  : "bg-white  text-red-400 shadow-md"
              )}
            />
          </button>
        </div>
        <h3
          className="text-center font-semibold pt-3 mb-3 hover:text-pink-400"
          onClick={() => handleProductDetailsModal()}
        >
          {data?.name}
        </h3>
        <div className="flex justify-center gap-5">
          <h4 className="text-center p-1 font-medium text-neutral-400">
            <b className="font-semibold">PLN :</b>
            {data?.points}
          </h4>
          <h5 className="flex items-center justify-center gap-1">
            <b className="font-semibold">Qnty :</b> {data?.quantity}
          </h5>
        </div>
        <h5 className="flex items-center justify-center gap-1">
          <b className="font-semibold">G :</b>
          {data?.weight}
        </h5>
      </div>
      <Modal open={productDetailsModal} handleOpen={handleProductDetailsModal}>
        <ProductDetails data={data} />
      </Modal>
    </div>
  );
}

export default CustomerProductCard;
