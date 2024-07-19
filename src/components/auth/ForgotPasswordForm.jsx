"use client";

import { Mail } from "lucide-react";
import GlobalInput from "../globals/globalInput";
import Link from "next/link";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { SendEmail } from "@/store/slices/common";
import { useStateManager } from "@/providers/useStateManager";
import { useFormik } from "formik/dist";

export default function ForgotPasswordForm({ setCurrentStep }) {
  const dispatch = useDispatch();
  const { email, setEmail } = useStateManager();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required(),
    }),
    onSubmit: async (values, { resetForm }) => {
      await dispatch(SendEmail(values.email));
      await setEmail(values.email);
      resetForm();
      setCurrentStep(1);
    },
  });

  return (
    <div className="flex items-center justify-center">
      <div className="w-full py-2 md:py-2 lg:py-8 rounded-md">
        <h1 className="text-lg font-semibold text-blush-red text-center">
          Forgot Password
        </h1>
        <h6 className="text-sm text-gray-700 text-center py-5">
          Enter the email address associated with your account and we will send
          a link to reset your password.
        </h6>

        <form className="flex flex-col gap-4" onSubmit={formik.handleSubmit}>
          <span>
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700"
            >
              Email
            </label>
            <GlobalInput
              type="email"
              name="email"
              leftIcon={<Mail size={16} className="text-gray-700" />}
              required={true}
              value={formik.values.email}
              onChange={formik.handleChange}
              parentClassName={"border rounded-md p-5 px-6 flex gap-2 "}
              inputClassName={"outline-none text-sm "}
              placeholder={"Enter your Email"}
              error={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
            />
          </span>

          <button
            type="submit"
            className="text-sm bg-blush-red text-white font-semibold p-4 w-full rounded-md"
          >
            Forgot Password
          </button>
        </form>

        <span className="flex gap-2 justify-between flex-col pt-10">
          <h6 className="text-xs text-center">
            Don&apos;t have an account?{" "}
            <Link className="text-blush-red underline" href="/signup">
              Sign up
            </Link>
          </h6>
          <h6 className="text-xs text-center">
            Already have an account?{" "}
            <Link className="text-blush-red underline" href="/login">
              Login
            </Link>
          </h6>
        </span>
      </div>
    </div>
  );
}
