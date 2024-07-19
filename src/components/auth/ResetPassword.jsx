import { useState } from "react";
import Loader from "../globals/Loader";
import { useFormik } from "formik";
import { Eye, EyeOff, Key } from "lucide-react";

import GlobalInput from "../globals/globalInput";
import { useDispatch, useSelector } from "react-redux";
import { ChangePasswordByUserId } from "@/store/slices/userSlice";
import { popup } from "@/_utils/alerts";
import { useRouter } from "next/navigation";
import { ChangePasswordValidation } from "@/validators/authValidations";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useRouter();
  const resetPass = useSelector((state) => state.user);
  const [passwordShow, setPasswordShow] = useState(true);
  const VerifiedData = useSelector((state) => state.common.varifiedUserData);
  const [confirmShowPassword, setConfirmShowPassword] = useState(true);

  const formik = useFormik({
    initialValues: {
      password: "",
      password_confirmation: "",
    },
    validationSchema: ChangePasswordValidation,
    onSubmit: async (values, { resetForm }) => {
      const { password_confirmation, password } = values;
      const formdata = {
        user_id: VerifiedData?.id,
        password: password,
      };
      await dispatch(ChangePasswordByUserId(formdata));
      if (await resetPass.isSuccess) {
        popup({
          status: "success",
          message: "password Changed successfully . Please Login again",
          confirmBtn: false,
          timer: 2000,
          position: "center",
        });
        navigate.push("/login");
      }
    },
  });

  return (
    <Loader isLoading={false}>
      <div>
        {/* main content  */}

        <div className="w-full py-4 ">
          <h1 className="text-center font-bold text-xl text-blush-red">
            Reset Password
          </h1>
          <h1 className="text-gray-600 py-5 text-sm text-center ">
            Enter a new password below to change your password and access you
            account.
          </h1>

          <form
            className="flex flex-col gap-4 py-3"
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
              <label
                htmlFor="password_confirmation"
                className="text-sm text-gray-700"
              >
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
            <button
              type="submit"
              className="p-2 mt-3 w-full rounded-md bg-blush-red hover:bg-pink-500 hover:shadow-lg transition-all text-white font-semibold text-sm "
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </Loader>
  );
}
