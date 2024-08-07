"use client";

import Card from "@/components/card/card";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteAssignedCards,
  GetAllCardsByUserId,
} from "@/store/slices/seller";
import Loader from "@/components/globals/Loader";
import Swal from "sweetalert2";
import withAuth from "@/hoc/withAuth";
import toast from "react-hot-toast";

function CardList() {
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.auth);
  const cards = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  const GetAllCard = useCallback(() => {
    dispatch(GetAllCardsByUserId(user?.data?.id));
  }, [dispatch, user?.data?.id]);

  const handleDeleteCard = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(DeleteAssignedCards(id));
        await dispatch(GetAllCardsByUserId(user?.data?.id));
        if (cards?.isSuccess) {
          toast.success("Deleted Successfully", { position: "top-right" });
        }
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire({
          title: "Cancelled",
          text: "Your imaginary file is safe :)",
          icon: "error",
        });
      }
    });
  };

  const handleSearch = (data, search) => {
    let filteredList = data;
    if (search?.length > 0) {
      const regex = new RegExp(search);
      filteredList = filteredList.filter((item) =>
        regex.test(item?.card?.card_number)
      );
    }
    return filteredList;
  };

  useEffect(() => {
    if (user?.data?.id) {
      GetAllCard();
    }
  }, [GetAllCard, user?.data?.id]);

  return (
    <div>
      <TopHeader />
      <DashboardHeader />
      <InnerBanner title={"Card List"} />

      <div className="my-6">
        <Container>
          <div className="relative overflow-x-auto  sm:rounded-lg my-8 px-4">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between p-4 mb-5">
              <label for="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="block p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Card Number"
                />
              </div>
            </div>
            <Loader isLoading={cards?.isLoading}>
              {handleSearch(cards?.cards, search)?.length === 0 ? (
                <h5 className="text-sm text-gray-500 text-center font-semibold p-4">
                  No Cards Found
                </h5>
              ) : (
                <div className="grid lg:grid-cols-3 mobile:grid-cols-1 md:grid-cols-2 sm:grid-cols-6 gap-4">
                  {handleSearch(cards?.cards, search)?.map((item, index) => (
                    <div key={index} className="w-full mb-4">
                      <div className=" py-2 px-2 bg-white border border-gray-200 rounded-[1.5rem] shadow dark:bg-gray-800 dark:border-gray-700 relative">
                        <button
                          onClick={() => handleDeleteCard(item?.card_id)}
                          className="absolute w-12 h-12 rounded-full right-6 -top-5 bg-white text-red-500 text-xl flex justify-center items-center"
                        >
                          <MdDeleteOutline />
                        </button>
                        <Card data={item?.card} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Loader>
          </div>
        </Container>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(CardList);
