"use client";
import React, { useCallback, useEffect } from "react";
import Container from "@/components/globals/container";
import UsersCard from "@/components/dashboard/users/userscard";
import TopHeader from "@/components/home/homeHeader/topheader";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import InnerBanner from "@/components/innerpagebanner/page";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import { useDispatch, useSelector } from "react-redux";
import { GetAllNormalUsers } from "@/store/slices/userSlice";
import Loader from "@/components/globals/Loader";
import withAuth from "@/hoc/withAuth";

function AllUser() {
  const dispatch = useDispatch();
  const { usersList, isLoading } = useSelector((state) => state.user);

  const GetAllUsers = useCallback(() => {
    dispatch(GetAllNormalUsers());
  }, [dispatch]);

  useEffect(() => {
    GetAllUsers();
  }, [GetAllUsers]);
  console.log(usersList);
  return (
    <div>
      <TopHeader />
      <DashboardHeader />
      <InnerBanner title={"All Users"} />

      <div className="p-12">
        <Loader isLoading={isLoading}>
          <Container>
            <div className="grid lg:grid-cols-3 mobile:grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4">
              {usersList?.map((item, index) => (
                <div key={index}>
                  <UsersCard userstatus={"active"} data={item} />
                </div>
              ))}
            </div>
          </Container>
        </Loader>
      </div>

      <DashboardFooter />
    </div>
  );
}

export default withAuth(AllUser);
