"use client";
import { LoginUser } from "@/store/slices/authSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import GlobalInput from "../globals/globalInput";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { LoginValidationSchema } from "@/validators/authValidations";
import { useRouter } from "next/navigation";

export default function Login() {
  const navigate = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth);

  // Formik integration for submit form
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await dispatch(LoginUser(values));
      resetForm();
    },
    validationSchema: LoginValidationSchema,
  });

  return (
    <div className="bg-gray-100 w-full h-fit py-10 md:py-12 lg:py-20   flex items-center justify-center">
      {/* Login form  */}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-3 md:gap-5 lg:gap-5 p-4 md:p-6 lg:p-10 border bg-white shadow rounded-xl  w-11/12 md:w-3/5 lg:w-6/12 xl:w-4/12	 m-landscape:w-8/12"
      >
        <h1 className="text-xl font-semibold text-gray-800 pb-0 md:pb-4 lg:pb-4">
          Hi, Welcome back!
        </h1>
        <GlobalInput
          parentClassName=" border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<Mail className="text-gray-700 text-xs " size={15} />}
          leftIconClassName="bg-gray-100 p-5 px-5 md:p-5 md:px-6 lg:p-5 lg:px-6 rounded-sm"
          onChange={formik.handleChange}
          value={formik.values.email}
          name="email"
          type="text"
          placeholder="Enter Email "
          error={
            formik.touched.email && formik.errors.email ? (
              <p>{formik.errors.email}</p>
            ) : null
          }
        />

        <GlobalInput
          parentClassName=" border rounded-md flex gap-3"
          inputClassName="outline-none text-gray-800 text-sm"
          leftIcon={<KeyRound className="text-gray-700 text-xs" size={15} />}
          leftIconClassName="bg-gray-100 p-5 px-5 md:p-5 md:px-6 lg:p-5 lg:px-6 rounded-sm"
          type="password"
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Password"
          error={
            formik.touched.password && formik.errors.password ? (
              <p>{formik.errors.password}</p>
            ) : null
          }
        />
        <span className="text-right text-sm text-pink-300">
          <Link href="/forgot-password" className="hover:underline">
            Forgot Password ?
          </Link>
        </span>
        <button
          type="submit"
          className="p-3 px-4 md:p-5 md:px-4 lg:p-5 lg:px-4 rounded-md text-sm font-semibold bg-blush-red hover:bg-pink-400 text-white"
        >
          Log In
        </button>

        <h6 className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link className="text-blush-red underline" href="/signup">
            Sign up
          </Link>
        </h6>

        {/* social authentication */}

        {/* <SocialAuthentication text={"Only For Users"} /> */}
      </form>
    </div>
  );
}
