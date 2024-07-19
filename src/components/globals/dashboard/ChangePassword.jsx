"use client";
import { ResetPassword } from "@/store/slices/userSlice";
import { ChangePasswordValidation } from "@/validators/authValidations";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalInput from "../globalInput";
import { Eye, EyeOff, Key } from "lucide-react";
import Loader from "../Loader";

export default function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const { isLoading, isSuccess } = useSelector((state) => state.user);
  const [passwordShow, setPasswordShow] = useState(true);
  const [confirmShowPassword, setConfirmShowPassword] = useState(true);

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: ChangePasswordValidation,
    onSubmit: async (values, { resetForm }) => {
      await dispatch(ResetPassword(values));
      resetForm();
    },
  });

  return (
    <Loader isLoading={isLoading && !isSuccess}>
      <div className="flex items-center justify-center py-10">
        <div className="lg:w-2/6 mobile:w-11/12 sm:w-6/12 md-landscape:w-5/12	 p-4 shadow  border rounded-md">
          <h1 className="text-center font-bold text-xl text-blush-red">
            Change Password
          </h1>
          <h1 className="text-gray-600 p-5 text-sm text-center italic ">
            Enter a new password below to change your password and access you
            account.
          </h1>

          <form
            className="flex flex-col gap-4 p-3"
            onSubmit={formik.handleSubmit}
          >
            <span>
              <label htmlFor="password" className="text-sm text-gray-700">
                New Password
              </label>
              <GlobalInput
                parentClassName={"border p-2 rounded-md "}
                type={!passwordShow ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && formik.errors.password
                    ? formik.errors.password
                    : null
                }
                leftIcon={<Key size={18} className="text-gray-700" />}
                leftIconClassName={"bg-gray-200 p-1 rounded-md"}
                inputClassName={"px-2 text-sm outline-none"}
                placeholder={"New password"}
                rightIcon={
                  !passwordShow ? (
                    <Eye
                      className="cursor-pointer text-gray-700 "
                      size={18}
                      onClick={() => setPasswordShow(!passwordShow)}
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer text-gray-700"
                      size={18}
                      onClick={() => setPasswordShow(!passwordShow)}
                    />
                  )
                }
              />
            </span>
            <span>
              <label htmlFor="password" className="text-sm text-gray-700">
                Confirm New Password
              </label>
              <GlobalInput
                parentClassName={"border p-2 rounded-md "}
                name="password_confirmation"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={
                  formik.touched.password_confirmation &&
                  formik.errors.password_confirmation
                    ? formik.errors.password_confirmation
                    : null
                }
                type={!confirmShowPassword ? "text" : "password"}
                leftIcon={<Key size={18} className="text-gray-700" />}
                leftIconClassName={"bg-gray-200 p-1 rounded-md"}
                inputClassName={"px-2 text-sm outline-none"}
                placeholder={"Confirm New password"}
                rightIcon={
                  !confirmShowPassword ? (
                    <Eye
                      className="cursor-pointer  text-gray-700"
                      size={18}
                      onClick={() =>
                        setConfirmShowPassword(!confirmShowPassword)
                      }
                    />
                  ) : (
                    <EyeOff
                      className="cursor-pointer text-gray-700"
                      size={18}
                      onClick={() =>
                        setConfirmShowPassword(!confirmShowPassword)
                      }
                    />
                  )
                }
              />
            </span>
            <button className="p-2 mt-3 w-full rounded-md bg-blush-red hover:bg-pink-500 hover:shadow-lg transition-all text-white font-semibold text-sm ">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Loader>
  );
}
