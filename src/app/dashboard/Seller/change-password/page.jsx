"use client";
import DashboardFooter from "@/components/dashboard/dashboardfooter/page";
import DashboardHeader from "@/components/dashboard/dashboardheader/header";
import GlobalInput from "@/components/globals/globalInput";
import TopHeader from "@/components/home/homeHeader/topheader";
import InnerBanner from "@/components/innerpagebanner/page";
import { useFormik } from "formik";
import { Eye, EyeOff, Key } from "lucide-react";
import * as yup from "yup";
import { useState } from "react";
import { ChangePasswordValidation } from "@/validators/authValidations";
import { useDispatch, useSelector } from "react-redux";
import { ResetPassword } from "@/store/slices/userSlice";
import Loader from "@/components/globals/Loader";
import { useRouter } from "next/navigation";
import withAuth from "@/hoc/withAuth";
import ChangePassword from "@/components/globals/dashboard/ChangePassword";
function SellerChangePassword() {
  return (
    <div>
      <TopHeader />
      <DashboardHeader />
      <InnerBanner title={"Change Password"} />
      {/* main content  */}
      <ChangePassword />
      <DashboardFooter />
    </div>
  );
}

export default withAuth(SellerChangePassword);
