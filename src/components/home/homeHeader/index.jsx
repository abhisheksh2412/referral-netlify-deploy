"use client";
import React, { useEffect } from "react";
import Container from "../../globals/container";
import Logo from "../../globals/logo";
import LoginButton from "./loginbutton";
import RegisterButton from "./registerbutton";
import TopHeader from "./topheader";
import { useDispatch, useSelector } from "react-redux";
import { FindSelfUser } from "@/store/slices/authSlice";
import { useRouter } from "next/navigation";
import { LayoutDashboard } from "lucide-react";
import { RemoveSpaces } from "@/_utils/manageRoute";
import { useStateManager } from "@/providers/useStateManager";

function HomeHeader() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const user = useSelector((state) => state.auth);
  const { token } = useStateManager();

  // check the user logged in
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(FindSelfUser());
    };

    if (token) {
      fetchData();
    }
  }, [dispatch, token]);

  function handleNavigation() {
    navigate.push(`/dashboard/${RemoveSpaces(user?.data?.role)}`);
  }

  return (
    <div>
      <TopHeader />
      <div className="p-3 md:p-6 lg:p-6">
        <Container>
          <div className="flex justify-between items-center">
            <div>
              <Logo />
            </div>
            <div className="flex gap-4">
              {user?.isAuthenticated ? (
                <button
                  onClick={handleNavigation}
                  className=" flex  gap-2 items-center p-2 px-3 text-white bg-blush-red  rounded-md"
                >
                  <LayoutDashboard className="text-base" />
                  Dashboard
                </button>
              ) : (
                <>
                  <LoginButton />
                  <RegisterButton />
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default HomeHeader;
