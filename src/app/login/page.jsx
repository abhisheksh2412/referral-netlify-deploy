"use client";
import { RemoveSpaces } from "@/_utils/manageRoute";
import Login from "@/components/auth/login";
import BreadcrumbGlobal from "@/components/globals/BreadCrumb";
import Footer from "@/components/home/footer";
import HomeHeader from "@/components/home/homeHeader";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const LoginSignup = () => {
  const router = useRouter();
  const user = useSelector((state) => state.auth);
  useEffect(() => {
    if (user?.isAuthenticated) {
      router.push(`/dashboard/${RemoveSpaces(user?.data?.role)}`);
    }
  }, [router, user]);
  return (
    <div>
      <HomeHeader />
      <div className="w-full">
        <div className="w-full h-[15vh] md:h-[20vh] lg:h-[40vh] bg-banner bg-no-repeat bg-cover flex items-center justify-center   m-landscape:h-[30vh]  ">
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">Login</h1>
            <BreadcrumbGlobal pageName="Login" description="Login page" />
          </div>
        </div>
        <Login />
      </div>
      <Footer />
    </div>
  );
};

export default LoginSignup;
