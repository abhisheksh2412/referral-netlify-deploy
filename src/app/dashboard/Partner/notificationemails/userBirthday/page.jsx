"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import Container from "@/components/globals/container";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import { GoPlusCircle } from "react-icons/go";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import PartnerHeader from "@/components/PartnerDashboard/header";
import { useDispatch, useSelector } from "react-redux";
import { GetUserBirthdayList } from "@/store/slices/orders";
import UserBirthdayCard from "@/components/managerdashboard/storebirthday/userBirthdayCard";
import Loader from "@/components/globals/Loader";
import Modal from "@/components/globals/Modal";
import AddUserBirthdayForm from "@/components/common/form/addUserBirthdayForm";
import withAuth from "@/hoc/withAuth";

function UserBirthday() {
  const [search, setSearch] = useState("");
  const [editModal, setEditModal] = useState(null);
  const handleEditModal = (value) => setEditModal(value);
  const dispatch = useDispatch();
  const { usersBirthdayList, isLoading } = useSelector((state) => state.orders);
  const userBirthdayList = useCallback(() => {
    dispatch(GetUserBirthdayList());
  }, [dispatch]);

  useEffect(() => {
    userBirthdayList();
  }, [userBirthdayList]);

  const SearchFilterData = (search, data) => {
    let newdata = data;
    if (search?.length > 0) {
      const regex = new RegExp(search, "i");
      newdata = data?.filter((item) => regex.test(item.user.name));
    }
    return newdata;
  };
  return (
    <Loader isLoading={isLoading}>
      <div>
        <TopHeader />
        <PartnerHeader />
        <InnerBanner title={"User Birthday"} />
        <div className="py-16 mobile:py-6 mobile:p-4 bg-gray-100">
          <Container>
            {/* Open accout with store access */}

            <div className="bg-white p-5 rounded-t-lg border-b-[1.5px] border-grey-500">
              <div className="flex items-center justify-between bg-white p-4 rounded-md mobile:inline-block mobile:w-full mb-8 mobile:mb-0 sm:mb-2">
                <div className="w-2/4 mobile:w-full">
                  <form className="max-w-md">
                    <label
                      for="default-search"
                      className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                      Search
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg
                          className="w-4 h-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                          />
                        </svg>
                      </div>
                      <input
                        type="search"
                        id="default-search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="block w-full p-3 outline-0 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50"
                        placeholder="Search Mockups, Logos..."
                      />
                    </div>
                  </form>
                </div>

                <div className="w-2/4 mobile:w-full">
                  <div className="flex justify-end mobile:justify-center mobile:mt-3">
                    <Link
                      href="/dashboard/Partner/addBirthday/adduserbirthday"
                      className=" bg-blush-red inline-block flex items-center justify-center gap-2 py-3 rounded-md text-white px-4"
                    >
                      <GoPlusCircle className="w-6 h-6" />
                      Add User Birthday
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-b-lg ">
              {usersBirthdayList?.data?.length === 0 ||
              usersBirthdayList?.length === 0 ? (
                <h6 className="text-sm text-center text-gray-700 p-4">
                  No data Found
                </h6>
              ) : (
                <div className="grid grid-cols-12 gap-16 mobile:grid-cols-1  mobile:gap-4 sm:gap-4 ">
                  {SearchFilterData(search, usersBirthdayList || [])?.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="lg:col-span-4 sm:col-span-6 md-landscape:col-span-4"
                      >
                        <UserBirthdayCard
                          data={item}
                          handleEdit={handleEditModal}
                        />
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </Container>
          <Modal
            open={editModal !== null}
            handleOpen={() => handleEditModal(null)}
          >
            <div className="p-3 bg-blush-red text-white text-center rounded-t-md">
              <h1>Edit User Birthday</h1>
            </div>
            <div className="p-4 max-h-[80vh] overflow-y-auto">
              <AddUserBirthdayForm
                editData={editModal}
                handleClose={handleEditModal}
              />
            </div>
          </Modal>
        </div>
        <DashboardFooter />
      </div>
    </Loader>
  );
}

export default withAuth(UserBirthday);
